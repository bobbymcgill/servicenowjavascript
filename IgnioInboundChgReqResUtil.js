//This is called from the Ignio REST API - then calls the InboundChangeUtil.js

var IgnioInboundChgReqResUtil = Class.create();
IgnioInboundChgReqResUtil.prototype = {
    initialize: function() {},

    processReq: function(request, start, end, cmdbArr) {
        try {
            var InbUtil = new InboundChangeUtil(); //ScriptInclude used for validating the incoming data
            var reqBody = request.body;
            var reqJsonString = JSON.stringify(request.body.data);
            gs.log("Ignio Change(Insert) : Request Object " + reqJsonString);
            var custommessage = "";
            var ErrorObject = {};
            var err = new InboundErrorLogUtil();
			var CisNotAvailable='';

            var temp_name = gs.getProperty("Ignio.iSeries.standard.change.template");

            var change = new GlideRecord('change_request');
            change.initialize();
            change.type = 'standard';
            change.state = '-1'; // Choice value of Implement
            change.chg_model = 'cce6437f475e61904d2c6542736d43dd'; // sysid of iSeries Change Model
            change.applyTemplate(temp_name);
            change.setValue("start_date", start);
            change.setValue("end_date", end);
            //change.setValue("cmdb_ci", InbUtil.returnCI(cmdbArr[0]));
            var sys_id = change.insert();

            for (var j = 0; j < cmdbArr.length; j++) {                  
                if (InbUtil.returnCI(cmdbArr[j])) {
                    var outage = new GlideRecord('cmdb_ci_outage');
                    outage.initialize();
                    outage.task_number = change.getUniqueValue();
                    outage.cmdb_ci = InbUtil.returnCI(cmdbArr[j]);
                    outage.type = "planned";
                    outage.short_description = change.short_description;
                    outage.setValue("begin", change.start_date);
                    outage.setValue("end", change.end_date);
                    outage.insert();

                } else {
					CisNotAvailable=cmdbArr[j]+','+CisNotAvailable;
					
					}
				
            }
			if(CisNotAvailable!=''){
				var nocis = CisNotAvailable.slice(0, -1);
			custommessage=nocis+' - These CIs not present in CMDB';
			err.errorLog('iSeries', ErrorObject, custommessage, change.number, reqJsonString, '');
			}
            if (sys_id)
                return change;
            else
                return "";

        } catch (ex) {
            gs.log("From IgnioInboundChgReqResUtil(processReq) Script Include : " + ex.message);
        } //return empty string if incident is not created


    },
    processRes: function(ChgObj) {
        try {
            var body = {};
            body.status = "success";
            body.changeNumber = ChgObj.number.toString();
            body.sysId = ChgObj.sys_id.toString();
            return body;
        } catch (ex) {
            gs.log("From IgnioInboundChgReqResUtil(processRes) Script Include : " + ex.message);
        }

    },
    processUpdateReq: function(request, encodedQuery) {
        try {
            var reqBody = request.body;
            var currentdate = new GlideDateTime();
            var reqJsonString = JSON.stringify(request.body.data);
            gs.log("Ignio Change(Update) : Request Object " + reqJsonString);

            var change = new GlideRecord('change_request');
            change.addQuery(encodedQuery);
            change.query();
            if (change.next()) {
                change.state = '3';
                change.work_start = change.start_date;
                change.work_end = currentdate;
                change.setDisplayValue('close_code', 'successful');
                change.close_notes = 'Maintenance closure message was received';
                var update = change.update();
                if (update)
                    return change;
                else
                    return "Change Not Updated";
            } else
                return "Change Not Exist";


        } catch (ex) {
            gs.log("From IgnioInboundChgReqResUtil(processUpdateReq) Script Include : " + ex.message);
        }

    },

    type: 'IgnioInboundChgReqResUtil'
};