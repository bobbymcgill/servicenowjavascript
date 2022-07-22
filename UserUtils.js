var UserUtils = Class.create();
UserUtils.prototype = Object.extendsObject(AbstractAjaxProcessor, {
    updateRecs: function(qryStr, table, field, newVal) {
        // Generic utility for moving records related to user to new user
        // qryStr = Encoded query with sysID of OLD/Inactivated User in appropriate field
        // table = whatever table contains the record for the query
        // field = the field name containing the reference (requested_for, manager, owner, etc)
        // newVal = sys_id of the desired active user account
        var gr = new GlideRecord(table);
        gr.addEncodedQuery(qryStr);
        gr.query();
        while (gr.next()) {
			gr[field] = newVal;
            gr.update();
        }
    },

    lastLoginActive: function(sysid1, sysid2) {
        //Use last login time to determine which record to keep active
        //If both times are blank, and one user_name has "mckesson.com" -
        //	call the mckesson one inactive and return the other one.
        var gr1 = new GlideRecord('sys_user');
        var gr2 = new GlideRecord('sys_user');
        try {
            gr1.get(sysid1);
            gr2.get(sysid2);
            var lastLogin1 = new GlideDateTime(gr1.getValue('last_login_time'));
            var lastLogin2 = new GlideDateTime(gr2.getValue('last_login_time'));
            var compare = lastLogin1.compareTo(lastLogin2);
            if ((lastLogin1 == '' && lastLogin2 == '') || compare == 0) {
                if (gr1.user_name.indexOf('@mckesson.com') > -1) {
                    return sysid2;
                } else {
                    return sysid1;
                }
            }

            if (compare == 1) {
                return sysid1;
            } else {
                return sysid2;
            }
        } catch (err) {
            this.logger('Last Login Active Error: ' + err);
        }

    },

    dupeUsers: function() {
        // Returns a list of Employee ID's for any active users that have more than one account
        // This can be used in Reports or List views on users with condition: 
        //      'employee_number', 'isOneOf', 'javascript: new UserUtils().dupeUsers();'
        // Then report/list can be grouped by "Employee ID" to see all accounts for that user.

        // NOTE: This ignores @mckesson.eu users since they have a different system - unless they also have a @mckesson.com account

        var qryStr = 'active=true^employee_number!=NULL';

        var str = [];
        var gr = new GlideAggregate('sys_user'); //Using Aggregate because of the neat "count" feature
        gr.addEncodedQuery(qryStr); // only want active users with employee numbers
        gr.addAggregate('COUNT', 'employee_number'); // going to be counting based on employee number
        gr.groupBy('employee_number'); //cool - groupBy
        gr.addHaving('COUNT', '>', 1); // only if one or more accounts
        gr.query();
        this.logger('Records returned for duplicate users: ' + gr.getRowCount());
        while (gr.next()) {
            //gs.print(gr.employee_number);
            str.push(gr.getValue('employee_number')); //add the employee number to the list.
        }
        return str.toString();
        //gs.print(str.toString());

    },
	
	updateGroups: function(oldID, newID) { 
		// oldID should be inactive record, newID should be active record
		// sys_user_grmember has ACLs disallowing direct edits - so we can't use previsously defined function- we must first delete the record, then create a new record
		var qry = 'user=' + oldID;
		this.logger('group query = ' + qry);
		var grplist = new GlideRecord('sys_user_grmember');
		grplist.addQuery('user',oldID);
		grplist.query();
		while(grplist.next()){
			var newGrp = new GlideRecord('sys_user_grmember');
			newGrp.initialize();
			newGrp.group = grplist.group;
			newGrp.user = newID;
			newGrp.insert();
			grplist.deleteRecord();
		}
		
	},
	
    logger: function(msg) {
        gs.info('UserUtils Log: ' + msg);
    },



    type: 'UserUtils'
});