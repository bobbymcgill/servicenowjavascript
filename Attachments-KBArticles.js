var qryString = "sys_created_by=Matthew.Stewart@McKesson.com^content_typeINapplication/x-dosexec,application/zip,application/x-iso9660-image";

var arr = [];
var grAttach = new GlideRecord('sys_attachment');
grAttach.addEncodedQuery(qryString);

//grAttach.setLimit(10);
grAttach.query();
gs.print(grAttach.getRowCount());
//var x = 0;


while(grAttach.next()){
    //gs.print(grAttach.table_sys_id);
	var grKB = new GlideRecord('kb_knowledge');
	grKB.get(grAttach.getValue('table_sys_id'));
    //gs.print(grKB.number);
	arr.push(grKB.getValue('number'));
    //x++;
}

//gs.print(arr);
var arrayUtil = new ArrayUtil(); 

arr = arrayUtil.unique(arr);
gs.print(arr);
