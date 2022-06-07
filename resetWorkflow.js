function executeReset(currentSysID, table) {
//Pass in sysID of record and table to reset
//This is code from the ChangeRequest "Reset" action
    var current = new GlideRecord(table);
    current.get(currentSysID);
	//new ChangeRequestStateHandler(current).disassociateApprovalsFromWorkflow();
    new WorkflowApprovalUtils().cancelAll(current, comment); 
    current.state = -5;
	current.start_date = '';
	current.end_date = '';
    current.work_notes = 'Change was reset';
    current.update();
    new Workflow().cancel(current); 
	new Workflow().restartWorkflow(current,true);
    action.setRedirectURL(current);
    gs.addInfoMessage("This Change Request has been reset to New state.");
}



/*https://support.servicenow.com/kb?id=kb_article_view&sysparm_article=KB0829929

new Workflow().cancel(current); 
new WorkflowApprovalUtils().cancelAll(current, comment); 
new Workflow().restartWorkflow(current);

*/

function executeReset(currentSysID, table) {
    //Pass in sysID of record and table to reset
    //This is code from the ChangeRequest "Reset" action
        var current = new GlideRecord(table);
        current.get(currentSysID);
        //new ChangeRequestStateHandler(current).disassociateApprovalsFromWorkflow();
        new WorkflowApprovalUtils().cancelAll(current); 
        current.state = -5;
        current.start_date = '';
        current.end_date = '';
        current.work_notes = 'Change was reset';
        current.update();
        new Workflow().deleteWorkflow(current); 
        new Workflow().restartWorkflow(current,true);
       // action.setRedirectURL(current);
       // gs.addInfoMessage("This Change Request has been reset to New state.");
    }
    executeReset('30576f7b87f3c9105bf020e9cebb35ec','change_request');