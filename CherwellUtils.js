var CherwellUtils = Class.create();
CherwellUtils.prototype = {
    initialize: function() {
        this.ci_count = 0;
    },

    getRelatedCI: function(change_sysid){
        var current = new GlideRecord('change_request');
        current.get(change_sysid);
        this.logger('Change is: ' + current.number);
        var impactedCI = new GlideRecord('task_cmdb_ci_service');
        impactedCI.addQuery('task',current.sys_id);
        impactedCI.addQuery('cmdb_ci_service.company','68081e3fdbcad8507e4160fdd39619db');
        impactedCI.query();
        var arrayCI = [];
        this.logger('Number of impacted CIs: ' + impactedCI.getRowCount());
        while(impactedCI.next()){
            arrayCI.push(impactedCI.cmdb_ci_service.getDisplayValue());
        }
        if(current.cmdb_ci.company == '68081e3fdbcad8507e4160fdd39619db'){
            arrayCI.push(current.cmdb_ci.getDisplayValue());
        }
        this.logger('List of impacted CIs: ' + arrayCI.toString());
        this.ci_count = arrayCI.length;
        return arrayCI.toString();
    },

    sendREST: function(eventType, message){
        this.logger('eventType: ' + eventType);
        this.logger('message: ' + message);
        try { 
            var r = new sn_ws.RESTMessageV2('CherwellTest', 'CreateChange');
            if(eventType == 'update'){
                r.setEndPoint('https://sol000910.solari.cloud/cherwellsnow/api/table/snow_update_change');
            }
            r.setRequestBody(JSON.stringify(message));
            var response = r.execute();
            var responseBody = response.getBody();
            var httpStatus = response.getStatusCode();
        }
        catch(ex) {
            var errorMsg = ex.message;
        }
        
        this.logger('Response Status : ' + httpStatus);
        this.logger('ResponseBody: ' + responseBody);
        
    },
    
    buildJSON: function(change_sysid, arrayCI){
        var jsonObj = {};
        var current = new GlideRecord('change_request');
        current.get(change_sysid);
        
        jsonObj['Title'] =  current.short_description.toString();
        jsonObj['Description'] =  current.description.toString();
        jsonObj['Change Type'] =  current.type.toString();
        jsonObj['State'] = current.state.getDisplayValue();
        jsonObj['Category'] = current.category.getDisplayValue();
        jsonObj['SubCategory'] = current.u_subcategory.getDisplayValue();
        jsonObj['ServiceNow Reference'] =  current.number.toString();
        jsonObj['ServiceNow SysID'] =  current.sys_id.toString();
        jsonObj['Impact'] =  current.impact.getDisplayValue();
        jsonObj['Urgency'] =  current.priority.getDisplayValue();
        jsonObj['Urgency Justification'] =  current.justification.toString();
        jsonObj['Risk Assessment'] =  current.risk.getDisplayValue();
        jsonObj['Risk Analysis'] =  current.risk_impact_analysis.toString();
        jsonObj['Impact Assessment'] =  current.risk_impact_analysis.toString();
        jsonObj['Implementation Plan'] =  current.implementation_plan.toString();
        jsonObj['Backout plan'] =  current.backout_plan.toString();
        jsonObj['Communications Plan'] =  current.u_communications_plan.toString();
        jsonObj['Primary CI: Configuration item'] =  current.cmdb_ci.getDisplayValue();
        jsonObj['Impacted Services CIs'] =  arrayCI.toString();
        jsonObj['Requested By'] =  current.requested_by.getDisplayValue();
        jsonObj['Requestor Email'] =  current.requested_by.email.toString();
        jsonObj['Planned start date'] =  current.start_date.toString();
        jsonObj['Planned end date'] =  current.end_date.toString();
        

        this.logger("JSON Obj\n" + JSON.stringify(jsonObj,null,4));
        return jsonObj;

    },

    getUpdates: function(sys_id){
        var current = new GlideRecord('change_request');
        current.get(sys_id);
        var gru = GlideScriptRecordUtil.get(current);
        
        var changedFields = gru.getChangedFields(); //Get changed fields with friendly names
        var changedValues = gru.getChanges(); //Get changed field values
        //Convert to JavaScript Arrays
        gs.include('j2js');
        changedFields = j2js(changedFields);
        changedValues = j2js(changedValues);
        var jsonChanges = {};
        for(var x=0; x < changedFields.length; x++){
            jsonChanges[changedFields[x]] = changedValues[x];
            
        }
        
        this.logger('Fields changed: ' + JSON.stringify(jsonChanges,null,4)));
        return jsonChanges;

    },

    createChange: function(sys_id){
        var arrayCI = this.getRelatedCI(sys_id);
        if (this.ci_count > 0){
            var jsonObj = this.buildJSON(sys_id, arrayCI);
            this.sendREST('create', jsonObj);
        }
    },

    updateChange: function(sys_id){
        var arrayCI = this.getRelatedCI(sys_id);
        if (this.ci_count > 0){
            var updates = this.getUpdates(sys_id);
            this.sendREST('update',updates);
        }

    },

	logger: function(msg){
		//var instanceName = gs.getProperty('instance_name');
//		if ((instanceName == 'mckessonqa') || (instanceName == 'mckessontest') || (instanceName == 'mckessondev')){
			gs.info('CherwellUtils Log: ' + msg);
	//	}
	},
	
    type: 'CherwellUtils'
};