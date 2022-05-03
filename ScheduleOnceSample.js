// This sample is a script on a record producer/catalog item that runs after the onSubmit.
// Technically runs on the server to schedule a job to run as "system" user. 
// This particular script allows records to be updated no matter what roles the user has, and will add worknotes
// as "system" with the username who completed the form.

function script(change, userid, chk, just){ 
    //All variables must be passed to the script because no parsing is done.
    //The variables passed to the script become strings
	var changeNum = change;
	var chkEsc =  chk;
	var escJust = just;

	gs.info('ELT: User: ' + userid);
    gs.info('ELT: Change: ' + change);
	gs.info('ELT: Check: ' + chk);
	gs.info('ELT: Just: ' + just);

	var gr = new GlideRecord('change_request');
	gr.addQuery('number', changeNum );
	gr.query();
	while(gr.next()){
		gr.u_elt_escalation =  chkEsc  ;
		gr.u_elt_justification = escJust;
		gr.work_notes = 'ELT Escalation information updated by: ' + userid;
        gs.info('ELT: Work Notes: ' + gr.work_notes);
		gr.update();
		
	}
	gs.info('ELT: UserID: ' + user.name + ' chkEsc = ' + chkEsc + ' escJust = '+ escJust );
}

//Defining the variables passed to the script 
var so = new ScheduleOnce();
var change = producer.u_change; // This is from a record producer
var userid = gs.getUserName();


var escalateChk = producer.chk_escalate;
var escalateJust = producer.escalate_justification;
gs.info('BNM: Variables for script: change- ' + change + ' -- Username: ' + userid + ' --Check: ' + escalateChk + ' --Just: ' + escalateJust);

// This is the actual call to create the ScheduleOnce job. We are basically creating a string from all the variables
so.script = '('+script+')("'+change+'","'+userid+'","'+escalateChk+'","'+escalateJust+'");';
gs.info('BNM: ' + so.script); //This will show a text representation of the script that will run

// This creates the job that will run immediately
so.schedule();

// Redirect the user after script runs
gs.addInfoMessage('Successfully submitted ELT Escalation Info');
producer.portal_redirect = "/sp?id=ec_dashboard";