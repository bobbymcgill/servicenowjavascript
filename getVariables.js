function getVariables(reqItemNum){
	var gr = new GlideRecord('sc_req_item');
	gr.get('number',reqItemNum);

	gs.info('Cat Item: ' + gr.cat_item.getDisplayValue());
	gs.info('Requested For: ' + gr.request.requested_for.getDisplayValue());
	//gs.info('gr SysID: ' + gr.sys_id);
	gs.info('');
	var variables = new GlideRecord('sc_item_option_mtom');
	variables.addQuery('request_item',gr.sys_id);
	variables.query();
	while(variables.next()){
		//gs.info('sc_item_option: ' + variables.sc_item_option);
		var varVal = new GlideRecord('sc_item_option');
		varVal.get(variables.sc_item_option);
		var varType = varVal.item_option_new.type.getDisplayValue();
		if((varVal.value != '') && (varType != 'Reference') && (varType != 'Requested For') && (varType != 'List Collector')){
			gs.info('--Variable: ' + varVal.item_option_new.getDisplayValue());
			gs.info('---Value: ' + varVal.value.getDisplayValue());
			gs.info('---Type: ' + varType);
			gs.info('---SysID: ' + varVal.sys_id.toString());
			//gs.info('---Field Type: ' + varVal.item_option_new.type.getDisplayValue());
			gs.info('');
		}
	}
}

getVariables('RITM0057908');