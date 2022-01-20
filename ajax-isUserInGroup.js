//Client Script - onLoad
function onLoad() {
    //Type appropriate comment here, and begin script below
     var ga = new GlideAjax('UserInGroup');
     ga.addParam('sysparm_name','checkGroups');
     ga.addParam('sysparm_groups', 'NETNCC,NETSUPP_VoIP');
     ga.addParam('sysparm_user', g_form.getValue('name'));
     ga.getXMLAnswer(groupCheck);
     
     function groupCheck(response){
         var answer = response;
         alert('User in Group? ' + answer);
     }
     
 }


// Server Side AJAX
// Name: UserInGroup
// API Name: global.UserInGroup
// Client-callable: checked

 var UserInGroup = Class.create();
UserInGroup.prototype = Object.extendsObject(AbstractAjaxProcessor, {
	checkGroups: function(){
		var userid = this.getParameter('sysparm_user');
		var groups = this.getParameter('sysparm_groups');
		gs.info('UserInGroup: SYSID = ' + userid);
		gs.info('UserInGroup: GroupList = ' + groups);
		
		var user = gs.getUser();
		var newUser = user.getUserByID(userid);
		
		var inGroup = 'false';
		var groupList = groups.split(',');
		gs.info('UserInGroup: Group List CSV: ' + groupList.toString());
		for(var x = 0; x < groupList.length; x++){
			gs.info('UserInGroup: Checking group membership for: ' + groupList[x]);
			if(newUser.isMemberOf(groupList[x])){
				inGroup = 'true';
			}
		}
		return inGroup;
	},
	
    type: 'UserInGroup'
});