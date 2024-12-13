// Input variables
var userSysId = 'USER_SYS_ID_HERE'; // Replace with the actual sys_id of the user
var grantDateTime = '2024-12-14 12:00:00'; // Specify the exact date and time to grant the role (YYYY-MM-DD HH:mm:ss)
var removeDateTime = '2024-12-14 14:00:00'; // Specify the exact date and time to remove the role (YYYY-MM-DD HH:mm:ss)

// Function to schedule a job
function scheduleJob(jobName, scriptContent, executeAt) {
    var jobGr = new GlideRecord('sys_trigger');
    jobGr.initialize();
    jobGr.name = jobName;
    jobGr.script = scriptContent;
    var nextAction = new GlideDateTime(executeAt);
    jobGr.next_action = nextAction;
    jobGr.trigger_type = 0; // 0 = run once
    jobGr.insert();
    gs.print(jobName + ' scheduled for ' + executeAt);
}

// Schedule the role granting
var grantScript = `
    var userSysId = '${userSysId}';
    var roleGr = new GlideRecord('sys_user_role');
    if (roleGr.get('name', 'admin')) {
        var userRoleGr = new GlideRecord('sys_user_has_role');
        userRoleGr.initialize();
        userRoleGr.user = userSysId;
        userRoleGr.role = roleGr.sys_id;
        userRoleGr.granted_by = gs.getUserID();
        userRoleGr.insert();
        gs.print('Admin role granted to user: ' + userSysId);
    } else {
        gs.print('Admin role not found!');
    }
`;
scheduleJob('Grant Admin Role for ' + userSysId, grantScript, grantDateTime);

// Schedule the role removal
var removeScript = `
    var userSysId = '${userSysId}';
    var userRoleGr = new GlideRecord('sys_user_has_role');
    userRoleGr.addQuery('user', userSysId);
    userRoleGr.addQuery('role.name', 'admin');
    userRoleGr.query();
    if (userRoleGr.next()) {
        userRoleGr.deleteRecord();
        gs.print('Admin role removed from user: ' + userSysId);
    } else {
        gs.print('No admin role found for user: ' + userSysId);
    }
`;
scheduleJob('Remove Admin Role for ' + userSysId, removeScript, removeDateTime);