(function() {

    function getGuestUserID() {
        var userGr = new GlideRecord("sys_user");
        userGr.addQuery("user_name", "guest");
        userGr.query();
        return (userGr.next() ? userGr.sys_id + "" : "guest");
    }

    try {
        var propertyName = "glide.knowman.block_access_with_no_user_criteria";
        var userId = getGuestUserID();
        var propInitialValue = gs.getProperty(propertyName);
        if (propInitialValue == "true") {
            gs.setProperty(propertyName, "false"); //Explicitly setting the property value to false. This operation cause cache flush
        }
        var knowledgeBaseList = [];
        knowledgeBaseList = new global.KBDiagnosticsSNC().getDiagnosticsForUnauthenticatedUser(userId);
        if (knowledgeBaseList.length > 0)
            gs.info("This is the list of knowledge bases that have no user criteria defined or explicitly granting access to the Guest user. Please review their user criteria and make sure the configuration is intentional \n" + JSON.stringify(knowledgeBaseList));
        else
            gs.info("There are no knowledge bases accessible to unauthenticated users");
    } catch (e) {
        gs.info("exception caught" + JSON.stringify(e));
    } finally {
        if (propInitialValue == "true") 
            gs.setProperty(propertyName, propInitialValue); // Setting the value back to the initial value and this also triggers a cache flush
    }
})();
//Run during non-peak hours
