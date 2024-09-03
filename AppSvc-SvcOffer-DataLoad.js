var data = this.myList(); // Wanted my code up front, and the data at the bottom
var goodCount = 0;
var badCount = 0;

for (var x = 0; x < data.length; x++){
	
	var appGood = false;
	var svcGood = false;

	var grAppSvc = new GlideRecord('cmdb_ci_service_auto');
	if (grAppSvc.get('number',data[x].ASNumber)){
		appGood = true;
	}

	var grSvcOffer = new GlideRecord('service_offering');
	if (grSvcOffer.get('name',data[x].SvcOffering)){
		svcGood = true;
	}

	if(appGood && svcGood){
		
        var type = '1a9cb166f1571100a92eb60da2bce5c5'; //Parent: Depends On, Child: Used By
		var child = grAppSvc.getValue('sys_id');
		var parent = grSvcOffer.getValue('sys_id');

		/*
        Make these checks before creating a new record
        1. If no existing record exists
        2. If the proposed Parent is "Non-McKesson Technology" and some other "UsedBy:DependsOn" doesnt already exist
        3. Create Record if above checks pass
        */
        var check1 = false;
        var check2 = false;
        var qryString = "type.sys_idSTARTSWITH1a9cb166f1571100a92eb60da2bce5c5^child.sys_class_name=cmdb_ci_service_auto^parent.sys_class_name=service_offering^child="+ child + "^parent=" + parent;

        var grCheck1 = new GlideRecord('cmdb_rel_ci');
        grCheck1.addEncodedQuery(qryString);
        grCheck1.query();
        if (grCheck1.getRowCount() < 1){
            check1 = true;
        }

        if (parent != '63b9255947f34a90b548c4af016d4357'){
            //gs.print(parent + " is NOT Non-McKesson");
            check2 = true;
        } else{
            var grCheck2 = new GlideRecord('cmdb_rel_ci');
            qryString = "type.sys_idSTARTSWITH1a9cb166f1571100a92eb60da2bce5c5^child.sys_class_name=cmdb_ci_service_auto^parent.sys_class_name=service_offering^child="+ child ;
            grCheck2.addEncodedQuery(qryString);
            grCheck2.query();
            if (grCheck2.getRowCount() < 1){
                check2 = true;
            }

        }

        //gs.print("Check1: " + check1 + "\tCheck2" + check2);

        if (check1 && check2){    
            goodCount++;
            
            var grRelation = new GlideRecord('cmdb_rel_ci');
    		grRelation.initialize();
    		grRelation.child = child;
    		grRelation.parent = parent;
    		grRelation.type = type;
    		grRelation.update();
            
        }


	} else {
        badCount++;
		if (!appGood){
			gs.log('AppSvc-SvcOffer Error: No App Service Found: ' + data[x].AppService + ' --- Record: ' + data[x].ASNumber + " : " + data[x].SvcOffering);
		}
		if (!svcGood){
			gs.log('AppSvc-SvcOffer Error: No Service Offering Found:' + data[x].ServiceOffering + ' --- Record: ' + data[x].ASNumber + " : " + data[x].SvcOffering);
		}
	}
}
gs.print('----Records Created: ' + goodCount + "\tRecords Skipped: " + badCount);



