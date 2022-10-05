var chgList = ['CHG0125119','CHG0125085','CHG0124168','CHG0124165','CHG0124155','CHG0127697','CHG0123804','CHG0127607','CHG0127525','CHG0122205','CHG0122188','CHG0117788','CHG0127851','CHG0125877','CHG0125870','CHG0120672','CHG0120369','CHG0124034','CHG0126070','CHG0119378','CHG0119816','CHG0117673','CHG0128506','CHG0126399','CHG0125209','CHG0124592','CHG0124443','CHG0123531','CHG0123052','CHG0122815','CHG0122226','CHG0121349','CHG0121326','CHG0119569','CHG0127800','CHG0126607','CHG0118102','CHG0124979','CHG0124358','CHG0122547','CHG0122356','CHG0121919','CHG0121557','CHG0117490','CHG0122390','CHG0127212','CHG0125198','CHG0117769','CHG0117631','CHG0117061'];

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