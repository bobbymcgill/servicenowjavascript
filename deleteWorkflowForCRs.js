var wf = new GlideRecord('wf_context');
wf.addEncodedQuery('workflow_version.sys_id=caae9242877dcd901fb80d47cebb3568^state=executing'); //This is the PROD workflow to detach
//wf.addEncodedQuery('workflow_version=a55c7d0587d54d501fb80d47cebb353f^state=executing'); //This is the workflow in TEST to detach
wf.query();
while(wf.next()){
	var chg = new GlideRecord('change_request');
	chg.get(wf.id);
	gs.print('Change Num: ' + chg.number + '   State: ' + chg.state.getDisplayValue());
	var wkfw = new Workflow();
	wkfw.deleteWorkflow(chg);
	chg.work_notes = 'Attaching new workflow version';
	chg.state = -5;
	chg.update();
}