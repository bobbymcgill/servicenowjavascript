//Dot-walk user record to find Vice President they report to.

var user = new GlideRecord('sys_user');
var mgr = new GlideRecord('sys_user');
var vpTest = new GlideRecord('sys_user');
var count = 0;
var vpFound = false;
var title = '';
user.addEncodedQuery('active=true')
user.query();

while(user.next()){
	vpFound = false;
	mgr = user.manager;
	while (!vpFound && count < 10 && mgr != ''){ // dont go more than 10 levels
        count++;
		title = mgr.title.toLowerCase();
		//if (mgr.u_mck_grade == 'M6' || mgr.u_mck_grade == 'E1'){ //this only checks paygrade - but not reliable
		if (title.indexOf('vp') >= 0 || title.indexOf('svp') >= 0 || title.indexOf('vice pres') >= 0 || title.indexOf('avp') >=0 ){ //this checks title - more reliable
			user.u_vice_president = mgr;
			vpFound = true;
		} else {
            gs.print('Nex level - Current Manager = ' + mgr.last_name);
			test = mgr;  // magic shell game here - switcharoo
			mgr = mgr.manager; // its like Inception. Go another level deeper.
			vpFound = false;
		}
			
	}
    count = 0; //reset count
	user.update();

}