var set = new GlideappVariablePoolQuestionSet();
//set.setRequestID(item.sys_id);
set.setRequestID('7d9f4317dbf6fc904ada18df4b96194b');
set.load();
var vs = set.getFlatQuestions();
for (var i=0; i < vs.size(); i++) {
var varItem = vs.get(i);
    if(varItem.getLabel() != ''/* && varItem.isVisibleSummary()*/) {
        template.print("<tr><td>" +   varItem.getLabel() +varItem.isVisibleSummary() +   "</td><td>" + varItem.getDisplayValue() + "</td></tr>");   
   }
}