function myList(){
	var appSvcList = [
		{
			"ASNumber": "AS10038",
			"AppService": "TOO2 - Bloor St Office",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10103",
			"AppService": "JAX9 Jacksonville Cross Dock",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10137",
			"AppService": "Relay Health - Pharma - NDH2 Backup Infrastructure",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS10147",
			"AppService": "STO1 - MMS BioMed Stoughton",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10160",
			"AppService": "COI2 - MMS BioMed City of Industry",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10162",
			"AppService": "Citrix Workspace",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS10205",
			"AppService": "SMS Scottsdale",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10219",
			"AppService": "ATL3 - Atlanta",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10220",
			"AppService": "ORL1 - Orlando",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10221",
			"AppService": "CHI1 - Chicago - Glendale Heights",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10222",
			"AppService": "GRP1 - Dallas - Grape Vine",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10223",
			"AppService": "NRB1 - Northborough",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10224",
			"AppService": "COL1 - Columbus",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10225",
			"AppService": "KCY1 - Kansas City",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10226",
			"AppService": "LIT1 - MMS Little Rock DC",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10228",
			"AppService": "TMP2 - Phoenix",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10229",
			"AppService": "SEA1 - MMS Seattle DC83",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10232",
			"AppService": "FRM1 - Farmington MMS Network LAN - Moore Medical Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10233",
			"AppService": "CNC1 - Concord, NC  Pharma Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10241",
			"AppService": "MPS Livonia Detroit, MI Network Operations Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10248",
			"AppService": "CHL2 - MMS Charlotte, NC",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10254",
			"AppService": "FRF1 - Fairfield, NJ",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10257",
			"AppService": "ROG1 -  MMS Rogers, AR",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10260",
			"AppService": "KNX3 Knoxville BIAB",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10263",
			"AppService": "RIC1 - Richmond, VA Corporate Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10267",
			"AppService": "ELW1 - MMS Elwood - Cypress Medical Warehouse Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10270",
			"AppService": "HAW1 - MMS Honolulu, HI",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10271",
			"AppService": "SRL1 - PSAS San Rafael",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10280",
			"AppService": "NOL2 - MMS New Orleans, LA",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10283",
			"AppService": "HOU6 - MMS Houston DC",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10284",
			"AppService": "PIT1 - MMS PSS Pittsburgh, PA",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10287",
			"AppService": "ORL9 MMS Orlando, FL",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10288",
			"AppService": "MEM2 MMS PSS Memphis, TN",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10294",
			"AppService": "MRF1 - Lavergne, TN Pharma Biologics",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10296",
			"AppService": "LVN1 - PSAS LaVergne",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10298",
			"AppService": "MEM5 - Memphis",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10304",
			"AppService": "PIS1 - Piscataway",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10319",
			"AppService": "ELG2 -  MMS PSS Elgin, IL DC",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10321",
			"AppService": "PSAS- Lynx Production Server Infrastructure",
			"SvcOffering": "O&S Practice Service"
		},
		{
			"ASNumber": "AS10326",
			"AppService": "GOL1 - MMS Golden Valley Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10328",
			"AppService": "YNK1 USP Yonkers",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10335",
			"AppService": "LAF2 - Lafayette DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10336",
			"AppService": "BAT1 - Baton Rouge DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10338",
			"AppService": "NOR1 - Chesapeake DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10339",
			"AppService": "FRD2 - Fredericksburg DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10340",
			"AppService": "STL4 - St. Charles DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10341",
			"AppService": "CSC4 - Columbia DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10342",
			"AppService": "TUL3 - Tulsa DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10348",
			"AppService": "TAM1 MMS Tampa Cross Dock",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10349",
			"AppService": "CAL1- MMS Zee Calgary - Canada",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10353",
			"AppService": "PSAS The Woodlands TX MPLS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10367",
			"AppService": "PSAS Bay Area Consolidation",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10371",
			"AppService": "SCL3 -Five9VPN - Santa Clara",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10372",
			"AppService": "CGZ1 PSAS Cognizant Offshore Connectivity",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10385",
			"AppService": "BIR3 - Trussville DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10387",
			"AppService": "Rite Aid Network Infrastructure",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10388",
			"AppService": "CIN1 - Cincinnati  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10390",
			"AppService": "TAL2 - Tallahassee  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10391",
			"AppService": "BLT2 - Lanham  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10393",
			"AppService": "CHA4 - Chattanooga DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10405",
			"AppService": "SAV1 - MMS Next Day Medical - Savage, MD",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10410",
			"AppService": "COP1 - MMS ZEE Medical Coppell TX",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10411",
			"AppService": "CHO1 - MMS Chino, CA",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10432",
			"AppService": "PMP1 - MMS Pompano Kiosk",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10445",
			"AppService": "FTW8 - Fort Worth",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10447",
			"AppService": "MMS WNC1 - Winchester DC",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10449",
			"AppService": "NAS1 - Nashville DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10450",
			"AppService": "KNX4 - Knoxville DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10451",
			"AppService": "LVG1 - Las Vegas DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10452",
			"AppService": "CHL3 - Charleston DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10453",
			"AppService": "FTM2 - Fort Myers DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10454",
			"AppService": "AST2 - Austin  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10455",
			"AppService": "ALB4 - Albany  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10456",
			"AppService": "DTR1 - Detroit  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10457",
			"AppService": "SFL1 - Pompano Beach  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10458",
			"AppService": "STP2 - St. Pete  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10459",
			"AppService": "RCH4 - Richmond  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10460",
			"AppService": "SAN3 - San Antonio  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10461",
			"AppService": "SAT2 - South Atlanta  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10462",
			"AppService": "RAL7 - Raleigh  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10463",
			"AppService": "CCH1 - Corpus Christi  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10464",
			"AppService": "SVL1 - Sun Valley  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10465",
			"AppService": "WLF1 - Wallingford  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10466",
			"AppService": "SDG1 - San Diego  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10468",
			"AppService": "SVN1 - Savannah  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10469",
			"AppService": "BNT1 - Bentonville AR - Walmart Central Fill",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10470",
			"AppService": "CSP5 - Colorado Springs - Walmart Central Fill",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10475",
			"AppService": "FRN3 - Franklin TN - MediMart",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10501",
			"AppService": "SPR5 - Spartanburg Cross Dock MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10502",
			"AppService": "LNC1 - Lincoln Cross Dock MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10504",
			"AppService": "BGB1 - Big Bend  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10505",
			"AppService": "BRT1 - Bartonville  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10509",
			"AppService": "ATL7 - Five9VPN- Atlanta (Network)",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10510",
			"AppService": "WDC2 - Washington DC Public Affairs Office",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10513",
			"AppService": "IND4 - Indianapolis DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10514",
			"AppService": "Change Healthcare - Legacy BPS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10520",
			"AppService": "RDU4 - Biologics MPLS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10521",
			"AppService": "RDU2 - Biologics MPLS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10522",
			"AppService": "RDU3 - Biologics MPLS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10524",
			"AppService": "MID4 - Middleburg Heights DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10526",
			"AppService": "LOU5 LABSCO",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10529",
			"AppService": "GRP3 - MSH Pharmacy Dallas Fort Worth",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10532",
			"AppService": "SNL1 - San Leandro DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10533",
			"AppService": "USON - US ONCOLOGY West (Network)",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10534",
			"AppService": "USON - US ONCOLOGY Central",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10535",
			"AppService": "USON - US ONCOLOGY Northeast (Network)",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10537",
			"AppService": "USON - US ONCOLOGY Southeast (Network)",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10538",
			"AppService": "RXL1 RxCrossroads - Fenley, Louisville, KY",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10539",
			"AppService": "RXE1 RxCrossroads - Erlanger, Louisville, KY",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10541",
			"AppService": "RXJ1 RxCrossroads  - Jefferson Commerce - Louisville, KY",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10542",
			"AppService": "RXN1 RxCrossroads - National Turnpike, Fairdale, KY",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10543",
			"AppService": "RHQ1 RxCrossroads - Eastpoint II, Louisville, KY",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10551",
			"AppService": "SAC5 - MMS Sacramento DC",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10553",
			"AppService": "PUY1 - Puyallup Pharma Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10554",
			"AppService": "Pharma DC Network Sites - Consolidated",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10555",
			"AppService": "RDU2 - Cary DC",
			"SvcOffering": "Enterprise Infrastructure Services"
		},
		{
			"ASNumber": "AS10556",
			"AppService": "RDU4 - Cary",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10557",
			"AppService": "RDU2 - Cary",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10558",
			"AppService": "GRP3 - Irving TX",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10563",
			"AppService": "HOU3 - intraFUSION",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10564",
			"AppService": "MAS1 - Masters",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10565",
			"AppService": "ARG1- MMS Portland, OR",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10566",
			"AppService": "MRC1- MMS Mercedez, TX",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10590",
			"AppService": "SAC2 - MMS Sacramento, CA",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10591",
			"AppService": "MES1 - MMS Mesquite, TX",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10592",
			"AppService": "HAR1 - Harrisburg",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10593",
			"AppService": "MAD1 - Madison",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10594",
			"AppService": "MAN2 - Manchester HyperDrive",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10595",
			"AppService": "SLC2 - MMS PSS Salt Lake City",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10596",
			"AppService": "ATL4 - MMS PSS Atlanta",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10597",
			"AppService": "CHI7 - MMS PSS Chicago",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10598",
			"AppService": "GDP1 - MMS PSS Dallas Grand Prairie",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10599",
			"AppService": "DEN7 - MMS PSS Denver",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10600",
			"AppService": "ORL5 - MMS PSS Orlando",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10601",
			"AppService": "PEN1 - MMS PSS Great Lakes",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10602",
			"AppService": "NOL1 - MMS PSS Gulf Coast",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10603",
			"AppService": "KCY7 - MMS PSS Heartlands",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10604",
			"AppService": "VIC1 - MMS PSS Houston",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10605",
			"AppService": "MEM8 - MMS PSS Memphis",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10606",
			"AppService": "MIN8 - MMS PSS Minneapolis",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10607",
			"AppService": "PRI1 - MMS PSS New England",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10608",
			"AppService": "NWK1 - MMS PSS New Jersey",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10609",
			"AppService": "SAC3 - MMS PSS Northern California",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10610",
			"AppService": "SEA3 - MMS PSS Pacific Northwest",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10611",
			"AppService": "PHX3 - MMS PSS Phoenix",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10612",
			"AppService": "JAX5 - MMS PSS RDC South",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10613",
			"AppService": "RIC2 - MMS PSS Richmond",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10614",
			"AppService": "LOU1 - MMS PSS River Cities",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10615",
			"AppService": "SCH1 - MMS PSS San Antonio",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10617",
			"AppService": "FUL1 MMS Fullerton, CA",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10628",
			"AppService": "PIT8 - Pittsburgh BioMed Office Renovation",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10651",
			"AppService": "RCH1 MMS Rochester NY - PSS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10654",
			"AppService": "JAX8 - Jacksonville New Build Office Fit-out",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10657",
			"AppService": "Okta Servers - McKesson EU",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS1066",
			"AppService": "Generics Data Analytics SQL Server Instance",
			"SvcOffering": "Product Architecture, Eng and Ops"
		},
		{
			"ASNumber": "AS10664",
			"AppService": "JAX3 - Jacksonville BioMed Office Renovation",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10670",
			"AppService": "BTH2 MMS Bethlehem PA",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10768",
			"AppService": "BUF4 - McKesson Central Fill HVS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS10787",
			"AppService": "LOU2 MMS Louisville, KY",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11003",
			"AppService": "'@Remote",
			"SvcOffering": "Canada Field Tech 2"
		},
		{
			"ASNumber": "AS11007",
			"AppService": "Azure ADConnect",
			"SvcOffering": "Identity & Access Management Service"
		},
		{
			"ASNumber": "AS11036",
			"AppService": "BT Diamond IP Control IPAM software",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11049",
			"AppService": "FRE4 MMS Fresno Cross Dock",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11075",
			"AppService": "SEA2 - MMS Seattle DC",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11078",
			"AppService": "MTL1 - MMS MT Laurel, NJ Cross Dock",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11080",
			"AppService": "HNP1 - MMS BioMed Hanover Park Network",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11156",
			"AppService": "BOH1 - Bohemia DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11157",
			"AppService": "MET1 - Metarie DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11159",
			"AppService": "NOR2 - Norristown DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11198",
			"AppService": "GAR1 - Garland MMS BioMed",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11205",
			"AppService": "Netflow",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11206",
			"AppService": "Microfocus Network Automation-McKesson Technology",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11492",
			"AppService": "IKnowMed Physician Reporting Center",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS11623",
			"AppService": "SHE3 - Louisville, KY HyperDrive MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS11650",
			"AppService": "OVB2 - Olive Branch Forest HyperDrive DC PSAS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS20237",
			"AppService": "MMS New Cross Dock - Hanover, MD (Network)",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS20411",
			"AppService": "Asana",
			"SvcOffering": "O&S Practice Service"
		},
		{
			"ASNumber": "AS20534",
			"AppService": "SHE3 - Louisville Clermont HyperDrive DC PSAS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS20672",
			"AppService": "Jira-MSH",
			"SvcOffering": "O&S Practice Service"
		},
		{
			"ASNumber": "AS20866",
			"AppService": "GRO1 - MMS Groveport, OH  Hyperdrive (Network)",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS20887",
			"AppService": "Azure Form Recognizer Studio",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS20903",
			"AppService": "Azure Form Recognizer",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS20998",
			"AppService": "MSH AppDynamics",
			"SvcOffering": "O&S Practice Service"
		},
		{
			"ASNumber": "AS21122",
			"AppService": "Shortel (Biologics)",
			"SvcOffering": "Pharmacy Practice"
		},
		{
			"ASNumber": "AS21236",
			"AppService": "Bio-Tableau",
			"SvcOffering": "Pharmacy Practice"
		},
		{
			"ASNumber": "AS21238",
			"AppService": "Bio-Snowflake (Pharmacy Data Warehouse)",
			"SvcOffering": "Pharmacy Practice"
		},
		{
			"ASNumber": "AS21404",
			"AppService": "CHB1 - MMS Bartlett DC (Network)",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS21405",
			"AppService": "Ontada Azure OpenAI",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS21538",
			"AppService": "CMM Network Services Application Suite",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS21552",
			"AppService": "MMS Kenner, LA Cross Dock Network",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS22604",
			"AppService": "Mrxt Looker - Reporting Application",
			"SvcOffering": "Ent. Data and Platform Engineering"
		},
		{
			"ASNumber": "AS22685",
			"AppService": "SCRI Research Data Lake",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS23115",
			"AppService": "HLT1 - Michigan Lansing - DC8162",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS23221",
			"AppService": "MRC1- MMS Mercedez, TX",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS23236",
			"AppService": "ELL1 Hyperdrive - MMS Ellabell GA",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS23282",
			"AppService": "RemainCo Management Tools",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS23361",
			"AppService": "ALB4 - Albany  DC MMS",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS23767",
			"AppService": "USON Analytics Hub",
			"SvcOffering": "CPQ"
		},
		{
			"ASNumber": "AS24036",
			"AppService": "JEF2 - Central Ohio - DC8163",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS24156",
			"AppService": "MMS Commerce City, CO ( CMC1)",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS24348",
			"AppService": "McKesson Bio-Medical-STO4 Network",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS24390",
			"AppService": "MMS NEW Cross Dock - Harrisburg, PA - CSP13",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS24392",
			"AppService": "MMS NEW Cross Dock - Tyler, TX - CSP9",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS24410",
			"AppService": "MMS NEW Cross Dock - Lubbock TX - CSP10",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS24648",
			"AppService": "Third Party Logistics - 3PL Clermont (SHE5) ",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS24889",
			"AppService": "Sanitas Pharmacy Automation System",
			"SvcOffering": "Pharmacy Practice"
		},
		{
			"ASNumber": "AS24929",
			"AppService": "Connect Portal Administration",
			"SvcOffering": "eCommerce"
		},
		{
			"ASNumber": "AS25171",
			"AppService": "Data Marketplace UI",
			"SvcOffering": "Ent. Data and Platform Engineering"
		},
		{
			"ASNumber": "AS25301",
			"AppService": "Nets A/S Security Centre",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS25406",
			"AppService": "Crisis24 Worldcue",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS25489",
			"AppService": "Bio-HVS (High Volume Shipping Solution)",
			"SvcOffering": "Practice Service"
		},
		{
			"ASNumber": "AS25528",
			"AppService": "MMS KEN3 - Seattle DC Network",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS25570",
			"AppService": "PER2 - MMS/Cypress Medical Perris, CA Network",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS26005",
			"AppService": "MMS GRE6: Portland Cross Dock",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS26066",
			"AppService": "BlackLine - Cash App",
			"SvcOffering": "Accounts Receivable"
		},
		{
			"ASNumber": "AS26118",
			"AppService": "OVB4 - CDC / VFC - Children's Specialty Vaccine (Network)",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS26239",
			"AppService": "HiredScore",
			"SvcOffering": "Workforce Management"
		},
		{
			"ASNumber": "AS26248",
			"AppService": "Remote Ops API Patient Match and Document Attaching App - Ontada",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS26327",
			"AppService": "Incentives Administration Azure Confluent Kafka Instance",
			"SvcOffering": "Incentives & Master Data"
		},
		{
			"ASNumber": "AS26348",
			"AppService": "TVM - Threat and Vulnerability Management",
			"SvcOffering": "Cyber Protect & Engineering Service"
		},
		{
			"ASNumber": "AS26377",
			"AppService": "Orion - GPR-BPR Cloud",
			"SvcOffering": "Gx Dynamic Pricing Modeling and Mgmt"
		},
		{
			"ASNumber": "AS26429",
			"AppService": "Azure Delta Lake - Databricks",
			"SvcOffering": "Ent. Data and Platform Engineering"
		},
		{
			"ASNumber": "AS26445",
			"AppService": "Azure Delta Lake - Databricks",
			"SvcOffering": "Ent. Data and Platform Engineering"
		},
		{
			"ASNumber": "AS26451",
			"AppService": "B2C eCommerce Shared Services (SaaS)",
			"SvcOffering": "B2C E-Commerce"
		},
		{
			"ASNumber": "AS3584",
			"AppService": "The Pharmacy Connection (TPC)",
			"SvcOffering": "Non-McKesson Technology Service"
		},
		{
			"ASNumber": "AS9527",
			"AppService": "Netezza (ScriptServer)",
			"SvcOffering": "PSaS Data Architecture & Engineering"
		},
		{
			"ASNumber": "AS9567",
			"AppService": "mDNA Analytics Platform",
			"SvcOffering": "Ent. Data and Platform Engineering"
		},
		{
			"ASNumber": "AS9802",
			"AppService": "OMA4 MMS Omaha Cross Dock",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9830",
			"AppService": "LOU5 - Louisville RxC Lease",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9884",
			"AppService": "Corp RE - Alpharetta Relocation (APH5)",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9897",
			"AppService": "DialOut IP",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9898",
			"AppService": "Secured SSL Web Access",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9900",
			"AppService": "Alpharetta, GA Site -",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9901",
			"AppService": "DDC1 - Drohan, CA Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9902",
			"AppService": "Pine Street, CA  Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9904",
			"AppService": "NDH1/NDH2- North Druid Hills, GA - Bldg 1 and 2 Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9905",
			"AppService": "Atlanta UVN  Ring",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9906",
			"AppService": "Citrix Wanscaler RDP Acceleration",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9909",
			"AppService": "eSAN - DDC",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9910",
			"AppService": "eSAN - NDH",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9911",
			"AppService": "MCU One Post - Internet Connectivity",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9912",
			"AppService": "NTP Servers",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9913",
			"AppService": "NEC1 - NorthEast Executive Conference Center",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9914",
			"AppService": "HPD1 - HP SupportNow WAN - Colorado",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9915",
			"AppService": "HPA1 - HP SupportNow WAN - Georgia",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9916",
			"AppService": "ClarusONE Sourcing Services LLP - UK",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9918",
			"AppService": "DFW1 Dallas-Irving TX",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9919",
			"AppService": "SJO1 - US Public Cloud Transit West Site - San Jose",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9920",
			"AppService": "ASB2 - US Public Cloud Transit East Site - Ashburn",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9922",
			"AppService": "Toronto Public Cloud Transit Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9923",
			"AppService": "Montreal Public Cloud Transit Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9924",
			"AppService": "SRC1_SRC2 - Call Center at Scottsdale",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9925",
			"AppService": "GLD6 - McKesson UK/Ireland Global Network Site",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9926",
			"AppService": "PST1-One Post SF, CA",
			"SvcOffering": "Ent Network Services"
		},
		{
			"ASNumber": "AS9951",
			"AppService": "Unknown Service",
			"SvcOffering": "IT Service Management & Reporting"
		}
	];

	return appSvcList;
}
