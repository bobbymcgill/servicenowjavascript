var chgList = ['CHG0031792','CHG0030739'];

for (var x = 0; x < chgList.length; x++){
	var gr = new GlideRecord('change_request');
	gr.addQuery('number',chgList[x]);
	gr.query();
	while(gr.next()){
			var ctask = new GlideRecord('change_task'); //Checking for open Change Tasks.
			ctask.addQuery('change_request',gr.sys_id);
			ctask.query();
			if (ctask.getRowCount > 0){ // check if any Change Tasks
				while (ctask.next()){
					gs.print('Change: ' + gr.number + ' has task: ' + ctask.number);
					if (ctask.state == '1' || ctask.state == '2' || ctask.state == '-5'){ 
					ctask.state = 3; //close Open(1), InProgress(2), or Pending(-5) tasks
					ctask.update();
					}
				}
			} else {
				gs.print('---No tasks found');
			}
			
			// Cancel any approvals in "requested" state
			var approval = new GlideRecord('sysapproval_approver');
			approval.addQuery('state','requested');
			approval.addQuery('sysapproval',gr.sys_id);
			approval.query();
			while(approval.next()){
				approval.setWorkflow(false);
				approval.state = 'not_required';
				approval.update();
			}
			
			
			gr.close_notes = 'The Change Owner has reviewed the Change and approved it for closure';
			gr.close_code = 'successful';
			gr.update(); //First update sets closure info
			gr.setWorkflow(false); // turn off business rules for the change to get past the Start Date and approvals
			gr.state = 3; // Set state to closed
			gr.active = 'false';
			gr.update();

	}
}