var arrUtil = new ArrayUtil();
var uniqueNames = [];
var certs = new GlideRecord('u_certifications');
certs.query();
var count = 0;
while(certs.next()){
    if(arrUtil.contains(uniqueNames,certs.u_user)){
        count += 1;
    } else{
		if (certs.u_user == ''){
			count +=1;
		} else{
		    uniqueNames.push(certs.u_user.toString());
		}
    }
    
}

for (var x=0; x < uniqueNames.length; x++){
    var userID = uniqueNames[x];
    var combinedText = '';
    var gr = new GlideRecord('u_certifications');
	var userRec = new GlideRecord('sys_user');
	userRec.get(userID);
    gr.addQuery('u_user.sys_id',userID);
    gr.query();
    while(gr.next()){
        combinedText += gr.u_individual;
        combinedText += '\n------\n';
    }
    var newRec = new GlideRecord('u_certifications');
    
	newRec.initialize();
    newRec.u_combined = combinedText;
	newRec.u_user = userRec.sys_id;
	newRec.u_email = userRec.email;
	newRec.u_name_text = userRec.name;
    newRec.insert();
	
}


