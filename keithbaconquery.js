var demoGlide = new GlideRecord('sc_req_item’);
//demoGlide.addQuery ('number','=','REQ0013456');
demoGlide.addEncodedQuery(' stateIN-5,1,2^cat_item=b1e7967f1b8b0cd0a3faddbcdd4bcb13^cmdb_ciISEMPTY'); // the number=RITM0057464 will only return one record
// If you only expect one record - you could use the specific query with .get() 
demoGlide.query();
 
gs.info(demoGlide.getRowCount());
 
while (demoGlide.next())
{ 
    //gs.info(demoGlide.number);
    var cmdbCI = new GlideRecord("cmdb_ci_computer");
    cmdbCI.addQuery("serial_number", "LIKE", demoGlide.variables.serial_number);  //removed "asset_" prefix from variable name
    cmdbCI.query();
    //gs.info(cmdbCI.getRowCount());
    while(cmdbCI.next()) // Changed "if" to "while". If you are only expecting ONE record result - you can use a .get() with the "if"
    {
    
        var ci_sys_id = cmdbCI.sys_id; // Get the ci sysid here
        //gs.print (cmdbCI.name.getDisplayValue());
        //gs.print (demoGlide.configuration_item.getDisplayValue());
        gs.print(ci_sys_id); // Printing the sys_id
        demoGlide.setWorkflow(false);
        demoGlide.cmdb_ci = ci_sys_id;
        demoGlide.configuration_item = ci_sys_id;
        demoGlide.update(); 

    }
}
