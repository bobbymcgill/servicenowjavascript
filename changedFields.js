(function executeRule(current, previous /*null when async*/) {
    var gru = GlideScriptRecordUtil.get(current);
      gs.addErrorMessage(gru.getChangedFields());
})(current, previous);


/*  This is an alternate approach
// There is a custom dictoinary attribute for noting which fields in this table should create log entries when changed. Query for fields with that attribute.
var fieldsToAudit = [];
var fieldsGR = new GlideRecord('sys_dictionary');
fieldsGR.addQuery('name', current.getTableName()).addCondition('attributes', 'CONTAINS', 'u_create_change_log');
fieldsGR.query();
while (fieldsGR.next()){
            fieldsToAudit.push(fieldsGR.getValue('element'));
}
gs.debug('Fields to audit: ' + fieldsToAudit.toString());

// For every field that has this attribute, check to see if it changed, and if it did, create a log record.
for (i =0; i < fieldsToAudit.length; i++){
            // Create records in the logging table.
            // In order to detect a change in a field, you need to use the GlideElement representation of the field, which we don't have. At this point, all we have is a string field name like "number" or           "use_detail".
            // Fortunately, GlideRecord has a getElement method that will provide you the right object for the specified field name.
            var currentField = current.getElement(fieldName);
            var previousField = previous.getElement(fieldName);
            if (currentField.changes()){
                    gs.debug(fieldName + ' was changed. ');
                                // Create a record in the logging table.
                    } else {
                            gs.debug(fieldName + ' was not changed.');
                    }
}
*/