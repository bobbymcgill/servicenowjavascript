//This Script Include Used For Validating The Request Attributes For Inbound Integration To Change Table.

var InboundChangeUtil = Class.create();
InboundChangeUtil.prototype = {
    initialize: function() {
    },
	getUser: function(value) {
        if (value) {
            //Query User table with user_name ,return sys_id if macth found
            var gr = new GlideRecord('sys_user');
            gr.addQuery('user_name', value);
            gr.addQuery('active', true); //check user is active
            gr.query();
            if (gr.next()) {
                return gr.getUniqueValue();
            }
            //Query User table with u_mck_username ,return sys_id if match found
            var gr1 = new GlideRecord('sys_user');
            gr1.addQuery('u_mck_username', value);
            gr1.addQuery('active', true); //check user is active
            gr1.query();
            if (gr1.next()) {
                return gr1.getUniqueValue();
            }
            //Query User table with name ,return sys_id if match found
            var gr2 = new GlideRecord('sys_user');
            gr2.addQuery('name', value); //check user is active
            gr2.addQuery('active', true);
            gr2.query();
            if (gr2.next()) {
                return gr2.getUniqueValue();
            }

            //Query User table with sys_id ,return sys_id if match found
            var gr3 = new GlideRecord('sys_user');
            gr3.addQuery('sys_id', value); //check user is active
            gr3.addQuery('active', true);
            gr3.query();
            if (gr3.next()) {
                return gr3.getUniqueValue();
            }

            return ""; //Return empty string if match not found

        } else
            return "";
    },
    returnCI: function(name) {
        if (name) {
            var compci = new GlideRecord('cmdb_ci_computer'); //Query on computers
            compci.addQuery('name', name);
            compci.query();
            if (compci.next())
                return compci.getUniqueValue(); //if matched return sysid
            return ""; //if no match found return empty string
        } else return "";
    },
    returnService: function(value) {
        if (value) {
            // Query on Service table with name,return sys_id if match found
            var service = new GlideRecord('cmdb_ci_service');
            service.addQuery('name', value);
            service.query();
            if (service.next())
                return service.getUniqueValue();
            // Query on Service table with number,return sys_id if match found
            var service1 = new GlideRecord('cmdb_ci_service');
            service1.addQuery('number', value);
            service1.query();
            if (service1.next())
                return service1.getUniqueValue();

            // Query on Service table with sys_id,return sys_id if match found
            var service2 = new GlideRecord('cmdb_ci_service');
            service2.addQuery('sys_id', value);
            service2.query();
            if (service2.next())
                return service2.getUniqueValue();

            return "";
        } else return ""; //else return empty string
    },
    getAssGrp: function(value) {
        if (value) {
            // Query on Group table with name,return sys_id if match found
            var gr = new GlideRecord('sys_user_group');
            gr.addQuery('name', value);
            gr.query();
            if (gr.next())
                return gr.getUniqueValue();

            var gr1 = new GlideRecord('sys_user_group');
            gr1.addQuery('sys_id', value);
            gr1.query();
            if (gr1.next())
                return gr1.getUniqueValue();


            return "";

        } else return ""; //else return empty string
    },
	getCloseCode: function(value) {
        if (value) {
            // Query on Choice table with value,return value if match found
            var gr = new GlideRecord('sys_choice');
            gr.addEncodedQuery('name=change_request^element=close_code^inactive=false^value=' + value);
            gr.query();
            if (gr.next()) {
                return gr.value;
            } else {
                return "";
            }
        } else return ""; //else return empty string

    },
	getCategory: function(value) {
        if (value) {
            // Query on Choice table with value,return value if match found
            var gr = new GlideRecord('sys_choice');
            gr.addEncodedQuery('name=change_request^element=category^inactive=false^value=' + value);
            gr.query();
            if (gr.next()) {
                return gr.value;
            } else {
                return "";
            }
        } else return ""; //else return empty string
    },
	getState: function(value) {
        if (value) {
            // Query on Choice table with value,return value if match found
            var gr = new GlideRecord('sys_choice');
            gr.addEncodedQuery('name=change_request^element=state^inactive=false^value=' + value);
            gr.query();
            if (gr.next()) {
                return gr.value;
            }
            // Query on Choice table with label,return value if match found
            var gr1 = new GlideRecord('sys_choice');
            gr1.addEncodedQuery('name=change_request^element=state^inactive=false^label=' + value);
            gr1.query();
            if (gr1.next()) {
                return gr1.value;
            }

            return "";
        } else return ""; //else return empty string
    },
	getRisk: function(value) {
        if (value) {
            // Query on Choice table with value,return sys_id if match found
            var gr = new GlideRecord('sys_choice');
            gr.addEncodedQuery('name=change_request^element=risk^inactive=false^value=' + value);
            gr.query();
            if (gr.next()) {
                return gr.value;
            }
            // Query on Choice table with label,return sys_id if match found
            var gr1 = new GlideRecord('sys_choice');
            gr1.addEncodedQuery('name=change_request^element=risk^inactive=false^label=' + value);
            gr1.query();
            if (gr1.next()) {
                return gr1.value;
            }

            return "";
        } else return ""; //else return empty string
    },
	getImpact: function(value) {
        if (value) {
            // Query on Choice table with value,return sys_id if match found
            var gr = new GlideRecord('sys_choice');
            gr.addEncodedQuery('name=change_request^element=impact^inactive=false^value=' + value);
            gr.query();
            if (gr.next()) {
                return gr.value;
            }
            // Query on Choice table with label,return sys_id if match found
            var gr1 = new GlideRecord('sys_choice');
            gr1.addEncodedQuery('name=change_request^element=impact^inactive=false^label=' + value);
            gr1.query();
            if (gr1.next()) {
                return gr1.value;
            }

            return "";
        } else return ""; //else return empty string
    },
	
    type: 'InboundChangeUtil'
};