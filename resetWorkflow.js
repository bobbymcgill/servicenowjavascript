function executeReset(currentSysID, table) {
//Pass in sysID of record and table to reset
//This is code from the ChangeRequest "Reset" action
    var current = new GlideRecord(table);
    current.get(currentSysID);
	new ChangeRequestStateHandler(current).disassociateApprovalsFromWorkflow();
    current.state = -5;
	current.start_date = '';
	current.end_date = '';
    current.work_notes = 'Change was reset';
    current.update();
	new Workflow().restartWorkflow(current,true);
    action.setRedirectURL(current);
    gs.addInfoMessage("This Change Request has been reset to New state.");
}