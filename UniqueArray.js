
function getUser(email){
    var user = new GlideRecord('sys_user');
    if(user.get('email',email)){
        return user.sys_id;
    } else{
        return 0;
    }
}

var arrUtil = new ArrayUtil();
var uniqueNames = [];
var certs = new GlideRecord('u_certifications');
certs.query();
var count = 0;
while(certs.next()){
    if(arrUtil.contains(uniqueNames,certs.u_email)){
        count += 1;
    } else{
        uniqueNames.push(certs.u_email.toString());

    }
    
}

for (var x=0; x < uniqueNames.length; x++){
    var userID = getUser(uniqueNames[x]);
    var combinedText = '';
    var gr = new GlideRecord('u_certifications');
    gr.addQuery('u_email',uniqueNames[x]);
    gr.query();
    while(gr.next()){
        combinedText += gr.u_individual;
        combinedText += '------\n';
    }
    var newRec = new GlideRecord('u_certifications');
    newRec.initialize();
    newRec.u_user = userID;
    newRec.u_combined = combinedText;
    newRec.u_email = uniqueNames[x];
    newRec.insert();
}
