var jobName = ['OSAutomatedPatching','Weekly Pending Approvals Report']; // add more Scheduled Job names here to be disabled

for (x = 0; x < jobName.length; x++){
    var gr = new GlideRecord('sysauto');
	gr.addQuery('name',jobName[x]);
	gr.query();
	while(gr.next()){
		gs.info('Disabling Scheduled Job: ' + gr.name);
		gr.active = 'false';
		gr.update();
	}
}