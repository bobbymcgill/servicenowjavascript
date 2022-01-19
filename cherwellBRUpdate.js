gs.info('Cherwell BR Update Activated **********');

var utils = new CherwellUtils();
try{
var gru = GlideScriptRecordUtil.get(current);

} catch(err){
	gs.info('Cherwell BR Error: ' + err);
}
var changedFields = gru.getChangedFields(); //Get changed fields with friendly names
var changedValues = gru.getChanges(); //Get changed field values
//Convert to JavaScript Arrays
gs.include('j2js');
changedFields = j2js(changedFields);
changedValues = j2js(changedValues);
var jsonChanges = {};
for(var x=0; x < changedFields.length; x++){
	jsonChanges[changedFields[x]] = changedValues[x];

}

gs.info('Cherwell BR Update: ' + JSON.stringify(jsonChanges,null,4));
utils.updateChange(current.sys_id, jsonChanges);
