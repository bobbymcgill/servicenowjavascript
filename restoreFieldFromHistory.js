var userGR = new GlideRecord('sys_user');
userGR.addQuery('sys_updated_by', 'svc.sailpoint-namck');
userGR.addQuery('phone', 'N/A');
userGR.query();

while (userGR.next()) {
    var userSysId = userGR.getUniqueValue();
    var currentPhone = userGR.getValue('phone');
    var restored = false;

    // Look for any previous value of the phone field in the audit log
    var auditGR = new GlideRecord('sys_audit');
    auditGR.addQuery('documentkey', userSysId);
    auditGR.addQuery('fieldname', 'phone');
    auditGR.orderByDesc('sys_created_on');
    auditGR.query();

    while (auditGR.next()) {
        var oldPhone = auditGR.getValue('oldvalue');

        // Restore first non-blank, non-N/A previous value
        if (oldPhone && oldPhone != 'N/A') {
            gs.info('Restoring phone for ' + userGR.getDisplayValue() + ' from N/A to: ' + oldPhone);
            userGR.setValue('phone', oldPhone);
            userGR.update();
            restored = true;
            break;
        }
    }

    // If no valid old phone number found, clear the field
    if (!restored) {
        gs.info('No valid phone history found for ' + userGR.getDisplayValue() + '. Clearing field.');
        userGR.setValue('phone', '');
        userGR.update();
    }
}