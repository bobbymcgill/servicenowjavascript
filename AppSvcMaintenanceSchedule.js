var appSvcList = ["AS27933","AS30863","AS22806","AS27938","AS25475","AS28957","AS26817","AS25452","AS22644","AS25415","AS27941","AS26221","AS20227","AS22727","AS27947","AS30074","AS27949","AS25405","AS27954","AS30645","AS30749","AS27958","AS25453","AS27813","AS27811","AS27810","AS28051","AS25232","AS27963","AS21094","AS25429","AS21490","AS25419","AS30484","AS30174","AS20988","AS27981","AS27983","AS27984","AS27985","AS27986","AS28773","AS25126","AS27989","AS25204","AS3508","AS30930","AS26496","AS10845","AS27295","AS27016","AS24993","AS3509","AS27992","AS20616","AS10929","AS28415","AS10356","AS27916","AS25448","AS29691","AS25408","AS25409","AS26883","AS22830","AS25183","AS28004","AS27034","AS30610","AS28831","AS28017","AS28019","AS28018","AS25252","AS22826","AS28027","AS28029","AS25350","AS25047","AS28032","AS10697","AS28036","AS25055","AS25057","AS25191","AS21532","AS21506","AS10703","AS10691","AS10696","AS10685","AS25975","AS25979","AS25978","AS25977","AS20990","AS20273","AS21084","AS20578","AS28041","AS25147","AS28042","AS27501","AS22616","AS30609","AS25084","AS25014","TS20051","AS28046","AS9951","AS30170","AS30127","AS26165","AS27004","AS22802","AS28773","AS25126","AS27989","AS25204","AS3508","AS30930","AS26496","AS10845","AS27295","AS27016","AS24993","AS3509","AS27992","AS20616","AS10929","AS28415","AS10356","AS27916","AS25448","AS29691","AS25408","AS25409","AS26883","AS22830","AS25183","AS28004","AS27034","AS30610","AS28831","AS28017","AS28019","AS28018","AS25252","AS22826","AS28027","AS28029","AS25350","AS25047","AS28032","AS10697","AS28036","AS25055","AS25057","AS25191","AS21532","AS21506","AS10703","AS10691","AS10696","AS10685","AS25975","AS25979","AS25978","AS25977","AS20990","AS20273","AS21084","AS20578","AS28041","AS25147","AS28042","AS27501","AS22616","AS30609","AS25084","AS25014","TS20051","AS28046","AS9951","AS30170","AS30127","AS26165","AS27004","AS22802"];


 Following code will create Maintenance Schedule Records.
for (var x = 0; x < appSvcList.length; x++){
	var maintGR = new GlideRecord('cmn_schedule_maintenance');
	maintGR.initialize();
	maintGR.name = appSvcList[x] + " maintenance schedule";
	maintGR.label = appSvcList[x] + " maintenance schedule";
	maintGR.time_zone = "US/Pacific";
	maintGR.source = "cmdb_ci_service";
	maintGR.condition = "number=" + appSvcList[x] + "^EQ";
	maintGR.update();
}


// Following Code will associate App Service records with the Maintenance Req Records
for (var x = 0; x < appSvcList.length; x++){
	var appGR = new GlideRecord('cmdb_ci_service_auto');
	appGR.get('number',appSvcList[x]);
	
	var maintGR = new GlideRecord('cmn_schedule_maintenance');
	maintGR.addEncodedQuery('numberSTARTSWITH' + appSvcList[x]);
	maintGR.query();
	while(maintGR.next()){
		appGR.maintenance_schedule = maintGR.getUniqueValue();
		appGR.update();
	}
}