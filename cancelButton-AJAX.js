/* UI Action settings
    Name: Cancel
    Table: sc_req_item
    Action Name: cancelRequest
    Client: Checked
    Form Button: Checked
    Onclick: cancelRequest();
    Condition: current.state!=3 &&current.state!=4 &&current.state!=7 && (gr.request.requested_for == gs.getUserID() || current.opened_by== gs.getUserID())

*/

// UI Action Script
function cancelRequest() {
    var answer = confirm("Are you sure you want to cancel this request? \nClicking OK will cancel the request. \nClicking 'Cancel' will return to the form. ");
	
    if (answer == true) {
	//alert('Cancelling request and associated records.');
	var ga = new GlideAjax('CancelRequest');
	ga.addParam('sysparm_name','cancelItems');
	ga.addParam('sysparm_record', g_form.getUniqueValue());
	ga.getXMLAnswer(cancelResponse);
}

function cancelResponse(response){
		var answer = response;
		if (answer == "Success"){
			alert('Request Canceled Successfully');
		} else {
			alert('There was a problem cancelling this request. Please contact ServiceNow admins\n\nError Message: \n' + answer);
		}
	}
}

/* Script Include: CancelRequest
    Scope: Global
    Client Callable: checked
    Description: Cancel REQUEST and Requested Item as well as approvals, tasks, and flows when user initiates a "Cancel" on the request/requested item forms.
*/
var CancelRequest = Class.create();
CancelRequest.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	cancelItems: function(){
		var reqItem = this.getParameter('sysparm_record');
		this.logger('Item to Cancel: ' + reqItem);
		var appr = new GlideRecord('sysapproval_approver');
		try{
			this.logger('starting to cancel flow');
			var flow = new GlideRecord('sys_flow_context');
			flow.addQuery('source_record',reqItem);
			flow.query();
			while(flow.next()){
				this.logger(flow.state.getDisplayValue());
				//CANCELLED is state 
				flow.state = 'CANCELLED';
				flow.update();
				this.logger('Flow Canceled: ' + flow.sys_id.getDisplayValue());
			}
			
			appr.addQuery('sysapproval',reqItem);
			appr.query();
			while(appr.next()){
				//cancelled is value
				appr.state = 'cancelled';
				appr.update();
				this.logger('Approval Cancelled for: ' + appr.approver.getDisplayValue());
			}

			var task = new GlideRecord('sc_task');
			task.addQuery('request_item',reqItem);
			task.query();
			while(task.next()){
				//gs.info(task.state.getDisplayValue());
				//4 is value for cancelled
				task.state = 4;
				task.update();
				this.logger('SC Task cancelled: ' + task.number);
			}
			
			this.logger('Cancelling request and requested items');
			var requestedItem = new GlideRecord('sc_req_item');
			requestedItem.get(reqItem);
			
			requestedItem.state = 7;
			requestedItem.stage = 'Request Cancelled';
			requestedItem.work_notes = 'Request canceled by user';
			requestedItem.update();
			var itemList = new GlideRecord('sc_req_item');
			itemList.addQuery('request',reqItem);
			itemList.query();
			if (itemList.getRowCount() < 2){
				var request = new GlideRecord('sc_request');
				request.get(requestedItem.request);
				request.stage = 'closed_incomplete';
				request.request_state = 'closed_cancelled';
				request.update();
				this.logger('Canceled Request: ' + request.number);
			}	else {
				this.logger('Cannot cancel parent request. Multiple RITMS on REQ:' + reqItem.request);
				return 'Cannot cancel parent request. Multiple RITMS on REQ:' + reqItem.request;
				
			}
			
			this.logger('Cancelled Requested Item: ' + requestedItem.number);
			
			
			
		} catch(err){
			gs.info('REQ ITEM Cancellation: ' + err);
			return "Failure" + err;
		}
		return "Success";
	},
	
	logger: function(msg){
		gs.info('Cancel RITM: ' + msg);
	},

	
    type: 'CancelRequest'
});