//Dot-walk user record to find Vice President they report to.

var user = new GlideRecord('sys_user');
var mgr = new GlideRecord('sys_user');
var vpTest = new GlideRecord('sys_user');
var count = 0;
var vpFound = false;
user.addEncodedQuery('active=true^user_nameLIKEmckesson.com')
user.query();

while(user.next()){
	vpFound = false;
	mgr = user.manager;
	while (!vpFound && count < 10){ // dont go more than 10 levels
        count++;
		if (mgr.u_mck_grade == 'M6' || mgr.u_mck_grade == 'E1'){
			user.u_vice_president = mgr;
			vpFound = true;
		} else {
            gs.print('Nex level - Current Manager = ' + mgr.last_name);
			test = mgr;  // magic shell game here - switcharoo
			mgr = mgr.manager; // its like Inception. Go another level deeper.
		}
			
	}
    count = 0; //reset count
	user.update();

}