executeReset();
//this will execute the workflow reset with the error message and make the state as new
function executeReset() {
//     new Workflow().cancel(current);
//     new WorkflowApprovalUtils().cancelAll(current, comment);
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