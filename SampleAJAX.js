*/
==============================
1. onChange Client Script with GlideAjax
==============================

Client Script (Type: onChange, Field: priority):
/*
function onChange(control, oldValue, newValue, isLoading) {
  if (isLoading || newValue !== '1') {
    return;
  }

  var ga = new GlideAjax('GetAssignmentGroupManager');
  ga.addParam('sysparm_name', 'getManager');
  ga.addParam('sysparm_group_id', g_form.getValue('assignment_group'));
  ga.getXMLAnswer(function(response) {
    var managerName = response;
    g_form.showFieldMsg('priority', 'Group Manager: ' + managerName, 'info');
    // Or: g_form.setValue('u_manager', managerName);
  });
}

*/
---

Script Include (Name: GetAssignmentGroupManager, Client Callable: true):
/*
var GetAssignmentGroupManager = Class.create();
GetAssignmentGroupManager.prototype = Object.extendsObject(AbstractAjaxProcessor, {
  getManager: function() {
    var groupId = this.getParameter('sysparm_group_id');
    var grp = new GlideRecord('sys_user_group');
    if (grp.get(groupId)) {
      var mgr = grp.getValue('manager');
      var user = new GlideRecord('sys_user');
      if (user.get(mgr)) {
        return user.getDisplayValue();
      }
    }
    return 'Not found';
  }
});

==============================
2. Business Rule Triggering a REST Call
==============================

Business Rule: After Update on Incident
Conditions: state == 6 (Resolved) AND work_notes.changes()

(function executeRule(current, previous /*null when async*/) {
  var restMessage = new sn_ws.RESTMessageV2();
  restMessage.setEndpoint('https://api.example.com/incidents'); // Replace with your endpoint
  restMessage.setHttpMethod('post');
  restMessage.setRequestHeader("Content-Type", "application/json");

  var payload = {
    number: current.number.toString(),
    short_description: current.short_description.toString(),
    resolved_by: gs.getUserDisplayName(),
    work_notes: current.work_notes.getJournalEntry(1),
    closed_at: current.closed_at.toString()
  };

  restMessage.setRequestBody(JSON.stringify(payload));

  try {
    var response = restMessage.execute();
    var responseBody = response.getBody();
    var httpStatus = response.getStatusCode();
    gs.info('REST Response (' + httpStatus + '): ' + responseBody);
  } catch (ex) {
    gs.error('REST call failed: ' + ex.message);
  }
})(current, previous);