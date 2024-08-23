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
	        "ASNumber": "AS0051",
	        "AppService": "TSM (Tivoli Storage Management) (Prod)ndhbxnsn32",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS0070",
	        "AppService": "McKesson Connect - Data Exchange - Prod",
	        "SvcOffering": "eCommerce"
	    },
	    {
	        "ASNumber": "AS0093",
	        "AppService": "AccessHealth FTP Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0101",
	        "AppService": "DBA LDAP (Prod)",
	        "SvcOffering": "Ent. Database Technology Services"
	    },
	    {
	        "ASNumber": "AS0115",
	        "AppService": "MPS&A File Services (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0130",
	        "AppService": "Managed Care Optimizer (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0158",
	        "AppService": "SQL Audit Log Repository (Prod)",
	        "SvcOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS0159",
	        "AppService": "MT Domain Administration Server (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0168",
	        "AppService": "MPSA Siebel CRM Hosting (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0183",
	        "AppService": "RIM Email Management Archive (Prod)",
	        "SvcOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS0193",
	        "AppService": "Data Center Located File Servers (Prod)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS0202",
	        "AppService": "ETS HP Business System Management (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0208",
	        "AppService": "SST Data Mart Server (Prod)",
	        "SvcOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS0219",
	        "AppService": "NLS Sybase IQ (Prod)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS0241",
	        "AppService": "HVS R&D and Support Services (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0252",
	        "AppService": "ESS Citrix and Vertex Exemption Certificate Manager (Prod)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS0254",
	        "AppService": "Pharma McKNethost2 (Prod)",
	        "SvcOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS0255",
	        "AppService": "Peoplesoft (Prod)",
	        "SvcOffering": "Sales Compensation"
	    },
	    {
	        "ASNumber": "AS0258",
	        "AppService": "Stock Options (Prod)",
	        "SvcOffering": "Sales Compensation"
	    },
	    {
	        "ASNumber": "AS0271",
	        "AppService": "Wins Servers (Prod)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS0275",
	        "AppService": "McKesson Web Farm (Prod)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS0276",
	        "AppService": "ADS Active Directory (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0281",
	        "AppService": "CyberArk (Prod)",
	        "SvcOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS0286",
	        "AppService": "MFC Technology Solutions Workstations (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0287",
	        "AppService": "iDigicall (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0291",
	        "AppService": "MMS STATpc (Prod)",
	        "SvcOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS0302",
	        "AppService": "McKesson.com Website (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0326",
	        "AppService": "SiteMinder Web Single Sign-On (Prod/DR)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0354",
	        "AppService": "McKesson Packaging (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0367",
	        "AppService": "Manhattan Labor Management (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS0380",
	        "AppService": "AccessHealth Office - Smart Applications Suites (Prod)",
	        "SvcOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS0384",
	        "AppService": "Relay Health -  Financial Reporting (Prod)",
	        "SvcOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS0417",
	        "AppService": "Corporate Law Department Sharepoint (Prod)",
	        "SvcOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS0420",
	        "AppService": "Centralized Security Servers (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0469",
	        "AppService": "InfoPrint ProcessDirector Printer (Prod)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS0485",
	        "AppService": "SFTS RoboHelp Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0492",
	        "AppService": "Demand Forecasting for SCORE (Prod)",
	        "SvcOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS0506",
	        "AppService": "PSAS Distribution Applications (Prod) (VM)",
	        "SvcOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS0544",
	        "AppService": "PingFederate (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0548",
	        "AppService": "Manhattan Transportation Management (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS0560",
	        "AppService": "MMS E1 Technology - Citrix XenVDI (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS0568",
	        "AppService": "SAP GUI Installer (Prod)",
	        "SvcOffering": "Ent. SAP Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS0600",
	        "AppService": "MMS E1 Technology - Adapter (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS0609",
	        "AppService": "IBM ILMT Deployment (Prod)",
	        "SvcOffering": "Service Enablement"
	    },
	    {
	        "ASNumber": "AS0622",
	        "AppService": "CIT Network Visibility (Prod)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS0634",
	        "AppService": "DMZ ADS Active Directory (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0646",
	        "AppService": "Health Mart Database (Prod)",
	        "SvcOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS0661",
	        "AppService": "MPS Customer Data Security (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0670",
	        "AppService": "Identity and Access Management (Shared) (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0678",
	        "AppService": "MMS Open Scan (Prod)",
	        "SvcOffering": "Master Data"
	    },
	    {
	        "ASNumber": "AS0686",
	        "AppService": "MTS Citrix Xenapp/Xendesktop (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS0698",
	        "AppService": "Prescription Drug Marketing Act - PDMA (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0707",
	        "AppService": "Corporate Public Key Infrastructure (PKI) (Prod)",
	        "SvcOffering": "Identity & Access Management Service"
	    },
	    {
	        "ASNumber": "AS0713",
	        "AppService": "Generic Finance Application (GFA) Data Warehouse (Prod)",
	        "SvcOffering": "Customer Reporting and Analytics"
	    },
	    {
	        "ASNumber": "AS0782",
	        "AppService": "US Oncology Hosting (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS0792",
	        "AppService": "MFC Technology Solutions SQL Servers (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0795",
	        "AppService": "ETS DBAOPS Cloud Control (Prod)",
	        "SvcOffering": "Enterprise Infrastructure"
	    },
	    {
	        "ASNumber": "AS0802",
	        "AppService": "Pharma Buy Side (Prod)",
	        "SvcOffering": "Incentives & Master Data"
	    },
	    {
	        "ASNumber": "AS0851",
	        "AppService": "Generics Business Applications (Prod)",
	        "SvcOffering": "Gx Product Lifecycle Mgmt and Eng."
	    },
	    {
	        "ASNumber": "AS0888",
	        "AppService": "Governance Risk & Compliance - GP2 (Prod)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS0927",
	        "AppService": "Business to Business VPN (Network)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS0936",
	        "AppService": "Solar Winds Orion Systems (Prod)",
	        "SvcOffering": "Ent. Scheduling & Observability Services"
	    },
	    {
	        "ASNumber": "AS0941",
	        "AppService": "Business Objects Data Services and Information Steward (BODSIS) - DSP (Prod)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS10000",
	        "AppService": "Hyperion 11.1.2.4 Application and Database Servers (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10001",
	        "AppService": "COG1 - Co-Lo Cogent GMD (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10002",
	        "AppService": "GUE1- Well DC Site (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10006",
	        "AppService": "BRA1 - Brampton DC (Network)",
	        "SvcOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS10010",
	        "AppService": "DAR1 - GMD BU Dartmouth Pharmacy (Network)",
	        "SvcOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS10011",
	        "AppService": "DRU1 - Drummondville DC (Network)",
	        "SvcOffering": "Canada Field Tech 3"
	    },
	    {
	        "ASNumber": "AS10015",
	        "AppService": "MIL1 - Milton DC (Network)",
	        "SvcOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS10016",
	        "AppService": "MIS2 - Mississauga Viscount (Network)",
	        "SvcOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS10017",
	        "AppService": "MIS4 - Coopers Office (Network)",
	        "SvcOffering": "IT Service Management & Analytics"
	    },
	    {
	        "ASNumber": "AS10019",
	        "AppService": "MON2 - Dobrin (Network)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10020",
	        "AppService": "MON3 - IBM Colo (Network)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10021",
	        "AppService": "MON4 - APS BU (Network)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS10024",
	        "AppService": "MON6 - Uniprix Metro (Network)",
	        "SvcOffering": "Canada Field Tech 3"
	    },
	    {
	        "ASNumber": "AS10025",
	        "AppService": "MON7 - Uniprix Langelier (Network)",
	        "SvcOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS10028",
	        "AppService": "MTL3 - CoLo (Cologix MTL3) (Network)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10031",
	        "AppService": "PIE9 - Montreal (Network)",
	        "SvcOffering": "Canada Field Tech 3"
	    },
	    {
	        "ASNumber": "AS10032",
	        "AppService": "QUC1 - Quebec City (Network)",
	        "SvcOffering": "Canada Field Tech 3"
	    },
	    {
	        "ASNumber": "AS10034",
	        "AppService": "RTI1 - R2i Colo for JDE Boucherville (Network)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10035",
	        "AppService": "RTI2 - R2i Colo for JDE Montreal (Network)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10036",
	        "AppService": "STJ1 - Mount-Pearl DC (Network)",
	        "SvcOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS10039",
	        "AppService": "TOR1 - CoLo (Cologix TOR1) (Network)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10040",
	        "AppService": "TOR2 - CoLo (Cologix TOR2) (Network)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10041",
	        "AppService": "TRE1 - Trenton DC (Network)",
	        "SvcOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS10046",
	        "AppService": "YQM1 - Moncton DC (Network)",
	        "SvcOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS10073",
	        "AppService": "Costco Indiana Central Fill (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10099",
	        "AppService": "Data Hub for Category Management 2 (Prod)",
	        "SvcOffering": "PSaS Data Architecture & Eng. Service"
	    },
	    {
	        "ASNumber": "AS10112",
	        "AppService": "Cloud Operations Zabbix (GCP) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10114",
	        "AppService": "Okta (Mckesson Corporate) - Prod",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS10131",
	        "AppService": "Platform Enablement Sandbox - GCP Project (DEV)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS10140",
	        "AppService": "GCP Forensics Analysis (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10145",
	        "AppService": "Advanced Development Programs - ADP Utilities (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1015",
	        "AppService": "MPS&A SAP Integration Services (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10151",
	        "AppService": "Cognos BI (Data mining) (Prod)",
	        "SvcOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS10154",
	        "AppService": "Scottsdale Fax Inbound Monitoring (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10168",
	        "AppService": "(BI-COE) Business Intelligence Center of Excellence Databases (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10171",
	        "AppService": "ESS Business Objects (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10172",
	        "AppService": "Information Warehouse (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10174",
	        "AppService": "IXOS Archive Server (including EMC Centera) (Prod)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS10177",
	        "AppService": "Data Provisioning Area (DPA) (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10178",
	        "AppService": "Closed Loop Analytics (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10182",
	        "AppService": "IBM Websphere MQ for DCs (Prod)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS10184",
	        "AppService": "CVT & Datastage (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10185",
	        "AppService": "IW - New P101 Database (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10188",
	        "AppService": "MMS Sales Technology (Prod)",
	        "SvcOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS10189",
	        "AppService": "MMS Point to Profit (Prod)",
	        "SvcOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10194",
	        "AppService": "MMS Business Objects (Prod)",
	        "SvcOffering": "Strategy"
	    },
	    {
	        "ASNumber": "AS10198",
	        "AppService": "D&K AS400 & SCORE/Lawson-Walsh/Distrack (Prod)",
	        "SvcOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS10199",
	        "AppService": "NRC Orders (Prod)",
	        "SvcOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS1020",
	        "AppService": "Healthstat SAS Platform (Prod)",
	        "SvcOffering": "Data Architecture, Eng. & Governance"
	    },
	    {
	        "ASNumber": "AS10203",
	        "AppService": "McKesson Connect - Supplier Management - Prod",
	        "SvcOffering": "Decision Intelligence: Provider & CGAT"
	    },
	    {
	        "ASNumber": "AS10204",
	        "AppService": "MMS Domino Application Server (Prod)",
	        "SvcOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS10206",
	        "AppService": "SLA/IMA Oracle Databases (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10256",
	        "AppService": "MMS PROS Pricing Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10272",
	        "AppService": "Richmond, VA Corporate Site - Room Wizard (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS10277",
	        "AppService": "MMS SQL Widget (Prod)",
	        "SvcOffering": "Ent. ERP Platform Technology"
	    },
	    {
	        "ASNumber": "AS10285",
	        "AppService": "MON2 - McKesson Canada (Network)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10286",
	        "AppService": "MON3 - McKesson Canada (Network)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10290",
	        "AppService": "MMS Sterling Integrator (Prod)",
	        "SvcOffering": "Customer Relationship Management"
	    },
	    {
	        "ASNumber": "AS10291",
	        "AppService": "MediMart ProClaim  (Prod)",
	        "SvcOffering": "MMS Finance & Strategy Service Category"
	    },
	    {
	        "ASNumber": "AS10308",
	        "AppService": "MMS File Servers (Prod)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS10310",
	        "AppService": "MMS VMware (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10315",
	        "AppService": "MPS&A EnterpriseRx Disaster Recovery Environment (Co-Lo) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10317",
	        "AppService": "MLS Pharmacy Copay (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10324",
	        "AppService": "Pharma MRF1 - Murfreesboro, TN File Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10331",
	        "AppService": "McKesson Business Analytics  (DEV)",
	        "SvcOffering": "MBA Reporting"
	    },
	    {
	        "ASNumber": "AS10332",
	        "AppService": "McKesson Business Analytics  (PROD)",
	        "SvcOffering": "MBA Reporting"
	    },
	    {
	        "ASNumber": "AS10343",
	        "AppService": "MagicInfo Azure (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10347",
	        "AppService": "PSAS - Active Directory Domains for US Oncology (CoLo)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS10350",
	        "AppService": "MMS E1 Technology - Enterprise Servers JD Edwards (JDE) (Prod)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS10351",
	        "AppService": "MMS Advanced Transportation (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS10356",
	        "AppService": "MMS E1 Technology - XenApp (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS10359",
	        "AppService": "MMS E1 ISERIES JD Edwards (JDE) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10362",
	        "AppService": "PSAS - Web Services for US Oncology (CoLo)(Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS10364",
	        "AppService": "BizManager (Prod)",
	        "SvcOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS10366",
	        "AppService": "PSAS - USON and SSF servers (CoLo)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS10368",
	        "AppService": "Pharma Customer Care Telestock (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10370",
	        "AppService": "MMS MedFORCE (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS10373",
	        "AppService": "MMS File Servers (Moore) (Prod)",
	        "SvcOffering": "MMS Finance & Strategy Service Category"
	    },
	    {
	        "ASNumber": "AS10383",
	        "AppService": "Serialization 4 Wall (Prod)",
	        "SvcOffering": "Ent. SAP Managed Services"
	    },
	    {
	        "ASNumber": "AS10384",
	        "AppService": "MMS Oracle PDH (Prod)",
	        "SvcOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10396",
	        "AppService": "MMS E3 Web Dashboard (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10398",
	        "AppService": "GV SMO EC Middle Tier (Prod)",
	        "SvcOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10404",
	        "AppService": "MMS MIT XenApp (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS10418",
	        "AppService": "MMS Teleran iSight (Prod)",
	        "SvcOffering": "MMS Data & Advanced Analytics Category"
	    },
	    {
	        "ASNumber": "AS10423",
	        "AppService": "MMS Credit Card Vault (Prod)",
	        "SvcOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10425",
	        "AppService": "Cypress Syspro & MegaTrak (Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10427",
	        "AppService": "Cypress SQL Server (Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10431",
	        "AppService": "PSAS UNIX (CoLo)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS1044",
	        "AppService": "McKIT Xenapp and Xendesktop (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS10442",
	        "AppService": "Golden Valley Internal SFTP Services (Prod)",
	        "SvcOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10444",
	        "AppService": "SMO Web Services Tier (Prod)",
	        "SvcOffering": "Innovation and Operations Enablement"
	    },
	    {
	        "ASNumber": "AS10474",
	        "AppService": "Concord Data Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10498",
	        "AppService": "MMS Vmware Utility Servers  (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10507",
	        "AppService": "Sap Cyber-Security (ETD) Enterprise Threat Detection SDS (Prod)",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS10528",
	        "AppService": "MMS Labor Management System (LMS) Production (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS10546",
	        "AppService": "Five9 - US (Prod)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS10555",
	        "AppService": "RDU2 - Cary DC (Prod)",
	        "SvcOffering": "Ent. Practices Tech. Services"
	    },
	    {
	        "ASNumber": "AS10587",
	        "AppService": "MMS Doc Origin (PROD)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS1060",
	        "AppService": "Generics Reporting Services - AR Reporting Manager (Prod)",
	        "SvcOffering": "Incentives & Master Data"
	    },
	    {
	        "ASNumber": "AS10622",
	        "AppService": "McKesson Medical Surgical Archived Databases (Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10623",
	        "AppService": "ETS - DBAOPS Ansible (Prod)",
	        "SvcOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS10627",
	        "AppService": "Produitsoptionplus Uniprix (Prod)",
	        "SvcOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS10635",
	        "AppService": "Google Suite Services - Canada (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10649",
	        "AppService": "Developer Services (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS1067",
	        "AppService": "Tableau Visualization Service (Prod)",
	        "SvcOffering": "Data Visualization Platform Management"
	    },
	    {
	        "ASNumber": "AS10676",
	        "AppService": "MSH IBM Planning/Analytics TM1 (Prod)",
	        "SvcOffering": "Enterprise Compliance"
	    },
	    {
	        "ASNumber": "AS10680",
	        "AppService": "RxTS-MPTS-MPTS Self Managed Support (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10681",
	        "AppService": "MPS EnterpriseRx (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10682",
	        "AppService": "ProPBM (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10683",
	        "AppService": "RxTS MPS PharmacyRx (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10684",
	        "AppService": "Value Added Network (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10685",
	        "AppService": "RxTS RHPS PPE (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10686",
	        "AppService": "PSaS MacroHelix 340B Architect (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10687",
	        "AppService": "Data Delivery (Data Services) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10689",
	        "AppService": "RxTS MPS Adherence Performance Solution (APS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10690",
	        "AppService": "RxTS MacroHelix NDC Architect (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10691",
	        "AppService": "RxTS CMM Prior Authorization Portal (Prod)",
	        "SvcOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10693",
	        "AppService": "Average Wholesale Price (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10694",
	        "AppService": "Easy Payment and Remittance (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10695",
	        "AppService": "ePrescribing Support (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10696",
	        "AppService": "RxTS RHPS Electronic Managed File Transfer (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10699",
	        "AppService": "RxTS CMM Clinical Alerts (Prod)",
	        "SvcOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS1070",
	        "AppService": "Identity and Access Management (McKesson Connect) (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS10700",
	        "AppService": "RxTS CMM Easy Button (Prod)",
	        "SvcOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10701",
	        "AppService": "RxTS CMM EHR Integrations (Prod)",
	        "SvcOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10702",
	        "AppService": "RxTS CMM EPA (Prod)",
	        "SvcOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10703",
	        "AppService": "RxTS CMM HubExpress (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10704",
	        "AppService": "CMM NetSuite (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10707",
	        "AppService": "ReportingRx (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10708",
	        "AppService": "COMSTAT (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10709",
	        "AppService": "RxTS MPS eService (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10710",
	        "AppService": "RxTS MPS PSM Pegasys (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10712",
	        "AppService": "Transaction Tester (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10713",
	        "AppService": "RxTS CMM Autobahn (Prod)",
	        "SvcOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10714",
	        "AppService": "CMM - Billing as a Service (BaaS) - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10715",
	        "AppService": "RxTS CMM SalesForce (Prod)",
	        "SvcOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10717",
	        "AppService": "Customer Profile System (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10719",
	        "AppService": "RxTS RHPS Prescriber Web Lookup (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10722",
	        "AppService": "MMS DCT Operations - Warehouse Control System (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS10729",
	        "AppService": "Retail_Loyalty_Database Azure Data Warehouse (Data mining) (Prod)",
	        "SvcOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS10730",
	        "AppService": "ETS - DBAOPS SQLDM (Prod)",
	        "SvcOffering": "Enterprise Infrastructure"
	    },
	    {
	        "ASNumber": "AS10738",
	        "AppService": "Pharmatek-Production (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10742",
	        "AppService": "Role Manager-Production (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10746",
	        "AppService": "DSI-Drug Spend Intelligence - Production (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10751",
	        "AppService": "RxO IT Operations (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10754",
	        "AppService": "3PL / Pharmacy system (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS10756",
	        "AppService": "PARATA Interface (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS10758",
	        "AppService": "INA SQL Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10761",
	        "AppService": "PROGRESS (Uniprix / Proxim ERP) (Prod)",
	        "SvcOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS10769",
	        "AppService": "iSeries Administration (Prod)",
	        "SvcOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS10774",
	        "AppService": "SPARK - Support Program Anomaly Record Keeper (Prod)",
	        "SvcOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS10777",
	        "AppService": "McKesson.com Big Query Project for Google Analytics Linking (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10790",
	        "AppService": "Magic Box (Well.ca) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10806",
	        "AppService": "Uniprix RH Management (Prod)",
	        "SvcOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS10820",
	        "AppService": "Concierge Product Catalog API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10825",
	        "AppService": "Dataguise (Prod)",
	        "SvcOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS10833",
	        "AppService": "Anaplan Connect - Margin Analyzer (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1084",
	        "AppService": "Bamboo Remote Agent (Prod)",
	        "SvcOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10842",
	        "AppService": "MLS Mulesoft Cloud integrations (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10843",
	        "AppService": "MLS Informatica Cloud Integrations (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10844",
	        "AppService": "MLS SalesForce Novartis Hub (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10846",
	        "AppService": "MMS Oracle VM Environment - (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1085",
	        "AppService": "(EASP) Enterprise Azure Services (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS10851",
	        "AppService": "Enterprise Data Quality for Product (EDQP) (Prod)",
	        "SvcOffering": "Strategy"
	    },
	    {
	        "ASNumber": "AS10858",
	        "AppService": "RxC Copay Business Intelligence Reporting Portal (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10859",
	        "AppService": "Customer Engagement SFDC Data Services (Prod)",
	        "SvcOffering": "Service Capabilities"
	    },
	    {
	        "ASNumber": "AS10861",
	        "AppService": "Cloud Operations Zabbix - Azure (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10868",
	        "AppService": "TABS SQL Server Cluster (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10869",
	        "AppService": "Marketplace Scrapes (Prod)",
	        "SvcOffering": "Commercial & Sales Analytics Service"
	    },
	    {
	        "ASNumber": "AS10873",
	        "AppService": "Uniprix Website (Prod)",
	        "SvcOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS10887",
	        "AppService": "Rapid 7 (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS10888",
	        "AppService": "Fax Services (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1089",
	        "AppService": "Netezza and Tableau (Prod)",
	        "SvcOffering": "Customer Relationship Management"
	    },
	    {
	        "ASNumber": "AS10890",
	        "AppService": "Prescriber (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10891",
	        "AppService": "ROAR - Reimbursement Application (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10892",
	        "AppService": "UHub Services (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10893",
	        "AppService": "MLS SalesForce Scottsdale Hub (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10894",
	        "AppService": "PAS (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10895",
	        "AppService": "Portals (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10897",
	        "AppService": "REMS - Endo Xiaflex (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10904",
	        "AppService": "IPO Home Health (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10907",
	        "AppService": "CDD (McKesson Automation Calibration Drug Database)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10909",
	        "AppService": "Proof of Delivery (POD) Streaming (Prod)",
	        "SvcOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS10914",
	        "AppService": "GALAPAGOS (Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10918",
	        "AppService": "BWise (Prod) (SaaS)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS10925",
	        "AppService": "MMS MDM - Master Data Management (Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10926",
	        "AppService": "MMS E3 JDA (Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10927",
	        "AppService": "MMS AR Payment Portal (Prod)",
	        "SvcOffering": "Innovation and Operations Enablement"
	    },
	    {
	        "ASNumber": "AS10928",
	        "AppService": "MMS BazaarVoice (Prod)",
	        "SvcOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10930",
	        "AppService": "MMS MBA (Prod)",
	        "SvcOffering": "MBA Reporting"
	    },
	    {
	        "ASNumber": "AS10931",
	        "AppService": "MMS MMP-E1 (Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10932",
	        "AppService": "PCS API Connectivity Services (Prod)",
	        "SvcOffering": "Connectivity"
	    },
	    {
	        "ASNumber": "AS10936",
	        "AppService": "MMS E1 Technology - Data Collection (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS10937",
	        "AppService": "MMS E1 Pricing (Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10940",
	        "AppService": "MMS StatWeb (Prod)",
	        "SvcOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS10941",
	        "AppService": "MMS EC/PC Quote Tool (Prod)",
	        "SvcOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS10942",
	        "AppService": "MMS PCI (Prod)",
	        "SvcOffering": "Accounts Receivable"
	    },
	    {
	        "ASNumber": "AS10943",
	        "AppService": "MMS PayPal (Prod)",
	        "SvcOffering": "Accounts Receivable"
	    },
	    {
	        "ASNumber": "AS10945",
	        "AppService": "MMS Ramilia (Prod)",
	        "SvcOffering": "Accounts Receivable"
	    },
	    {
	        "ASNumber": "AS10947",
	        "AppService": "McKesson Corporate - Change Auditor (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10948",
	        "AppService": "MMS Data Warehouse (Prod)",
	        "SvcOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS10950",
	        "AppService": "MMS EDW (Prod)",
	        "SvcOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS10953",
	        "AppService": "MMS Cust Engagement (Prod)",
	        "SvcOffering": "Service Capabilities"
	    },
	    {
	        "ASNumber": "AS10956",
	        "AppService": "MMS DocOrgin & JDEdwards (Prod)",
	        "SvcOffering": "Master Data"
	    },
	    {
	        "ASNumber": "AS10960",
	        "AppService": "Cisco UCCX (Prod)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS10969",
	        "AppService": "Cloud Platform Services - Pivotal Cloud Foundry - US East GCP (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10974",
	        "AppService": "Google Kubernetes Engine (GKE) - US East (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS10979",
	        "AppService": "Google Kubernetes Engine (GKE) - Northamerica Northeast2 (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS10980",
	        "AppService": "Google Kubernetes Engine (GKE) - Northamerica Northeast1 (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS10982",
	        "AppService": "Qliqsoft (SaaS) (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS10986",
	        "AppService": "Imperva SecureSphere Database Activity Monitoring Infrastructure US (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS10987",
	        "AppService": "Imperva Secure Sphere Database Activity Monitoring Infrastructure EU (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS10988",
	        "AppService": "Imperva SecureSphere Database Activity Monitoring Infrastructure CAN (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS10989",
	        "AppService": "MMS E1 EDI (Prod)",
	        "SvcOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS10990",
	        "AppService": "MMS EC EDI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11001",
	        "AppService": "MLS SalesForce Innovent Oncology  (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11006",
	        "AppService": "Supplylogix (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11015",
	        "AppService": "GPO Multisource Team(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11018",
	        "AppService": "Autodesk/Autocad Licence Service (Prod)",
	        "SvcOffering": "Marketing & Procurement"
	    },
	    {
	        "ASNumber": "AS1102",
	        "AppService": "HANA Native Security Integration and Strategy - GP3 (Prod)",
	        "SvcOffering": "Ent. SAP Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS11027",
	        "AppService": "RMG Digital Sign (Prod)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS11031",
	        "AppService": "Independent National Accounts (INA) SQL Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11032",
	        "AppService": "Maple Integration Server (Prod)",
	        "SvcOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS11034",
	        "AppService": "MMS E1 Accounts Payable / General Ledger/Tax (Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS11037",
	        "AppService": "Cornerstone Learning Management System - LMS (Prod) (SaaS)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS11040",
	        "AppService": "Consumer Products Group Linux Database and Web Hosting Servers (Prod)",
	        "SvcOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS11042",
	        "AppService": "MCF1 Multi-client CFaaS Memphis(Network)",
	        "SvcOffering": "Ent. Connectivity Technology Services"
	    },
	    {
	        "ASNumber": "AS11044",
	        "AppService": "SentinelOne (Prod)(SaaS)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS1105",
	        "AppService": "Robotic Process Automation (RPA) (Prod)",
	        "SvcOffering": "Automation"
	    },
	    {
	        "ASNumber": "AS11050",
	        "AppService": "Network Security Automation Services (Prod)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS11055",
	        "AppService": "Veracode Scan Appliances (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS11056",
	        "AppService": "Medical Specialties Distributors Prophet 21 (P21) SQL Database Server (Prod)",
	        "SvcOffering": "MMS Finance & Strategy Service Category"
	    },
	    {
	        "ASNumber": "AS11057",
	        "AppService": "Recovery Manager for Active Directory (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11059",
	        "AppService": "Veracode Dynamic Analysis Endpoint (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS11062",
	        "AppService": "Mckesson Specialty Health IBM Planning and Analytics (Prod)",
	        "SvcOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS11065",
	        "AppService": "Electronic Evidence Management General Counsel Organization (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11071",
	        "AppService": "DRaaS in GCP (Prod)",
	        "SvcOffering": "IT Resiliency & Disaster Recovery"
	    },
	    {
	        "ASNumber": "AS11082",
	        "AppService": "Canada Cisco Unity Connections Voicemail (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS11099",
	        "AppService": "LIS Instrument Server (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11102",
	        "AppService": "Manufacturers Reimbursement Support System – MARSS (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11106",
	        "AppService": "Cisco Unity Connections Voicemail (Prod)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS11107",
	        "AppService": "FindmyMeds (Prod)",
	        "SvcOffering": "Service Capabilities"
	    },
	    {
	        "ASNumber": "AS11121",
	        "AppService": "MMS E1 Accounts Receivable (Prod)",
	        "SvcOffering": "Accounts Receivable"
	    },
	    {
	        "ASNumber": "AS11125",
	        "AppService": "SSAS MSSQL Data Warehouse (Data mining) (Prod)",
	        "SvcOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS11127",
	        "AppService": "Diem Health (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11134",
	        "AppService": "MMS GV IBMi (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1114",
	        "AppService": "Identity and Access Management (MSH) (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11142",
	        "AppService": "Project Link version 2 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11144",
	        "AppService": "Palo Alto Network (PAN) Prisma Suite (Prod)",
	        "SvcOffering": "Ent. Infra. & Technology Projects"
	    },
	    {
	        "ASNumber": "AS11145",
	        "AppService": "MMS Proof of Delivery Service (Prod)",
	        "SvcOffering": "B2C E-Commerce"
	    },
	    {
	        "ASNumber": "AS11146",
	        "AppService": "AMP Government Pricing (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS11161",
	        "AppService": "PSAS Business Engagement (Prod)",
	        "SvcOffering": "Deal Pricing Modeling and Mgmt Service"
	    },
	    {
	        "ASNumber": "AS11168",
	        "AppService": "DigiCert TLS/SSL Certificate Services (Prod)",
	        "SvcOffering": "Identity & Access Management Service"
	    },
	    {
	        "ASNumber": "AS11169",
	        "AppService": "Keyfactor Certificate Management System (CMS,PKI) (Prod)",
	        "SvcOffering": "Identity & Access Management Service"
	    },
	    {
	        "ASNumber": "AS11170",
	        "AppService": "System Center Configuration Manager(SCCM) Distribution Points (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS11173",
	        "AppService": "MSSQL SSIS - ETL Driver - Data Warehouse (Prod)",
	        "SvcOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS11177",
	        "AppService": "RxToolkit (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11182",
	        "AppService": "API Access Management (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11184",
	        "AppService": "Sales Intelligence Management System (SIMS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11185",
	        "AppService": "iKnowMed G2 (RO) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11187",
	        "AppService": "GCP Service Monitoring (Prod) (SaaS)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS11188",
	        "AppService": "Cloud Operations Zabbix GKE (Google Kubernetes Engine) (On Prem) (PaaS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11189",
	        "AppService": "xTract (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11192",
	        "AppService": "JD Edwards - Pharmacy Technology Solutions (PTS) (Prod)",
	        "SvcOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS11193",
	        "AppService": "McKesson COVID Screening – Healthbot (Prod)",
	        "SvcOffering": "Ent. Gen AI"
	    },
	    {
	        "ASNumber": "AS11195",
	        "AppService": "IOG Storage Area Network (SAN) Infrastructure (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS11208",
	        "AppService": "CA Performance Management (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11210",
	        "AppService": "PAE Verint Call Transcripts Solution (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11212",
	        "AppService": "MMS EC ISERIES CORP (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS11214",
	        "AppService": "MMS EC ISERIES WEST (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS11217",
	        "AppService": "Amelia AI Platform (DR) (Prod)",
	        "SvcOffering": "Ent. Gen AI"
	    },
	    {
	        "ASNumber": "AS11222",
	        "AppService": "Ansible (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11225",
	        "AppService": "Xmedias On Prem (Prod)",
	        "SvcOffering": "Canada"
	    },
	    {
	        "ASNumber": "AS11227",
	        "AppService": "Windows Print Services - USON - MCA (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11229",
	        "AppService": "Nuance Auto Store - USON - Minnesota Oncology (MNO) (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11231",
	        "AppService": "Credentialing Server USON WMS (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11232",
	        "AppService": "File Server USON RMCC (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11233",
	        "AppService": "Print Server USON WMS (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11234",
	        "AppService": "MAS Financials Sage 100 (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11235",
	        "AppService": "Maple (Prod)",
	        "SvcOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS11239",
	        "AppService": "ELKAY Precision Medicine (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11240",
	        "AppService": "USON-TXO Honeywell ProWatch (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11242",
	        "AppService": "Dr Knox EMR Archive (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11243",
	        "AppService": "HP Web JetAdmin (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11245",
	        "AppService": "Zoho ManageEngine Asset Explorer (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11248",
	        "AppService": "AMAG / Symmetry Door Access System - USON - Minnesota Oncology (MNO) (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11249",
	        "AppService": "OnBase Replica - USON - Minnesota Oncology (MNO) (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS1125",
	        "AppService": "SSA -SharePoint 2016 Instance (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS11250",
	        "AppService": "MARS (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11257",
	        "AppService": "File Servers - TXO (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11258",
	        "AppService": "Nuance Output Manager - USON - Minnesota Oncology (MNO) (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11259",
	        "AppService": "BT Diamond Sapphire ISC DHCP Server (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11260",
	        "AppService": "File Server USON MOH (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11261",
	        "AppService": "File Server USON NYOH (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11262",
	        "AppService": "File Server USON VCS (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11263",
	        "AppService": "Windows Print Services - USON - Illinois Cancer Specialists (ICS) (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11264",
	        "AppService": "Windows Print Services - USON - RMCC (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11265",
	        "AppService": "Labdaq Server USON MOH (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11266",
	        "AppService": "Nexgen EHR USON MOH (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11268",
	        "AppService": "Web Server USON NYOH (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11270",
	        "AppService": "Laserfiche Document Repository USON VCS (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11271",
	        "AppService": "CAS SSO (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11272",
	        "AppService": "Patient Tools (PTI) - USON - Minnesota Oncology (MNO) (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11278",
	        "AppService": "QuickBooks (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11280",
	        "AppService": "File Server USON WMS (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11281",
	        "AppService": "Microsoft Great Plains (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11282",
	        "AppService": "Terminal Server USON WMS (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11285",
	        "AppService": "File/Print Server USON NE Queens (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11286",
	        "AppService": "Alarm Lock- DL - Windows (Door Lock) USON - RMCC (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11287",
	        "AppService": "FIle/Print Server USON NE Brooklyn (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11288",
	        "AppService": "Assure ID - USON - RMCC (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11289",
	        "AppService": "File/Print  Server USON NE Columbus (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11290",
	        "AppService": "Nuance Output Manager - USON - Affiliated Oncologists (AFFO) (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11291",
	        "AppService": "Nuance Auto Store - USON - Affiliated Oncologists (AFFO) (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11292",
	        "AppService": "File Server - USON - Illinois Cancer Specialists (ICS) (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11294",
	        "AppService": "File/Print Server USON NE Providence (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11297",
	        "AppService": "File/Print Server USON NE Hope (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11300",
	        "AppService": "McKesson Specialty Health Portal (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11305",
	        "AppService": "Quality Software Systems LabHealth (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11306",
	        "AppService": "File Server USON NE Exton (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11308",
	        "AppService": "Alerton Ascent Environmental Control - USON - Minnesota Oncology (MNO) (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11309",
	        "AppService": "Business Works - USON - Minnesota Oncology (MNO) (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS1131",
	        "AppService": "ClarusOne (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11311",
	        "AppService": "SAP Workforce Performance Builder (SWPB) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11315",
	        "AppService": "PMD Charge Capture Interface (Allina Hospital) - USON - Minnesota Oncology (MNO) (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11316",
	        "AppService": "Jenkins (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11319",
	        "AppService": "Windows Print Services - USON - IL-JV (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11321",
	        "AppService": "Splunk",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS11327",
	        "AppService": "Mutare - USON RMCC (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11328",
	        "AppService": "USON Employee Portal SCC (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11329",
	        "AppService": "USON File Server SCC (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS1133",
	        "AppService": "Palo Alto Networks User ID agent servers (Prod)",
	        "SvcOffering": "Ent Network Services"
	    },
	    {
	        "ASNumber": "AS11330",
	        "AppService": "US Oncology (USON) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11331",
	        "AppService": "Physician Outreach Program (POP) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11333",
	        "AppService": "USON Interface Server SCC (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11334",
	        "AppService": "USON SQL Server SCC (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11337",
	        "AppService": "Local Marketing Support Gateway (LMS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11339",
	        "AppService": "File/Print Server USON NE OHC (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11340",
	        "AppService": "Socialworker (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11341",
	        "AppService": "File/Print Server USON NE BRCC (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11342",
	        "AppService": "File/Print Server USON NE Evansville (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11343",
	        "AppService": "File/Print Server USON NE Kentuckiana (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11344",
	        "AppService": "File/Print Server USON NE VOA (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11346",
	        "AppService": "ISRM Prisma Cloud (Prod) (SaaS)",
	        "SvcOffering": "Security Architecture & Strategy"
	    },
	    {
	        "ASNumber": "AS11348",
	        "AppService": "Google Cloud Security Command Center (Prod) (SaaS)",
	        "SvcOffering": "Security Architecture & Strategy"
	    },
	    {
	        "ASNumber": "AS11349",
	        "AppService": "ISRM Cloud DevSecOps Infrastructure Tool (Prod) (SaaS)",
	        "SvcOffering": "Security Architecture & Strategy"
	    },
	    {
	        "ASNumber": "AS1135",
	        "AppService": "Pivotal Cloud Foundry - Azure West (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS11352",
	        "AppService": "Azure Security Center (Prod) (SaaS)",
	        "SvcOffering": "Security Architecture & Strategy"
	    },
	    {
	        "ASNumber": "AS11353",
	        "AppService": "Drug Temp Monitoring USON NE VOA (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11358",
	        "AppService": "Forescout NAC (Prod)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS11359",
	        "AppService": "File Server USON NE VO RBO (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS1136",
	        "AppService": "MMS ElasticStack Advanced Analytics for Simone (Prod)",
	        "SvcOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS11361",
	        "AppService": "Windstream Phone System (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11362",
	        "AppService": "Print Server USON NE VO RBO (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11363",
	        "AppService": "USON File Server GCCC (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11364",
	        "AppService": "USON NAS CCCB (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11365",
	        "AppService": "USON Domain Controller CCCB (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11367",
	        "AppService": "USON Print Server CCCB (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11369",
	        "AppService": "USON File Server RCOG (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11371",
	        "AppService": "USON Print Server RCOG (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11372",
	        "AppService": "USON File Server SFOH (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11373",
	        "AppService": "USON File Server ICCC (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11375",
	        "AppService": "Palo Alto CASB (SaaS)- Prod",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS11377",
	        "AppService": "MPS Salesforce Instance (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11379",
	        "AppService": "McAfee End Point Security (EU) (Prod)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS11380",
	        "AppService": "MPS&A Merchant Services (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11381",
	        "AppService": "MPS&A Customer 360 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11384",
	        "AppService": "McAfee End Point Security (USON) (Prod)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS11385",
	        "AppService": "MPS&A Partner Services Data Rights (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11387",
	        "AppService": "LeanIX (Prod) (SaaS)",
	        "SvcOffering": "Enterprise Architecture"
	    },
	    {
	        "ASNumber": "AS11391",
	        "AppService": "Azure Data Factory (ADF) (Prod)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS11393",
	        "AppService": "MPTS Reporting Service (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11395",
	        "AppService": "USON File Server SRPCTC (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11399",
	        "AppService": "MPTS One Cloud File Services (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11400",
	        "AppService": "Zoom - USON RMCC (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11401",
	        "AppService": "Avigilon Access Control System- USON MTWRBO (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11402",
	        "AppService": "Great Plains OHC (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11405",
	        "AppService": "Imperva - WAF-Prod-SaaS",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS11407",
	        "AppService": "MPTS VMWare in Relay Health (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11408",
	        "AppService": "Ansible Patching Automation (Prod)",
	        "SvcOffering": "IT Resiliency & Disaster Recovery"
	    },
	    {
	        "ASNumber": "AS11415",
	        "AppService": "USON Print Server SRPCTC (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11417",
	        "AppService": "ISRM Splunk ES - Search Heads (Prod)",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS11418",
	        "AppService": "Beeline (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11419",
	        "AppService": "MPTS VMWare Section (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1142",
	        "AppService": "PSaS Customer Experience Operations - Intradiem (Prod)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS11420",
	        "AppService": "CultivateAI (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11421",
	        "AppService": "MPS Product Training Lab (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11422",
	        "AppService": "Fidelity Stock Plan Services (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11424",
	        "AppService": "MPS ERX Test Automation (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11425",
	        "AppService": "Pacific Office Automation Scanning,Storage and Printing (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11430",
	        "AppService": "AOA Sharepoint (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11431",
	        "AppService": "MPS Pharmaserv Labs (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11433",
	        "AppService": "MPS Data Conversions Section (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11434",
	        "AppService": "Incapsula WAF Config Check Automation (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS11438",
	        "AppService": "IBP - Compass (Prod)",
	        "SvcOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS11439",
	        "AppService": "IBP-FLU Vaccines (Prod)",
	        "SvcOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS1144",
	        "AppService": "Microsoft SCCM Production NAMCK & CA(Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS11440",
	        "AppService": "IBP - Inventory Adjustment UI Application (Prod)",
	        "SvcOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS11441",
	        "AppService": "IBP - NorthStar (Prod)",
	        "SvcOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS11445",
	        "AppService": "Beverly Hills File Server (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11446",
	        "AppService": "AOA LibertyNet Server (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11447",
	        "AppService": "Campbell File Server (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11452",
	        "AppService": "MPTS Livonia Net Backup Services Section (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11453",
	        "AppService": "SBROPWVPR001 USON - WEST (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11454",
	        "AppService": "MPTS Directory Services Section (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11455",
	        "AppService": "AOA Lenel Securty Badge System (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11456",
	        "AppService": "MPS Livonia Production Customer Build (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11457",
	        "AppService": "Riverside Image Server (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11460",
	        "AppService": "File and Print Server (NCSP) (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11461",
	        "AppService": "MPS Livonia Test Customer Build (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11463",
	        "AppService": "Legacy RxTPL ERP System (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS11464",
	        "AppService": "Temecula File Server  (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11466",
	        "AppService": "AOA MTSOA Nuance Shadowlink Transcription HL7 Interface (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11468",
	        "AppService": "Legacy RxTPL WMS System (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS11470",
	        "AppService": "MSH - Oracle (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11475",
	        "AppService": "Black Box - De-Id (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11476",
	        "AppService": "MSH - MicroSoft SQL Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11478",
	        "AppService": "Blackhawk Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1148",
	        "AppService": "SOC Tools Server (Prod)",
	        "SvcOffering": "Cyber Detect & Respond Service"
	    },
	    {
	        "ASNumber": "AS11480",
	        "AppService": "Moon TWP ERX Off Hours Production Support (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11481",
	        "AppService": "MPSA Siebel eService (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11482",
	        "AppService": "MPS Livonia Shipping (ShipManager) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11484",
	        "AppService": "Audio Visual (AV) Equipment (Prod)",
	        "SvcOffering": "In-Office Employee Enablement"
	    },
	    {
	        "ASNumber": "AS11485",
	        "AppService": "Clinical Applications Tools Server USON (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11489",
	        "AppService": "MaxRVU (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11493",
	        "AppService": "MPS / Datto RMM (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11494",
	        "AppService": "McKesson Printing Press Application (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11503",
	        "AppService": "OKTA Cloud Identity Platform (Customer) (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11506",
	        "AppService": "McKesson Passport (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11514",
	        "AppService": "Sales Admin Virtual Desktop Space (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11515",
	        "AppService": "Enterprise Data Warehouse/SDW (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11516",
	        "AppService": "ClinOne eConsent (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11521",
	        "AppService": "Okta Advanced Server Access (ASA) (Prod) (SaaS)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11524",
	        "AppService": "The Mortgage Office - TMO - Amazon Workspaces (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11525",
	        "AppService": "Baker Hill NextGen (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11527",
	        "AppService": "Lynx Practice Intelligence (PI) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11528",
	        "AppService": "Stratozone Solution (Prod) (SaaS)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11529",
	        "AppService": "Lynx Analytics (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1153",
	        "AppService": "Labsco LSCSales Virtual Server (Prod)",
	        "SvcOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS11530",
	        "AppService": "Lynx Practice Management Interface (LPMI) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11542",
	        "AppService": "Corporation Service Company - CSC - cscglobal.com (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11549",
	        "AppService": "(MSH) McKesson Speciality Health SAP Business Warehouse System – BP1 (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS11550",
	        "AppService": "Migrate For Compute Engine (M4CE) (Prod)",
	        "SvcOffering": "Connectivity"
	    },
	    {
	        "ASNumber": "AS11557",
	        "AppService": "(OTS) Operation Technology Security Expedition VM (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS1156",
	        "AppService": "Directory Services Applications DSAP (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11562",
	        "AppService": "RBG Uniprix ECommerce (Prod)",
	        "SvcOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS11565",
	        "AppService": "Stealthwatch ISE PIC (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11572",
	        "AppService": "MMS E1 Technology - JDE 9.2 Enterprise Servers (Prod)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS11593",
	        "AppService": "DocuFlow-RxCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11595",
	        "AppService": "Regimen Profiler 2.0 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11596",
	        "AppService": "LMT4 - MRxTS Longmont Office (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11597",
	        "AppService": "McKesson Specialty Health Data Warehouse Compliance Snapshots (Prod)",
	        "SvcOffering": "Practice Integration"
	    },
	    {
	        "ASNumber": "AS11599",
	        "AppService": "Azure Kubernetes Services (AKS) - Canada Central (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS11600",
	        "AppService": "McKesson Enterprise Messaging Service (MEMS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11609",
	        "AppService": "iSOC Tines (Prod)",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS11610",
	        "AppService": "iSOC - Tools (Prod)",
	        "SvcOffering": "Cyber Detect & Respond Service"
	    },
	    {
	        "ASNumber": "AS11612",
	        "AppService": "TrendMicro Anti-Virus - PTS (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11633",
	        "AppService": "Shared Compute (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11634",
	        "AppService": "Print Server Uniprix/Proxim (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS11638",
	        "AppService": "MasterControl Cloud (Canada) (Prod)(SaaS)",
	        "SvcOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS11639",
	        "AppService": "EnterpriseRx - USON (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11644",
	        "AppService": "Print Services for RxCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS11646",
	        "AppService": "Print Services for Grapevine (GRP3) (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS11648",
	        "AppService": "File Shares (Canada)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11656",
	        "AppService": "Niagara/Smart Building (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11658",
	        "AppService": "Master Data Management Data Analysis & Reporting (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1173",
	        "AppService": "Kafka Message Bus Azure (Prod)",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS1174",
	        "AppService": "Clarus (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1177",
	        "AppService": "RxPak - Packaging Production OSM (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20041",
	        "AppService": "Triplog",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20057",
	        "AppService": "BizzDesign Pilot",
	        "SvcOffering": "Digital Transformation and Enablement"
	    },
	    {
	        "ASNumber": "AS20073",
	        "AppService": "Remote Access Jump Server Canada",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS20125",
	        "AppService": "MMS - KPI Pick to Light - DC251 Bartlett",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20133",
	        "AppService": "MMS - KPI Pick to Light - DC74 Roseville",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20137",
	        "AppService": "MMS - Honeywell / Intelligrated Pick to Light - DC75 Lehigh Valley",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20141",
	        "AppService": "MMS - Honeywell / Intelligrated Pick to Light - DC60 Grapevine",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20145",
	        "AppService": "MMS - Honeywell / Intelligrated BOSS Routing Technology - DC16 Houston",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20149",
	        "AppService": "MMS - Honeywell / Intelligrated BOSS Routing Technology - DC07 Winchester",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20153",
	        "AppService": "MMS - Honeywell / Intelligrated BOSS Routing Technology - DC81 Chino",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20157",
	        "AppService": "MMS - Honeywell / Intelligrated BOSS Routing Technology - DC10 Charlotte",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20161",
	        "AppService": "MMS - WSI Conveyor PLC - DC251 Bartlett",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20165",
	        "AppService": "MMS - WSI Conveyor PLC - DC74 Roseville",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20169",
	        "AppService": "MMS - WSI Conveyor PLC - DC252 Orlando",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20173",
	        "AppService": "MMS - KPI WCS Technology - DC251 Bartlett",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20177",
	        "AppService": "MMS - KPI WCS Technology - DC60 Grapevine",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20181",
	        "AppService": "MMS - KPI WCS Technology - DC74 Roseville",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20187",
	        "AppService": "MMS - KPI WCS Technology - DC75 Lehigh Valley",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20191",
	        "AppService": "MMS - KPI WCS Technology - DC07 Winchester",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20195",
	        "AppService": "MMS - KPI WCS Technology - DC81 Chino",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20199",
	        "AppService": "MMS - KPI WCS Technology - DC10 Charlotte",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20209",
	        "AppService": "MMS - KPI WCS Technology - DC16 Houston",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20213",
	        "AppService": "MMS - KPI WCS Technology - DC252 Orlando",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20217",
	        "AppService": "MMS - KPI WCS Technology - DC254 Denver",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20223",
	        "AppService": "MMS - KPI WCS Technology - DC Seattle",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20227",
	        "AppService": "Citrix Azure Resource Groups",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS20247",
	        "AppService": "Optimizely",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20273",
	        "AppService": "ScriptMed Cloud",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS20281",
	        "AppService": "Vidyard-CORP",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20331",
	        "AppService": "Twilio Programmable Voice - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20337",
	        "AppService": "ontada-carequality-requestor",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20341",
	        "AppService": "ontada-ipv",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20345",
	        "AppService": "ProWatch Access Panel (Prod)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS20349",
	        "AppService": "Security IP Cameras (Prod)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS20353",
	        "AppService": "MaxPro NVR (Prod)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS20357",
	        "AppService": "IDS System (Prod)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS20361",
	        "AppService": "MaxPro VMS (Prod)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS20365",
	        "AppService": "Daily import job",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20369",
	        "AppService": "Daily Export Job",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20373",
	        "AppService": "Monthly claim data import",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20411",
	        "AppService": "Asana - Prod",
	        "SvcOffering": "PSAS Supporting Functions"
	    },
	    {
	        "ASNumber": "AS20479",
	        "AppService": "Canada Central Fill VBM Technology ONTARIO - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20493",
	        "AppService": "Salesforce - MMS CPQ",
	        "SvcOffering": "Service Capabilities"
	    },
	    {
	        "ASNumber": "AS20507",
	        "AppService": "Verint",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20516",
	        "AppService": "UNIPRIX.LOCAL Active Directory Forest (Prod)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS20538",
	        "AppService": "Chargeback - RxCrossroads Mason (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS20550",
	        "AppService": "ISMC (Independent Small/Medium Chain) Store Churn (Prod)",
	        "SvcOffering": "Adv. Data Science Services: MLOPs"
	    },
	    {
	        "ASNumber": "AS20561",
	        "AppService": "Data Management Infrastructure Prod (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20566",
	        "AppService": "TOAD Data Point (Prod)",
	        "SvcOffering": "Ent. Infra. & Technology Projects"
	    },
	    {
	        "ASNumber": "AS20567",
	        "AppService": "CCDA (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20579",
	        "AppService": "Central Azure vision service (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20583",
	        "AppService": "Pricing Service Configuration Application & Service",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20587",
	        "AppService": "MMS E1 ISERIES (Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS20591",
	        "AppService": "MMS - Sealed Air Ipack Lidder - DC251 Bartlett",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20599",
	        "AppService": "MMS - Sealed Air Ipack Lidder - DC75 Lehigh Valley",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20612",
	        "AppService": "Five9 MCA (Prod)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS20613",
	        "AppService": "MMS - Sealed Air Ipack Lidder - DC252 Orlando",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20616",
	        "AppService": "Microsoft SQL Shared DB (Prod)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS20617",
	        "AppService": "MMS - Sealed Air Ipack Lidder - DC60 Grapevine",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20624",
	        "AppService": "PDQ BAP Application (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20627",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC251 Bartlett",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20631",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC60 Grapevine",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20635",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC75 Lehigh Valley",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20636",
	        "AppService": "Microsoft InTune (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS20638",
	        "AppService": "Serialization Display Tool (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20639",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC07 Winchester",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20640",
	        "AppService": "NorthStar RX LLC (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20642",
	        "AppService": "NorthStar Travel Cost Planner (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20643",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC81 Chino",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20646",
	        "AppService": "Password Management Utility (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS20647",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC74 Roseville",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20651",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC16 Houston",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20652",
	        "AppService": "NewCrop (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20655",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC252 Orlando",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20659",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - Seattle",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20660",
	        "AppService": "Apple Business Manager (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS20668",
	        "AppService": "Armis Network Security Monitoring Tool (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS20674",
	        "AppService": "Quill (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20676",
	        "AppService": "One View Data Warehouse (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20680",
	        "AppService": "G4 (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS20683",
	        "AppService": "MMS - Honeywell/ Intelligrated Conveyor PLC - DC60 Grapevine",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20686",
	        "AppService": "MSH AMP Compliance and Daily Sales Reporting (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20687",
	        "AppService": "MMS - Honeywell/ Intelligrated Conveyor PLC - DC75 Lehigh Valley",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20694",
	        "AppService": "Alfresco (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20696",
	        "AppService": "Global Entity Management System - North America (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20697",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 07 Winchester",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20700",
	        "AppService": "MLS Copay DW Job Scheduling Engine (LWR) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20701",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 03 Kansas City",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20702",
	        "AppService": "MLS Reference Data (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20705",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 04 Atlanta",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20706",
	        "AppService": "Hyper-V Servers (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20711",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 10 Charlotte",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20719",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 16 Houston",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20727",
	        "AppService": "MMS - KPI Routing Technology - DC72 Columbus",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20731",
	        "AppService": "MMS - KPI Routing Technology - DC04 Atlanta",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20735",
	        "AppService": "MMS - KPI Routing Technology - DC03 Kansas City",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20738",
	        "AppService": "RxCrossroads Scottsdale PAS/RAAS Customer Business Analytics Environment/RAAS Data Warehouse (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20739",
	        "AppService": "MMS - KPI Routing Technology - DC82 Phoenix",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20743",
	        "AppService": "MMS - KPI Routing Technology - DC65 Northborough",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20751",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 21 Rogers",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20755",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 60 Grapevine",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20759",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 65 Northborough",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20760",
	        "AppService": "IPFolio (Prod) (SaaS)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20762",
	        "AppService": "ReflexRx (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20763",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 72 Columbus",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20766",
	        "AppService": "Technology Solutions Application (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20767",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 74 Roseville",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20768",
	        "AppService": "CBT Purchase Order Tracking System (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20770",
	        "AppService": "Legal Fees (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20771",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 75 Lehigh Valley",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20774",
	        "AppService": "Workiva (Prod) (SaaS)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20775",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 81 Chino",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20776",
	        "AppService": "Legal Hold Pro (Prod) (SaaS)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20779",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 82 Phoenix",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20782",
	        "AppService": "PTMS (Property Tax Made Simple) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20786",
	        "AppService": "PTDB Snowflake (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20788",
	        "AppService": "Onit (Prod) (SaaS)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20792",
	        "AppService": "BoardVantage (SaaS)",
	        "SvcOffering": "Executive Support"
	    },
	    {
	        "ASNumber": "AS20793",
	        "AppService": "MMS - Veritiv Strapping Machine - DC Seattle",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20794",
	        "AppService": "Legal Tracker (Prod) (SaaS)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20796",
	        "AppService": "RJS EC AS400 (Prod)",
	        "SvcOffering": "MMS Finance & Strategy Service Category"
	    },
	    {
	        "ASNumber": "AS20797",
	        "AppService": "MMS - Veritiv Strapping Machine - DC251 Bartlett",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20801",
	        "AppService": "MMS - Veritiv Strapping Machine - DC252 Orlando",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20805",
	        "AppService": "MMS - Veritiv Strapping Machine - DC254 Denver",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20808",
	        "AppService": "Genie (Prod) (SaaS)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20812",
	        "AppService": "NetDocuments (SaaS)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20821",
	        "AppService": "Twilio-CPH",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20822",
	        "AppService": "Trane Tracer (HVAC System CAN) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20841",
	        "AppService": "MMS - GSI Spray Printing - DC251 Bartlett",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20845",
	        "AppService": "MMS - GSI Spray Printing - DC252 Orlando",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20846",
	        "AppService": "Great Plains - Vantage Oncology (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS20849",
	        "AppService": "MMS - OPEX Perfect Pick - DC251 Bartlett - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20855",
	        "AppService": "MMS - OPEX Perfect Pick - DC252 Orlando - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20858",
	        "AppService": "ProKnow (SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS20861",
	        "AppService": "MMS - OPEX Perfect Pick - DC60 Grapevine - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20862",
	        "AppService": "Customer Dashboard/Client Poral -RxCrossroads Mason (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS20878",
	        "AppService": "RBG - Uniprix - TELUS POS (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20880",
	        "AppService": "RBG - QC - Horarius (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20888",
	        "AppService": "RBG - QC - Assyst-Rx / Assyst-Rx - WCF Interface (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20890",
	        "AppService": "RBG - Proxim - SIR POS (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20892",
	        "AppService": "RBG - Proxim - TELUS POS (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20894",
	        "AppService": "RBG - Uniprix - SIR POS 3.2 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20895",
	        "AppService": "Baxter HIlrom Voalte Nurse Call (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS20906",
	        "AppService": "Tableau (ClarusONE) SaaS",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20908",
	        "AppService": "ClarusONE - User Password Reset Portal (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20916",
	        "AppService": "RBG - QC - Mon Plan De Renouvellement (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20919",
	        "AppService": "MMS - OPEX Perfect Pick - DC75 Lehigh Valley - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20920",
	        "AppService": "RBG - QC - Logipharm (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20925",
	        "AppService": "MMS - OPEX Perfect Pick - DC74 Roseville - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20929",
	        "AppService": "MMS - OPEX Perfect Pick - DC81 Chino - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20933",
	        "AppService": "MMS - FoldSerter for Distribution Center Seattle",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20946",
	        "AppService": "RBG - SiteCore Middleware (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20954",
	        "AppService": "RBG - Medicine Shoppe - Public Website (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20955",
	        "AppService": "MMS - Sealed Air Dunnage - DC 251 Bartlett",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20956",
	        "AppService": "RBG - Proxim - Public Website (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20961",
	        "AppService": "MMS - Sealed Air Dunnage - DC 75 Lehigh Valley",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20965",
	        "AppService": "MMS - Sealed Air Dunnage - DC 252 Orlando",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20966",
	        "AppService": "RBG - Uniprix - Public Website / Gift Card Balance Website (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20968",
	        "AppService": "Guardian-IDA-Remedy'sRx Website (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20969",
	        "AppService": "MMS - Sealed Air Dunnage - DC 60 Grapevine",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20972",
	        "AppService": "RBG - Proxim - Mobile App (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20988",
	        "AppService": "Global SAP BW/BI (ABAP) / CB1 / COPA (BW Systems) (Prod)",
	        "SvcOffering": "Enterprise Compliance"
	    },
	    {
	        "ASNumber": "AS20992",
	        "AppService": "Concur (North America) (Prod)",
	        "SvcOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS21021",
	        "AppService": "Powertech antivirus (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS21036",
	        "AppService": "CVent (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21052",
	        "AppService": "Elekta SmartClinic (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21060",
	        "AppService": "SharePoint Canada (Prod)",
	        "SvcOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS21076",
	        "AppService": "SalesTrak (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS21082",
	        "AppService": "iReg Attendee Registration for IdeaShare (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21086",
	        "AppService": "Gumbo Mail (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21090",
	        "AppService": "Robot HelpSystems (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21094",
	        "AppService": "Enterprise Data Warehouse (MSHEDW)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21102",
	        "AppService": "Netradyne (SAAS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21106",
	        "AppService": "EV.Cloud - USON (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS21115",
	        "AppService": "Clearview (Prod)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS21118",
	        "AppService": "Stack Overflow (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21119",
	        "AppService": "McKesson Enterprise PKI (Prod)",
	        "SvcOffering": "Identity & Access Management Service"
	    },
	    {
	        "ASNumber": "AS21120",
	        "AppService": "Health Language Inc (HLI) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21122",
	        "AppService": "Shortel (Biologics) (Prod)",
	        "SvcOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS21128",
	        "AppService": "OpenClinica 4.0 (SaaS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21135",
	        "AppService": "Remodulin RPIM MSAccess DB application (Prod)",
	        "SvcOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS21149",
	        "AppService": "FullStory - Ontada (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21150",
	        "AppService": "Faxfinder (Bioloigcs) (Prod)",
	        "SvcOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS21172",
	        "AppService": "McKesson Patient Assistance Service (MPAS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21178",
	        "AppService": "OpenClinica 3.0 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21182",
	        "AppService": "SupplyLink MMS Platform (Prod)",
	        "SvcOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS21186",
	        "AppService": "RxC-Datastage (Prod)",
	        "SvcOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21188",
	        "AppService": "Saviynt - Prod (SAAS)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS21189",
	        "AppService": "RRD Print Services (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21190",
	        "AppService": "RxC-Tableau (Prod)",
	        "SvcOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21192",
	        "AppService": "RxC-Snowflake (Pharmacy Data Warehouse) (Prod)",
	        "SvcOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21196",
	        "AppService": "RxC-Mulesoft (Prod)",
	        "SvcOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21197",
	        "AppService": "CyberArk EPM (Prod)",
	        "SvcOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS21200",
	        "AppService": "RxC-Logicor (Prod)",
	        "SvcOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21204",
	        "AppService": "RxCrossroads Central Fill - Louisville, KY  (Prod)",
	        "SvcOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21208",
	        "AppService": "USON Active Directory Federation Services (ADFS) (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS21210",
	        "AppService": "CyberGRX (Prod) (SaaS)",
	        "SvcOffering": "Business Engagement (BISO)"
	    },
	    {
	        "ASNumber": "AS21222",
	        "AppService": "Citrix Production EU (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS21226",
	        "AppService": "Blackline Journal Entry  (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21232",
	        "AppService": "AbsorbLMS (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21236",
	        "AppService": "Bio-Tableau (Prod)",
	        "SvcOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS21238",
	        "AppService": "Bio-Snowflake (Pharmacy Data Warehouse) / Bio-Datastage (Prod)",
	        "SvcOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS21243",
	        "AppService": "VOIP USON Telecom (Prod)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS21244",
	        "AppService": "Bio-Snowflake (Pharmacy Data Warehouse) (Prod)",
	        "SvcOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS21247",
	        "AppService": "Ontada Developer Program (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21280",
	        "AppService": "USON DHCP Service (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS21284",
	        "AppService": "Lucidchart (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21292",
	        "AppService": "USON Directory Services Tools Service (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS21294",
	        "AppService": "CFM (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21298",
	        "AppService": "PharmaVelocity (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21300",
	        "AppService": "PTSJiraConfluence (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21312",
	        "AppService": "IntakeQ (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21314",
	        "AppService": "Zoom (Canada) (Prod) (SaaS)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS21317",
	        "AppService": "Hubspot-Prod (SaaS)",
	        "SvcOffering": "Customer Reporting and Analytics"
	    },
	    {
	        "ASNumber": "AS21344",
	        "AppService": "ARK (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21346",
	        "AppService": "Alteryx - ClarusONE (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21354",
	        "AppService": "Intralink M&A Document Exchange (Prod) (SaaS)",
	        "SvcOffering": "MMS Finance & Strategy Service Category"
	    },
	    {
	        "ASNumber": "AS21386",
	        "AppService": "H-ISAC (Prod) (SaaS)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS21388",
	        "AppService": "Threat Connect (Prod) (SaaS)",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS21392",
	        "AppService": "SHDATA (Prod)",
	        "SvcOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS21400",
	        "AppService": "Symedical (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21413",
	        "AppService": "Uniflow On-Prem- Prod",
	        "SvcOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS21422",
	        "AppService": "Thales (Prod)",
	        "SvcOffering": "Security Architecture & Strategy Service"
	    },
	    {
	        "ASNumber": "AS21430",
	        "AppService": "Cash Application Payment Engine (CAPE) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21434",
	        "AppService": "SECA Automation Workflows (Prod)",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS21440",
	        "AppService": "Deepscribe (SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21446",
	        "AppService": "McKesson.com and Related Sites (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21463",
	        "AppService": "Ontada-Marketplace (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21468",
	        "AppService": "Expedition FW Log Analysis (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21472",
	        "AppService": "Distribution Center Analytics Toolkit (DCAT) (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS21483",
	        "AppService": "SentinelOne Mobile Security (Prod)(SaaS)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS21490",
	        "AppService": "Esker On Demand Document Processing (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21494",
	        "AppService": "Honeywell MaxPro VMS and NVR (Canada)(Prod)",
	        "SvcOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS21506",
	        "AppService": "RxTS CMM Hubble (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21530",
	        "AppService": "RxTS CMM Slack (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21532",
	        "AppService": "RxTS CMM AMP (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21538",
	        "AppService": "RxTS CMM Queutopia (Prod)",
	        "SvcOffering": "IT Governance, Risk & Compliance"
	    },
	    {
	        "ASNumber": "AS21541",
	        "AppService": "Amelia Teams Integration- Prod (SaaS)",
	        "SvcOffering": "Ent. Gen AI"
	    },
	    {
	        "ASNumber": "AS21549",
	        "AppService": "Conga - Ontada- Prod (SaaS)",
	        "SvcOffering": "Customer Reporting and Analytics"
	    },
	    {
	        "ASNumber": "AS21557",
	        "AppService": "Konica Minolta Dispatcher (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21558",
	        "AppService": "EnterpriseRx Data Insights (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21560",
	        "AppService": "McKesson PrescribeIT Connector Service (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21580",
	        "AppService": "FireEye (Prod)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS21586",
	        "AppService": "Azure Kubernetes Services (AKS) - West US (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS21590",
	        "AppService": "B2C eCommerce Shared Services (Prod) (SaaS)",
	        "SvcOffering": "B2C E-Commerce"
	    },
	    {
	        "ASNumber": "AS21601",
	        "AppService": "SourceSpace (ClarusONE) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21607",
	        "AppService": "Eptura Workplace (iOffice)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21614",
	        "AppService": "Transportation Data Pipeline (Prod)",
	        "SvcOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS21627",
	        "AppService": "MC-CFaaS Cloud Reporting (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21634",
	        "AppService": "MyCarePlan (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21677",
	        "AppService": "Prime Vision (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS21680",
	        "AppService": "DCS Viewer (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21686",
	        "AppService": "Diamond by K&S (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21702",
	        "AppService": "Dymo Label (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS21708",
	        "AppService": "Emanager (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21716",
	        "AppService": "Digitize.AL (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21718",
	        "AppService": "Empathiq (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21724",
	        "AppService": "ESI (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21730",
	        "AppService": "FreshLoc Temperature Monitoring (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21734",
	        "AppService": "ImRT by IBA (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21738",
	        "AppService": "Karisys (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21748",
	        "AppService": "Lucent (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21752",
	        "AppService": "Lynx PT (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21756",
	        "AppService": "Matrixx by IBA (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21770",
	        "AppService": "NEC PBX (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21774",
	        "AppService": "Nortel (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21782",
	        "AppService": "One App Pro (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21808",
	        "AppService": "Prairie Fyre (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21816",
	        "AppService": "QA Beamchecker Plus by IBA (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21820",
	        "AppService": "Samsung PBX (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21822",
	        "AppService": "ScanAllPro by Fujitsu (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS21828",
	        "AppService": "Scanner by Docketport (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS21832",
	        "AppService": "Surgimate (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21841",
	        "AppService": "Clinical Information Service(CIS) - Prod-SaaS",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21842",
	        "AppService": "Synapse (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21848",
	        "AppService": "QA Sterocheck 1.4 by IBA (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21850",
	        "AppService": "Tetra (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21852",
	        "AppService": "TouchMD (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21856",
	        "AppService": "UniPrintClient (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS21862",
	        "AppService": "Zynomed (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21894",
	        "AppService": "Canada Specialty SSRS (Prod)",
	        "SvcOffering": "Canada Data & Analytics"
	    },
	    {
	        "ASNumber": "AS21895",
	        "AppService": "MMS - Sealed Air Ipack Tray Former - DC251 Bartlett (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21899",
	        "AppService": "MMS - Sealed Air Ipack Tray Former - DC 75 Lehigh Valley (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21903",
	        "AppService": "MMS - Sealed Air Ipack Tray Former - DC252 Orlando (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21907",
	        "AppService": "MMS - Sealed Air Ipack Tray Former - DC60 Grapevine (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21911",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 07 Winchester (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21916",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 03 Kansas City (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21918",
	        "AppService": "Ambry CARE (Prod) (SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21922",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 04 Atlanta (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21926",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 10 Charlotte (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21930",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 16 Houston (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21934",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 21 Rogers (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21940",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 60 Grapevine (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21949",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 65 Northborough (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21953",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 72 Columbus (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21956",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 74 Roseville (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21961",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 75 Lehigh Valley (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21963",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 81 Chino (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21967",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 82 Phoenix (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21972",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC Seattle (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21977",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC251 Bartlett (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21978",
	        "AppService": "VM/TRAP Server Build For Europe (Prod)",
	        "SvcOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS21980",
	        "AppService": "MoreSteam Six Sigma Toolbox (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21981",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC252 Orlando (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21982",
	        "AppService": "MIS8 - Airport Rd  (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21984",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC254 Denver (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21986",
	        "AppService": "Penguin (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21991",
	        "AppService": "MMS - TREW Conveyor PLC - DC254 Denver (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21997",
	        "AppService": "MMS - TREW Conveyor PLC - DC10 Charlotte (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22003",
	        "AppService": "MMS - TREW Conveyor PLC - DC16 Houston (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22011",
	        "AppService": "MMS - TREW Conveyor PLC - DC Seattle (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22017",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC251 Bartlett (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22025",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC75 Lehigh Valley (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22033",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC60 Grapevine (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22039",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC252 Orlando (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22045",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC07 Winchester (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22049",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC81 Chino (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22053",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC10 Charlotte (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22059",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC16 Houston (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22063",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC74 Roseville (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22067",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC Seattle (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22075",
	        "AppService": "Nuxeo Canada - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22082",
	        "AppService": "John Snow Labs (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22122",
	        "AppService": "Global Operational Technology Security (GOTS) North America Remote Access (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS22133",
	        "AppService": "Connect Portal Headless(Prod) - PaaS",
	        "SvcOffering": "eCommerce"
	    },
	    {
	        "ASNumber": "AS22137",
	        "AppService": "Service Insight(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22182",
	        "AppService": "Amznscrape (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22189",
	        "AppService": "Vantage Analytics(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22195",
	        "AppService": "JBAT - Life Sciences (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22198",
	        "AppService": "Carequality G2 Integration (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22200",
	        "AppService": "ScImage PICOM365 (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS22202",
	        "AppService": "MIS7-McKesson GTA Campus (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22214",
	        "AppService": "Citrix Cloud Infra (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22216",
	        "AppService": "Citrix Virtual Desktops (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22218",
	        "AppService": "Citrix Virtual Apps (Dev)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22220",
	        "AppService": "Citrix Virtual Apps Genpact (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22222",
	        "AppService": "SCRI - J-Review - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22224",
	        "AppService": "SCRI - Argus - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22226",
	        "AppService": "Citrix Virtual Apps MMS (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22227",
	        "AppService": "SCRI - COI Smart - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22230",
	        "AppService": "SCRI - PleaseReview (Ideagen) - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22231",
	        "AppService": "SCRI - ValGenesis VLMS - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22232",
	        "AppService": "Citrix Virtual Apps USON (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22233",
	        "AppService": "SCRI - BOX - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22234",
	        "AppService": "SCRI - RAVE iMedidata - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22235",
	        "AppService": "SCRI - TrialMaster - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22236",
	        "AppService": "Citrix Virtual Apps Canada (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22238",
	        "AppService": "SCRI - Vestigo - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22239",
	        "AppService": "SCRI - Tempo - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22240",
	        "AppService": "SCRI - FSM - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22241",
	        "AppService": "SCRI - Conga - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22242",
	        "AppService": "SCRI - Salesforce - Strategic Development - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22243",
	        "AppService": "SCRI - SmartSolve eQMS - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22244",
	        "AppService": "Citrix Virtual Apps Europe (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22248",
	        "AppService": "Abbvie-Peds-UI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22250",
	        "AppService": "SCRI - Jedox - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22251",
	        "AppService": "SCRI - Veeva Vault Clinical - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22252",
	        "AppService": "Fresenius-Manufacturer-UI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22253",
	        "AppService": "SCRI - Advarra CCE-CCS - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22254",
	        "AppService": "SCRI - SIGNiX - SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22256",
	        "AppService": "Novo-FRM-UI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22258",
	        "AppService": "Portal-Admin-UI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22260",
	        "AppService": "Portal-Econsent-UI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22262",
	        "AppService": "Fresenius-Physician-UI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22264",
	        "AppService": "Hub-Workflow-API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22266",
	        "AppService": "iCMS-API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22270",
	        "AppService": "iCMS-UI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22272",
	        "AppService": "Relypsa-FLT-UI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22274",
	        "AppService": "NovoSecure-API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22276",
	        "AppService": "SCRI Trial Finder (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22278",
	        "AppService": "Portal-Common-API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22280",
	        "AppService": "Portal-Physician-API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22284",
	        "AppService": "Portal-Manufacturer-API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22286",
	        "AppService": "Datafeed (DF) Controller (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22288",
	        "AppService": "DocuFlow-API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22290",
	        "AppService": "Novo-Physician-API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22292",
	        "AppService": "DocuFlow-UI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22296",
	        "AppService": "Novo-Physician-UI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22300",
	        "AppService": "DF-Epsilon-Consumer (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22304",
	        "AppService": "Cms-API-Invoker-Job (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22306",
	        "AppService": "Workflow-Datamart (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22310",
	        "AppService": "Communication-API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22314",
	        "AppService": "Pulse Secure - Steel-Belted Radius (SBR) (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS22326",
	        "AppService": "Novo-Patient-UI  (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22332",
	        "AppService": "Oracle EPM Cloud (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22356",
	        "AppService": "DF - MailVendor (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22374",
	        "AppService": "McKesson Reimbursement Data and Insights (MRDI) (Prod)",
	        "SvcOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS22384",
	        "AppService": "DR-Connect (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22388",
	        "AppService": "Alchemy Search (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22422",
	        "AppService": "pMD Telemedicine (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22448",
	        "AppService": "Language Line (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22452",
	        "AppService": "CanSpec Portal Admin (Dev)",
	        "SvcOffering": "Canada BioPharma & Payer Solutions"
	    },
	    {
	        "ASNumber": "AS22454",
	        "AppService": "WinSCP (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22455",
	        "AppService": "Fischer ManagePath(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22464",
	        "AppService": "Medicare Easy Pricing (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22468",
	        "AppService": "MyHub (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22490",
	        "AppService": "MMS Warehouse Management System - Blue Yonder  (dev)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS22494",
	        "AppService": "Health Mart Portal (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22522",
	        "AppService": "QlikSoft Hubconnect Integration (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22528",
	        "AppService": "CargoWise (Prod) (SaaS)",
	        "SvcOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS22534",
	        "AppService": "Ocado Group ASRS (Prod)",
	        "SvcOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS22540",
	        "AppService": "Ocado OIA (Prod)",
	        "SvcOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS22570",
	        "AppService": "Select and Save API (SNS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22576",
	        "AppService": "Remote 6 - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22581",
	        "AppService": "CyberArk Secrets Manager(Prod)(SaaS)",
	        "SvcOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS22600",
	        "AppService": "Varian Mobile (Prod) (SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS22616",
	        "AppService": "STJ2 - SPS Pharmacy (Network)",
	        "SvcOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS22630",
	        "AppService": "DC251 - Conveyor Human Machine Interface (HMI) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22634",
	        "AppService": "Controlled Substance Monitoring Program (CSMP) (Dev)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22642",
	        "AppService": "Supplylogix SalesForce (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22644",
	        "AppService": "CAL5-well.ca Calgary (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22650",
	        "AppService": "PSAS ConnAnalytics (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22656",
	        "AppService": "Thales CipherTrust Manager (North America) (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS22657",
	        "AppService": "USON (Prod)",
	        "SvcOffering": "Employee Support"
	    },
	    {
	        "ASNumber": "AS22674",
	        "AppService": "Citrix Netscaler/ADCs (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22677",
	        "AppService": "SCRI - Medidata RAVE X-  SaaS - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22690",
	        "AppService": "On-Premise Time Clock Data Server (Prod)",
	        "SvcOffering": "Sales Compensation"
	    },
	    {
	        "ASNumber": "AS22718",
	        "AppService": "Jenkins - RxNet (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22720",
	        "AppService": "HashiCorp Vault (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22721",
	        "AppService": "Terraform (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22727",
	        "AppService": "Clinical Services Enablement (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22729",
	        "AppService": "Data Storage & Protection (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22730",
	        "AppService": "DCNM (DataCenter Network Manager) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22730",
	        "AppService": "SAP - Vistex Chargebacks (Prod)",
	        "SvcOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22731",
	        "AppService": "Cloud IQ (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22732",
	        "AppService": "Dell Storage Manager (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22732",
	        "AppService": "SAP - Vistex Customer MD (Prod)",
	        "SvcOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22733",
	        "AppService": "SAN Nav (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22734",
	        "AppService": "SAP - Vistex Contracts (Prod)",
	        "SvcOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22734",
	        "AppService": "Secure Connect Gateway (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22735",
	        "AppService": "ActiveIQ (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22736",
	        "AppService": "BNA – Brocade Network Advisor (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22736",
	        "AppService": "SAP - Vistex Rebates Brand (Prod)",
	        "SvcOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22737",
	        "AppService": "Veeam - RxNet (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22738",
	        "AppService": "PPDM (PowerProtect Data Manager) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22738",
	        "AppService": "SAP - Vistex Rebates NRNA (Prod)",
	        "SvcOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22739",
	        "AppService": "NetBackup (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22740",
	        "AppService": "DPA (Data Protection Advisor) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22740",
	        "AppService": "SAP - Vistex Rebates Canada (Prod)",
	        "SvcOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22741",
	        "AppService": "NetWorker (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22742",
	        "AppService": "DDVE (Data Domain Virtual Edition) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22743",
	        "AppService": "PowerProtect DD Management Center (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22745",
	        "AppService": "eClaims (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22748",
	        "AppService": "Orion (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22752",
	        "AppService": "EnterpriseRx (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22754",
	        "AppService": "eVoucher Store Lookup (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22756",
	        "AppService": "Government Plan Exclusion (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22758",
	        "AppService": "Prescriber Instant Check (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22758",
	        "AppService": "SAP - Vistex Material Acumax (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22759",
	        "AppService": "Data Warehouse (RHDW app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22760",
	        "AppService": "Prescriber Schedule Authority (RXPSA app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22761",
	        "AppService": "Rx Eligibility (RXE app) - (IMRx - Interventional Messaging) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22763",
	        "AppService": "EVoucher Reporting (EVRPT app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22764",
	        "AppService": "PA Reporting (prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22765",
	        "AppService": "Eligibility Reporting (ELIGRPT app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22766",
	        "AppService": "DS Monitoring (DSMONITOR app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22767",
	        "AppService": "DC Sales Model (DC_SALESMODEL app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22768",
	        "AppService": "EV Sales Model (EV_SALESMODEL app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22769",
	        "AppService": "SHA Application Monitor (SHA_APPMON) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22770",
	        "AppService": "CPS Billing (CPS_BILL app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22771",
	        "AppService": "Switch Billing (SWITCH_BILL app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22772",
	        "AppService": "CMM (CMM app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22773",
	        "AppService": "SAP Billing Assist - (ERX_BILLING app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22774",
	        "AppService": "Jira bridge application (JIRA_PMOPS app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22775",
	        "AppService": "Terminator Rx (TERMRX app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22776",
	        "AppService": "DDP Application Catalog (APP_CATALOG app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22777",
	        "AppService": "Data feed Billing Reconciliation (DF_BILL_REC app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22778",
	        "AppService": "Wisconsin Diagnosis Restricted Drug (DRD app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22779",
	        "AppService": "Humana MOSLR (HUMANA_MOSLR app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22780",
	        "AppService": "Rite Aid Government Plan Exclusions (RITEAID_GPE app) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22781",
	        "AppService": "MCS Patient (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22782",
	        "AppService": "Evoucher New to Therapy (EVNTT) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22783",
	        "AppService": "ProPBM Evoucher Extract (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22802",
	        "AppService": "XYGATE Report Manager (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22803",
	        "AppService": "Linux Jump Servers (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22804",
	        "AppService": "Red Hat Satellite (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22805",
	        "AppService": "Red Hat Identity Management (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22806",
	        "AppService": "USON – Change Auditor (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS22806.",
	        "AppService": "Ansible Tower (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22807",
	        "AppService": "Ansible Automation Platform (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22808",
	        "AppService": "Infoblox (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22808",
	        "AppService": "TrackWise Digital (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22809",
	        "AppService": "DNS - Bind (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22814",
	        "AppService": "Manage File Transfer (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22816",
	        "AppService": "Network Security Operations (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22818",
	        "AppService": "PAPlus-PriorAuthPlus (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22822",
	        "AppService": "Performance Monitor (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22824",
	        "AppService": "Pharmacy Solutions (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22826",
	        "AppService": "QR Code (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22828",
	        "AppService": "Price Check (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22830",
	        "AppService": "Patient Consent (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22832",
	        "AppService": "Prescriber Web Look Up (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22834",
	        "AppService": "Oracle Real Application Clusters (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22836",
	        "AppService": "Rx Dosage Validation (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22838",
	        "AppService": "RX Edit Manager (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22840",
	        "AppService": "SmartHop (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22844",
	        "AppService": "Transaction Performance Monitor (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22847",
	        "AppService": "VMware vCenter (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22848",
	        "AppService": "VMware Aria Operations (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22849",
	        "AppService": "VMware Aria Operations for Logs (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22850",
	        "AppService": "VMware Aria Suite Lifecycle (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22851",
	        "AppService": "VMware Identity Manager (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22852",
	        "AppService": "VMware PowerCLI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22853",
	        "AppService": "VMware Cloud Provider Lifecycle Manager (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22854",
	        "AppService": "VMware Cloud Director (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22855",
	        "AppService": "VMware Integrated OpenStack (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22856",
	        "AppService": "RV Tools (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22857",
	        "AppService": "VMware Skyline Advisor (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22858",
	        "AppService": "VMware Aria Automation – TBD (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22860",
	        "AppService": "Windows Tools (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22861",
	        "AppService": "Microsoft Active Directory (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22862",
	        "AppService": "Microsoft Certificate Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22863",
	        "AppService": "Microsoft File Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22864",
	        "AppService": "Microsoft SQL Tools (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22868",
	        "AppService": "Keelvar (SaaS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22871",
	        "AppService": "Rx Medication Therapy – now known as CA+ (RXMT App) (formerly known as Catapult) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22876",
	        "AppService": "EDM5 - Edmonton DC 560 (Network)",
	        "SvcOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS22888",
	        "AppService": "WPG3  - Winnipeg DC 450 (Network)",
	        "SvcOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS22918",
	        "AppService": "GitHub (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22928",
	        "AppService": "ProShip (SaaS) (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS22929",
	        "AppService": "Riskonnect - Risk Management (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22962",
	        "AppService": "Qlik - MMS E1 Data replication (Prod)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS22984",
	        "AppService": "Datavant Tokenization (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22992",
	        "AppService": "Las Colinas Tech Bar Utility server (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS23010",
	        "AppService": "MMS Data Lake (Prod)",
	        "SvcOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS23014",
	        "AppService": "IMA360 (Prod)",
	        "SvcOffering": "Incentives & Master Data"
	    },
	    {
	        "ASNumber": "AS23028",
	        "AppService": "USON -AbsenceSoft (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS23030",
	        "AppService": "Cyber Central (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS23037",
	        "AppService": "Alation Data Catalog- Prod",
	        "SvcOffering": "Data Visualization Platform Management"
	    },
	    {
	        "ASNumber": "AS23040",
	        "AppService": "Project Insight (Prod)",
	        "SvcOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS23096",
	        "AppService": "Ethicspoint (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23105",
	        "AppService": "FleetComplete BigRoad Fleet Tracking Solution (Prod)",
	        "SvcOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS23136",
	        "AppService": "Roadnet (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS23142",
	        "AppService": "Apacheta (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS23152",
	        "AppService": "CubeIQ Product Cartonization and Allocation Management (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS23200",
	        "AppService": "Verato Universal EMPI (SaaS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23208",
	        "AppService": "Corporate Tax (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23226",
	        "AppService": "Select and Save (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23246",
	        "AppService": "Jamf Pro (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS23254",
	        "AppService": "RxOrders - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23301",
	        "AppService": "Wireshark-Prod-SaaS",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23360",
	        "AppService": "USON - US ONCOLOGY ACS (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23364",
	        "AppService": "USON - US ONCOLOGY All (Network)",
	        "SvcOffering": "Ent. Client Technology"
	    },
	    {
	        "ASNumber": "AS23370",
	        "AppService": "USON - US ONCOLOGY AFFO (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23373",
	        "AppService": "Netwrix Active Directory Protection (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23374",
	        "AppService": "USON - US ONCOLOGY CCCB (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23378",
	        "AppService": "USON - US ONCOLOGY BRCC (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23380",
	        "AppService": "USON - US ONCOLOGY CMOH (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23384",
	        "AppService": "USON - US ONCOLOGY CCCN (Network)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23388",
	        "AppService": "USON - US ONCOLOGY GCCC (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23393",
	        "AppService": "KNAPP - Automation Pharma Canada Trenton DC320 (Prod)",
	        "SvcOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS23395",
	        "AppService": "KNAPP - Automation Pharma Canada Edmonton DC560 (Prod)",
	        "SvcOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS23396",
	        "AppService": "USON - US ONCOLOGY JV-AUI (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23397",
	        "AppService": "KNAPP - Automation Pharma Canada Vancouver DC570 (Prod)",
	        "SvcOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS23398",
	        "AppService": "USON - US ONCOLOGY JV-BROCKTON (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23400",
	        "AppService": "USON - US ONCOLOGY JV-BROOKLYN (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23402",
	        "AppService": "USON - US ONCOLOGY JV-COH (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23406",
	        "AppService": "USON - US ONCOLOGY JV-EVA (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23408",
	        "AppService": "USON - US ONCOLOGY JV-ICC (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23410",
	        "AppService": "USON - US ONCOLOGY JV-GAH (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23412",
	        "AppService": "USON - US ONCOLOGY CO (Network)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23418",
	        "AppService": "USON - US ONCOLOGY JV-PROVIDENCE (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23419",
	        "AppService": "MPS EnterpriseRx - Batch(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23420",
	        "AppService": "USON - US ONCOLOGY JV-QUEENS (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23422",
	        "AppService": "Global Loyalty Archive (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23424",
	        "AppService": "USON - US ONCOLOGY JV-RCK (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23425",
	        "AppService": "DSCSA Parse(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23426",
	        "AppService": "USON - US ONCOLOGY JV-SSRO (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23427",
	        "AppService": "EnterpriseRx - Kafka Consumers (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23428",
	        "AppService": "USON - US ONCOLOGY JV-SBRO (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23429",
	        "AppService": "EnterpriseRx - DMZ (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23432",
	        "AppService": "USON - US ONCOLOGY JV-VRRO (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23436",
	        "AppService": "USON - US ONCOLOGY JV-WBG (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23440",
	        "AppService": "USON - US ONCOLOGY JV-WFRT (Network)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23442",
	        "AppService": "USON - US ONCOLOGY RBO-MARBO (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23444",
	        "AppService": "USON - US ONCOLOGY MCA (Network)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23446",
	        "AppService": "USON - US ONCOLOGY MOHC (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23448",
	        "AppService": "USON - US ONCOLOGY MNO (Network)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23452",
	        "AppService": "USON - US ONCOLOGY RBO-IN (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23454",
	        "AppService": "USON - US ONCOLOGY RBO-MTNW (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23456",
	        "AppService": "USON - US ONCOLOGY RBO-NERBO (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23458",
	        "AppService": "USON - US ONCOLOGY RCOG (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23460",
	        "AppService": "USON - US ONCOLOGY NWO (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23462",
	        "AppService": "USON - US ONCOLOGY TXO (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23466",
	        "AppService": "USON - US ONCOLOGY RMCC (Network)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23468",
	        "AppService": "USON - US ONCOLOGY SCC (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23470",
	        "AppService": "USON - US ONCOLOGY SFOH (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23471",
	        "AppService": "Pharmaclik-Promo (Prod)",
	        "SvcOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS23478",
	        "AppService": "USON - US ONCOLOGY WVCI (Network)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23480",
	        "AppService": "MPS Billing (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23485",
	        "AppService": "CMM-Atlanta OKTA - Prod (Saas)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23486",
	        "AppService": "USON - US ONCOLOGY VCS (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23488",
	        "AppService": "Terminal Services for ERX Offshore Team (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23490",
	        "AppService": "USON - US ONCOLOGY VOA (Network)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23509",
	        "AppService": "Latent Health (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23514",
	        "AppService": "JDE E1 Security Team (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23526",
	        "AppService": "Jenkins CICD (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS23532",
	        "AppService": "BioPharma insights Delivery platform (Prod)",
	        "SvcOffering": "PSaS Data Architecture & Eng. Service"
	    },
	    {
	        "ASNumber": "AS23545",
	        "AppService": "ServiceNow IRM",
	        "SvcOffering": "Service Enablement"
	    },
	    {
	        "ASNumber": "AS23557",
	        "AppService": "Veeva Systems - SafeMine (Prod)(Saas)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23562",
	        "AppService": "MMS Alternative Sourcing Vendors (ASV) Purchasing (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23563",
	        "AppService": "LSMV-PROD",
	        "SvcOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS23565",
	        "AppService": "RxLightning-Prod",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS23567",
	        "AppService": "CMM-Atlanta Google Cloud Platform (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23570",
	        "AppService": "Magnet Axiom Cyber (Prod)",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS23621",
	        "AppService": "TLP - Prod",
	        "SvcOffering": "PSAS Data Strategy & Adv Analytics"
	    },
	    {
	        "ASNumber": "AS23623",
	        "AppService": "Healthmart Advocacy Network -Prod (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23623",
	        "AppService": "Symantec DLP Monitor (US)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS23625",
	        "AppService": "Power Protect Data Manager (PPDM) -Prod",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS23625",
	        "AppService": "Symantec DLP Monitor CANADA",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS23629",
	        "AppService": "Symantec DLP Monitor EAST",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS23641",
	        "AppService": "Decisions BRE (Business Rules Engine)-Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23643",
	        "AppService": "Ontada API Portal web app (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23659",
	        "AppService": "LifeSphere Medical Information (Prod)(Saas)",
	        "SvcOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS23676",
	        "AppService": "HPE OneView (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23680",
	        "AppService": "BI APPL  Minor / Break Fixes (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS23682",
	        "AppService": "BI APPL Data Request (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS23684",
	        "AppService": "BI APPL Legal (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS23686",
	        "AppService": "BI APPL Report Transmission (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS23688",
	        "AppService": "BI APPL Analysis / Information Request (Prod)",
	        "SvcOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS23689",
	        "AppService": "Ontada Claims and Remits Data - Prod (Saas)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23691",
	        "AppService": "MMS Solera Omnitracs SaaS (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS23694",
	        "AppService": "VAN8 - Vancouver DC570 (Network)",
	        "SvcOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS23703",
	        "AppService": "ERA Webapp (Prod)",
	        "SvcOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS23704",
	        "AppService": "POC DB Servers (Prod)",
	        "SvcOffering": "Enterprise Infrastructure"
	    },
	    {
	        "ASNumber": "AS23710",
	        "AppService": "Oracle Golden Gate (Prod)",
	        "SvcOffering": "Enterprise Infrastructure"
	    },
	    {
	        "ASNumber": "AS23711",
	        "AppService": "CMM Analytics GA (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23718",
	        "AppService": "McKesson LabResult API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23724",
	        "AppService": "CMM-Atlanta Microsoft Azure(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23734",
	        "AppService": "Okta for DK, Denmark (Workforce) (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23736",
	        "AppService": "Okta for NMD, Norway (Workforce) (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23750",
	        "AppService": "Okta for NMD Norway (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23751",
	        "AppService": "Strata for Workforce(Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23756",
	        "AppService": "Edge IE 11 Compatibility Mode (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS23757",
	        "AppService": "Klue (Prod)",
	        "SvcOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS23761",
	        "AppService": "Ontada Rocket Chat - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23764",
	        "AppService": "General IE 11 Retirement Query (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS23765",
	        "AppService": "Park Place Park View (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23782",
	        "AppService": "Glide Health  (SaaS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23792",
	        "AppService": "Tekizma Datanyx Reporting Tool (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23798",
	        "AppService": "Edifecs routing/transformation engine for claims in support TV3 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23820",
	        "AppService": "Retool - Mfr Inctv (Admin) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23822",
	        "AppService": "Retool – Mfr Inctv (MDM) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23824",
	        "AppService": "CoPay Reporting Environment (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23826",
	        "AppService": "Retool - Mfr Inctv (Agreements) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23827",
	        "AppService": "Asynchronous Calculation Engine (ACE) - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23828",
	        "AppService": "MPS Drug Lookup (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23835",
	        "AppService": "Structured Data Integration (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23838",
	        "AppService": "InteropiO (PaaS) (prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23840",
	        "AppService": "Enterprise Analytics for US - Manufacture Incentives (Dev)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23843",
	        "AppService": "Epicor mobile-EKW-Prod",
	        "SvcOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS23857",
	        "AppService": "Strata for Business and Customer Identities (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23859",
	        "AppService": "Staffbase (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23861",
	        "AppService": "PTS API (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23862",
	        "AppService": "Rain (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23868",
	        "AppService": "USON - US ONCOLOGY OHC (Network)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23896",
	        "AppService": "OLAP2",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23898",
	        "AppService": "RPT1",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23900",
	        "AppService": "Qlik (CMM)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23908",
	        "AppService": "Validic (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23914",
	        "AppService": "Enterprise Analytics for US - Manufacture Incentives (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23949",
	        "AppService": "SCRI - Salesforce Marketing Cloud - PROD",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23951",
	        "AppService": "USON Refund and Write-Off Processing (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23953",
	        "AppService": "Proofpoint ITM (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS23955",
	        "AppService": "McKesson Product Generator (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23967",
	        "AppService": "MMS MercuryGate Transportation Management System (Prod)(SaaS)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS23970",
	        "AppService": "Tugboat Logic (Prod) (SaaS)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS23984",
	        "AppService": "CMM Cohesity AT  (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23986",
	        "AppService": "Jira (CMM)-Prod (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23988",
	        "AppService": "hub-admin-ui (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23992",
	        "AppService": "hub-faxconsumer-service (prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23996",
	        "AppService": "hub-erx-service (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24010",
	        "AppService": "MPS Clinical Program Solutions(CPS) Azure (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24012",
	        "AppService": "Hub-Erx-Worker-Service (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24020",
	        "AppService": "Okta (CMM)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24023",
	        "AppService": "Qlik - PSAS TLP Data replication (Prod)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS24040",
	        "AppService": "Print Services (Canada)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24042",
	        "AppService": "RxO Admin (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24044",
	        "AppService": "PBM/Benefit Cost Compare (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24056",
	        "AppService": "Savings SeekerRx (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24066",
	        "AppService": "Grayscale (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24070",
	        "AppService": "ERP Security (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS24071",
	        "AppService": "Five9 US - Ontada (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24084",
	        "AppService": "Pharma DC - 8831 - Clermont MPB/Specialty, KY (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS24101",
	        "AppService": "InteropiO for Ontada (Azure)-Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24131",
	        "AppService": "Azure Databricks (SaaS) - Canada (PROD)",
	        "SvcOffering": "Canada Data & Analytics"
	    },
	    {
	        "ASNumber": "AS24152",
	        "AppService": "Lyceum (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24153",
	        "AppService": "DataIku-CMM (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24154",
	        "AppService": "Web Crawler (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24166",
	        "AppService": "McKesson Enterprise PKI (Prod) (SaaS)",
	        "SvcOffering": "Identity & Access Management Service"
	    },
	    {
	        "ASNumber": "AS24170",
	        "AppService": "IG Gateway (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24180",
	        "AppService": "MES OpenText Azure (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS24194",
	        "AppService": "OneTrust GRC (Prod) (SaaS)",
	        "SvcOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS24197",
	        "AppService": "Redica (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24208",
	        "AppService": "Creprs US Pharma (Prod)",
	        "SvcOffering": "Gx Product Lifecycle Mgmt and Eng."
	    },
	    {
	        "ASNumber": "AS24210",
	        "AppService": "Phoenix US Pharma (Prod)",
	        "SvcOffering": "Gx Product Lifecycle Mgmt and Eng."
	    },
	    {
	        "ASNumber": "AS24222",
	        "AppService": "SpyGlass (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24226",
	        "AppService": "MT Network DAL16 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24228",
	        "AppService": "SpyCloud (Prod)",
	        "SvcOffering": "Cyber Detect & Respond Service"
	    },
	    {
	        "ASNumber": "AS24230",
	        "AppService": "Black Kite (Prod)(SaaS)",
	        "SvcOffering": "Security Architecture & Strategy"
	    },
	    {
	        "ASNumber": "AS24232",
	        "AppService": "MT Network FTW8 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24246",
	        "AppService": "Varonis (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS24295",
	        "AppService": "Cribl - Prod",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS24300",
	        "AppService": "Blue Yonder WMS (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS24310",
	        "AppService": "Monday.com (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24314",
	        "AppService": "CMM OCR (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24338",
	        "AppService": "Austin SOC Network (Prod)",
	        "SvcOffering": "Cyber Detect & Respond Service"
	    },
	    {
	        "ASNumber": "AS24352",
	        "AppService": "Members Web (Prod)",
	        "SvcOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS24354",
	        "AppService": "Centralized Content Management Tool (CCMT) (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24386",
	        "AppService": "MMS SCA Automation (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24387",
	        "AppService": "Incentive Services - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24391",
	        "AppService": "Jellyfish - Columbus - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24418",
	        "AppService": "BlistAssist Technology & Software (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24420",
	        "AppService": "PACMED Technology & Software (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24430",
	        "AppService": "Incident Management (Prod)",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS24434",
	        "AppService": "SLA Database (Prod)",
	        "SvcOffering": "MSP Management"
	    },
	    {
	        "ASNumber": "AS24438",
	        "AppService": "USON Credit Apps Repository - (PROD)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24440",
	        "AppService": "Document Scanning OCR Solution (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24442",
	        "AppService": "Radformation  AutoContour (Prod) (SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24445",
	        "AppService": "COR- Convert Rejects (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24456",
	        "AppService": "FindHelp (Prod) (SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24457",
	        "AppService": "Phosphorus (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS24460",
	        "AppService": "Centegix Crisis Alert (Prod) (SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24465",
	        "AppService": "Affinities - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24468",
	        "AppService": "Therapanacea ArtPlan (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24470",
	        "AppService": "Roche Navify Tumor Board (Prod) (SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24472",
	        "AppService": "PPS Analytics (Prod) (SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24488",
	        "AppService": "IBM MSP Grafana (Prod)",
	        "SvcOffering": "Cyber Business Management"
	    },
	    {
	        "ASNumber": "AS24517",
	        "AppService": "Cloud Engineering Automation (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS24522",
	        "AppService": "Ryght.AI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24526",
	        "AppService": "Tervene Digital Management System (Prod) (Saas)",
	        "SvcOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS24530",
	        "AppService": "Multisource  Web(Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24545",
	        "AppService": "Geomant Wallboard (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24549",
	        "AppService": "BBraun DoseTrac (Prod)(SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24557",
	        "AppService": "Solarwinds Serv-U FTP (Canada - Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24559",
	        "AppService": "Genospace (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24564",
	        "AppService": "DevOps Tools(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24566",
	        "AppService": "SCRI - Document Express (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24570",
	        "AppService": "McKesson Advocacy Network (SaaS) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24583",
	        "AppService": "Radformation ChartCheck (SaaS)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24584",
	        "AppService": "Device42 - SAP (Prod)",
	        "SvcOffering": "Ent. SAP Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS24586",
	        "AppService": "Onelink (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24597",
	        "AppService": "Radformation QuickCode (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24609",
	        "AppService": "hub-ampenrollment-consumer-service",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24613",
	        "AppService": "Azure Kubernetes Services (AKS) - Canada East (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS24617",
	        "AppService": "hub-aepc-ui (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24618",
	        "AppService": "Uberflip(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24621",
	        "AppService": "Gem CRM (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24623",
	        "AppService": "hub-ampactivity-consumer-service (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24626",
	        "AppService": "Cornerstone AI (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24629",
	        "AppService": "hub-ebvconsumer-service (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24636",
	        "AppService": "IBM GDR Replication (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24642",
	        "AppService": "Ataccama-MDM (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24673",
	        "AppService": "NorthStar Ireland Lab system(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24674",
	        "AppService": "Azure Kubernetes Services (AKS) - West US 3 (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS24681",
	        "AppService": "interopio account api 2.0(PaaS)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24685",
	        "AppService": "Genome Medical (SaaS)(Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24687",
	        "AppService": "Stonly Digital Adoption Platform(SaaS)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24695",
	        "AppService": "LS RWR CDM Datamart Gold (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24698",
	        "AppService": "LS RWDA CDM Datamart Gold (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24700",
	        "AppService": "LS Legacy CI EDW Datamart (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24701",
	        "AppService": "CMM Pricing Service (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24717",
	        "AppService": "NLP Lab(Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24722",
	        "AppService": "Voice Telco Service(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24724",
	        "AppService": "Privileged Access Research and Inventory System (Prod)",
	        "SvcOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS24730",
	        "AppService": "LS Legacy RWR EDW Datamart(Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24757",
	        "AppService": "Oracle EPM EDM (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24763",
	        "AppService": "Oracle EPM EPBCS (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24768",
	        "AppService": "Oracle EPM FCCS (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24774",
	        "AppService": "Oracle EPM NR (prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24791",
	        "AppService": "GPO Analytic Web Portal (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24799",
	        "AppService": "iKnowMed G2 Microservice (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24803",
	        "AppService": "Logitech Sync (Dev)(SaaS)",
	        "SvcOffering": "In-Office Employee Enablement"
	    },
	    {
	        "ASNumber": "AS24816",
	        "AppService": "LS - Feasibility Assessment/ Patient Cohort Selection Tool (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24820",
	        "AppService": "3PL - UnitPull - US - Prod",
	        "SvcOffering": "Ent. P2P, Procurement & Demand Planning"
	    },
	    {
	        "ASNumber": "AS24822",
	        "AppService": "USON Dubber (Prod)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS24855",
	        "AppService": "Wallet - Prod (Saas)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24864",
	        "AppService": "Unlimited Financials (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24883",
	        "AppService": "Multi-client CFaaS Central Fill - Memphis (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24887",
	        "AppService": "Catalyst Central Fill Facility - Plano, TX(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24889",
	        "AppService": "Biologics Central Fill Facility - Park Vista,TX (Prod)",
	        "SvcOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS24891",
	        "AppService": "Wegmans Central Fill 1 – Buffalo,NY (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24897",
	        "AppService": "Indiana Costco Central Fill (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24898",
	        "AppService": "BillTrust(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24901",
	        "AppService": "Adobe XD(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24903",
	        "AppService": "Agilent OpenLab CDS(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24905",
	        "AppService": "Alight Upoint(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24906",
	        "AppService": "Anomalo(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24915",
	        "AppService": "Beamery(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24918",
	        "AppService": "BLUE workflow management(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24920",
	        "AppService": "Bynder(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24928",
	        "AppService": "Condeco (ClarusONE)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24930",
	        "AppService": "Contentstack(Prod)",
	        "SvcOffering": "eCommerce"
	    },
	    {
	        "ASNumber": "AS24931",
	        "AppService": "ControlUP(Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS24932",
	        "AppService": "Core Strengths Platform(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24933",
	        "AppService": "CorpTax(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24937",
	        "AppService": "ADP Workforce (Prod)(SaaS)",
	        "SvcOffering": "Sales Compensation"
	    },
	    {
	        "ASNumber": "AS24938",
	        "AppService": "Data Visualization Platform - Ontada(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24939",
	        "AppService": "Datanyx(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24941",
	        "AppService": "BY Warehouse Labor Management(Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS24943",
	        "AppService": "Pre and Post Editing (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24948",
	        "AppService": "Enhanced File Transfer System(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24949",
	        "AppService": "Enterprise Workday Recruiting(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24950",
	        "AppService": "EQ Insight(Prod)",
	        "SvcOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS24954",
	        "AppService": "eStar(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24957",
	        "AppService": "Fluxx Grantmaker(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24958",
	        "AppService": "Franklin Covey All Access Pass(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24960",
	        "AppService": "HCA_OnBase(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24961",
	        "AppService": "Health Mart Digital Portfolio(Prod)",
	        "SvcOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS24963",
	        "AppService": "HighSpot-MMS-SFDC(Prod)",
	        "SvcOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS24964",
	        "AppService": "HIPAA Suite(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24965",
	        "AppService": "MMS Product Recommender (Prod) (SaaS)",
	        "SvcOffering": "PSAS Gx, Biopharma, Pricing and Finance"
	    },
	    {
	        "ASNumber": "AS24966",
	        "AppService": "HMI Software(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24967",
	        "AppService": "Hub-status-service(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24968",
	        "AppService": "Hyperion FDM(Prod)",
	        "SvcOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS24969",
	        "AppService": "Hyperion HFM(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24970",
	        "AppService": "Hyperion Planning/Essbase(Prod)",
	        "SvcOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS24977",
	        "AppService": "Interopio fhir gateway (Prod) (PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24978",
	        "AppService": "Jifflenow - eEvent(Prod)",
	        "SvcOffering": "PSAS Gx, Biopharma, Pricing and Finance"
	    },
	    {
	        "ASNumber": "AS24979",
	        "AppService": "Klarna Well.ca(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24980",
	        "AppService": "KN Booking System(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24981",
	        "AppService": "Interopio portal1 (Prod)(Paas)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24982",
	        "AppService": "LawLogix Guardian(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24984",
	        "AppService": "Lingualinx(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24985",
	        "AppService": "Loftware Bar Code Printing Services(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24986",
	        "AppService": "Logicoy(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24988",
	        "AppService": "Lytho (recovered 2023-11-28 21:03:51)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24989",
	        "AppService": "MAC Success Manager(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24990",
	        "AppService": "Mandiant Advantage(Prod)",
	        "SvcOffering": "Cyber Detect & Respond Service"
	    },
	    {
	        "ASNumber": "AS24991",
	        "AppService": "Matrix Absence eAccounts(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24992",
	        "AppService": "Matrix Absence Radar(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24994",
	        "AppService": "McKesson Advocacy App(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24995",
	        "AppService": "McKesson Brand Shop(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25000",
	        "AppService": "Medicare Eligibility(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25001",
	        "AppService": "interopio-environment-api (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25005",
	        "AppService": "MMS - Blue Ocean Brain(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25007",
	        "AppService": "MPS Centralized Admin Portal CAP(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25008",
	        "AppService": "MyGuide(Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS25009",
	        "AppService": "interopio-fhir-cdr (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25015",
	        "AppService": "Interopio cds service (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25016",
	        "AppService": "Opal(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25017",
	        "AppService": "Opero(Prod)",
	        "SvcOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS25019",
	        "AppService": "PagerDuty(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25021",
	        "AppService": "Interopio auth v2 (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25022",
	        "AppService": "Pendo Guidance and Training Application(Prod)",
	        "SvcOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS25024",
	        "AppService": "iSeries Navigator(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25027",
	        "AppService": "Interopio data adapter sdk java(Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25028",
	        "AppService": "RxResponse(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25031",
	        "AppService": "RBG - SiteCore Banner Brand Websites(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25033",
	        "AppService": "interopio-dataadapter-varian(Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25038",
	        "AppService": "RFPIO(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25039",
	        "AppService": "Interopio-dataadapter-allscripts-unity(Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25040",
	        "AppService": "RHP - Enhanced Vaccine Billing(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25041",
	        "AppService": "RHP - Exclude Prescriber Monitoring(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25042",
	        "AppService": "RHP - Government Plan Exclusion(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25043",
	        "AppService": "RHP - NotifyRx(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25044",
	        "AppService": "RHP - Prescriber Authority Service(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25045",
	        "AppService": "Interopio-dataadapter-epic-r4 (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25046",
	        "AppService": "RHP - Rapid Rewards(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25047",
	        "AppService": "RHP - RxSafety(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25048",
	        "AppService": "RHP - SafeCardRX(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25049",
	        "AppService": "Interopio-hl7-receiver (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25051",
	        "AppService": "Route4Me Route Planner(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25052",
	        "AppService": "RxC-HVS (High Volume Shipping Solution)(Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS25053",
	        "AppService": "Interopio-dataadapter-iknowmed (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25054",
	        "AppService": "RXSS - Atlassian Suite(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25055",
	        "AppService": "RXSS - AWS(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25056",
	        "AppService": "RXSS - Code42(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25057",
	        "AppService": "RXSS - Databricks(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25058",
	        "AppService": "RxSS - Demostack(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25059",
	        "AppService": "Interopio-smart-launch-proxy (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25060",
	        "AppService": "RXSS - JAMF Connect(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25061",
	        "AppService": "interopio-monitoring (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25062",
	        "AppService": "RXSS - Terraform(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25063",
	        "AppService": "SafeBreach(Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS25065",
	        "AppService": "Salesforce RHPS Instance(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25066",
	        "AppService": "Sanitas Admin(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25067",
	        "AppService": "Interopio-fhir-cde-v2 (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25068",
	        "AppService": "Sanitas Dispensing(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25071",
	        "AppService": "Sedgwick V01 (Workers Comp)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25072",
	        "AppService": "SendGrid(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25073",
	        "AppService": "Interopio-logging (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25074",
	        "AppService": "SignalPath(Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS25075",
	        "AppService": "Simulated phishing and reporting(Prod)",
	        "SvcOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS25077",
	        "AppService": "Interopio-portal (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25079",
	        "AppService": "Solidworks(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25080",
	        "AppService": "Sprout Social(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25081",
	        "AppService": "Sprout Social Employee Advocacy(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25082",
	        "AppService": "Star-Plus RMS(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25083",
	        "AppService": "Interopio-auth(Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25086",
	        "AppService": "Tessian(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25087",
	        "AppService": "The Work Number(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS25089",
	        "AppService": "Interopio-admin (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25091",
	        "AppService": "TuMeke(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25095",
	        "AppService": "Interopio messaging (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25096",
	        "AppService": "VC - Partner API(Prod)",
	        "SvcOffering": "B2C E-Commerce"
	    },
	    {
	        "ASNumber": "AS25097",
	        "AppService": "VC - Provider and Console portals(Prod)",
	        "SvcOffering": "B2C E-Commerce"
	    },
	    {
	        "ASNumber": "AS25099",
	        "AppService": "viewLinc PSAS(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25100",
	        "AppService": "Visier(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS25101",
	        "AppService": "Interopio-bilirubin-risk-chart (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25102",
	        "AppService": "VIVA STARS Supplier Diversity Portal(Pro",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25104",
	        "AppService": "Web Content - SCRI.com(Prod)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25106",
	        "AppService": "Work Credit Opportunity(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25107",
	        "AppService": "Interopio-analytics-service (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25108",
	        "AppService": "Workiva Internal Audit Solution(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25109",
	        "AppService": "Interopio-smart-context-resolution (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25110",
	        "AppService": "Active Directory (CA-Canada)(Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS25111",
	        "AppService": "Active Directory (Temp)(Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS25112",
	        "AppService": "Affirmity(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS25117",
	        "AppService": "Interopio-system (Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25120",
	        "AppService": "MMS - TREW Conveyor PLC(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25121",
	        "AppService": "Cypress Syspro ERP(Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS25123",
	        "AppService": "Five9 Contact Center(Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS25124",
	        "AppService": "Google Cloud Vmware Engine(Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS25125",
	        "AppService": "Active Directory Federation Services (ADFS) Prod",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS25127",
	        "AppService": "RBG - Uniprix - Admin (Prod)",
	        "SvcOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS25136",
	        "AppService": "NorthStar RxP(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25138",
	        "AppService": "Total View(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25141",
	        "AppService": "USON O365 Active Directory Federation Services (ADFS O365)(Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS25142",
	        "AppService": "IBM Sterling Integrator 5.2.4.0(Prod)",
	        "SvcOffering": "CPQ"
	    },
	    {
	        "ASNumber": "AS25143",
	        "AppService": "ISRM PCI ASV (Qualys)(Prod)",
	        "SvcOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS25144",
	        "AppService": "Ontada PediatricSuite(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25150",
	        "AppService": "Veeva Site Vault(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25151",
	        "AppService": "EA-Anomaly-Detection-System-AZ (Prod)(PaaS)",
	        "SvcOffering": "PSAS Generics Analytics"
	    },
	    {
	        "ASNumber": "AS25156",
	        "AppService": "Accutrac(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25166",
	        "AppService": "AutoCAD(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25168",
	        "AppService": "Blackbaud(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25174",
	        "AppService": "Edflo(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS25176",
	        "AppService": "Hyperion Shared Services/Workspace(Prod)",
	        "SvcOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS25178",
	        "AppService": "Intelex - GSS - The PORTAL(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25180",
	        "AppService": "Merrill DataSiteOne(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25186",
	        "AppService": "RHP - Denial Conversion(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25188",
	        "AppService": "Roambee HoneyComb - PSAS(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25189",
	        "AppService": "RXSS - Apple Business Manager(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25190",
	        "AppService": "RXSS - Gitlab(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25191",
	        "AppService": "RXSS - Salesforce(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25192",
	        "AppService": "Sanitas Configuration(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25194",
	        "AppService": "SentinelOne Mobile(Prod)",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS25195",
	        "AppService": "Snaplogic(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25196",
	        "AppService": "STP - QC - Telus Jumppoint(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25197",
	        "AppService": "ThoughtSpot(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25198",
	        "AppService": "VC - Mobile Apps Andriod/iOS(Prod)",
	        "SvcOffering": "B2C E-Commerce"
	    },
	    {
	        "ASNumber": "AS25201",
	        "AppService": "Workiva SOX Compliance Solution(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25204",
	        "AppService": "Interchange(Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS25207",
	        "AppService": "Five9 IVA(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25208",
	        "AppService": "OneTrust Privacy(Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS25209",
	        "AppService": "Treatment Plan Plus (Prod) (SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25210",
	        "AppService": "Bardavon(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25212",
	        "AppService": "HireRight Applicant Center(Prod)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS25214",
	        "AppService": "RHP - PriorAuthPlus(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25216",
	        "AppService": "GSOC Honeywell MaxPro(Prod)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS25218",
	        "AppService": "CAM-Central Access Management Application(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25240",
	        "AppService": "HCA_Development Innovations System Help (DISH)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25242",
	        "AppService": "IBM Transformation Extender Advanced 10.0.1.0(Prod)",
	        "SvcOffering": "CPQ"
	    },
	    {
	        "ASNumber": "AS25245",
	        "AppService": "MPS ERX Data Insight (DEV/UAT)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25247",
	        "AppService": "MRxTS Snowflake Azure US East 2 Hub (Virginia, USA)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25249",
	        "AppService": "SpiraTeam (Prod)(SaaS)",
	        "SvcOffering": "Commercial, Strategy & Innovation IT"
	    },
	    {
	        "ASNumber": "AS25258",
	        "AppService": "MMS - Pramata Customer Structure Groupings(Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS25261",
	        "AppService": "Interopion-apps-health-records-standalone(Prod)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25263",
	        "AppService": "interopio-patient-portal(PROD)(PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25265",
	        "AppService": "Interopio-system-status (PROD) (PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25266",
	        "AppService": "Pathfinder (iSeries Impact Analysis Software) (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS25267",
	        "AppService": "interopio-dataadapter-surescripts (PROD) (PaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25270",
	        "AppService": "RBG - Uniprix - TELUS EspacePharma Services (Uniprix) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25273",
	        "AppService": "Sanitas Host Management(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25278",
	        "AppService": "USON Athena IDX  (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS25282",
	        "AppService": "SCRI - iOFFICE (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25314",
	        "AppService": "ScriptMed Enterprise(Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS25321",
	        "AppService": "Genesys Cloud CX (PROD)(SaaS)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS25325",
	        "AppService": "EHR Admin(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25326",
	        "AppService": "FlagSmith(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25329",
	        "AppService": "Jira (ClarusONE)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25330",
	        "AppService": "Navinet Feedback Loop(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25331",
	        "AppService": "OverHaul(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25334",
	        "AppService": "Prescribers API(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25335",
	        "AppService": "Reactor(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25336",
	        "AppService": "Request Pages API(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25337",
	        "AppService": "RXSS - 1Password(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25338",
	        "AppService": "RXSS - Burp Suite Professional(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25339",
	        "AppService": "RXSS - Codemagic(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25340",
	        "AppService": "Text Verification Tool(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25345",
	        "AppService": "MPS ERX Data Insight Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25347",
	        "AppService": "Careers Site[Prod][SaS]",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25348",
	        "AppService": "PharmaClik POS(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25349",
	        "AppService": "Regulatory (Super Matrix)(Prod)",
	        "SvcOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS25350",
	        "AppService": "RHP - eVoucherRx(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25351",
	        "AppService": "RXSS - Jenkins(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25352",
	        "AppService": "RXSS - Palo Alto GlobalProtect(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25353",
	        "AppService": "RXSS - Slack(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25355",
	        "AppService": "Tricentis Tosca - Ontada(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25356",
	        "AppService": "NCPDP EHR(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25359",
	        "AppService": "PDTransFac(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25362",
	        "AppService": "MasterControl (NorthStar)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25363",
	        "AppService": "Planful(Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25380",
	        "AppService": "RBG - Category Management  (Prod)",
	        "SvcOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS25382",
	        "AppService": "NorthStar Ireland Lab system (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25385",
	        "AppService": "Healthgraph - Prod",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25391",
	        "AppService": "Transportation",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25404",
	        "AppService": "Confluent Cloud Kafka(Prod)(SaaS)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS25405",
	        "AppService": "BarTender(Prod)",
	        "SvcOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS25419",
	        "AppService": "CMM Pharmacy Controlled Substance Reporting Automation Script",
	        "SvcOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS25427",
	        "AppService": "Ontada Health (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25427",
	        "AppService": "Zetafax(Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS25429",
	        "AppService": "US Oncology Legislative Site(Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25437",
	        "AppService": "RXSavings Solution (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25441",
	        "AppService": "ReflexRx Empty (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25446",
	        "AppService": "RightFax - USON(Prod)",
	        "SvcOffering": "Automation"
	    },
	    {
	        "ASNumber": "AS25447",
	        "AppService": "ReflexRx QA Jumppoint",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25451",
	        "AppService": "Central Logfile Repository(Prod)",
	        "SvcOffering": "Ent. Integration Technology Services"
	    },
	    {
	        "ASNumber": "AS25451",
	        "AppService": "Sanitas Pharmacy Automation System",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25457",
	        "AppService": "Core Authorization Service(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25471",
	        "AppService": "Biometric Matching Service(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25482",
	        "AppService": "ReflexRx Cloud (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25484",
	        "AppService": "TheyDo (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25487",
	        "AppService": "Pharma Warehouse Control System (WCS)(Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS25489",
	        "AppService": "Bio-HVS (High Volume Shipping Solution)(Prod)",
	        "SvcOffering": "Practice Service"
	    },
	    {
	        "ASNumber": "AS25501",
	        "AppService": "SAP CX5 (McKesson Europe Services) (Prod)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25503",
	        "AppService": "SAP CXF (McKesson Europe Services) (Prod)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25505",
	        "AppService": "SAP CXR (McKesson Europe Services)(Prod)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25507",
	        "AppService": "SAP GSE (McKesson Europe Services)(Prod)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25509",
	        "AppService": "SAP GSR (McKesson Europe Services)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25511",
	        "AppService": "Web Content - Genospace.com (Prod)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25536",
	        "AppService": "WebTMS (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25561",
	        "AppService": "Amjay (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25592",
	        "AppService": "NetApp Active IQ Unified Manager (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS25610",
	        "AppService": "USON Shoreline (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS25712",
	        "AppService": "Spellbook- MCC Legal (Prod)(SaaS)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25715",
	        "AppService": "6Sense (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25745",
	        "AppService": "PSAS DI Retail Support Services (RSS) - Prod",
	        "SvcOffering": "PSAS Decision Intelligence"
	    },
	    {
	        "ASNumber": "AS25788",
	        "AppService": "PSAS DI - Sales Operations (SOPS) - Prod",
	        "SvcOffering": "PSAS Decision Intelligence"
	    },
	    {
	        "ASNumber": "AS25796",
	        "AppService": "McKesson Gen AI Platform - Prod",
	        "SvcOffering": "Gen AI Platform Engineering & Management"
	    },
	    {
	        "ASNumber": "AS25807",
	        "AppService": "USON Asset Transfer Form (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25834",
	        "AppService": "SailPoint Identity Security Cloud (Prod)(SaaS)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS25847",
	        "AppService": "Microsoft SCCM Production USON(Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS25872",
	        "AppService": "PSAS DI Strategic Account Executive Dashboard (SA) (Prod)",
	        "SvcOffering": "PSAS Decision Intelligence"
	    },
	    {
	        "ASNumber": "AS25882",
	        "AppService": "MMS TUL5 CrossDock (Prod)",
	        "SvcOffering": "Ent Network Services"
	    },
	    {
	        "ASNumber": "AS25905",
	        "AppService": "Careviso (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25919",
	        "AppService": "IAM AEMS(Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS25921",
	        "AppService": "MSH Salesforce ORG(Prod)",
	        "SvcOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS25922",
	        "AppService": "PSaS Conga CLM (USON Payer)(Prod)",
	        "SvcOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS25923",
	        "AppService": "Salesforce - Liaison Visit & Master Data(Prod)",
	        "SvcOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS25924",
	        "AppService": "SalesForce Biologics Pricing Request(Prod)",
	        "SvcOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS25932",
	        "AppService": "3PL Clermont Distribution Center - CMM Third party logistics",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS25941",
	        "AppService": "PSAS DI Community Pharmacy & Health (CPH)(Prod)",
	        "SvcOffering": "PSAS Decision Intelligence"
	    },
	    {
	        "ASNumber": "AS26003",
	        "AppService": "Aruba Clearpass - (Prod)",
	        "SvcOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS26034",
	        "AppService": "PSAS DI McKesson Health Systems (MHS)(Prod)",
	        "SvcOffering": "PSAS Decision Intelligence"
	    },
	    {
	        "ASNumber": "AS26043",
	        "AppService": "Imanami 10.0.7784 (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS26045",
	        "AppService": "Apollo(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26062",
	        "AppService": "Wiz (Prod)",
	        "SvcOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS26074",
	        "AppService": "eHealth Technologies (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS26076",
	        "AppService": "Axonius (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26079",
	        "AppService": "MMS Martech - Salesforce Data Cloud (Prod)(SaaS)",
	        "SvcOffering": "Marketing & Procurement"
	    },
	    {
	        "ASNumber": "AS26084",
	        "AppService": "KardiaMobile(Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS26093",
	        "AppService": "Insight Health (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS26104",
	        "AppService": "CMM SFDC-MuleSoft (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26112",
	        "AppService": "Aidbox (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26116",
	        "AppService": "MMS DAAA Azure Modernization (Prod)",
	        "SvcOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS26120",
	        "AppService": "SIteCore (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS26155",
	        "AppService": "Terason uSmart Ultrasound (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS26163",
	        "AppService": "OneCloud Zabbix Monitoring(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26164",
	        "AppService": "SRFax(Prod)",
	        "SvcOffering": "Canada Order Mgmt. & Customer Portal"
	    },
	    {
	        "ASNumber": "AS26165",
	        "AppService": "VPN (SDP)(Prod)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS26166",
	        "AppService": "Rev-Trac(Prod)",
	        "SvcOffering": "Enterprise Application"
	    },
	    {
	        "ASNumber": "AS26167",
	        "AppService": "PSaS Print Management USP(Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS26168",
	        "AppService": "Synthesia(Prod)",
	        "SvcOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS26169",
	        "AppService": "Tableau (US Retina)(Prod)",
	        "SvcOffering": "PSAS Data Strategy & Adv Analytics"
	    },
	    {
	        "ASNumber": "AS26170",
	        "AppService": "Quickmobile(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26171",
	        "AppService": "Controlled Substances Data Clearing House - Bamboo Health(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26172",
	        "AppService": "Github (US Retina)(Prod)",
	        "SvcOffering": "Customer Reporting and Analytics"
	    },
	    {
	        "ASNumber": "AS26173",
	        "AppService": "Lease Accelerator(Prod)",
	        "SvcOffering": "HCM Services"
	    },
	    {
	        "ASNumber": "AS26174",
	        "AppService": "Ansible Automation Platform - Enterprise Patch Management(Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS26175",
	        "AppService": "Bamboo Health(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26176",
	        "AppService": "PayPal(Prod)",
	        "SvcOffering": "Ent. Finance Service Category"
	    },
	    {
	        "ASNumber": "AS26177",
	        "AppService": "Pharma Supply Agreement Upload tool(Prod)",
	        "SvcOffering": "Enterprise Application"
	    },
	    {
	        "ASNumber": "AS26178",
	        "AppService": "Tricentis Tosca NA DEV(Prod)",
	        "SvcOffering": "Enterprise Application"
	    },
	    {
	        "ASNumber": "AS26179",
	        "AppService": "Pharmacy Location Web Service(Prod)",
	        "SvcOffering": "Ent. Integration Technology Services"
	    },
	    {
	        "ASNumber": "AS26180",
	        "AppService": "Adobe Enterprise Admin Console(Prod)",
	        "SvcOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS26203",
	        "AppService": "Crisis24 WorldCue(Prod)",
	        "SvcOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS3336",
	        "AppService": "Practice Insights (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3348",
	        "AppService": "iKnowMed G1 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3350",
	        "AppService": "Clear Value Plus (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3351",
	        "AppService": "Clinical Trial Management System (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3355",
	        "AppService": "Learning Management System (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3359",
	        "AppService": "Perceptive Software (Formerly Imagenow) Accounts Payable Document Management (Prod)",
	        "SvcOffering": "Imaging"
	    },
	    {
	        "ASNumber": "AS3369",
	        "AppService": "Charge Capture (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3383",
	        "AppService": "Printer On (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS3391",
	        "AppService": "Liaison Reporting (Prod)",
	        "SvcOffering": "Customer Relationship Management"
	    },
	    {
	        "ASNumber": "AS3394",
	        "AppService": "Ontada Oracle My SQL (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3396",
	        "AppService": "Standard HL7 Interfaces (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3416",
	        "AppService": "Avaya (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS3417",
	        "AppService": "Cisco (Prod)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS3427",
	        "AppService": "TotalView Gen 2 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3431",
	        "AppService": "Revenue Manager (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3434",
	        "AppService": "USON Centricity Practice (G4) -Prod",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3440",
	        "AppService": "Practice Insights QCDR (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3443",
	        "AppService": "Lynx Mobile (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3444",
	        "AppService": "iKnowMed G2 (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3446",
	        "AppService": "Workday HRIS (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3451",
	        "AppService": "Cloverleaf (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3472",
	        "AppService": "eCommerce (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3473",
	        "AppService": "EDI Gateway (Prod) - Duplicate",
	        "SvcOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS3475",
	        "AppService": "PDS (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3476",
	        "AppService": "uCube (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3478",
	        "AppService": "Halo Spectrum (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS3486",
	        "AppService": "Televox (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3487",
	        "AppService": "Solution Reach (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3488",
	        "AppService": "Enghouse Interactive (Prod)",
	        "SvcOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS3490",
	        "AppService": "Realmed (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3491",
	        "AppService": "Rubixis (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3493",
	        "AppService": "Navicure (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3494",
	        "AppService": "Payerpath (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3502",
	        "AppService": "IngeniousMeds (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3504",
	        "AppService": "Advanced MD (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3505",
	        "AppService": "Allscripts Tiger (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3506",
	        "AppService": "AllScripts Vision (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3527",
	        "AppService": "MapCheck 2 (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3528",
	        "AppService": "MapCheck 3DVH (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3529",
	        "AppService": "SRS MapCheck (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3535",
	        "AppService": "Profiler Software (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3539",
	        "AppService": "Profiler (Sun Nuclear) (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3540",
	        "AppService": "Profiler 2 (Sun Nuclear) (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3553",
	        "AppService": "Florence (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3555",
	        "AppService": "Availity (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3561",
	        "AppService": "Outcome Health (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3562",
	        "AppService": "DYNR SDX Breath Hold System (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3564",
	        "AppService": "Digi Smart Sense (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3569",
	        "AppService": "AuthPal (Prod)",
	        "SvcOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3570",
	        "AppService": "Dr. Rounds (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3577",
	        "AppService": "PaxMan Scalp Cooling System (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3579",
	        "AppService": "TM1 (Prod)",
	        "SvcOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS9266",
	        "AppService": "MMS Data Rep (Prod)",
	        "SvcOffering": "Enterprise Infrastructure"
	    },
	    {
	        "ASNumber": "AS9269",
	        "AppService": "Pharma - PRIME (Profit and Risk Information Management Exchange) DB (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9270",
	        "AppService": "Identity and Access Management (MMS) (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS9285",
	        "AppService": "Agenta MMS (Prod)",
	        "SvcOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS9364",
	        "AppService": "FastTrack (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS9365",
	        "AppService": "Kafka-SIEM Platform (Prod)",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS9380",
	        "AppService": "Maintenance Connection (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9390",
	        "AppService": "Pharma Distribution Operations Web Portal (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS9415",
	        "AppService": "EnterpriseRx - Shield Services (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9423",
	        "AppService": "PSAS FedEx Shipmanager (Prod)",
	        "SvcOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS9426",
	        "AppService": "PSAS Vocollect VoiceLink (Prod)",
	        "SvcOffering": "Regulatory"
	    },
	    {
	        "ASNumber": "AS9447",
	        "AppService": "Generics - GX Services (Prod)",
	        "SvcOffering": "Gx Product Lifecycle Mgmt and Eng."
	    },
	    {
	        "ASNumber": "AS9449",
	        "AppService": "BADU Cork (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS9479",
	        "AppService": "Security Analytics (Prod)",
	        "SvcOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS9527",
	        "AppService": "Netezza (ScriptServer) - PROD",
	        "SvcOffering": "Decision Intelligence: PSAS Distribution"
	    },
	    {
	        "ASNumber": "AS9531",
	        "AppService": "ScriptMed Analytics - RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9532",
	        "AppService": "External Physician and Client Portal -  RxCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9534",
	        "AppService": "PP Manager - RX Crossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9535",
	        "AppService": "mPulse - RXCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9536",
	        "AppService": "iCMS - RXCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9537",
	        "AppService": "CE2000 - RXCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9538",
	        "AppService": "Aestiva - RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9539",
	        "AppService": "Team Foundation Server - RXCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9540",
	        "AppService": "ViewPoint - RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9541",
	        "AppService": "Exegis - RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9543",
	        "AppService": "Genexus - RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9544",
	        "AppService": "JBA System 21 - RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9546",
	        "AppService": "CARE BSS/Pharmacy - RXCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9547",
	        "AppService": "Srinsoft Menuing - RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9548",
	        "AppService": "Symantec Workflow - RXCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9549",
	        "AppService": "JKT9000 - RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9551",
	        "AppService": "Debit & Credit Web Portal - RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9553",
	        "AppService": "Brand Support Web API - RxCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9554",
	        "AppService": "RxCrossware NG Query - RXCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9555",
	        "AppService": "ICMS Reporting Portal (RxC / A&A)(Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9556",
	        "AppService": "GoAnywhere  - RXCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9557",
	        "AppService": "Nursing Web Portal - RXCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9559",
	        "AppService": "Alpha Trust eSignature - RXCrossroads (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9560",
	        "AppService": "IBM DataMirror - RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9562",
	        "AppService": "EZPrint -RXCrossroads (Prod)",
	        "SvcOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9588",
	        "AppService": "SolarWinds (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS9597",
	        "AppService": "Pharma DC - 8106 - Olive Branch National Redistribution Center, MS (Prod)",
	        "SvcOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS9624",
	        "AppService": "Pharma DC - 8321 - Buffalo Central Fill 2, NY (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9625",
	        "AppService": "Pharma DC - 8322 - Everett Costco Central Fill, WA (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9626",
	        "AppService": "Pharma DC - 8323 - Sacramento Costco Central Fill, CA (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9627",
	        "AppService": "Pharma DC - 8325 - Spring Walmart Central Fill, TX (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9628",
	        "AppService": "Pharma DC - 8730 - Orlando Walmart Central Fill, FL (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9631",
	        "AppService": "Hana Innovation Lab - HS3 (PROD)",
	        "SvcOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS9677",
	        "AppService": "Workday EFT (Prod)",
	        "SvcOffering": "Workforce Management"
	    },
	    {
	        "ASNumber": "AS9698",
	        "AppService": "CredHub (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9700",
	        "AppService": "Workday (Prod) (Saas)",
	        "SvcOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS9702",
	        "AppService": "Workforce Central (Prod) (SaaS)",
	        "SvcOffering": "Sales Compensation"
	    },
	    {
	        "ASNumber": "AS9703",
	        "AppService": "ADS Active Directory 2016 (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS9715",
	        "AppService": "Active Directory / Centralized Directory Services (Prod)",
	        "SvcOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS9726",
	        "AppService": "KNAPP - Automation Pharma Canada Brampton DC360 (Prod) ",
	        "SvcOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS9732",
	        "AppService": "RelayHealth Hub for Canada (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9737",
	        "AppService": "Well.ca Connectship (GCP Cloud Production Environment) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9738",
	        "AppService": "Tulip - Well.ca (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9742",
	        "AppService": "Canada Central Fill Synmed Technology-Ontario (Prod)",
	        "SvcOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS9748",
	        "AppService": "General Product Management (GPM) (Prod)",
	        "SvcOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS9760",
	        "AppService": "PTS Command Center (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9765",
	        "AppService": "Secure File Transfer Protocol Services (SFTP) (Loblaws) (Prod)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS9773",
	        "AppService": "System Center Virtual Machine Manager (Prod)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS9778",
	        "AppService": "Sage Accounting (Well.ca) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9801",
	        "AppService": "Varsity FedEx Services (Prod)",
	        "SvcOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS9803",
	        "AppService": "Cork ACT Door Access (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9832",
	        "AppService": "Pivotal Cloud Foundry - Azure East (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS9834",
	        "AppService": "Pivotal Cloud Foundry - US West GCP (Prod)",
	        "SvcOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS9836",
	        "AppService": "PSP - Remote Desktop Services (Prod)",
	        "SvcOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS9837",
	        "AppService": "PSP - VDI (Prod)",
	        "SvcOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS9841",
	        "AppService": "NDH vCD Infrastructure (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9843",
	        "AppService": "Virtual Infrastructure Management (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9844",
	        "AppService": "VMWare Cluster - Shared (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9853",
	        "AppService": "Symantec DLP",
	        "SvcOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS9861",
	        "AppService": "Cisco Unity SpeechView - Prod (SaaS)",
	        "SvcOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS9869",
	        "AppService": "PSAS Contact Center Technologies Application Support (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9870",
	        "AppService": "RF Menu (Prod)",
	        "SvcOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS9889",
	        "AppService": "McKIT NIM Server (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9895",
	        "AppService": "Cork ClarusOne File & Print (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9928",
	        "AppService": "Cork File Server (Prod)",
	        "SvcOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS9934",
	        "AppService": "Cork Paddington Print (Prod)",
	        "SvcOffering": "Employee Support"
	    },
	    {
	        "ASNumber": "AS9940",
	        "AppService": "Cork Warwick Financial Data (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9943",
	        "AppService": "Cork Zerto Azure Site Recovery (BCS DRaaS) (Prod)",
	        "SvcOffering": "IT Resiliency & Disaster Recovery"
	    },
	    {
	        "ASNumber": "AS9949",
	        "AppService": "SupportNow Managed Service Desk",
	        "SvcOffering": "Employee Support"
	    },
	    {
	        "ASNumber": "AS9952",
	        "AppService": "Facilities (Prod)",
	        "SvcOffering": "Ent. Data Center Services"
	    },
	    {
	        "ASNumber": "AS9953",
	        "AppService": "Enterprise Data Centers (Prod)",
	        "SvcOffering": "Ent. Data Center Services"
	    },
	    {
	        "ASNumber": "AS9970",
	        "AppService": "Follow Me Printing (FMP) (Prod) (SaaS)",
	        "SvcOffering": "IT Service Management & Analytics"
	    },
	    {
	        "ASNumber": "AS9978",
	        "AppService": "IPCenter - McKesson Dedicated (Prod)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS9980",
	        "AppService": "Shared Virtual I/O Server (VIO) (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9981",
	        "AppService": "UNIX Clusters (Prod)",
	        "SvcOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS9999",
	        "AppService": "VMWare (Prod)",
	        "SvcOffering": "Non-McKesson Technology Service"
	    },
	 
];

	return appSvcList;
}
