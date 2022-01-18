gs.info("Cherwell Business Rule Test: Business Rule Triggered");
//Display an information message for each change to the record

try{
var gru = GlideScriptRecordUtil.get(current);
var changedFields = gru.getChangedFields(); //Get changed fields with friendly names
var changedValues = gru.getChanges(); //Get changed field values
//gs.info("Cherwell BR Test: " + changedFields.toString());
//gs.info("Cherwell BR Test: " + changedValues.toString());

	

//Convert to JavaScript Arrays
gs.include('j2js');
changedFields = j2js(changedFields);
changedValues = j2js(changedValues);
var jsonChanges = {};
for(var x=0; x < changedFields.length; x++){
	jsonChanges[changedFields[x]] = changedValues[x];
	
}
gs.info("Cherwell BR Test: JSON Object" + JSON.stringify(jsonChanges));

/*
//Process the changed fields
for(var i = 0; i < changedValues.length; i++){
   var val = changedValues[i];
   if(val.getED().getType() == -1 && val.getJournalEntry(1)){
      //Print out last journal entry for journal fields
      gs.info("Cherwell BR Test: " + val.getJournalEntry(1));
   }
   else{
      //Print out changed field and value for everything else
      gs.info("Cherwell BR Test: " + changedFields[i] + ': ' + val.getDisplayValue());
   }
}*/
} catch(err){
	gs.info("Cherwell BR Test: " + err);
}
