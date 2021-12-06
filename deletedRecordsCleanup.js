
var vDaysAgo = 45;
PurgeAuditDeletedRecords(vDaysAgo);

function PurgeAuditDeletedRecords(pDaysAgo) {
    
    // Set total number of records to delete and maximum size of each batch (recommend leaving this as 100)
    var pRecordsToDelete = parseInt(2000);
    var pBatchSize = parseInt(100);
    
    // Check table name and delta are set, generate encoded query, set up variables
    if (pDaysAgo) {
        var v_encoded_query = 'sys_created_onRELATIVELT@dayofweek@ago@' + pDaysAgo ;
        var pDeleteCount = parseInt(0);
        
        // Loop deleting records
        while (pDeleteCount < pRecordsToDelete) {

         // Check if we need to reduce pBatchSize
         if ((pDeleteCount + pBatchSize) > pRecordsToDelete) { pBatchSize = pRecordsToDelete - pDeleteCount }
         
         // Find records in sys_audit_delete
         var gr = new GlideRecord('sys_audit_delete');
         gr.addEncodedQuery(v_encoded_query);
         gr.setLimit(pBatchSize);         
         gr.query();
         
         // Exit if there are no records to delete
         if (gr.getRowCount() == 0) { break }
         
         // Increment delete counter
         pDeleteCount += parseInt(gr.getRowCount());
         
         // Build array of sys_audit_delete sys_ids to be removed
         var pTargetSysids = [];
         while (gr.next()) { pTargetSysids.push(gr.sys_id.toString()) }
                  
         // Delete referencing records from sys_audit_relation
         gr = new GlideRecord('sys_audit_relation');
         gr.addQuery('audit_delete', 'IN', pTargetSysids);
         gr.query();
         gr.deleteMultiple();
         
         // Delete records from sys_audit_delete
         gr = new GlideRecord('sys_audit_delete');
         gr.addQuery('sys_id', 'IN', pTargetSysids);
         gr.query();
         gr.deleteMultiple();
        
        }
        
        // Log work done         
        gs.log('Deleted ' + pDeleteCount + ' records for ' + pTableName + ' from sys_audit_delete (and related sys_audit_relation records)', 'PurgeAuditDeletedRecords');

    }
}