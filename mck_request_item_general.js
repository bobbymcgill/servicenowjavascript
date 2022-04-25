(function runMailScript( /* GlideRecord */ current, /* TemplatePrinter */ template,
    /* Optional EmailOutbound */
    email, /* Optional GlideRecord */ email_action,
    /* Optional GlideRecord */
    event) {

    //var table = current.getValue("source_table");
	var table = 'sc_req_item';
	template.print('<p>Service Catalog Task </p>');
    template.print('<p></p>');
	var ticket = current.sys_id;
	

    var gr = new GlideRecord(table);
    gr.addQuery('sys_id', ticket);
    gr.query();
    if (gr.next()) {
        var url = gs.getProperty('glide.servlet.uri') + gr.getLink(true);
        var homeurl = gs.getProperty('glide.servlet.uri');

		template.print('<div>Catalog Requested Item: ' + gr.request_item.getDisplayValue() + '</div>');
		template.print('<div>Requested For: ' + gr.request.requested_for.getDisplayValue() + '</div>');
		var variables = new GlideRecord('sc_item_option_mtom');
		variables.addQuery('request_item',gr.request_item);
		variables.orderBy('sc_item_option.order');
		variables.query();
		var exclude_vars = ['personal_city', 'personal_postal_code', 'personal_region', 'personal_street_line_1', 'personal_street_line_2', 'personal_street_line_3'];
		while(variables.next()){
			var varVal = new GlideRecord('sc_item_option');
			varVal.get(variables.sc_item_option);
			var varType = varVal.item_option_new.type.getDisplayValue();
			var inExclude = exclude_vars.indexOf(varVal.item_option_new.name.toString());
				if (inExclude < 0){
					if((varVal.value != '') && (varType != 'Reference') && (varType != 'Requested For') && (varType != 'List Collector') && (varType != 'Select Box') && (varType != 'Multiple Choice')){
						template.print('<div>' + varVal.item_option_new.getDisplayValue() + ': ' + varVal.value.getDisplayValue() + '</div>');
					}else if((varType == 'Select Box') || (varType == 'Multiple Choice')){
						var question = new GlideRecord('question_choice');
						question.addQuery('question.sys_id',varVal.item_option_new.sys_id);
						question.addQuery('value',varVal.value);
						question.query();
						while(question.next()){
							template.print('<div>' + varVal.item_option_new.getDisplayValue() + ': ' + question.getDisplayValue() + '</div>');
						}
						
					}else if(varVal.type == "8"){
                        var mrvs = new GlideRecord('sc_multi_row_question_answer');
                        mrvs.addQuery('parent_id',gr.sys_id);
                        mrvs.query();
                        
                    }
				}
			}
    }

})(current, template, email, email_action, event);