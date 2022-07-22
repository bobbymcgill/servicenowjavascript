var UserUtils = Class.create();
UserUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	updateRecs: function(qryStr, table, field, newVal){
	// Generic utility for moving records related to user to new user
	// qryStr = Encoded query with sysID of OLD/Inactivated User in appropriate field
	// table = whatever table contains the record for the query
	// field = the field name containing the reference (requested_for, manager, owner, etc)
	// newVal = sys_id of the desired active user account
	var gr = new GlideRecord(table);
	gr.addEncodedQuery(qryStr);
	gr.query();
	while(gr.next()){
		gr.field = newVal;
		gr.update();
	}
},

lastLoginActive: function(sysid1, sysid2){
	//Use last login time to determine which record to keep active
	//If both times are blank, and one user_name has "mckesson.com" -
	//	call the mckesson one inactive and return the other one.
	var gr1 = new GlideRecord('sys_user');
	var gr2 = new GlideRecord('sys_user');
	try{
        gr1.get(sysid1);
        gr2.get(sysid2);
        var lastLogin1 = new GlideDateTime(gr1.getValue('last_login_time'));
        var lastLogin2 = new GlideDateTime(gr2.getValue('last_login_time'));
        var compare = lastLogin1.compareTo(lastLogin2);
        if( (lastLogin1 == '' && lastLogin2 == '') || compare == 0){
            if (gr1.user_name.indexOf('@mckesson.com') > -1){
                return sysid2;
            } else {
                return sysid1;
            }
        }
    
        if (compare == 1){
            return sysid1;
        } else {
            return sysid2;
        }
    } catch(err){
        this.logger('Last Login Active Error: ' + err);
    }
	
},
	
logger: function(msg){
	gs.info('UserUtils Log: ' + msg);
},


    type: 'UserUtils'
});