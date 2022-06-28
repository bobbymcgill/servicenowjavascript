var chgList = ['CHG0110976','CHG0112493','CHG0091662','CHG0089694','CHG0091479','CHG0097624','CHG0113390','CHG0099076','CHG0110129','CHG0110132','CHG0112485','CHG0095616','CHG0113297','CHG0113700','CHG0103745','CHG0113704','CHG0113700','CHG0105943','CHG0105089','CHG0105091','CHG0111546','CHG0099822','CHG0095238','CHG0101383','CHG0101387','CHG0102188','CHG0105305','CHG0106805','CHG0107102','CHG0114404','CHG0104111','CHG0072624','CHG0109992','CHG0078027','CHG0079183','CHG0079189','CHG0082426','CHG0083013','CHG0084673','CHG0085787','CHG0085788','CHG0085796','CHG0085889','CHG0086083','CHG0086960','CHG0086979','CHG0091448','CHG0092380','CHG0092772','CHG0092799','CHG0092973','CHG0094874','CHG0099140','CHG0101198','CHG0102217','CHG0104119','CHG0104417','CHG0104851','CHG0106169','CHG0106944','CHG0108907','CHG0109062','CHG0110628','CHG0110924','CHG0112892','CHG0089110','CHG0090736','CHG0092947','CHG0098161','CHG0058171','CHG0098881','CHG0102860','CHG0104914','CHG0106334','CHG0098638','CHG0099254','CHG0115776','CHG0090382','CHG0093761','CHG0094015','CHG0094195','CHG0094902','CHG0096665','CHG0104160','CHG0108296','CHG0111208','CHG0112194','CHG0113164','CHG0114113','CHG0091317','CHG0100169','CHG0113526','CHG0110918','CHG0101145','CHG0102345','CHG0103661','CHG0105749','CHG0096716','CHG0098206','CHG0099408','CHG0112830','CHG0112944','CHG0108567','CHG0107692','CHG0106592','CHG0104703','CHG0104377','CHG0104139','CHG0102920','CHG0102451','CHG0101390','CHG0101180','CHG0100741','CHG0098085','CHG0097872','CHG0097805','CHG0097473','CHG0089055','CHG0092257','CHG0116560'];

for (var x = 0; x < chgList.length; x++){
	var gr = new GlideRecord('change_request');
	gr.addQuery('number',chgList[x]);
	gr.query();
	while(gr.next()){
		if (gr.state == '-3'){  //Only modifying changes in 'Authorize'
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
		} else {
			// If state is not in Authorize - print message and continue
			gs.print('Change: ' + gr.number + ' is in state: ' + gr.state + ' ' + gr.state.getDisplayValue());
		}
	}
}