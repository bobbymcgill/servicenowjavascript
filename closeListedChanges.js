var chgList = ['CHG0102344', 'CHG0104791', 'CHG0100639', 'CHG0093332', 'CHG0091462', 'CHG0084648', 'CHG0101751', 'CHG0071420', 'CHG0112612', 'CHG0112043', 'CHG0104670', 'CHG0104656', 'CHG0098763', 'CHG0098744', 'CHG0082730', 'CHG0082726', 'CHG0082711', 'CHG0063225', 'CHG0054376', 'CHG0086110', 'CHG0100863', 'CHG0100805', 'CHG0099322', 'CHG0114395', 'CHG0113367', 'CHG0112806', 'CHG0112723', 'CHG0110030', 'CHG0109497', 'CHG0120072'];

for (var x = 0; x < chgList.length; x++){
	var gr = new GlideRecord('change_request');
	gr.addQuery('number',chgList[x]);
	gr.query();
	while(gr.next()){
<<<<<<< HEAD
		//if (gr.state == '-3'){  //Only modifying changes in 'Authorize'
=======
//		if (gr.state == '-3'){  //Only modifying changes in 'Authorize'
>>>>>>> 768f0c34788f620e9fb068fec4c3f848cd80e956
			gs.print('Change: ' + gr.number + ' in Authorize. Checking for tasks.');
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
			
			gr.close_notes = 'The Change Owner has reviewed the Change and approved it for closure';
			gr.close_code = 'successful';
			gr.update(); //First update sets closure info
			gr.setWorkflow(false); // turn off business rules for the change to get past the Start Date and approvals
			gr.state = 3; // Set state to closed
			gr.update();
<<<<<<< HEAD
		/*} else {
			// If state is not in Authorize - print message and continue
			gs.print('Change: ' + gr.number + ' is in state: ' + gr.state + ' ' + gr.state.getDisplayValue());
		}
		*/
=======
//		} else {
//			// If state is not in Authorize - print message and continue
//			gs.print('Change: ' + gr.number + ' is in state: ' + gr.state + ' ' + gr.state.getDisplayValue());
//		}
>>>>>>> 768f0c34788f620e9fb068fec4c3f848cd80e956
	}
}