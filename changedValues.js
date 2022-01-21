gs.info('Cherwell BR Update Activated **********');

try{
var gru = GlideScriptRecordUtil.get(current);

} catch(err){
	gs.info('Cherwell BR Error: ' + err);
}
var changedFieldNames = gru.getChangedFieldNames(); // Get changed fields with database names
var changedFields = gru.getChangedFields();//Get changed fields with friendly names
var changedValues = gru.getChanges(); //Get changed field values
//Convert to JavaScript Arrays
gs.include('j2js');
changedFields = j2js(changedFields).sort();
changedFieldNames = j2js(changedFieldNames).sort();
changedValues = j2js(changedValues).sort();

gs.info('CherWell BR Test: ===== Fields = ' + changedFields.toString());
var ignore = 'false';
var jsonChanges = {};
jsonChanges['Change Request'] = current.number.getDisplayValue();
jsonChanges['SysID'] = current.sys_id.toString();

try{
	for(var x=0; x < changedFields.length; x++){
		var val = changedValues[x];
		var fieldName = changedFields[x].getED.getName();
		if(val.getED().getType() == -1 && val.getJournalEntry(1)){
			jsonChanges['Work Notes'] = val.getJournalEntry(1);
		} else if(changedFields[x] == 'Conflict last run'){
			ignore = 'true';
		}
		else {
			gs.info('CherWell BR Test: Field Name - ' + fieldName);
			jsonChanges[changedFields[x]] = current[changedFieldNames[x]].getDisplayValue();
		}
	}
} catch(err){
	gs.info('CherWell BR Test: JSON Build Error ' + err);
}
gs.info("Cherwell BR Test: JSON Object" + JSON.stringify(jsonChanges));

try{
	if (ignore == 'false'){
		gs.info('Cherwell calling Script Include');
		var z = new CherwellUtilities();
		z.updateChange(current.sys_id, jsonChanges);
	}
} catch(err){
	gs.info('Cherwell BR Error: ' + err);
}