//These are just 2 background scripts to fix initial load of USON users and managers.
//First script gets correct manager names in place - but doesn't seem to update the "u_is_manager" field.
//Might make this a daily job

var gr = new GlideRecord('sys_user');
gr.addEncodedQuery('user_nameLIKE@usoncology.com^manager.name!=NULL^manager.user_nameNOT LIKE@usoncology.com');
gr.query();
while(gr.next()){
	var mgr = new GlideRecord('sys_user');
	mgr.addQuery('first_name',gr.manager.first_name);
	mgr.addQuery('last_name',gr.manager.last_name);
	mgr.addEncodedQuery('user_nameLIKE@usoncology.com');
	mgr.query();
	while(mgr.next()){ 
		gr.manager = mgr.sys_id;
		mgr.u_ismanager = true;
		mgr.update(); //Originally had this outside the inner while - should work here.
	}
	gr.update();
	
}

// This script goes through and if a user has a manager listed - updates the "u_ismanager" checkbox on the manager record to "true"
//This allows them to be automatically put into the "approvers" list. 

var gr = new GlideRecord('sys_user');
gr.addEncodedQuery('user_nameLIKE@usoncology.com^manager.name!=NULL');
gr.query();
while(gr.next()){
	if (gr.manager.u_ismanager == false){
		var mgr = new GlideRecord('sys_user');
		mgr.get(gr.manager.sys_id);
		mgr.u_ismanager = true;
		mgr.update();
	}
}