/*
Name: ChangeRiskAssessment
Accessible from: All application Scopes
APIName: global.ChangeRiskAssessment
Not Client Callable

Description:Create and submit a risk assessment so risk condtiions will run and the assessment can be taken again if the CR goes back to New.  And so the state transitions won't prevent the CR from being submitted.
Relative to McKesson!!

Background script to call:
var crAssess = new global.ChangeRiskAssessment();
var cr = new GlideRecord('change_request');
cr.get('0123772983a36d10b706bd226daad304'); // Sys ID of Change Request - must send as GlideRecord
var x = crAssess.submitRiskAssessment(cr);
gs.print(x);
*/

//Script 
var ChangeRiskAssessment = Class.create();
ChangeRiskAssessment.prototype = {
    initialize: function() {
    },
	
	/* Create and submit a risk assessment so risk condtiions will run and the assessment can be taken again if the CR goes back to New.  And so the state transitions won't prevent the CR from being submitted.
     * current: the GlideObject of the change request 
     * metricObj: an optional JSON object of the risk assessment questions and answers */
    submitRiskAssessment: function(cr, metricObj) {
        this.chg_risk_asmt = '26319a284785ed1005b12422736d437a'; //The metric_type on change_risk_asmt.  You could pass this as an arguement to the function as well.

        /* Step 0) 
         * If a JSON payload of the metric names with the values was not passed, then we create a default version.
         * If a JSON payload was passed, we verify we have a value in the object to pair up with any display_value passed. */
        if (!metricObj) { //If a metricObj wasn't passed, we create a default one instead.
            metricObj = {
                //The object name needs to be the asmt_metric.name field (on the question).  You could change this to the exact question instead, but may encounter issues with special characters.  And you'll need to change the update below (the if (metricObj[metric_qs.name])) to go against the other field instead.  Name isn't ever displayed to users so that is why we picked that.

                //This list will need to be updated anytime a question is added, removed, or the display_value or actual_value is changed.  I suppose you could store this somewhere so you're not editing a script include every time.
                "Total Resources": {
                    "display_value": 'Owning team only',
                    "value": 1
                },
                "System Downtime": {
                    "display_value": 'No downtime required',
                    "value": 2
                },
                "Implemented before": {
                    "display_value": 'Yes previoulsy implemented and tested',
                    "value": 1
                },
                "Backout or revert": {
                    "display_value": 'Simple or No backout required',
                    "value": 1
                },
                "Change during business/Maintenance window": {
                    "display_value": "During Non-Peak Business Hours",
                    "value": 2
                }
            };
        } else {
            //We don't know for sure what was passed in.  It could contain only display_values, so we go find the values associated to the display value and assign them now.  Let's normalize!
            metricObj = this._assignRiskValuesToDisplay(metricObj);
        }


        /* Step 1) 
         * We need to create the asmt_assessment.  This is needed to link to the assessment instance.  It is also where the metric results (answered questiosns, I think) will get attached to. */
		var finalValue = '0';
        var asmt_group = new GlideRecord('asmt_assessment'); //This is the Assessment group when looking at an assessment instance.
        asmt_group.initialize();
        asmt_group.metric_type = this.chg_risk_asmt;
        asmt_group.insert();

        /* Step 2)
         * Next we create the assessment instance that gets related to the assement group. */
        var instance = new GlideRecord('asmt_assessment_instance');
        instance.initialize();
        instance.metric_type = this.chg_risk_asmt;
        instance.assessment_group = asmt_group.sys_id;
        instance.user = cr.assigned_to.sys_id; //Using the sys_id causes a unique key violation for unknown reasons.

        //If these aren't completed it generates a unique key violation error.
        var laterDate = new GlideDate();
        laterDate.addDaysUTC(14);
        instance.expiration_date = laterDate;
        instance.due_date = new GlideDate();
        instance.taken_on = new GlideDateTime();
        instance.state = 'wip'; //We come back and update this later.  If we don't save it as Work in Progress first it generates a unique key violation.
        instance.task_id = cr.sys_id;
        instance.insert();

        /* Step 3) 
         * Now for the gross part.  We have to go all the way down into the questions that are on the change_risk_asmt (sys_id from earlier) and start working our way up with values.  Oh, and we need to do it in 2 spots or the questions won't be visible if someone were to retake the risk assessment. */

        //We create a blanket value of all of the questions set to 1.  This is incase an asmt_metric question get renamed (boo!) or a new one is added that we're not skipping questions.

        //Get the metric (the questions) where the type is the change_risk_asmt.
        var metric_qs = new GlideRecord('asmt_metric');
        metric_qs.addQuery('category.metric_type', this.chg_risk_asmt);
        metric_qs.query();

        while (metric_qs.next()) {
            /* Step 4)
             * For each metric question we need to create a matching metric result.  This is where we use the JSON payload to specify what value gets set for what question.  */
            var m_result = new GlideRecord('asmt_metric_result'); //You get to it through the asmt_group
            m_result.initialize();
            m_result.metric = metric_qs.sys_id;
            m_result.instance = instance.sys_id;
            m_result.assessment_group = asmt_group.sys_id;
            m_result.user = cr.assigned_to.sys_id;

            //We assume that at some point somoene will rename or add a question and the JSON above won't be updated.
            //If the JSON payload does have a matching value by name (or you could call something out specifically instead), we set it to the value we determined earlier.  
            //If the JSON payload does *not* have a match by name (meaning the question changes or is new), we just assume the lowest value instead.  Better to add a default value than to have an empty question.  And if it isn't in your case, then move this IF statement above the "var m_result" and wrap it to the end of the while prevent "undefined" from showing up (and probably a unique key violation)
            if (metricObj[metric_qs.name]) {
                m_result.actual_value = metricObj[metric_qs.name].value;
            } else {
                m_result.actual_value = 1; //We use 1 as the lowest value.  Adjust for your risk assessment as needed.  
            }
            m_result.insert();

            /* Step 5)
             * We need to create a record on asmt_assessment_instance_question too!  If we don't create this second one here then when you try to do the Risk Assesment again it doesn't show the questions. 
             * We just create the record and pretty much copy what we just did above. */
            var insta_question = new GlideRecord('asmt_assessment_instance_question');
            insta_question.initialize();
            insta_question.metric = metric_qs.sys_id;
            insta_question.instance = instance.sys_id;
            insta_question.category = metric_qs.category.sys_id;
            insta_question.source_table = 'change_request';
            insta_question.source_id = cr.sys_id;
            insta_question.value = m_result.actual_value;
            insta_question.insert();
        } //End of metric_qs while


        /* Step 6)
         * Update the instance to 'complete' and we're done! */
        instance.state = 'complete'; //If we don't come back later for this it results in errors.
        instance.update();
        return instance.number;
    },


    /* If a metricObj was passed for the Risk Assessment, make sure there is a value paired with the display_value. */
    _assignRiskValuesToDisplay: function(metricObj) {
        //If our JSON object only has display values and no values, assign the appropriate values now.  This is way easier to do now then attempting to pair them up once we start creating records.
        for (var v in metricObj) {
            if (metricObj[v].value) { //Skip it if there is a value.  We may update this later to verify the value is valid.
                continue;
            }
            var metric_def = new GlideRecord('asmt_metric_definition');
            metric_def.addQuery('metric.category.metric_type.sys_id', this.chg_risk_asmt);
            metric_def.addQuery('metric.name', v);
            metric_def.addQuery('display', metricObj[v].display_value);
            metric_def.query();
            if (metric_def.next()) {
                metricObj[v].value = metric_def.value.toString();
            }
        }
        return metricObj;
    },

	
    type: 'ChangeRiskAssessment'
};
