// Querying the task_cmdb_ci_service table to find the related Service CIs to the change
var taskGR = new GlideRecord('task_cmdb_ci_service');
//var fieldName = 'number';
//taskGR.addQuery('task.number', 'CHG0074936');
taskGR.addQuery('task.number', current.number);
taskGR.query();
gs.log('This is the Related CIs: ' + taskGR.getRowCount());
//gs.log('This is the change number: ' + current.getValue(fieldName));

// creating the variables and initiating the arrays that I will be using
var list_of_CIs = '';
var arrayofCIs = [];
var sendArrayOfCIs = []; // this array will be converted to string and set/sent to the Event

while (taskGR.next()) {
  //var foundCI = taskGR.cmdb_ci_service.name;
  // gs.log('I found a CI : ' + foundCI);
  arrayofCIs.push('^ORnameSTARTSWITH' + taskGR.cmdb_ci_service.name);
  sendArrayOfCIs.push(taskGR.cmdb_ci_service.name);
}
list_of_CIs = sendArrayOfCIs.toString();
gs.log('This is the array of CiS: ' + sendArrayOfCIs);


  //Below I am just creating the Encoded Query String to use in the second GR
  var encodedQuery = arrayofCIs.toString();
  encodedQuery = encodedQuery + '^company=68081e3fdbcad8507e4160fdd39619db';
  encodedQuery = encodedQuery.replace(/,/g, '');
  encodedQuery = encodedQuery.substring(3); // removing the first three chars of the encodedQuery

  gs.log('This is the encoded query: ' + encodedQuery);
  // gs.log(list_of_CIs);

  if (encodedQuery.startsWith('mpany')) {
  gs.log('No European Service CIs found for this Change');
} else {
  // Second GR. Based on the list of Service CIs attached to the Change, I am trying to find out what CIs belong to McKesson Europe
  var cmdbGR = new GlideRecord('cmdb_ci_service');
  cmdbGR.addEncodedQuery(encodedQuery);
  cmdbGR.query();
  var numberOfCIs = cmdbGR.getRowCount(); // Count of CIs that belong to Europe
}
//gs.log(list_of_CIs);
if (numberOfCIs > 0) {
  // If the CI Count is > 0, send to event queue the event trigger_email_to_Cherwell_On_Asess to send the notification
  var eventParameter1 = sendArrayOfCIs.toString();
  //current.setValue('test_plan', sendArrayOfCIs.toString());
  gs.log('For this Change I found this number of CIS:' + numberOfCIs);
  gs.eventQueue('trigger_email_to_Cherwell_On_Asess', current, eventParameter1);
}

//End
