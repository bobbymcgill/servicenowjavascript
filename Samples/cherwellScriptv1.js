var current = new GlideRecord('change_request');
current.get('number','CHG0094990');
gs.info('Change is: ' + current.number);
var impactedCI = new GlideRecord('task_cmdb_ci_service');
impactedCI.addQuery('task',current.sys_id);
impactedCI.addQuery('cmdb_ci_service.company','68081e3fdbcad8507e4160fdd39619db');
impactedCI.query();
var arrayCI = [];
gs.info('Number of impacted CIs: ' + impactedCI.getRowCount());
while(impactedCI.next()){
    arrayCI.push(impactedCI.cmdb_ci_service.getDisplayValue());
}
if(current.cmdb_ci.company == '68081e3fdbcad8507e4160fdd39619db'){
    arrayCI.push(current.cmdb_ci.getDisplayValue());
}
gs.info('List of impacted CIs: ' + arrayCI.toString());

var jsonObj = {};

jsonObj['Title'] =  current.short_description.toString();
jsonObj['Description'] =  current.description.toString();
jsonObj['Change Type'] =  current.type.toString();
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

gs.info("JSON Obj\n" + JSON.stringify(jsonObj,null,4));


try { 
    var r = new sn_ws.RESTMessageV2('CherwellTest', 'CreateChange');
   
   r.setRequestBody(JSON.stringify(jsonObj));
    var response = r.execute();
    var responseBody = response.getBody();
    var httpStatus = response.getStatusCode();
   }
   catch(ex) {
    var message = ex.message;
   }

   gs.info('Response Status : ' + httpStatus);
   gs.info('ResponseBody: ' + responseBody);