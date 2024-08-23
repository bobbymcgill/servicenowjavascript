var data = this.myList(); // Wanted my code up front, and the data at the bottom

for (var x = 0; x < data.length; x++){
	
	var appGood = false;
	var svcGood = false;

	var grAppSvc = new GlideRecord('cmdb_ci_service_auto');
	if (grAppSvc.get('number',data[x].ASNumber)){
		appGood = true;
	}

	var grSvcOffer = new GlideRecord('service_offering');
	if (grSvcOffer.get('name',data[x].ServiceOffering)){
		svcGood = true;
	}

	if(appGood && svcGood){
		
		var type = '1a9cb166f1571100a92eb60da2bce5c5'; //Parent: Depends On, Child: Used By
		var child = grAppSvc.getValue('sys_id');
		var parent = grSvcOffer.getValue('sys_id');

		var grRelation = new GlideRecord('cmdb_rel_ci');
		grRelation.initialize();
		grRelation.child = child;
		grRelation.parent = parent;
		grRelation.type = type;
		grRelation.update();


	} else {
		if (!appGood){
			gs.log('AppSvc-SvcOffer Error: No App Service Found: ' + data[x].AppService + ' --- Record: ' + data[x].ASNumber + " : " + data[x].ServiceOffering);
		}
		if (!svcGood){
			gs.log('AppSvc-SvcOffer Error: No Service Offering Found:' + data[x].ServiceOffering + ' --- Record: ' + data[x].ASNumber + " : " + data[x].ServiceOffering);
		}
	}
}

function myList(){
	var appSvcList = [
	    {
	        "ASNumber": "AS0051",
	        "AppService": "TSM (Tivoli Storage Management) (Prod)ndhbxnsn32",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS0070",
	        "AppService": "McKesson Connect - Data Exchange - Prod",
	        "ServiceOffering": "eCommerce"
	    },
	    {
	        "ASNumber": "AS0093",
	        "AppService": "AccessHealth FTP Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0101",
	        "AppService": "DBA LDAP (Prod)",
	        "ServiceOffering": "Ent. Database Technology Services"
	    },
	    {
	        "ASNumber": "AS0115",
	        "AppService": "MPS&A File Services (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0130",
	        "AppService": "Managed Care Optimizer (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0158",
	        "AppService": "SQL Audit Log Repository (Prod)",
	        "ServiceOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS0159",
	        "AppService": "MT Domain Administration Server (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0168",
	        "AppService": "MPSA Siebel CRM Hosting (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0183",
	        "AppService": "RIM Email Management Archive (Prod)",
	        "ServiceOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS0193",
	        "AppService": "Data Center Located File Servers (Prod)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS0202",
	        "AppService": "ETS HP Business System Management (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0208",
	        "AppService": "SST Data Mart Server (Prod)",
	        "ServiceOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS0219",
	        "AppService": "NLS Sybase IQ (Prod)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS0241",
	        "AppService": "HVS R&D and Support Services (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0252",
	        "AppService": "ESS Citrix and Vertex Exemption Certificate Manager (Prod)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS0254",
	        "AppService": "Pharma McKNethost2 (Prod)",
	        "ServiceOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS0255",
	        "AppService": "Peoplesoft (Prod)",
	        "ServiceOffering": "Sales Compensation"
	    },
	    {
	        "ASNumber": "AS0258",
	        "AppService": "Stock Options (Prod)",
	        "ServiceOffering": "Sales Compensation"
	    },
	    {
	        "ASNumber": "AS0271",
	        "AppService": "Wins Servers (Prod)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS0275",
	        "AppService": "McKesson Web Farm (Prod)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS0276",
	        "AppService": "ADS Active Directory (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0281",
	        "AppService": "CyberArk (Prod)",
	        "ServiceOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS0286",
	        "AppService": "MFC Technology Solutions Workstations (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0287",
	        "AppService": "iDigicall (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0291",
	        "AppService": "MMS STATpc (Prod)",
	        "ServiceOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS0302",
	        "AppService": "McKesson.com Website (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0326",
	        "AppService": "SiteMinder Web Single Sign-On (Prod/DR)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0354",
	        "AppService": "McKesson Packaging (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0367",
	        "AppService": "Manhattan Labor Management (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS0380",
	        "AppService": "AccessHealth Office - Smart Applications Suites (Prod)",
	        "ServiceOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS0384",
	        "AppService": "Relay Health -  Financial Reporting (Prod)",
	        "ServiceOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS0417",
	        "AppService": "Corporate Law Department Sharepoint (Prod)",
	        "ServiceOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS0420",
	        "AppService": "Centralized Security Servers (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0469",
	        "AppService": "InfoPrint ProcessDirector Printer (Prod)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS0485",
	        "AppService": "SFTS RoboHelp Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0492",
	        "AppService": "Demand Forecasting for SCORE (Prod)",
	        "ServiceOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS0506",
	        "AppService": "PSAS Distribution Applications (Prod) (VM)",
	        "ServiceOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS0544",
	        "AppService": "PingFederate (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0548",
	        "AppService": "Manhattan Transportation Management (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS0560",
	        "AppService": "MMS E1 Technology - Citrix XenVDI (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS0568",
	        "AppService": "SAP GUI Installer (Prod)",
	        "ServiceOffering": "Ent. SAP Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS0600",
	        "AppService": "MMS E1 Technology - Adapter (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS0609",
	        "AppService": "IBM ILMT Deployment (Prod)",
	        "ServiceOffering": "Service Enablement"
	    },
	    {
	        "ASNumber": "AS0622",
	        "AppService": "CIT Network Visibility (Prod)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS0634",
	        "AppService": "DMZ ADS Active Directory (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0646",
	        "AppService": "Health Mart Database (Prod)",
	        "ServiceOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS0661",
	        "AppService": "MPS Customer Data Security (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0670",
	        "AppService": "Identity and Access Management (Shared) (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS0678",
	        "AppService": "MMS Open Scan (Prod)",
	        "ServiceOffering": "Master Data"
	    },
	    {
	        "ASNumber": "AS0686",
	        "AppService": "MTS Citrix Xenapp/Xendesktop (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS0698",
	        "AppService": "Prescription Drug Marketing Act - PDMA (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0707",
	        "AppService": "Corporate Public Key Infrastructure (PKI) (Prod)",
	        "ServiceOffering": "Identity & Access Management Service"
	    },
	    {
	        "ASNumber": "AS0713",
	        "AppService": "Generic Finance Application (GFA) Data Warehouse (Prod)",
	        "ServiceOffering": "Customer Reporting and Analytics"
	    },
	    {
	        "ASNumber": "AS0782",
	        "AppService": "US Oncology Hosting (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS0792",
	        "AppService": "MFC Technology Solutions SQL Servers (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS0795",
	        "AppService": "ETS DBAOPS Cloud Control (Prod)",
	        "ServiceOffering": "Enterprise Infrastructure"
	    },
	    {
	        "ASNumber": "AS0802",
	        "AppService": "Pharma Buy Side (Prod)",
	        "ServiceOffering": "Incentives & Master Data"
	    },
	    {
	        "ASNumber": "AS0851",
	        "AppService": "Generics Business Applications (Prod)",
	        "ServiceOffering": "Gx Product Lifecycle Mgmt and Eng."
	    },
	    {
	        "ASNumber": "AS0888",
	        "AppService": "Governance Risk & Compliance - GP2 (Prod)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS0927",
	        "AppService": "Business to Business VPN (Network)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS0936",
	        "AppService": "Solar Winds Orion Systems (Prod)",
	        "ServiceOffering": "Ent. Scheduling & Observability Services"
	    },
	    {
	        "ASNumber": "AS0941",
	        "AppService": "Business Objects Data Services and Information Steward (BODSIS) - DSP (Prod)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS10000",
	        "AppService": "Hyperion 11.1.2.4 Application and Database Servers (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10001",
	        "AppService": "COG1 - Co-Lo Cogent GMD (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10002",
	        "AppService": "GUE1- Well DC Site (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10006",
	        "AppService": "BRA1 - Brampton DC (Network)",
	        "ServiceOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS10010",
	        "AppService": "DAR1 - GMD BU Dartmouth Pharmacy (Network)",
	        "ServiceOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS10011",
	        "AppService": "DRU1 - Drummondville DC (Network)",
	        "ServiceOffering": "Canada Field Tech 3"
	    },
	    {
	        "ASNumber": "AS10015",
	        "AppService": "MIL1 - Milton DC (Network)",
	        "ServiceOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS10016",
	        "AppService": "MIS2 - Mississauga Viscount (Network)",
	        "ServiceOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS10017",
	        "AppService": "MIS4 - Coopers Office (Network)",
	        "ServiceOffering": "IT Service Management & Analytics"
	    },
	    {
	        "ASNumber": "AS10019",
	        "AppService": "MON2 - Dobrin (Network)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10020",
	        "AppService": "MON3 - IBM Colo (Network)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10021",
	        "AppService": "MON4 - APS BU (Network)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS10024",
	        "AppService": "MON6 - Uniprix Metro (Network)",
	        "ServiceOffering": "Canada Field Tech 3"
	    },
	    {
	        "ASNumber": "AS10025",
	        "AppService": "MON7 - Uniprix Langelier (Network)",
	        "ServiceOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS10028",
	        "AppService": "MTL3 - CoLo (Cologix MTL3) (Network)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10031",
	        "AppService": "PIE9 - Montreal (Network)",
	        "ServiceOffering": "Canada Field Tech 3"
	    },
	    {
	        "ASNumber": "AS10032",
	        "AppService": "QUC1 - Quebec City (Network)",
	        "ServiceOffering": "Canada Field Tech 3"
	    },
	    {
	        "ASNumber": "AS10034",
	        "AppService": "RTI1 - R2i Colo for JDE Boucherville (Network)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10035",
	        "AppService": "RTI2 - R2i Colo for JDE Montreal (Network)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10036",
	        "AppService": "STJ1 - Mount-Pearl DC (Network)",
	        "ServiceOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS10039",
	        "AppService": "TOR1 - CoLo (Cologix TOR1) (Network)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10040",
	        "AppService": "TOR2 - CoLo (Cologix TOR2) (Network)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10041",
	        "AppService": "TRE1 - Trenton DC (Network)",
	        "ServiceOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS10046",
	        "AppService": "YQM1 - Moncton DC (Network)",
	        "ServiceOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS10073",
	        "AppService": "Costco Indiana Central Fill (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10099",
	        "AppService": "Data Hub for Category Management 2 (Prod)",
	        "ServiceOffering": "PSaS Data Architecture & Eng. Service"
	    },
	    {
	        "ASNumber": "AS10112",
	        "AppService": "Cloud Operations Zabbix (GCP) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10114",
	        "AppService": "Okta (Mckesson Corporate) - Prod",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS10131",
	        "AppService": "Platform Enablement Sandbox - GCP Project (DEV)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS10140",
	        "AppService": "GCP Forensics Analysis (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10145",
	        "AppService": "Advanced Development Programs - ADP Utilities (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1015",
	        "AppService": "MPS&A SAP Integration Services (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10151",
	        "AppService": "Cognos BI (Data mining) (Prod)",
	        "ServiceOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS10154",
	        "AppService": "Scottsdale Fax Inbound Monitoring (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10168",
	        "AppService": "(BI-COE) Business Intelligence Center of Excellence Databases (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10171",
	        "AppService": "ESS Business Objects (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10172",
	        "AppService": "Information Warehouse (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10174",
	        "AppService": "IXOS Archive Server (including EMC Centera) (Prod)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS10177",
	        "AppService": "Data Provisioning Area (DPA) (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10178",
	        "AppService": "Closed Loop Analytics (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10182",
	        "AppService": "IBM Websphere MQ for DCs (Prod)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS10184",
	        "AppService": "CVT & Datastage (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10185",
	        "AppService": "IW - New P101 Database (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10188",
	        "AppService": "MMS Sales Technology (Prod)",
	        "ServiceOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS10189",
	        "AppService": "MMS Point to Profit (Prod)",
	        "ServiceOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10194",
	        "AppService": "MMS Business Objects (Prod)",
	        "ServiceOffering": "Strategy"
	    },
	    {
	        "ASNumber": "AS10198",
	        "AppService": "D&K AS400 & SCORE/Lawson-Walsh/Distrack (Prod)",
	        "ServiceOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS10199",
	        "AppService": "NRC Orders (Prod)",
	        "ServiceOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS1020",
	        "AppService": "Healthstat SAS Platform (Prod)",
	        "ServiceOffering": "Data Architecture, Eng. & Governance"
	    },
	    {
	        "ASNumber": "AS10203",
	        "AppService": "McKesson Connect - Supplier Management - Prod",
	        "ServiceOffering": "Decision Intelligence: Provider & CGAT"
	    },
	    {
	        "ASNumber": "AS10204",
	        "AppService": "MMS Domino Application Server (Prod)",
	        "ServiceOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS10206",
	        "AppService": "SLA/IMA Oracle Databases (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS10256",
	        "AppService": "MMS PROS Pricing Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10272",
	        "AppService": "Richmond, VA Corporate Site - Room Wizard (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS10277",
	        "AppService": "MMS SQL Widget (Prod)",
	        "ServiceOffering": "Ent. ERP Platform Technology"
	    },
	    {
	        "ASNumber": "AS10285",
	        "AppService": "MON2 - McKesson Canada (Network)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10286",
	        "AppService": "MON3 - McKesson Canada (Network)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS10290",
	        "AppService": "MMS Sterling Integrator (Prod)",
	        "ServiceOffering": "Customer Relationship Management"
	    },
	    {
	        "ASNumber": "AS10291",
	        "AppService": "MediMart ProClaim  (Prod)",
	        "ServiceOffering": "MMS Finance & Strategy Service Category"
	    },
	    {
	        "ASNumber": "AS10308",
	        "AppService": "MMS File Servers (Prod)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS10310",
	        "AppService": "MMS VMware (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10315",
	        "AppService": "MPS&A EnterpriseRx Disaster Recovery Environment (Co-Lo) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10317",
	        "AppService": "MLS Pharmacy Copay (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10324",
	        "AppService": "Pharma MRF1 - Murfreesboro, TN File Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10331",
	        "AppService": "McKesson Business Analytics  (DEV)",
	        "ServiceOffering": "MBA Reporting"
	    },
	    {
	        "ASNumber": "AS10332",
	        "AppService": "McKesson Business Analytics  (PROD)",
	        "ServiceOffering": "MBA Reporting"
	    },
	    {
	        "ASNumber": "AS10343",
	        "AppService": "MagicInfo Azure (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10347",
	        "AppService": "PSAS - Active Directory Domains for US Oncology (CoLo)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS10350",
	        "AppService": "MMS E1 Technology - Enterprise Servers JD Edwards (JDE) (Prod)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS10351",
	        "AppService": "MMS Advanced Transportation (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS10356",
	        "AppService": "MMS E1 Technology - XenApp (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS10359",
	        "AppService": "MMS E1 ISERIES JD Edwards (JDE) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10362",
	        "AppService": "PSAS - Web Services for US Oncology (CoLo)(Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS10364",
	        "AppService": "BizManager (Prod)",
	        "ServiceOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS10366",
	        "AppService": "PSAS - USON and SSF servers (CoLo)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS10368",
	        "AppService": "Pharma Customer Care Telestock (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10370",
	        "AppService": "MMS MedFORCE (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS10373",
	        "AppService": "MMS File Servers (Moore) (Prod)",
	        "ServiceOffering": "MMS Finance & Strategy Service Category"
	    },
	    {
	        "ASNumber": "AS10383",
	        "AppService": "Serialization 4 Wall (Prod)",
	        "ServiceOffering": "Ent. SAP Managed Services"
	    },
	    {
	        "ASNumber": "AS10384",
	        "AppService": "MMS Oracle PDH (Prod)",
	        "ServiceOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10396",
	        "AppService": "MMS E3 Web Dashboard (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10398",
	        "AppService": "GV SMO EC Middle Tier (Prod)",
	        "ServiceOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10404",
	        "AppService": "MMS MIT XenApp (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS10418",
	        "AppService": "MMS Teleran iSight (Prod)",
	        "ServiceOffering": "MMS Data & Advanced Analytics Category"
	    },
	    {
	        "ASNumber": "AS10423",
	        "AppService": "MMS Credit Card Vault (Prod)",
	        "ServiceOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10425",
	        "AppService": "Cypress Syspro & MegaTrak (Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10427",
	        "AppService": "Cypress SQL Server (Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10431",
	        "AppService": "PSAS UNIX (CoLo)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS1044",
	        "AppService": "McKIT Xenapp and Xendesktop (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS10442",
	        "AppService": "Golden Valley Internal SFTP Services (Prod)",
	        "ServiceOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10444",
	        "AppService": "SMO Web Services Tier (Prod)",
	        "ServiceOffering": "Innovation and Operations Enablement"
	    },
	    {
	        "ASNumber": "AS10474",
	        "AppService": "Concord Data Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10498",
	        "AppService": "MMS Vmware Utility Servers  (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10507",
	        "AppService": "Sap Cyber-Security (ETD) Enterprise Threat Detection SDS (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS10528",
	        "AppService": "MMS Labor Management System (LMS) Production (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS10546",
	        "AppService": "Five9 - US (Prod)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS10555",
	        "AppService": "RDU2 - Cary DC (Prod)",
	        "ServiceOffering": "Ent. Practices Tech. Services"
	    },
	    {
	        "ASNumber": "AS10587",
	        "AppService": "MMS Doc Origin (PROD)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS1060",
	        "AppService": "Generics Reporting Services - AR Reporting Manager (Prod)",
	        "ServiceOffering": "Incentives & Master Data"
	    },
	    {
	        "ASNumber": "AS10622",
	        "AppService": "McKesson Medical Surgical Archived Databases (Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10623",
	        "AppService": "ETS - DBAOPS Ansible (Prod)",
	        "ServiceOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS10627",
	        "AppService": "Produitsoptionplus Uniprix (Prod)",
	        "ServiceOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS10635",
	        "AppService": "Google Suite Services - Canada (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10649",
	        "AppService": "Developer Services (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS1067",
	        "AppService": "Tableau Visualization Service (Prod)",
	        "ServiceOffering": "Data Visualization Platform Management"
	    },
	    {
	        "ASNumber": "AS10676",
	        "AppService": "MSH IBM Planning/Analytics TM1 (Prod)",
	        "ServiceOffering": "Enterprise Compliance"
	    },
	    {
	        "ASNumber": "AS10680",
	        "AppService": "RxTS-MPTS-MPTS Self Managed Support (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10681",
	        "AppService": "MPS EnterpriseRx (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10682",
	        "AppService": "ProPBM (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10683",
	        "AppService": "RxTS MPS PharmacyRx (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10684",
	        "AppService": "Value Added Network (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10685",
	        "AppService": "RxTS RHPS PPE (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10686",
	        "AppService": "PSaS MacroHelix 340B Architect (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10687",
	        "AppService": "Data Delivery (Data Services) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10689",
	        "AppService": "RxTS MPS Adherence Performance Solution (APS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10690",
	        "AppService": "RxTS MacroHelix NDC Architect (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10691",
	        "AppService": "RxTS CMM Prior Authorization Portal (Prod)",
	        "ServiceOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10693",
	        "AppService": "Average Wholesale Price (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10694",
	        "AppService": "Easy Payment and Remittance (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10695",
	        "AppService": "ePrescribing Support (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10696",
	        "AppService": "RxTS RHPS Electronic Managed File Transfer (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10699",
	        "AppService": "RxTS CMM Clinical Alerts (Prod)",
	        "ServiceOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS1070",
	        "AppService": "Identity and Access Management (McKesson Connect) (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS10700",
	        "AppService": "RxTS CMM Easy Button (Prod)",
	        "ServiceOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10701",
	        "AppService": "RxTS CMM EHR Integrations (Prod)",
	        "ServiceOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10702",
	        "AppService": "RxTS CMM EPA (Prod)",
	        "ServiceOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10703",
	        "AppService": "RxTS CMM HubExpress (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10704",
	        "AppService": "CMM NetSuite (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10707",
	        "AppService": "ReportingRx (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10708",
	        "AppService": "COMSTAT (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10709",
	        "AppService": "RxTS MPS eService (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10710",
	        "AppService": "RxTS MPS PSM Pegasys (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10712",
	        "AppService": "Transaction Tester (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10713",
	        "AppService": "RxTS CMM Autobahn (Prod)",
	        "ServiceOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10714",
	        "AppService": "CMM - Billing as a Service (BaaS) - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10715",
	        "AppService": "RxTS CMM SalesForce (Prod)",
	        "ServiceOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS10717",
	        "AppService": "Customer Profile System (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10719",
	        "AppService": "RxTS RHPS Prescriber Web Lookup (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10722",
	        "AppService": "MMS DCT Operations - Warehouse Control System (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS10729",
	        "AppService": "Retail_Loyalty_Database Azure Data Warehouse (Data mining) (Prod)",
	        "ServiceOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS10730",
	        "AppService": "ETS - DBAOPS SQLDM (Prod)",
	        "ServiceOffering": "Enterprise Infrastructure"
	    },
	    {
	        "ASNumber": "AS10738",
	        "AppService": "Pharmatek-Production (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10742",
	        "AppService": "Role Manager-Production (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10746",
	        "AppService": "DSI-Drug Spend Intelligence - Production (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10751",
	        "AppService": "RxO IT Operations (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10754",
	        "AppService": "3PL / Pharmacy system (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS10756",
	        "AppService": "PARATA Interface (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS10758",
	        "AppService": "INA SQL Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10761",
	        "AppService": "PROGRESS (Uniprix / Proxim ERP) (Prod)",
	        "ServiceOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS10769",
	        "AppService": "iSeries Administration (Prod)",
	        "ServiceOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS10774",
	        "AppService": "SPARK - Support Program Anomaly Record Keeper (Prod)",
	        "ServiceOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS10777",
	        "AppService": "McKesson.com Big Query Project for Google Analytics Linking (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10790",
	        "AppService": "Magic Box (Well.ca) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10806",
	        "AppService": "Uniprix RH Management (Prod)",
	        "ServiceOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS10820",
	        "AppService": "Concierge Product Catalog API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10825",
	        "AppService": "Dataguise (Prod)",
	        "ServiceOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS10833",
	        "AppService": "Anaplan Connect - Margin Analyzer (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1084",
	        "AppService": "Bamboo Remote Agent (Prod)",
	        "ServiceOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10842",
	        "AppService": "MLS Mulesoft Cloud integrations (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10843",
	        "AppService": "MLS Informatica Cloud Integrations (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10844",
	        "AppService": "MLS SalesForce Novartis Hub (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10846",
	        "AppService": "MMS Oracle VM Environment - (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1085",
	        "AppService": "(EASP) Enterprise Azure Services (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS10851",
	        "AppService": "Enterprise Data Quality for Product (EDQP) (Prod)",
	        "ServiceOffering": "Strategy"
	    },
	    {
	        "ASNumber": "AS10858",
	        "AppService": "RxC Copay Business Intelligence Reporting Portal (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10859",
	        "AppService": "Customer Engagement SFDC Data Services (Prod)",
	        "ServiceOffering": "Service Capabilities"
	    },
	    {
	        "ASNumber": "AS10861",
	        "AppService": "Cloud Operations Zabbix - Azure (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10868",
	        "AppService": "TABS SQL Server Cluster (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10869",
	        "AppService": "Marketplace Scrapes (Prod)",
	        "ServiceOffering": "Commercial & Sales Analytics Service"
	    },
	    {
	        "ASNumber": "AS10873",
	        "AppService": "Uniprix Website (Prod)",
	        "ServiceOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS10887",
	        "AppService": "Rapid 7 (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS10888",
	        "AppService": "Fax Services (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1089",
	        "AppService": "Netezza and Tableau (Prod)",
	        "ServiceOffering": "Customer Relationship Management"
	    },
	    {
	        "ASNumber": "AS10890",
	        "AppService": "Prescriber (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10891",
	        "AppService": "ROAR - Reimbursement Application (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10892",
	        "AppService": "UHub Services (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10893",
	        "AppService": "MLS SalesForce Scottsdale Hub (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10894",
	        "AppService": "PAS (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10895",
	        "AppService": "Portals (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10897",
	        "AppService": "REMS - Endo Xiaflex (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10904",
	        "AppService": "IPO Home Health (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10907",
	        "AppService": "CDD (McKesson Automation Calibration Drug Database)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10909",
	        "AppService": "Proof of Delivery (POD) Streaming (Prod)",
	        "ServiceOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS10914",
	        "AppService": "GALAPAGOS (Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10918",
	        "AppService": "BWise (Prod) (SaaS)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS10925",
	        "AppService": "MMS MDM - Master Data Management (Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10926",
	        "AppService": "MMS E3 JDA (Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10927",
	        "AppService": "MMS AR Payment Portal (Prod)",
	        "ServiceOffering": "Innovation and Operations Enablement"
	    },
	    {
	        "ASNumber": "AS10928",
	        "AppService": "MMS BazaarVoice (Prod)",
	        "ServiceOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS10930",
	        "AppService": "MMS MBA (Prod)",
	        "ServiceOffering": "MBA Reporting"
	    },
	    {
	        "ASNumber": "AS10931",
	        "AppService": "MMS MMP-E1 (Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10932",
	        "AppService": "PCS API Connectivity Services (Prod)",
	        "ServiceOffering": "Connectivity"
	    },
	    {
	        "ASNumber": "AS10936",
	        "AppService": "MMS E1 Technology - Data Collection (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS10937",
	        "AppService": "MMS E1 Pricing (Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS10940",
	        "AppService": "MMS StatWeb (Prod)",
	        "ServiceOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS10941",
	        "AppService": "MMS EC/PC Quote Tool (Prod)",
	        "ServiceOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS10942",
	        "AppService": "MMS PCI (Prod)",
	        "ServiceOffering": "Account Receivable"
	    },
	    {
	        "ASNumber": "AS10943",
	        "AppService": "MMS PayPal (Prod)",
	        "ServiceOffering": "Account Receivable"
	    },
	    {
	        "ASNumber": "AS10945",
	        "AppService": "MMS Ramilia (Prod)",
	        "ServiceOffering": "Account Receivable"
	    },
	    {
	        "ASNumber": "AS10947",
	        "AppService": "McKesson Corporate - Change Auditor (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10948",
	        "AppService": "MMS Data Warehouse (Prod)",
	        "ServiceOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS10950",
	        "AppService": "MMS EDW (Prod)",
	        "ServiceOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS10953",
	        "AppService": "MMS Cust Engagement (Prod)",
	        "ServiceOffering": "Service Capabilities"
	    },
	    {
	        "ASNumber": "AS10956",
	        "AppService": "MMS DocOrgin & JDEdwards (Prod)",
	        "ServiceOffering": "Master Data"
	    },
	    {
	        "ASNumber": "AS10960",
	        "AppService": "Cisco UCCX (Prod)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS10969",
	        "AppService": "Cloud Platform Services - Pivotal Cloud Foundry - US East GCP (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS10974",
	        "AppService": "Google Kubernetes Engine (GKE) - US East (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS10979",
	        "AppService": "Google Kubernetes Engine (GKE) - Northamerica Northeast2 (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS10980",
	        "AppService": "Google Kubernetes Engine (GKE) - Northamerica Northeast1 (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS10982",
	        "AppService": "Qliqsoft (SaaS) (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS10986",
	        "AppService": "Imperva SecureSphere Database Activity Monitoring Infrastructure US (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS10987",
	        "AppService": "Imperva Secure Sphere Database Activity Monitoring Infrastructure EU (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS10988",
	        "AppService": "Imperva SecureSphere Database Activity Monitoring Infrastructure CAN (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS10989",
	        "AppService": "MMS E1 EDI (Prod)",
	        "ServiceOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS10990",
	        "AppService": "MMS EC EDI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11001",
	        "AppService": "MLS SalesForce Innovent Oncology  (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11006",
	        "AppService": "Supplylogix (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11015",
	        "AppService": "GPO Multisource Team(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11018",
	        "AppService": "Autodesk/Autocad Licence Service (Prod)",
	        "ServiceOffering": "Marketing & Procurement"
	    },
	    {
	        "ASNumber": "AS1102",
	        "AppService": "HANA Native Security Integration and Strategy - GP3 (Prod)",
	        "ServiceOffering": "Ent. SAP Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS11027",
	        "AppService": "RMG Digital Sign (Prod)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS11031",
	        "AppService": "Independent National Accounts (INA) SQL Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11032",
	        "AppService": "Maple Integration Server (Prod)",
	        "ServiceOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS11034",
	        "AppService": "MMS E1 Accounts Payable / General Ledger/Tax (Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS11037",
	        "AppService": "Cornerstone Learning Management System - LMS (Prod) (SaaS)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS11040",
	        "AppService": "Consumer Products Group Linux Database and Web Hosting Servers (Prod)",
	        "ServiceOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS11042",
	        "AppService": "MCF1 Multi-client CFaaS Memphis(Network)",
	        "ServiceOffering": "Ent. Connectivity Technology Services"
	    },
	    {
	        "ASNumber": "AS11044",
	        "AppService": "SentinelOne (Prod)(SaaS)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS1105",
	        "AppService": "Robotic Process Automation (RPA) (Prod)",
	        "ServiceOffering": "Automation"
	    },
	    {
	        "ASNumber": "AS11050",
	        "AppService": "Network Security Automation Services (Prod)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS11055",
	        "AppService": "Veracode Scan Appliances (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS11056",
	        "AppService": "Medical Specialties Distributors Prophet 21 (P21) SQL Database Server (Prod)",
	        "ServiceOffering": "MMS Finance & Strategy Service Category"
	    },
	    {
	        "ASNumber": "AS11057",
	        "AppService": "Recovery Manager for Active Directory (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11059",
	        "AppService": "Veracode Dynamic Analysis Endpoint (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS11062",
	        "AppService": "Mckesson Specialty Health IBM Planning and Analytics (Prod)",
	        "ServiceOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS11065",
	        "AppService": "Electronic Evidence Management General Counsel Organization (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11071",
	        "AppService": "DRaaS in GCP (Prod)",
	        "ServiceOffering": "IT Resiliency & Disaster Recovery"
	    },
	    {
	        "ASNumber": "AS11082",
	        "AppService": "Canada Cisco Unity Connections Voicemail (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS11099",
	        "AppService": "LIS Instrument Server (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11102",
	        "AppService": "Manufacturers Reimbursement Support System – MARSS (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11106",
	        "AppService": "Cisco Unity Connections Voicemail (Prod)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS11107",
	        "AppService": "FindmyMeds (Prod)",
	        "ServiceOffering": "Service Capabilities"
	    },
	    {
	        "ASNumber": "AS11121",
	        "AppService": "MMS E1 Accounts Receivable (Prod)",
	        "ServiceOffering": "Account Receivable"
	    },
	    {
	        "ASNumber": "AS11125",
	        "AppService": "SSAS MSSQL Data Warehouse (Data mining) (Prod)",
	        "ServiceOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS11127",
	        "AppService": "Diem Health (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11134",
	        "AppService": "MMS GV IBMi (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1114",
	        "AppService": "Identity and Access Management (MSH) (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11142",
	        "AppService": "Project Link version 2 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11144",
	        "AppService": "Palo Alto Network (PAN) Prisma Suite (Prod)",
	        "ServiceOffering": "Ent. Infra. & Technology Projects"
	    },
	    {
	        "ASNumber": "AS11145",
	        "AppService": "MMS Proof of Delivery Service (Prod)",
	        "ServiceOffering": "B2C E-Commerce"
	    },
	    {
	        "ASNumber": "AS11146",
	        "AppService": "AMP Government Pricing (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS11161",
	        "AppService": "PSAS Business Engagement (Prod)",
	        "ServiceOffering": "Deal Pricing Modeling and Mgmt Service"
	    },
	    {
	        "ASNumber": "AS11168",
	        "AppService": "DigiCert TLS/SSL Certificate Services (Prod)",
	        "ServiceOffering": "Identity & Access Management Service"
	    },
	    {
	        "ASNumber": "AS11169",
	        "AppService": "Keyfactor Certificate Management System (CMS,PKI) (Prod)",
	        "ServiceOffering": "Identity & Access Management Service"
	    },
	    {
	        "ASNumber": "AS11170",
	        "AppService": "System Center Configuration Manager(SCCM) Distribution Points (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS11173",
	        "AppService": "MSSQL SSIS - ETL Driver - Data Warehouse (Prod)",
	        "ServiceOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS11177",
	        "AppService": "RxToolkit (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11182",
	        "AppService": "API Access Management (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11184",
	        "AppService": "Sales Intelligence Management System (SIMS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11185",
	        "AppService": "iKnowMed G2 (RO) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11187",
	        "AppService": "GCP Service Monitoring (Prod) (SaaS)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS11188",
	        "AppService": "Cloud Operations Zabbix GKE (Google Kubernetes Engine) (On Prem) (PaaS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11189",
	        "AppService": "xTract (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11192",
	        "AppService": "JD Edwards - Pharmacy Technology Solutions (PTS) (Prod)",
	        "ServiceOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS11193",
	        "AppService": "McKesson COVID Screening – Healthbot (Prod)",
	        "ServiceOffering": "Ent. Gen AI"
	    },
	    {
	        "ASNumber": "AS11195",
	        "AppService": "IOG Storage Area Network (SAN) Infrastructure (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS11208",
	        "AppService": "CA Performance Management (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11210",
	        "AppService": "PAE Verint Call Transcripts Solution (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11212",
	        "AppService": "MMS EC ISERIES CORP (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS11214",
	        "AppService": "MMS EC ISERIES WEST (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS11217",
	        "AppService": "Amelia AI Platform (DR) (Prod)",
	        "ServiceOffering": "Ent. Gen AI"
	    },
	    {
	        "ASNumber": "AS11222",
	        "AppService": "Ansible (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11225",
	        "AppService": "Xmedias On Prem (Prod)",
	        "ServiceOffering": "Canada"
	    },
	    {
	        "ASNumber": "AS11227",
	        "AppService": "Windows Print Services - USON - MCA (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11229",
	        "AppService": "Nuance Auto Store - USON - Minnesota Oncology (MNO) (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11231",
	        "AppService": "Credentialing Server USON WMS (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11232",
	        "AppService": "File Server USON RMCC (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11233",
	        "AppService": "Print Server USON WMS (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11234",
	        "AppService": "MAS Financials Sage 100 (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11235",
	        "AppService": "Maple (Prod)",
	        "ServiceOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS11239",
	        "AppService": "ELKAY Precision Medicine (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11240",
	        "AppService": "USON-TXO Honeywell ProWatch (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11242",
	        "AppService": "Dr Knox EMR Archive (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11243",
	        "AppService": "HP Web JetAdmin (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11245",
	        "AppService": "Zoho ManageEngine Asset Explorer (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11248",
	        "AppService": "AMAG / Symmetry Door Access System - USON - Minnesota Oncology (MNO) (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11249",
	        "AppService": "OnBase Replica - USON - Minnesota Oncology (MNO) (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS1125",
	        "AppService": "SSA -SharePoint 2016 Instance (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS11250",
	        "AppService": "MARS (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11257",
	        "AppService": "File Servers - TXO (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11258",
	        "AppService": "Nuance Output Manager - USON - Minnesota Oncology (MNO) (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11259",
	        "AppService": "BT Diamond Sapphire ISC DHCP Server (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11260",
	        "AppService": "File Server USON MOH (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11261",
	        "AppService": "File Server USON NYOH (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11262",
	        "AppService": "File Server USON VCS (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11263",
	        "AppService": "Windows Print Services - USON - Illinois Cancer Specialists (ICS) (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11264",
	        "AppService": "Windows Print Services - USON - RMCC (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11265",
	        "AppService": "Labdaq Server USON MOH (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11266",
	        "AppService": "Nexgen EHR USON MOH (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11268",
	        "AppService": "Web Server USON NYOH (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11270",
	        "AppService": "Laserfiche Document Repository USON VCS (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11271",
	        "AppService": "CAS SSO (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11272",
	        "AppService": "Patient Tools (PTI) - USON - Minnesota Oncology (MNO) (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11278",
	        "AppService": "QuickBooks (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11280",
	        "AppService": "File Server USON WMS (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11281",
	        "AppService": "Microsoft Great Plains (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11282",
	        "AppService": "Terminal Server USON WMS (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11285",
	        "AppService": "File/Print Server USON NE Queens (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11286",
	        "AppService": "Alarm Lock- DL - Windows (Door Lock) USON - RMCC (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11287",
	        "AppService": "FIle/Print Server USON NE Brooklyn (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11288",
	        "AppService": "Assure ID - USON - RMCC (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11289",
	        "AppService": "File/Print  Server USON NE Columbus (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11290",
	        "AppService": "Nuance Output Manager - USON - Affiliated Oncologists (AFFO) (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11291",
	        "AppService": "Nuance Auto Store - USON - Affiliated Oncologists (AFFO) (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11292",
	        "AppService": "File Server - USON - Illinois Cancer Specialists (ICS) (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11294",
	        "AppService": "File/Print Server USON NE Providence (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11297",
	        "AppService": "File/Print Server USON NE Hope (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11300",
	        "AppService": "McKesson Specialty Health Portal (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11305",
	        "AppService": "Quality Software Systems LabHealth (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11306",
	        "AppService": "File Server USON NE Exton (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11308",
	        "AppService": "Alerton Ascent Environmental Control - USON - Minnesota Oncology (MNO) (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11309",
	        "AppService": "Business Works - USON - Minnesota Oncology (MNO) (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS1131",
	        "AppService": "ClarusOne (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11311",
	        "AppService": "SAP Workforce Performance Builder (SWPB) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11315",
	        "AppService": "PMD Charge Capture Interface (Allina Hospital) - USON - Minnesota Oncology (MNO) (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11316",
	        "AppService": "Jenkins (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11319",
	        "AppService": "Windows Print Services - USON - IL-JV (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11321",
	        "AppService": "Splunk",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS11327",
	        "AppService": "Mutare - USON RMCC (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11328",
	        "AppService": "USON Employee Portal SCC (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11329",
	        "AppService": "USON File Server SCC (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS1133",
	        "AppService": "Palo Alto Networks User ID agent servers (Prod)",
	        "ServiceOffering": "Ent Network Services"
	    },
	    {
	        "ASNumber": "AS11330",
	        "AppService": "US Oncology (USON) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11331",
	        "AppService": "Physician Outreach Program (POP) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11333",
	        "AppService": "USON Interface Server SCC (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11334",
	        "AppService": "USON SQL Server SCC (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11337",
	        "AppService": "Local Marketing Support Gateway (LMS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11339",
	        "AppService": "File/Print Server USON NE OHC (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11340",
	        "AppService": "Socialworker (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11341",
	        "AppService": "File/Print Server USON NE BRCC (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11342",
	        "AppService": "File/Print Server USON NE Evansville (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11343",
	        "AppService": "File/Print Server USON NE Kentuckiana (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11344",
	        "AppService": "File/Print Server USON NE VOA (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11346",
	        "AppService": "ISRM Prisma Cloud (Prod) (SaaS)",
	        "ServiceOffering": "Security Architecture & Strategy"
	    },
	    {
	        "ASNumber": "AS11348",
	        "AppService": "Google Cloud Security Command Center (Prod) (SaaS)",
	        "ServiceOffering": "Security Architecture & Strategy"
	    },
	    {
	        "ASNumber": "AS11349",
	        "AppService": "ISRM Cloud DevSecOps Infrastructure Tool (Prod) (SaaS)",
	        "ServiceOffering": "Security Architecture & Strategy"
	    },
	    {
	        "ASNumber": "AS1135",
	        "AppService": "Pivotal Cloud Foundry - Azure West (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS11352",
	        "AppService": "Azure Security Center (Prod) (SaaS)",
	        "ServiceOffering": "Security Architecture & Strategy"
	    },
	    {
	        "ASNumber": "AS11353",
	        "AppService": "Drug Temp Monitoring USON NE VOA (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11358",
	        "AppService": "Forescout NAC (Prod)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS11359",
	        "AppService": "File Server USON NE VO RBO (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS1136",
	        "AppService": "MMS ElasticStack Advanced Analytics for Simone (Prod)",
	        "ServiceOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS11361",
	        "AppService": "Windstream Phone System (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11362",
	        "AppService": "Print Server USON NE VO RBO (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11363",
	        "AppService": "USON File Server GCCC (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11364",
	        "AppService": "USON NAS CCCB (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11365",
	        "AppService": "USON Domain Controller CCCB (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11367",
	        "AppService": "USON Print Server CCCB (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11369",
	        "AppService": "USON File Server RCOG (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11371",
	        "AppService": "USON Print Server RCOG (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11372",
	        "AppService": "USON File Server SFOH (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11373",
	        "AppService": "USON File Server ICCC (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11375",
	        "AppService": "Palo Alto CASB (SaaS)- Prod",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS11377",
	        "AppService": "MPS Salesforce Instance (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11379",
	        "AppService": "McAfee End Point Security (EU) (Prod)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS11380",
	        "AppService": "MPS&A Merchant Services (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11381",
	        "AppService": "MPS&A Customer 360 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11384",
	        "AppService": "McAfee End Point Security (USON) (Prod)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS11385",
	        "AppService": "MPS&A Partner Services Data Rights (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11387",
	        "AppService": "LeanIX (Prod) (SaaS)",
	        "ServiceOffering": "Enterprise Architecture"
	    },
	    {
	        "ASNumber": "AS11391",
	        "AppService": "Azure Data Factory (ADF) (Prod)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS11393",
	        "AppService": "MPTS Reporting Service (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11395",
	        "AppService": "USON File Server SRPCTC (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11399",
	        "AppService": "MPTS One Cloud File Services (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11400",
	        "AppService": "Zoom - USON RMCC (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11401",
	        "AppService": "Avigilon Access Control System- USON MTWRBO (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11402",
	        "AppService": "Great Plains OHC (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11405",
	        "AppService": "Imperva - WAF-Prod-SaaS",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS11407",
	        "AppService": "MPTS VMWare in Relay Health (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11408",
	        "AppService": "Ansible Patching Automation (Prod)",
	        "ServiceOffering": "IT Resiliency & Disaster Recovery"
	    },
	    {
	        "ASNumber": "AS11415",
	        "AppService": "USON Print Server SRPCTC (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11417",
	        "AppService": "ISRM Splunk ES - Search Heads (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS11418",
	        "AppService": "Beeline (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11419",
	        "AppService": "MPTS VMWare Section (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1142",
	        "AppService": "PSaS Customer Experience Operations - Intradiem (Prod)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS11420",
	        "AppService": "CultivateAI (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11421",
	        "AppService": "MPS Product Training Lab (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11422",
	        "AppService": "Fidelity Stock Plan Services (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11424",
	        "AppService": "MPS ERX Test Automation (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11425",
	        "AppService": "Pacific Office Automation Scanning,Storage and Printing (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11430",
	        "AppService": "AOA Sharepoint (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11431",
	        "AppService": "MPS Pharmaserv Labs (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11433",
	        "AppService": "MPS Data Conversions Section (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11434",
	        "AppService": "Incapsula WAF Config Check Automation (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS11438",
	        "AppService": "IBP - Compass (Prod)",
	        "ServiceOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS11439",
	        "AppService": "IBP-FLU Vaccines (Prod)",
	        "ServiceOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS1144",
	        "AppService": "Microsoft SCCM Production NAMCK & CA(Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS11440",
	        "AppService": "IBP - Inventory Adjustment UI Application (Prod)",
	        "ServiceOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS11441",
	        "AppService": "IBP - NorthStar (Prod)",
	        "ServiceOffering": "SV&T"
	    },
	    {
	        "ASNumber": "AS11445",
	        "AppService": "Beverly Hills File Server (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11446",
	        "AppService": "AOA LibertyNet Server (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11447",
	        "AppService": "Campbell File Server (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11452",
	        "AppService": "MPTS Livonia Net Backup Services Section (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11453",
	        "AppService": "SBROPWVPR001 USON - WEST (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11454",
	        "AppService": "MPTS Directory Services Section (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11455",
	        "AppService": "AOA Lenel Securty Badge System (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11456",
	        "AppService": "MPS Livonia Production Customer Build (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11457",
	        "AppService": "Riverside Image Server (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11460",
	        "AppService": "File and Print Server (NCSP) (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS11461",
	        "AppService": "MPS Livonia Test Customer Build (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11463",
	        "AppService": "Legacy RxTPL ERP System (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS11464",
	        "AppService": "Temecula File Server  (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11466",
	        "AppService": "AOA MTSOA Nuance Shadowlink Transcription HL7 Interface (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11468",
	        "AppService": "Legacy RxTPL WMS System (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS11470",
	        "AppService": "MSH - Oracle (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11475",
	        "AppService": "Black Box - De-Id (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11476",
	        "AppService": "MSH - MicroSoft SQL Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11478",
	        "AppService": "Blackhawk Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1148",
	        "AppService": "SOC Tools Server (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond Service"
	    },
	    {
	        "ASNumber": "AS11480",
	        "AppService": "Moon TWP ERX Off Hours Production Support (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11481",
	        "AppService": "MPSA Siebel eService (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11482",
	        "AppService": "MPS Livonia Shipping (ShipManager) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11484",
	        "AppService": "Audio Visual (AV) Equipment (Prod)",
	        "ServiceOffering": "In-Office Employee Enablement"
	    },
	    {
	        "ASNumber": "AS11485",
	        "AppService": "Clinical Applications Tools Server USON (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11489",
	        "AppService": "MaxRVU (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11493",
	        "AppService": "MPS / Datto RMM (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11494",
	        "AppService": "McKesson Printing Press Application (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11503",
	        "AppService": "OKTA Cloud Identity Platform (Customer) (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11506",
	        "AppService": "McKesson Passport (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11514",
	        "AppService": "Sales Admin Virtual Desktop Space (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11515",
	        "AppService": "Enterprise Data Warehouse/SDW (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11516",
	        "AppService": "ClinOne eConsent (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11521",
	        "AppService": "Okta Advanced Server Access (ASA) (Prod) (SaaS)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11524",
	        "AppService": "The Mortgage Office - TMO - Amazon Workspaces (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11525",
	        "AppService": "Baker Hill NextGen (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11527",
	        "AppService": "Lynx Practice Intelligence (PI) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11528",
	        "AppService": "Stratozone Solution (Prod) (SaaS)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11529",
	        "AppService": "Lynx Analytics (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1153",
	        "AppService": "Labsco LSCSales Virtual Server (Prod)",
	        "ServiceOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS11530",
	        "AppService": "Lynx Practice Management Interface (LPMI) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11542",
	        "AppService": "Corporation Service Company - CSC - cscglobal.com (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11549",
	        "AppService": "(MSH) McKesson Speciality Health SAP Business Warehouse System – BP1 (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS11550",
	        "AppService": "Migrate For Compute Engine (M4CE) (Prod)",
	        "ServiceOffering": "Connectivity"
	    },
	    {
	        "ASNumber": "AS11557",
	        "AppService": "(OTS) Operation Technology Security Expedition VM (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS1156",
	        "AppService": "Directory Services Applications DSAP (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS11562",
	        "AppService": "RBG Uniprix ECommerce (Prod)",
	        "ServiceOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS11565",
	        "AppService": "Stealthwatch ISE PIC (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11572",
	        "AppService": "MMS E1 Technology - JDE 9.2 Enterprise Servers (Prod)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS11593",
	        "AppService": "DocuFlow-RxCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11595",
	        "AppService": "Regimen Profiler 2.0 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11596",
	        "AppService": "LMT4 - MRxTS Longmont Office (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11597",
	        "AppService": "McKesson Specialty Health Data Warehouse Compliance Snapshots (Prod)",
	        "ServiceOffering": "Practice Integration"
	    },
	    {
	        "ASNumber": "AS11599",
	        "AppService": "Azure Kubernetes Services (AKS) - Canada Central (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS11600",
	        "AppService": "McKesson Enterprise Messaging Service (MEMS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11609",
	        "AppService": "iSOC Tines (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS11610",
	        "AppService": "iSOC - Tools (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond Service"
	    },
	    {
	        "ASNumber": "AS11612",
	        "AppService": "TrendMicro Anti-Virus - PTS (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11633",
	        "AppService": "Shared Compute (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS11634",
	        "AppService": "Print Server Uniprix/Proxim (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS11638",
	        "AppService": "MasterControl Cloud (Canada) (Prod)(SaaS)",
	        "ServiceOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS11639",
	        "AppService": "EnterpriseRx - USON (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS11644",
	        "AppService": "Print Services for RxCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS11646",
	        "AppService": "Print Services for Grapevine (GRP3) (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS11648",
	        "AppService": "File Shares (Canada)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11656",
	        "AppService": "Niagara/Smart Building (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS11658",
	        "AppService": "Master Data Management Data Analysis & Reporting (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1173",
	        "AppService": "Kafka Message Bus Azure (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS1174",
	        "AppService": "Clarus (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS1177",
	        "AppService": "RxPak - Packaging Production OSM (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20041",
	        "AppService": "Triplog",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20057",
	        "AppService": "BizzDesign Pilot",
	        "ServiceOffering": "Digital Transformation and Enablement"
	    },
	    {
	        "ASNumber": "AS20073",
	        "AppService": "Remote Access Jump Server Canada",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS20125",
	        "AppService": "MMS - KPI Pick to Light - DC251 Bartlett",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20133",
	        "AppService": "MMS - KPI Pick to Light - DC74 Roseville",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20137",
	        "AppService": "MMS - Honeywell / Intelligrated Pick to Light - DC75 Lehigh Valley",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20141",
	        "AppService": "MMS - Honeywell / Intelligrated Pick to Light - DC60 Grapevine",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20145",
	        "AppService": "MMS - Honeywell / Intelligrated BOSS Routing Technology - DC16 Houston",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20149",
	        "AppService": "MMS - Honeywell / Intelligrated BOSS Routing Technology - DC07 Winchester",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20153",
	        "AppService": "MMS - Honeywell / Intelligrated BOSS Routing Technology - DC81 Chino",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20157",
	        "AppService": "MMS - Honeywell / Intelligrated BOSS Routing Technology - DC10 Charlotte",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20161",
	        "AppService": "MMS - WSI Conveyor PLC - DC251 Bartlett",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20165",
	        "AppService": "MMS - WSI Conveyor PLC - DC74 Roseville",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20169",
	        "AppService": "MMS - WSI Conveyor PLC - DC252 Orlando",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20173",
	        "AppService": "MMS - KPI WCS Technology - DC251 Bartlett",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20177",
	        "AppService": "MMS - KPI WCS Technology - DC60 Grapevine",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20181",
	        "AppService": "MMS - KPI WCS Technology - DC74 Roseville",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20187",
	        "AppService": "MMS - KPI WCS Technology - DC75 Lehigh Valley",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20191",
	        "AppService": "MMS - KPI WCS Technology - DC07 Winchester",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20195",
	        "AppService": "MMS - KPI WCS Technology - DC81 Chino",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20199",
	        "AppService": "MMS - KPI WCS Technology - DC10 Charlotte",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20209",
	        "AppService": "MMS - KPI WCS Technology - DC16 Houston",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20213",
	        "AppService": "MMS - KPI WCS Technology - DC252 Orlando",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20217",
	        "AppService": "MMS - KPI WCS Technology - DC254 Denver",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20223",
	        "AppService": "MMS - KPI WCS Technology - DC Seattle",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20227",
	        "AppService": "Citrix Azure Resource Groups",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS20247",
	        "AppService": "Optimizely",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20273",
	        "AppService": "ScriptMed Cloud",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS20281",
	        "AppService": "Vidyard-CORP",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20331",
	        "AppService": "Twilio Programmable Voice - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20337",
	        "AppService": "ontada-carequality-requestor",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20341",
	        "AppService": "ontada-ipv",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20345",
	        "AppService": "ProWatch Access Panel (Prod)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS20349",
	        "AppService": "Security IP Cameras (Prod)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS20353",
	        "AppService": "MaxPro NVR (Prod)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS20357",
	        "AppService": "IDS System (Prod)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS20361",
	        "AppService": "MaxPro VMS (Prod)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS20365",
	        "AppService": "Daily import job",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20369",
	        "AppService": "Daily Export Job",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20373",
	        "AppService": "Monthly claim data import",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20411",
	        "AppService": "Asana - Prod",
	        "ServiceOffering": "PSAS Supporting Functions"
	    },
	    {
	        "ASNumber": "AS20479",
	        "AppService": "Canada Central Fill VBM Technology ONTARIO - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20493",
	        "AppService": "Salesforce - MMS CPQ",
	        "ServiceOffering": "Service Capabilities"
	    },
	    {
	        "ASNumber": "AS20507",
	        "AppService": "Verint",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20516",
	        "AppService": "UNIPRIX.LOCAL Active Directory Forest (Prod)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS20538",
	        "AppService": "Chargeback - RxCrossroads Mason (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS20550",
	        "AppService": "ISMC (Independent Small/Medium Chain) Store Churn (Prod)",
	        "ServiceOffering": "Adv. Data Science Services: MLOPs"
	    },
	    {
	        "ASNumber": "AS20561",
	        "AppService": "Data Management Infrastructure Prod (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20566",
	        "AppService": "TOAD Data Point (Prod)",
	        "ServiceOffering": "Ent. Infra. & Technology Projects"
	    },
	    {
	        "ASNumber": "AS20567",
	        "AppService": "CCDA (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20579",
	        "AppService": "Central Azure vision service (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20583",
	        "AppService": "Pricing Service Configuration Application & Service",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20587",
	        "AppService": "MMS E1 ISERIES (Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS20591",
	        "AppService": "MMS - Sealed Air Ipack Lidder - DC251 Bartlett",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20599",
	        "AppService": "MMS - Sealed Air Ipack Lidder - DC75 Lehigh Valley",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20612",
	        "AppService": "Five9 MCA (Prod)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS20613",
	        "AppService": "MMS - Sealed Air Ipack Lidder - DC252 Orlando",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20616",
	        "AppService": "Microsoft SQL Shared DB (Prod)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS20617",
	        "AppService": "MMS - Sealed Air Ipack Lidder - DC60 Grapevine",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20624",
	        "AppService": "PDQ BAP Application (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20627",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC251 Bartlett",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20631",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC60 Grapevine",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20635",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC75 Lehigh Valley",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20636",
	        "AppService": "Microsoft InTune (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS20638",
	        "AppService": "Serialization Display Tool (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20639",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC07 Winchester",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20640",
	        "AppService": "NorthStar RX LLC (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20642",
	        "AppService": "NorthStar Travel Cost Planner (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20643",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC81 Chino",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20646",
	        "AppService": "Password Management Utility (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS20647",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC74 Roseville",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20651",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC16 Houston",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20652",
	        "AppService": "NewCrop (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20655",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - DC252 Orlando",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20659",
	        "AppService": "MMS - Numina Automated Pack Slip Insertion - Seattle",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20660",
	        "AppService": "Apple Business Manager (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS20668",
	        "AppService": "Armis Network Security Monitoring Tool (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS20674",
	        "AppService": "Quill (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20676",
	        "AppService": "One View Data Warehouse (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20680",
	        "AppService": "G4 (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS20683",
	        "AppService": "MMS - Honeywell/ Intelligrated Conveyor PLC - DC60 Grapevine",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20686",
	        "AppService": "MSH AMP Compliance and Daily Sales Reporting (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20687",
	        "AppService": "MMS - Honeywell/ Intelligrated Conveyor PLC - DC75 Lehigh Valley",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20694",
	        "AppService": "Alfresco (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20696",
	        "AppService": "Global Entity Management System - North America (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20697",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 07 Winchester",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20700",
	        "AppService": "MLS Copay DW Job Scheduling Engine (LWR) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20701",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 03 Kansas City",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20702",
	        "AppService": "MLS Reference Data (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20705",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 04 Atlanta",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20706",
	        "AppService": "Hyper-V Servers (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20711",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 10 Charlotte",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20719",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 16 Houston",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20727",
	        "AppService": "MMS - KPI Routing Technology - DC72 Columbus",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20731",
	        "AppService": "MMS - KPI Routing Technology - DC04 Atlanta",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20735",
	        "AppService": "MMS - KPI Routing Technology - DC03 Kansas City",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20738",
	        "AppService": "RxCrossroads Scottsdale PAS/RAAS Customer Business Analytics Environment/RAAS Data Warehouse (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20739",
	        "AppService": "MMS - KPI Routing Technology - DC82 Phoenix",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20743",
	        "AppService": "MMS - KPI Routing Technology - DC65 Northborough",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20751",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 21 Rogers",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20755",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 60 Grapevine",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20759",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 65 Northborough",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20760",
	        "AppService": "IPFolio (Prod) (SaaS)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20762",
	        "AppService": "ReflexRx (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20763",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 72 Columbus",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20766",
	        "AppService": "Technology Solutions Application (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20767",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 74 Roseville",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20768",
	        "AppService": "CBT Purchase Order Tracking System (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20770",
	        "AppService": "Legal Fees (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20771",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 75 Lehigh Valley",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20774",
	        "AppService": "Workiva (Prod) (SaaS)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20775",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 81 Chino",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20776",
	        "AppService": "Legal Hold Pro (Prod) (SaaS)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20779",
	        "AppService": "MMS - Veritiv Strapping Machine - DC 82 Phoenix",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20782",
	        "AppService": "PTMS (Property Tax Made Simple) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20786",
	        "AppService": "PTDB Snowflake (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20788",
	        "AppService": "Onit (Prod) (SaaS)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20792",
	        "AppService": "BoardVantage (SaaS)",
	        "ServiceOffering": "Executive Support"
	    },
	    {
	        "ASNumber": "AS20793",
	        "AppService": "MMS - Veritiv Strapping Machine - DC Seattle",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20794",
	        "AppService": "Legal Tracker (Prod) (SaaS)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20796",
	        "AppService": "RJS EC AS400 (Prod)",
	        "ServiceOffering": "MMS Finance & Strategy Service Category"
	    },
	    {
	        "ASNumber": "AS20797",
	        "AppService": "MMS - Veritiv Strapping Machine - DC251 Bartlett",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20801",
	        "AppService": "MMS - Veritiv Strapping Machine - DC252 Orlando",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20805",
	        "AppService": "MMS - Veritiv Strapping Machine - DC254 Denver",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20808",
	        "AppService": "Genie (Prod) (SaaS)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20812",
	        "AppService": "NetDocuments (SaaS)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS20821",
	        "AppService": "Twilio-CPH",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20822",
	        "AppService": "Trane Tracer (HVAC System CAN) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20841",
	        "AppService": "MMS - GSI Spray Printing - DC251 Bartlett",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20845",
	        "AppService": "MMS - GSI Spray Printing - DC252 Orlando",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20846",
	        "AppService": "Great Plains - Vantage Oncology (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS20849",
	        "AppService": "MMS - OPEX Perfect Pick - DC251 Bartlett - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20855",
	        "AppService": "MMS - OPEX Perfect Pick - DC252 Orlando - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20858",
	        "AppService": "ProKnow (SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS20861",
	        "AppService": "MMS - OPEX Perfect Pick - DC60 Grapevine - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20862",
	        "AppService": "Customer Dashboard/Client Poral -RxCrossroads Mason (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS20878",
	        "AppService": "RBG - Uniprix - TELUS POS (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20880",
	        "AppService": "RBG - QC - Horarius (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20888",
	        "AppService": "RBG - QC - Assyst-Rx / Assyst-Rx - WCF Interface (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20890",
	        "AppService": "RBG - Proxim - SIR POS (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20892",
	        "AppService": "RBG - Proxim - TELUS POS (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20894",
	        "AppService": "RBG - Uniprix - SIR POS 3.2 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20895",
	        "AppService": "Baxter HIlrom Voalte Nurse Call (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS20906",
	        "AppService": "Tableau (ClarusONE) SaaS",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20908",
	        "AppService": "ClarusONE - User Password Reset Portal (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20916",
	        "AppService": "RBG - QC - Mon Plan De Renouvellement (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20919",
	        "AppService": "MMS - OPEX Perfect Pick - DC75 Lehigh Valley - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20920",
	        "AppService": "RBG - QC - Logipharm (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20925",
	        "AppService": "MMS - OPEX Perfect Pick - DC74 Roseville - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20929",
	        "AppService": "MMS - OPEX Perfect Pick - DC81 Chino - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20933",
	        "AppService": "MMS - FoldSerter for Distribution Center Seattle",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20946",
	        "AppService": "RBG - SiteCore Middleware (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20954",
	        "AppService": "RBG - Medicine Shoppe - Public Website (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20955",
	        "AppService": "MMS - Sealed Air Dunnage - DC 251 Bartlett",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20956",
	        "AppService": "RBG - Proxim - Public Website (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20961",
	        "AppService": "MMS - Sealed Air Dunnage - DC 75 Lehigh Valley",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20965",
	        "AppService": "MMS - Sealed Air Dunnage - DC 252 Orlando",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20966",
	        "AppService": "RBG - Uniprix - Public Website / Gift Card Balance Website (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20968",
	        "AppService": "Guardian-IDA-Remedy'sRx Website (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20969",
	        "AppService": "MMS - Sealed Air Dunnage - DC 60 Grapevine",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20972",
	        "AppService": "RBG - Proxim - Mobile App (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS20988",
	        "AppService": "Global SAP BW/BI (ABAP) / CB1 / COPA (BW Systems) (Prod)",
	        "ServiceOffering": "Enterprise Compliance"
	    },
	    {
	        "ASNumber": "AS20992",
	        "AppService": "Concur (North America) (Prod)",
	        "ServiceOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS21021",
	        "AppService": "Powertech antivirus (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS21036",
	        "AppService": "CVent (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21052",
	        "AppService": "Elekta SmartClinic (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21060",
	        "AppService": "SharePoint Canada (Prod)",
	        "ServiceOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS21076",
	        "AppService": "SalesTrak (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS21082",
	        "AppService": "iReg Attendee Registration for IdeaShare (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21086",
	        "AppService": "Gumbo Mail (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21090",
	        "AppService": "Robot HelpSystems (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21094",
	        "AppService": "Enterprise Data Warehouse (MSHEDW)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21102",
	        "AppService": "Netradyne (SAAS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21106",
	        "AppService": "EV.Cloud - USON (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS21115",
	        "AppService": "Clearview (Prod)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS21118",
	        "AppService": "Stack Overflow (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21119",
	        "AppService": "McKesson Enterprise PKI (Prod)",
	        "ServiceOffering": "Identity & Access Management Service"
	    },
	    {
	        "ASNumber": "AS21120",
	        "AppService": "Health Language Inc (HLI) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21122",
	        "AppService": "Shortel (Biologics) (Prod)",
	        "ServiceOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS21128",
	        "AppService": "OpenClinica 4.0 (SaaS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21135",
	        "AppService": "Remodulin RPIM MSAccess DB application (Prod)",
	        "ServiceOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS21149",
	        "AppService": "FullStory - Ontada (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21150",
	        "AppService": "Faxfinder (Bioloigcs) (Prod)",
	        "ServiceOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS21172",
	        "AppService": "McKesson Patient Assistance Service (MPAS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21178",
	        "AppService": "OpenClinica 3.0 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21182",
	        "AppService": "SupplyLink MMS Platform (Prod)",
	        "ServiceOffering": "B2B E-Commerce"
	    },
	    {
	        "ASNumber": "AS21186",
	        "AppService": "RxC-Datastage (Prod)",
	        "ServiceOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21188",
	        "AppService": "Saviynt - Prod (SAAS)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS21189",
	        "AppService": "RRD Print Services (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21190",
	        "AppService": "RxC-Tableau (Prod)",
	        "ServiceOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21192",
	        "AppService": "RxC-Snowflake (Pharmacy Data Warehouse) (Prod)",
	        "ServiceOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21196",
	        "AppService": "RxC-Mulesoft (Prod)",
	        "ServiceOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21197",
	        "AppService": "CyberArk EPM (Prod)",
	        "ServiceOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS21200",
	        "AppService": "RxC-Logicor (Prod)",
	        "ServiceOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21204",
	        "AppService": "RxCrossroads Central Fill - Louisville, KY  (Prod)",
	        "ServiceOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS21208",
	        "AppService": "USON Active Directory Federation Services (ADFS) (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS21210",
	        "AppService": "CyberGRX (Prod) (SaaS)",
	        "ServiceOffering": "Business Engagement (BISO)"
	    },
	    {
	        "ASNumber": "AS21222",
	        "AppService": "Citrix Production EU (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS21226",
	        "AppService": "Blackline Journal Entry  (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21232",
	        "AppService": "AbsorbLMS (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21236",
	        "AppService": "Bio-Tableau (Prod)",
	        "ServiceOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS21238",
	        "AppService": "Bio-Snowflake (Pharmacy Data Warehouse) / Bio-Datastage (Prod)",
	        "ServiceOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS21243",
	        "AppService": "VOIP USON Telecom (Prod)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS21244",
	        "AppService": "Bio-Snowflake (Pharmacy Data Warehouse) (Prod)",
	        "ServiceOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS21247",
	        "AppService": "Ontada Developer Program (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21280",
	        "AppService": "USON DHCP Service (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS21284",
	        "AppService": "Lucidchart (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21292",
	        "AppService": "USON Directory Services Tools Service (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS21294",
	        "AppService": "CFM (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21298",
	        "AppService": "PharmaVelocity (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21300",
	        "AppService": "PTSJiraConfluence (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21312",
	        "AppService": "IntakeQ (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21314",
	        "AppService": "Zoom (Canada) (Prod) (SaaS)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS21317",
	        "AppService": "Hubspot-Prod (SaaS)",
	        "ServiceOffering": "Customer Reporting and Analytics"
	    },
	    {
	        "ASNumber": "AS21344",
	        "AppService": "ARK (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21346",
	        "AppService": "Alteryx - ClarusONE (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21354",
	        "AppService": "Intralink M&A Document Exchange (Prod) (SaaS)",
	        "ServiceOffering": "MMS Finance & Strategy Service Category"
	    },
	    {
	        "ASNumber": "AS21386",
	        "AppService": "H-ISAC (Prod) (SaaS)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS21388",
	        "AppService": "Threat Connect (Prod) (SaaS)",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS21392",
	        "AppService": "SHDATA (Prod)",
	        "ServiceOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS21400",
	        "AppService": "Symedical (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21413",
	        "AppService": "Uniflow On-Prem- Prod",
	        "ServiceOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS21422",
	        "AppService": "Thales (Prod)",
	        "ServiceOffering": "Security Architecture & Strategy Service"
	    },
	    {
	        "ASNumber": "AS21430",
	        "AppService": "Cash Application Payment Engine (CAPE) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21434",
	        "AppService": "SECA Automation Workflows (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS21440",
	        "AppService": "Deepscribe (SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21446",
	        "AppService": "McKesson.com and Related Sites (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21463",
	        "AppService": "Ontada-Marketplace (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21468",
	        "AppService": "Expedition FW Log Analysis (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21472",
	        "AppService": "Distribution Center Analytics Toolkit (DCAT) (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS21483",
	        "AppService": "SentinelOne Mobile Security (Prod)(SaaS)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS21490",
	        "AppService": "Esker On Demand Document Processing (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21494",
	        "AppService": "Honeywell MaxPro VMS and NVR (Canada)(Prod)",
	        "ServiceOffering": "Canada Field Tech 2"
	    },
	    {
	        "ASNumber": "AS21506",
	        "AppService": "RxTS CMM Hubble (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21530",
	        "AppService": "RxTS CMM Slack (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21532",
	        "AppService": "RxTS CMM AMP (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21538",
	        "AppService": "RxTS CMM Queutopia (Prod)",
	        "ServiceOffering": "IT Governance, Risk & Compliance"
	    },
	    {
	        "ASNumber": "AS21541",
	        "AppService": "Amelia Teams Integration- Prod (SaaS)",
	        "ServiceOffering": "Ent. Gen AI"
	    },
	    {
	        "ASNumber": "AS21549",
	        "AppService": "Conga - Ontada- Prod (SaaS)",
	        "ServiceOffering": "Customer Reporting and Analytics"
	    },
	    {
	        "ASNumber": "AS21557",
	        "AppService": "Konica Minolta Dispatcher (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21558",
	        "AppService": "EnterpriseRx Data Insights (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21560",
	        "AppService": "McKesson PrescribeIT Connector Service (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21580",
	        "AppService": "FireEye (Prod)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS21586",
	        "AppService": "Azure Kubernetes Services (AKS) - West US (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS21590",
	        "AppService": "B2C eCommerce Shared Services (Prod) (SaaS)",
	        "ServiceOffering": "B2C E-Commerce"
	    },
	    {
	        "ASNumber": "AS21601",
	        "AppService": "SourceSpace (ClarusONE) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21607",
	        "AppService": "Eptura Workplace (iOffice)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21614",
	        "AppService": "Transportation Data Pipeline (Prod)",
	        "ServiceOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS21627",
	        "AppService": "MC-CFaaS Cloud Reporting (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21634",
	        "AppService": "MyCarePlan (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21677",
	        "AppService": "Prime Vision (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS21680",
	        "AppService": "DCS Viewer (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21686",
	        "AppService": "Diamond by K&S (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21702",
	        "AppService": "Dymo Label (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS21708",
	        "AppService": "Emanager (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21716",
	        "AppService": "Digitize.AL (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21718",
	        "AppService": "Empathiq (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21724",
	        "AppService": "ESI (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21730",
	        "AppService": "FreshLoc Temperature Monitoring (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21734",
	        "AppService": "ImRT by IBA (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21738",
	        "AppService": "Karisys (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21748",
	        "AppService": "Lucent (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21752",
	        "AppService": "Lynx PT (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21756",
	        "AppService": "Matrixx by IBA (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21770",
	        "AppService": "NEC PBX (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21774",
	        "AppService": "Nortel (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21782",
	        "AppService": "One App Pro (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21808",
	        "AppService": "Prairie Fyre (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21816",
	        "AppService": "QA Beamchecker Plus by IBA (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21820",
	        "AppService": "Samsung PBX (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21822",
	        "AppService": "ScanAllPro by Fujitsu (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS21828",
	        "AppService": "Scanner by Docketport (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS21832",
	        "AppService": "Surgimate (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21841",
	        "AppService": "Clinical Information Service(CIS) - Prod-SaaS",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21842",
	        "AppService": "Synapse (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21848",
	        "AppService": "QA Sterocheck 1.4 by IBA (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21850",
	        "AppService": "Tetra (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS21852",
	        "AppService": "TouchMD (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21856",
	        "AppService": "UniPrintClient (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS21862",
	        "AppService": "Zynomed (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21894",
	        "AppService": "Canada Specialty SSRS (Prod)",
	        "ServiceOffering": "Canada Data & Analytics"
	    },
	    {
	        "ASNumber": "AS21895",
	        "AppService": "MMS - Sealed Air Ipack Tray Former - DC251 Bartlett (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21899",
	        "AppService": "MMS - Sealed Air Ipack Tray Former - DC 75 Lehigh Valley (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21903",
	        "AppService": "MMS - Sealed Air Ipack Tray Former - DC252 Orlando (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21907",
	        "AppService": "MMS - Sealed Air Ipack Tray Former - DC60 Grapevine (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21911",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 07 Winchester (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21916",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 03 Kansas City (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21918",
	        "AppService": "Ambry CARE (Prod) (SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS21922",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 04 Atlanta (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21926",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 10 Charlotte (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21930",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 16 Houston (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21934",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 21 Rogers (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21940",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 60 Grapevine (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21949",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 65 Northborough (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21953",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 72 Columbus (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21956",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 74 Roseville (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21961",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 75 Lehigh Valley (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21963",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 81 Chino (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21967",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC 82 Phoenix (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21972",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC Seattle (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21977",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC251 Bartlett (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21978",
	        "AppService": "VM/TRAP Server Build For Europe (Prod)",
	        "ServiceOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS21980",
	        "AppService": "MoreSteam Six Sigma Toolbox (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21981",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC252 Orlando (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21982",
	        "AppService": "MIS8 - Airport Rd  (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21984",
	        "AppService": "MMS - Veritiv Wrapping Machine - DC254 Denver (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21986",
	        "AppService": "Penguin (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21991",
	        "AppService": "MMS - TREW Conveyor PLC - DC254 Denver (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS21997",
	        "AppService": "MMS - TREW Conveyor PLC - DC10 Charlotte (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22003",
	        "AppService": "MMS - TREW Conveyor PLC - DC16 Houston (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22011",
	        "AppService": "MMS - TREW Conveyor PLC - DC Seattle (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22017",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC251 Bartlett (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22025",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC75 Lehigh Valley (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22033",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC60 Grapevine (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22039",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC252 Orlando (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22045",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC07 Winchester (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22049",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC81 Chino (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22053",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC10 Charlotte (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22059",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC16 Houston (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22063",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC74 Roseville (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22067",
	        "AppService": "MMS - Veritiv Wexxar Machine - DC Seattle (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22075",
	        "AppService": "Nuxeo Canada - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22082",
	        "AppService": "John Snow Labs (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22122",
	        "AppService": "Global Operational Technology Security (GOTS) North America Remote Access (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS22133",
	        "AppService": "Connect Portal Headless(Prod) - PaaS",
	        "ServiceOffering": "eCommerce"
	    },
	    {
	        "ASNumber": "AS22137",
	        "AppService": "Service Insight(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22182",
	        "AppService": "Amznscrape (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22189",
	        "AppService": "Vantage Analytics(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22195",
	        "AppService": "JBAT - Life Sciences (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22198",
	        "AppService": "Carequality G2 Integration (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22200",
	        "AppService": "ScImage PICOM365 (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS22202",
	        "AppService": "MIS7-McKesson GTA Campus (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22214",
	        "AppService": "Citrix Cloud Infra (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22216",
	        "AppService": "Citrix Virtual Desktops (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22218",
	        "AppService": "Citrix Virtual Apps (Dev)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22220",
	        "AppService": "Citrix Virtual Apps Genpact (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22222",
	        "AppService": "SCRI - J-Review - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22224",
	        "AppService": "SCRI - Argus - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22226",
	        "AppService": "Citrix Virtual Apps MMS (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22227",
	        "AppService": "SCRI - COI Smart - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22230",
	        "AppService": "SCRI - PleaseReview (Ideagen) - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22231",
	        "AppService": "SCRI - ValGenesis VLMS - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22232",
	        "AppService": "Citrix Virtual Apps USON (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22233",
	        "AppService": "SCRI - BOX - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22234",
	        "AppService": "SCRI - RAVE iMedidata - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22235",
	        "AppService": "SCRI - TrialMaster - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22236",
	        "AppService": "Citrix Virtual Apps Canada (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22238",
	        "AppService": "SCRI - Vestigo - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22239",
	        "AppService": "SCRI - Tempo - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22240",
	        "AppService": "SCRI - FSM - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22241",
	        "AppService": "SCRI - Conga - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22242",
	        "AppService": "SCRI - Salesforce - Strategic Development - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22243",
	        "AppService": "SCRI - SmartSolve eQMS - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22244",
	        "AppService": "Citrix Virtual Apps Europe (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22248",
	        "AppService": "Abbvie-Peds-UI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22250",
	        "AppService": "SCRI - Jedox - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22251",
	        "AppService": "SCRI - Veeva Vault Clinical - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22252",
	        "AppService": "Fresenius-Manufacturer-UI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22253",
	        "AppService": "SCRI - Advarra CCE-CCS - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22254",
	        "AppService": "SCRI - SIGNiX - SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22256",
	        "AppService": "Novo-FRM-UI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22258",
	        "AppService": "Portal-Admin-UI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22260",
	        "AppService": "Portal-Econsent-UI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22262",
	        "AppService": "Fresenius-Physician-UI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22264",
	        "AppService": "Hub-Workflow-API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22266",
	        "AppService": "iCMS-API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22270",
	        "AppService": "iCMS-UI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22272",
	        "AppService": "Relypsa-FLT-UI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22274",
	        "AppService": "NovoSecure-API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22276",
	        "AppService": "SCRI Trial Finder (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22278",
	        "AppService": "Portal-Common-API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22280",
	        "AppService": "Portal-Physician-API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22284",
	        "AppService": "Portal-Manufacturer-API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22286",
	        "AppService": "Datafeed (DF) Controller (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22288",
	        "AppService": "DocuFlow-API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22290",
	        "AppService": "Novo-Physician-API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22292",
	        "AppService": "DocuFlow-UI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22296",
	        "AppService": "Novo-Physician-UI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22300",
	        "AppService": "DF-Epsilon-Consumer (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22304",
	        "AppService": "Cms-API-Invoker-Job (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22306",
	        "AppService": "Workflow-Datamart (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22310",
	        "AppService": "Communication-API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22314",
	        "AppService": "Pulse Secure - Steel-Belted Radius (SBR) (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS22326",
	        "AppService": "Novo-Patient-UI  (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22332",
	        "AppService": "Oracle EPM Cloud (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22356",
	        "AppService": "DF - MailVendor (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22374",
	        "AppService": "McKesson Reimbursement Data and Insights (MRDI) (Prod)",
	        "ServiceOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS22384",
	        "AppService": "DR-Connect (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22388",
	        "AppService": "Alchemy Search (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22422",
	        "AppService": "pMD Telemedicine (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22448",
	        "AppService": "Language Line (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22452",
	        "AppService": "CanSpec Portal Admin (Dev)",
	        "ServiceOffering": "Canada BioPharma & Payer Solutions"
	    },
	    {
	        "ASNumber": "AS22454",
	        "AppService": "WinSCP (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22455",
	        "AppService": "Fischer ManagePath(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22464",
	        "AppService": "Medicare Easy Pricing (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22468",
	        "AppService": "MyHub (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22490",
	        "AppService": "MMS Warehouse Management System - Blue Yonder  (dev)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS22494",
	        "AppService": "Health Mart Portal (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22522",
	        "AppService": "QlikSoft Hubconnect Integration (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22528",
	        "AppService": "CargoWise (Prod) (SaaS)",
	        "ServiceOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS22534",
	        "AppService": "Ocado Group ASRS (Prod)",
	        "ServiceOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS22540",
	        "AppService": "Ocado OIA (Prod)",
	        "ServiceOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS22570",
	        "AppService": "Select and Save API (SNS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22576",
	        "AppService": "Remote 6 - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22581",
	        "AppService": "CyberArk Secrets Manager(Prod)(SaaS)",
	        "ServiceOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS22600",
	        "AppService": "Varian Mobile (Prod) (SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS22616",
	        "AppService": "STJ2 - SPS Pharmacy (Network)",
	        "ServiceOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS22630",
	        "AppService": "DC251 - Conveyor Human Machine Interface (HMI) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22634",
	        "AppService": "Controlled Substance Monitoring Program (CSMP) (Dev)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22642",
	        "AppService": "Supplylogix SalesForce (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22644",
	        "AppService": "CAL5-well.ca Calgary (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22650",
	        "AppService": "PSAS ConnAnalytics (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22656",
	        "AppService": "Thales CipherTrust Manager (North America) (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS22657",
	        "AppService": "USON (Prod)",
	        "ServiceOffering": "Employee Support"
	    },
	    {
	        "ASNumber": "AS22674",
	        "AppService": "Citrix Netscaler/ADCs (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS22677",
	        "AppService": "SCRI - Medidata RAVE X-  SaaS - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22690",
	        "AppService": "On-Premise Time Clock Data Server (Prod)",
	        "ServiceOffering": "Sales Compensation"
	    },
	    {
	        "ASNumber": "AS22718",
	        "AppService": "Jenkins - RxNet (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22720",
	        "AppService": "HashiCorp Vault (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22721",
	        "AppService": "Terraform (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22727",
	        "AppService": "Clinical Services Enablement (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22729",
	        "AppService": "Data Storage & Protection (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22730",
	        "AppService": "DCNM (DataCenter Network Manager) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22730",
	        "AppService": "SAP - Vistex Chargebacks (Prod)",
	        "ServiceOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22731",
	        "AppService": "Cloud IQ (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22732",
	        "AppService": "Dell Storage Manager (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22732",
	        "AppService": "SAP - Vistex Customer MD (Prod)",
	        "ServiceOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22733",
	        "AppService": "SAN Nav (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22734",
	        "AppService": "SAP - Vistex Contracts (Prod)",
	        "ServiceOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22734",
	        "AppService": "Secure Connect Gateway (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22735",
	        "AppService": "ActiveIQ (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22736",
	        "AppService": "BNA – Brocade Network Advisor (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22736",
	        "AppService": "SAP - Vistex Rebates Brand (Prod)",
	        "ServiceOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22737",
	        "AppService": "Veeam - RxNet (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22738",
	        "AppService": "PPDM (PowerProtect Data Manager) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22738",
	        "AppService": "SAP - Vistex Rebates NRNA (Prod)",
	        "ServiceOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22739",
	        "AppService": "NetBackup (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22740",
	        "AppService": "DPA (Data Protection Advisor) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22740",
	        "AppService": "SAP - Vistex Rebates Canada (Prod)",
	        "ServiceOffering": "Accounting & Treasury"
	    },
	    {
	        "ASNumber": "AS22741",
	        "AppService": "NetWorker (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22742",
	        "AppService": "DDVE (Data Domain Virtual Edition) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22743",
	        "AppService": "PowerProtect DD Management Center (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22745",
	        "AppService": "eClaims (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22748",
	        "AppService": "Orion (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22752",
	        "AppService": "EnterpriseRx (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22754",
	        "AppService": "eVoucher Store Lookup (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22756",
	        "AppService": "Government Plan Exclusion (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22758",
	        "AppService": "Prescriber Instant Check (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22758",
	        "AppService": "SAP - Vistex Material Acumax (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22759",
	        "AppService": "Data Warehouse (RHDW app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22760",
	        "AppService": "Prescriber Schedule Authority (RXPSA app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22761",
	        "AppService": "Rx Eligibility (RXE app) - (IMRx - Interventional Messaging) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22763",
	        "AppService": "EVoucher Reporting (EVRPT app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22764",
	        "AppService": "PA Reporting (prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22765",
	        "AppService": "Eligibility Reporting (ELIGRPT app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22766",
	        "AppService": "DS Monitoring (DSMONITOR app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22767",
	        "AppService": "DC Sales Model (DC_SALESMODEL app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22768",
	        "AppService": "EV Sales Model (EV_SALESMODEL app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22769",
	        "AppService": "SHA Application Monitor (SHA_APPMON) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22770",
	        "AppService": "CPS Billing (CPS_BILL app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22771",
	        "AppService": "Switch Billing (SWITCH_BILL app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22772",
	        "AppService": "CMM (CMM app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22773",
	        "AppService": "SAP Billing Assist - (ERX_BILLING app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22774",
	        "AppService": "Jira bridge application (JIRA_PMOPS app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22775",
	        "AppService": "Terminator Rx (TERMRX app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22776",
	        "AppService": "DDP Application Catalog (APP_CATALOG app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22777",
	        "AppService": "Data feed Billing Reconciliation (DF_BILL_REC app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22778",
	        "AppService": "Wisconsin Diagnosis Restricted Drug (DRD app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22779",
	        "AppService": "Humana MOSLR (HUMANA_MOSLR app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22780",
	        "AppService": "Rite Aid Government Plan Exclusions (RITEAID_GPE app) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22781",
	        "AppService": "MCS Patient (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22782",
	        "AppService": "Evoucher New to Therapy (EVNTT) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22783",
	        "AppService": "ProPBM Evoucher Extract (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22802",
	        "AppService": "XYGATE Report Manager (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22803",
	        "AppService": "Linux Jump Servers (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22804",
	        "AppService": "Red Hat Satellite (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22805",
	        "AppService": "Red Hat Identity Management (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22806",
	        "AppService": "USON – Change Auditor (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS22806.",
	        "AppService": "Ansible Tower (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22807",
	        "AppService": "Ansible Automation Platform (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22808",
	        "AppService": "Infoblox (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22808",
	        "AppService": "TrackWise Digital (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22809",
	        "AppService": "DNS - Bind (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22814",
	        "AppService": "Manage File Transfer (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22816",
	        "AppService": "Network Security Operations (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22818",
	        "AppService": "PAPlus-PriorAuthPlus (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22822",
	        "AppService": "Performance Monitor (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22824",
	        "AppService": "Pharmacy Solutions (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22826",
	        "AppService": "QR Code (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22828",
	        "AppService": "Price Check (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22830",
	        "AppService": "Patient Consent (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22832",
	        "AppService": "Prescriber Web Look Up (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22834",
	        "AppService": "Oracle Real Application Clusters (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22836",
	        "AppService": "Rx Dosage Validation (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22838",
	        "AppService": "RX Edit Manager (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22840",
	        "AppService": "SmartHop (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22844",
	        "AppService": "Transaction Performance Monitor (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22847",
	        "AppService": "VMware vCenter (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22848",
	        "AppService": "VMware Aria Operations (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22849",
	        "AppService": "VMware Aria Operations for Logs (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22850",
	        "AppService": "VMware Aria Suite Lifecycle (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22851",
	        "AppService": "VMware Identity Manager (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22852",
	        "AppService": "VMware PowerCLI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22853",
	        "AppService": "VMware Cloud Provider Lifecycle Manager (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22854",
	        "AppService": "VMware Cloud Director (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22855",
	        "AppService": "VMware Integrated OpenStack (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22856",
	        "AppService": "RV Tools (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22857",
	        "AppService": "VMware Skyline Advisor (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22858",
	        "AppService": "VMware Aria Automation – TBD (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22860",
	        "AppService": "Windows Tools (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22861",
	        "AppService": "Microsoft Active Directory (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22862",
	        "AppService": "Microsoft Certificate Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22863",
	        "AppService": "Microsoft File Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22864",
	        "AppService": "Microsoft SQL Tools (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22868",
	        "AppService": "Keelvar (SaaS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22871",
	        "AppService": "Rx Medication Therapy – now known as CA+ (RXMT App) (formerly known as Catapult) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22876",
	        "AppService": "EDM5 - Edmonton DC 560 (Network)",
	        "ServiceOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS22888",
	        "AppService": "WPG3  - Winnipeg DC 450 (Network)",
	        "ServiceOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS22918",
	        "AppService": "GitHub (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22928",
	        "AppService": "ProShip (SaaS) (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS22929",
	        "AppService": "Riskonnect - Risk Management (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22962",
	        "AppService": "Qlik - MMS E1 Data replication (Prod)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS22984",
	        "AppService": "Datavant Tokenization (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS22992",
	        "AppService": "Las Colinas Tech Bar Utility server (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS23010",
	        "AppService": "MMS Data Lake (Prod)",
	        "ServiceOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS23014",
	        "AppService": "IMA360 (Prod)",
	        "ServiceOffering": "Incentives & Master Data"
	    },
	    {
	        "ASNumber": "AS23028",
	        "AppService": "USON -AbsenceSoft (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS23030",
	        "AppService": "Cyber Central (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS23037",
	        "AppService": "Alation Data Catalog- Prod",
	        "ServiceOffering": "Data Visualization Platform Management"
	    },
	    {
	        "ASNumber": "AS23040",
	        "AppService": "Project Insight (Prod)",
	        "ServiceOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS23096",
	        "AppService": "Ethicspoint (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23105",
	        "AppService": "FleetComplete BigRoad Fleet Tracking Solution (Prod)",
	        "ServiceOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS23136",
	        "AppService": "Roadnet (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS23142",
	        "AppService": "Apacheta (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS23152",
	        "AppService": "CubeIQ Product Cartonization and Allocation Management (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS23200",
	        "AppService": "Verato Universal EMPI (SaaS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23208",
	        "AppService": "Corporate Tax (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23226",
	        "AppService": "Select and Save (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23246",
	        "AppService": "Jamf Pro (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS23254",
	        "AppService": "RxOrders - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23301",
	        "AppService": "Wireshark-Prod-SaaS",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23360",
	        "AppService": "USON - US ONCOLOGY ACS (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23364",
	        "AppService": "USON - US ONCOLOGY All (Network)",
	        "ServiceOffering": "Ent. Client Technology"
	    },
	    {
	        "ASNumber": "AS23370",
	        "AppService": "USON - US ONCOLOGY AFFO (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23373",
	        "AppService": "Netwrix Active Directory Protection (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23374",
	        "AppService": "USON - US ONCOLOGY CCCB (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23378",
	        "AppService": "USON - US ONCOLOGY BRCC (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23380",
	        "AppService": "USON - US ONCOLOGY CMOH (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23384",
	        "AppService": "USON - US ONCOLOGY CCCN (Network)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23388",
	        "AppService": "USON - US ONCOLOGY GCCC (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23393",
	        "AppService": "KNAPP - Automation Pharma Canada Trenton DC320 (Prod)",
	        "ServiceOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS23395",
	        "AppService": "KNAPP - Automation Pharma Canada Edmonton DC560 (Prod)",
	        "ServiceOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS23396",
	        "AppService": "USON - US ONCOLOGY JV-AUI (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23397",
	        "AppService": "KNAPP - Automation Pharma Canada Vancouver DC570 (Prod)",
	        "ServiceOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS23398",
	        "AppService": "USON - US ONCOLOGY JV-BROCKTON (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23400",
	        "AppService": "USON - US ONCOLOGY JV-BROOKLYN (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23402",
	        "AppService": "USON - US ONCOLOGY JV-COH (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23406",
	        "AppService": "USON - US ONCOLOGY JV-EVA (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23408",
	        "AppService": "USON - US ONCOLOGY JV-ICC (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23410",
	        "AppService": "USON - US ONCOLOGY JV-GAH (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23412",
	        "AppService": "USON - US ONCOLOGY CO (Network)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23418",
	        "AppService": "USON - US ONCOLOGY JV-PROVIDENCE (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23419",
	        "AppService": "MPS EnterpriseRx - Batch(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23420",
	        "AppService": "USON - US ONCOLOGY JV-QUEENS (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23422",
	        "AppService": "Global Loyalty Archive (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23424",
	        "AppService": "USON - US ONCOLOGY JV-RCK (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23425",
	        "AppService": "DSCSA Parse(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23426",
	        "AppService": "USON - US ONCOLOGY JV-SSRO (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23427",
	        "AppService": "EnterpriseRx - Kafka Consumers (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23428",
	        "AppService": "USON - US ONCOLOGY JV-SBRO (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23429",
	        "AppService": "EnterpriseRx - DMZ (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23432",
	        "AppService": "USON - US ONCOLOGY JV-VRRO (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23436",
	        "AppService": "USON - US ONCOLOGY JV-WBG (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23440",
	        "AppService": "USON - US ONCOLOGY JV-WFRT (Network)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23442",
	        "AppService": "USON - US ONCOLOGY RBO-MARBO (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23444",
	        "AppService": "USON - US ONCOLOGY MCA (Network)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23446",
	        "AppService": "USON - US ONCOLOGY MOHC (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23448",
	        "AppService": "USON - US ONCOLOGY MNO (Network)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23452",
	        "AppService": "USON - US ONCOLOGY RBO-IN (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23454",
	        "AppService": "USON - US ONCOLOGY RBO-MTNW (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23456",
	        "AppService": "USON - US ONCOLOGY RBO-NERBO (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23458",
	        "AppService": "USON - US ONCOLOGY RCOG (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23460",
	        "AppService": "USON - US ONCOLOGY NWO (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23462",
	        "AppService": "USON - US ONCOLOGY TXO (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23466",
	        "AppService": "USON - US ONCOLOGY RMCC (Network)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23468",
	        "AppService": "USON - US ONCOLOGY SCC (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23470",
	        "AppService": "USON - US ONCOLOGY SFOH (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23471",
	        "AppService": "Pharmaclik-Promo (Prod)",
	        "ServiceOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS23478",
	        "AppService": "USON - US ONCOLOGY WVCI (Network)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23480",
	        "AppService": "MPS Billing (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23485",
	        "AppService": "CMM-Atlanta OKTA - Prod (Saas)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23486",
	        "AppService": "USON - US ONCOLOGY VCS (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23488",
	        "AppService": "Terminal Services for ERX Offshore Team (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23490",
	        "AppService": "USON - US ONCOLOGY VOA (Network)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23509",
	        "AppService": "Latent Health (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23514",
	        "AppService": "JDE E1 Security Team (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23526",
	        "AppService": "Jenkins CICD (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS23532",
	        "AppService": "BioPharma insights Delivery platform (Prod)",
	        "ServiceOffering": "PSaS Data Architecture & Eng. Service"
	    },
	    {
	        "ASNumber": "AS23545",
	        "AppService": "ServiceNow IRM",
	        "ServiceOffering": "Service Enablement"
	    },
	    {
	        "ASNumber": "AS23557",
	        "AppService": "Veeva Systems - SafeMine (Prod)(Saas)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23562",
	        "AppService": "MMS Alternative Sourcing Vendors (ASV) Purchasing (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23563",
	        "AppService": "LSMV-PROD",
	        "ServiceOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS23565",
	        "AppService": "RxLightning-Prod",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS23567",
	        "AppService": "CMM-Atlanta Google Cloud Platform (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23570",
	        "AppService": "Magnet Axiom Cyber (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS23621",
	        "AppService": "TLP - Prod",
	        "ServiceOffering": "PSAS Data Strategy & Adv Analytics"
	    },
	    {
	        "ASNumber": "AS23623",
	        "AppService": "Healthmart Advocacy Network -Prod (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23623",
	        "AppService": "Symantec DLP Monitor (US)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS23625",
	        "AppService": "Power Protect Data Manager (PPDM) -Prod",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS23625",
	        "AppService": "Symantec DLP Monitor CANADA",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS23629",
	        "AppService": "Symantec DLP Monitor EAST",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS23641",
	        "AppService": "Decisions BRE (Business Rules Engine)-Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23643",
	        "AppService": "Ontada API Portal web app (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23659",
	        "AppService": "LifeSphere Medical Information (Prod)(Saas)",
	        "ServiceOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS23676",
	        "AppService": "HPE OneView (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23680",
	        "AppService": "BI APPL  Minor / Break Fixes (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS23682",
	        "AppService": "BI APPL Data Request (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS23684",
	        "AppService": "BI APPL Legal (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS23686",
	        "AppService": "BI APPL Report Transmission (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS23688",
	        "AppService": "BI APPL Analysis / Information Request (Prod)",
	        "ServiceOffering": "ERP ODS & Operational Reporting"
	    },
	    {
	        "ASNumber": "AS23689",
	        "AppService": "Ontada Claims and Remits Data - Prod (Saas)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23691",
	        "AppService": "MMS Solera Omnitracs SaaS (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS23694",
	        "AppService": "VAN8 - Vancouver DC570 (Network)",
	        "ServiceOffering": "Canada Field Tech 1"
	    },
	    {
	        "ASNumber": "AS23703",
	        "AppService": "ERA Webapp (Prod)",
	        "ServiceOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS23704",
	        "AppService": "POC DB Servers (Prod)",
	        "ServiceOffering": "Enterprise Infrastructure"
	    },
	    {
	        "ASNumber": "AS23710",
	        "AppService": "Oracle Golden Gate (Prod)",
	        "ServiceOffering": "Enterprise Infrastructure"
	    },
	    {
	        "ASNumber": "AS23711",
	        "AppService": "CMM Analytics GA (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23718",
	        "AppService": "McKesson LabResult API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23724",
	        "AppService": "CMM-Atlanta Microsoft Azure(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23734",
	        "AppService": "Okta for DK, Denmark (Workforce) (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23736",
	        "AppService": "Okta for NMD, Norway (Workforce) (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23750",
	        "AppService": "Okta for NMD Norway (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23751",
	        "AppService": "Strata for Workforce(Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23756",
	        "AppService": "Edge IE 11 Compatibility Mode (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS23757",
	        "AppService": "Klue (Prod)",
	        "ServiceOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS23761",
	        "AppService": "Ontada Rocket Chat - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23764",
	        "AppService": "General IE 11 Retirement Query (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS23765",
	        "AppService": "Park Place Park View (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23782",
	        "AppService": "Glide Health  (SaaS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23792",
	        "AppService": "Tekizma Datanyx Reporting Tool (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23798",
	        "AppService": "Edifecs routing/transformation engine for claims in support TV3 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23820",
	        "AppService": "Retool - Mfr Inctv (Admin) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23822",
	        "AppService": "Retool – Mfr Inctv (MDM) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23824",
	        "AppService": "CoPay Reporting Environment (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23826",
	        "AppService": "Retool - Mfr Inctv (Agreements) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23827",
	        "AppService": "Asynchronous Calculation Engine (ACE) - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23828",
	        "AppService": "MPS Drug Lookup (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23835",
	        "AppService": "Structured Data Integration (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23838",
	        "AppService": "InteropiO (PaaS) (prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23840",
	        "AppService": "Enterprise Analytics for US - Manufacture Incentives (Dev)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23843",
	        "AppService": "Epicor mobile-EKW-Prod",
	        "ServiceOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS23857",
	        "AppService": "Strata for Business and Customer Identities (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS23859",
	        "AppService": "Staffbase (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23861",
	        "AppService": "PTS API (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23862",
	        "AppService": "Rain (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23868",
	        "AppService": "USON - US ONCOLOGY OHC (Network)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS23896",
	        "AppService": "OLAP2",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23898",
	        "AppService": "RPT1",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23900",
	        "AppService": "Qlik (CMM)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23908",
	        "AppService": "Validic (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23914",
	        "AppService": "Enterprise Analytics for US - Manufacture Incentives (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23949",
	        "AppService": "SCRI - Salesforce Marketing Cloud - PROD",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23951",
	        "AppService": "USON Refund and Write-Off Processing (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23953",
	        "AppService": "Proofpoint ITM (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS23955",
	        "AppService": "McKesson Product Generator (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23967",
	        "AppService": "MMS MercuryGate Transportation Management System (Prod)(SaaS)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS23970",
	        "AppService": "Tugboat Logic (Prod) (SaaS)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS23984",
	        "AppService": "CMM Cohesity AT  (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23986",
	        "AppService": "Jira (CMM)-Prod (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23988",
	        "AppService": "hub-admin-ui (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23992",
	        "AppService": "hub-faxconsumer-service (prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS23996",
	        "AppService": "hub-erx-service (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24010",
	        "AppService": "MPS Clinical Program Solutions(CPS) Azure (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24012",
	        "AppService": "Hub-Erx-Worker-Service (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24020",
	        "AppService": "Okta (CMM)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24023",
	        "AppService": "Qlik - PSAS TLP Data replication (Prod)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS24040",
	        "AppService": "Print Services (Canada)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24042",
	        "AppService": "RxO Admin (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24044",
	        "AppService": "PBM/Benefit Cost Compare (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24056",
	        "AppService": "Savings SeekerRx (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24066",
	        "AppService": "Grayscale (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24070",
	        "AppService": "ERP Security (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS24071",
	        "AppService": "Five9 US - Ontada (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24084",
	        "AppService": "Pharma DC - 8831 - Clermont MPB/Specialty, KY (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS24101",
	        "AppService": "InteropiO for Ontada (Azure)-Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24131",
	        "AppService": "Azure Databricks (SaaS) - Canada (PROD)",
	        "ServiceOffering": "Canada Data & Analytics"
	    },
	    {
	        "ASNumber": "AS24152",
	        "AppService": "Lyceum (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24153",
	        "AppService": "DataIku-CMM (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24154",
	        "AppService": "Web Crawler (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24166",
	        "AppService": "McKesson Enterprise PKI (Prod) (SaaS)",
	        "ServiceOffering": "Identity & Access Management Service"
	    },
	    {
	        "ASNumber": "AS24170",
	        "AppService": "IG Gateway (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24180",
	        "AppService": "MES OpenText Azure (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS24194",
	        "AppService": "OneTrust GRC (Prod) (SaaS)",
	        "ServiceOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS24197",
	        "AppService": "Redica (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24208",
	        "AppService": "Creprs US Pharma (Prod)",
	        "ServiceOffering": "Gx Product Lifecycle Mgmt and Eng."
	    },
	    {
	        "ASNumber": "AS24210",
	        "AppService": "Phoenix US Pharma (Prod)",
	        "ServiceOffering": "Gx Product Lifecycle Mgmt and Eng."
	    },
	    {
	        "ASNumber": "AS24222",
	        "AppService": "SpyGlass (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24226",
	        "AppService": "MT Network DAL16 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24228",
	        "AppService": "SpyCloud (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond Service"
	    },
	    {
	        "ASNumber": "AS24230",
	        "AppService": "Black Kite (Prod)(SaaS)",
	        "ServiceOffering": "Security Architecture & Strategy"
	    },
	    {
	        "ASNumber": "AS24232",
	        "AppService": "MT Network FTW8 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24246",
	        "AppService": "Varonis (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS24295",
	        "AppService": "Cribl - Prod",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS24300",
	        "AppService": "Blue Yonder WMS (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS24310",
	        "AppService": "Monday.com (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24314",
	        "AppService": "CMM OCR (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24338",
	        "AppService": "Austin SOC Network (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond Service"
	    },
	    {
	        "ASNumber": "AS24352",
	        "AppService": "Members Web (Prod)",
	        "ServiceOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS24354",
	        "AppService": "Centralized Content Management Tool (CCMT) (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24386",
	        "AppService": "MMS SCA Automation (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24387",
	        "AppService": "Incentive Services - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24391",
	        "AppService": "Jellyfish - Columbus - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24418",
	        "AppService": "BlistAssist Technology & Software (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24420",
	        "AppService": "PACMED Technology & Software (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24430",
	        "AppService": "Incident Management (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS24434",
	        "AppService": "SLA Database (Prod)",
	        "ServiceOffering": "MSP Management"
	    },
	    {
	        "ASNumber": "AS24438",
	        "AppService": "USON Credit Apps Repository - (PROD)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24440",
	        "AppService": "Document Scanning OCR Solution (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24442",
	        "AppService": "Radformation  AutoContour (Prod) (SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24445",
	        "AppService": "COR- Convert Rejects (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24456",
	        "AppService": "FindHelp (Prod) (SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24457",
	        "AppService": "Phosphorus (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS24460",
	        "AppService": "Centegix Crisis Alert (Prod) (SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24465",
	        "AppService": "Affinities - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24468",
	        "AppService": "Therapanacea ArtPlan (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24470",
	        "AppService": "Roche Navify Tumor Board (Prod) (SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24472",
	        "AppService": "PPS Analytics (Prod) (SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24488",
	        "AppService": "IBM MSP Grafana (Prod)",
	        "ServiceOffering": "Cyber Business Management"
	    },
	    {
	        "ASNumber": "AS24517",
	        "AppService": "Cloud Engineering Automation (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS24522",
	        "AppService": "Ryght.AI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24526",
	        "AppService": "Tervene Digital Management System (Prod) (Saas)",
	        "ServiceOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS24530",
	        "AppService": "Multisource  Web(Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24545",
	        "AppService": "Geomant Wallboard (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24549",
	        "AppService": "BBraun DoseTrac (Prod)(SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24557",
	        "AppService": "Solarwinds Serv-U FTP (Canada - Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24559",
	        "AppService": "Genospace (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24564",
	        "AppService": "DevOps Tools(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24566",
	        "AppService": "SCRI - Document Express (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24570",
	        "AppService": "McKesson Advocacy Network (SaaS) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24583",
	        "AppService": "Radformation ChartCheck (SaaS)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24584",
	        "AppService": "Device42 - SAP (Prod)",
	        "ServiceOffering": "Ent. SAP Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS24586",
	        "AppService": "Onelink (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24597",
	        "AppService": "Radformation QuickCode (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24609",
	        "AppService": "hub-ampenrollment-consumer-service",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24613",
	        "AppService": "Azure Kubernetes Services (AKS) - Canada East (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS24617",
	        "AppService": "hub-aepc-ui (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24618",
	        "AppService": "Uberflip(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24621",
	        "AppService": "Gem CRM (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24623",
	        "AppService": "hub-ampactivity-consumer-service (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24626",
	        "AppService": "Cornerstone AI (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24629",
	        "AppService": "hub-ebvconsumer-service (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24636",
	        "AppService": "IBM GDR Replication (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24642",
	        "AppService": "Ataccama-MDM (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24673",
	        "AppService": "NorthStar Ireland Lab system(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24674",
	        "AppService": "Azure Kubernetes Services (AKS) - West US 3 (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS24681",
	        "AppService": "interopio account api 2.0(PaaS)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24685",
	        "AppService": "Genome Medical (SaaS)(Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24687",
	        "AppService": "Stonly Digital Adoption Platform(SaaS)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24695",
	        "AppService": "LS RWR CDM Datamart Gold (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24698",
	        "AppService": "LS RWDA CDM Datamart Gold (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24700",
	        "AppService": "LS Legacy CI EDW Datamart (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24701",
	        "AppService": "CMM Pricing Service (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24717",
	        "AppService": "NLP Lab(Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24722",
	        "AppService": "Voice Telco Service(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24724",
	        "AppService": "Privileged Access Research and Inventory System (Prod)",
	        "ServiceOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS24730",
	        "AppService": "LS Legacy RWR EDW Datamart(Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24757",
	        "AppService": "Oracle EPM EDM (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24763",
	        "AppService": "Oracle EPM EPBCS (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24768",
	        "AppService": "Oracle EPM FCCS (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24774",
	        "AppService": "Oracle EPM NR (prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24791",
	        "AppService": "GPO Analytic Web Portal (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24799",
	        "AppService": "iKnowMed G2 Microservice (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24803",
	        "AppService": "Logitech Sync (Dev)(SaaS)",
	        "ServiceOffering": "In-Office Employee Enablement"
	    },
	    {
	        "ASNumber": "AS24816",
	        "AppService": "LS - Feasibility Assessment/ Patient Cohort Selection Tool (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24820",
	        "AppService": "3PL - UnitPull - US - Prod",
	        "ServiceOffering": "Ent. P2P, Procurement & Demand Planning"
	    },
	    {
	        "ASNumber": "AS24822",
	        "AppService": "USON Dubber (Prod)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS24855",
	        "AppService": "Wallet - Prod (Saas)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24864",
	        "AppService": "Unlimited Financials (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS24883",
	        "AppService": "Multi-client CFaaS Central Fill - Memphis (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24887",
	        "AppService": "Catalyst Central Fill Facility - Plano, TX(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24889",
	        "AppService": "Biologics Central Fill Facility - Park Vista,TX (Prod)",
	        "ServiceOffering": "Pharmacy Service"
	    },
	    {
	        "ASNumber": "AS24891",
	        "AppService": "Wegmans Central Fill 1 – Buffalo,NY (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24897",
	        "AppService": "Indiana Costco Central Fill (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24898",
	        "AppService": "BillTrust(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24901",
	        "AppService": "Adobe XD(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24903",
	        "AppService": "Agilent OpenLab CDS(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24905",
	        "AppService": "Alight Upoint(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24906",
	        "AppService": "Anomalo(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24915",
	        "AppService": "Beamery(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24918",
	        "AppService": "BLUE workflow management(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24920",
	        "AppService": "Bynder(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24928",
	        "AppService": "Condeco (ClarusONE)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24930",
	        "AppService": "Contentstack(Prod)",
	        "ServiceOffering": "eCommerce"
	    },
	    {
	        "ASNumber": "AS24931",
	        "AppService": "ControlUP(Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS24932",
	        "AppService": "Core Strengths Platform(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24933",
	        "AppService": "CorpTax(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24937",
	        "AppService": "ADP Workforce (Prod)(SaaS)",
	        "ServiceOffering": "Sales Compensation"
	    },
	    {
	        "ASNumber": "AS24938",
	        "AppService": "Data Visualization Platform - Ontada(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24939",
	        "AppService": "Datanyx(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24941",
	        "AppService": "BY Warehouse Labor Management(Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS24943",
	        "AppService": "Pre and Post Editing (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24948",
	        "AppService": "Enhanced File Transfer System(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24949",
	        "AppService": "Enterprise Workday Recruiting(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24950",
	        "AppService": "EQ Insight(Prod)",
	        "ServiceOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS24954",
	        "AppService": "eStar(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24957",
	        "AppService": "Fluxx Grantmaker(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24958",
	        "AppService": "Franklin Covey All Access Pass(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24960",
	        "AppService": "HCA_OnBase(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24961",
	        "AppService": "Health Mart Digital Portfolio(Prod)",
	        "ServiceOffering": "Customer Operations Dev & Ops Services"
	    },
	    {
	        "ASNumber": "AS24963",
	        "AppService": "HighSpot-MMS-SFDC(Prod)",
	        "ServiceOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS24964",
	        "AppService": "HIPAA Suite(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24965",
	        "AppService": "MMS Product Recommender (Prod) (SaaS)",
	        "ServiceOffering": "PSAS Gx, Biopharma, Pricing and Finance"
	    },
	    {
	        "ASNumber": "AS24966",
	        "AppService": "HMI Software(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24967",
	        "AppService": "Hub-status-service(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24968",
	        "AppService": "Hyperion FDM(Prod)",
	        "ServiceOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS24969",
	        "AppService": "Hyperion HFM(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24970",
	        "AppService": "Hyperion Planning/Essbase(Prod)",
	        "ServiceOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS24977",
	        "AppService": "Interopio fhir gateway (Prod) (PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24978",
	        "AppService": "Jifflenow - eEvent(Prod)",
	        "ServiceOffering": "PSAS Gx, Biopharma, Pricing and Finance"
	    },
	    {
	        "ASNumber": "AS24979",
	        "AppService": "Klarna Well.ca(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24980",
	        "AppService": "KN Booking System(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24981",
	        "AppService": "Interopio portal1 (Prod)(Paas)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24982",
	        "AppService": "LawLogix Guardian(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24984",
	        "AppService": "Lingualinx(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24985",
	        "AppService": "Loftware Bar Code Printing Services(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24986",
	        "AppService": "Logicoy(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24988",
	        "AppService": "Lytho (recovered 2023-11-28 21:03:51)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24989",
	        "AppService": "MAC Success Manager(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24990",
	        "AppService": "Mandiant Advantage(Prod)",
	        "ServiceOffering": "Cyber Detect & Respond Service"
	    },
	    {
	        "ASNumber": "AS24991",
	        "AppService": "Matrix Absence eAccounts(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24992",
	        "AppService": "Matrix Absence Radar(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS24994",
	        "AppService": "McKesson Advocacy App(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS24995",
	        "AppService": "McKesson Brand Shop(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25000",
	        "AppService": "Medicare Eligibility(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25001",
	        "AppService": "interopio-environment-api (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25005",
	        "AppService": "MMS - Blue Ocean Brain(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25007",
	        "AppService": "MPS Centralized Admin Portal CAP(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25008",
	        "AppService": "MyGuide(Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS25009",
	        "AppService": "interopio-fhir-cdr (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25015",
	        "AppService": "Interopio cds service (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25016",
	        "AppService": "Opal(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25017",
	        "AppService": "Opero(Prod)",
	        "ServiceOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS25019",
	        "AppService": "PagerDuty(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25021",
	        "AppService": "Interopio auth v2 (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25022",
	        "AppService": "Pendo Guidance and Training Application(Prod)",
	        "ServiceOffering": "MMS Customer Operations Service Category"
	    },
	    {
	        "ASNumber": "AS25024",
	        "AppService": "iSeries Navigator(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25027",
	        "AppService": "Interopio data adapter sdk java(Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25028",
	        "AppService": "RxResponse(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25031",
	        "AppService": "RBG - SiteCore Banner Brand Websites(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25033",
	        "AppService": "interopio-dataadapter-varian(Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25038",
	        "AppService": "RFPIO(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25039",
	        "AppService": "Interopio-dataadapter-allscripts-unity(Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25040",
	        "AppService": "RHP - Enhanced Vaccine Billing(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25041",
	        "AppService": "RHP - Exclude Prescriber Monitoring(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25042",
	        "AppService": "RHP - Government Plan Exclusion(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25043",
	        "AppService": "RHP - NotifyRx(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25044",
	        "AppService": "RHP - Prescriber Authority Service(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25045",
	        "AppService": "Interopio-dataadapter-epic-r4 (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25046",
	        "AppService": "RHP - Rapid Rewards(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25047",
	        "AppService": "RHP - RxSafety(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25048",
	        "AppService": "RHP - SafeCardRX(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25049",
	        "AppService": "Interopio-hl7-receiver (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25051",
	        "AppService": "Route4Me Route Planner(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25052",
	        "AppService": "RxC-HVS (High Volume Shipping Solution)(Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS25053",
	        "AppService": "Interopio-dataadapter-iknowmed (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25054",
	        "AppService": "RXSS - Atlassian Suite(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25055",
	        "AppService": "RXSS - AWS(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25056",
	        "AppService": "RXSS - Code42(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25057",
	        "AppService": "RXSS - Databricks(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25058",
	        "AppService": "RxSS - Demostack(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25059",
	        "AppService": "Interopio-smart-launch-proxy (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25060",
	        "AppService": "RXSS - JAMF Connect(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25061",
	        "AppService": "interopio-monitoring (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25062",
	        "AppService": "RXSS - Terraform(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25063",
	        "AppService": "SafeBreach(Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS25065",
	        "AppService": "Salesforce RHPS Instance(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25066",
	        "AppService": "Sanitas Admin(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25067",
	        "AppService": "Interopio-fhir-cde-v2 (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25068",
	        "AppService": "Sanitas Dispensing(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25071",
	        "AppService": "Sedgwick V01 (Workers Comp)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25072",
	        "AppService": "SendGrid(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25073",
	        "AppService": "Interopio-logging (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25074",
	        "AppService": "SignalPath(Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS25075",
	        "AppService": "Simulated phishing and reporting(Prod)",
	        "ServiceOffering": "Awareness & Training"
	    },
	    {
	        "ASNumber": "AS25077",
	        "AppService": "Interopio-portal (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25079",
	        "AppService": "Solidworks(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25080",
	        "AppService": "Sprout Social(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25081",
	        "AppService": "Sprout Social Employee Advocacy(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25082",
	        "AppService": "Star-Plus RMS(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25083",
	        "AppService": "Interopio-auth(Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25086",
	        "AppService": "Tessian(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25087",
	        "AppService": "The Work Number(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS25089",
	        "AppService": "Interopio-admin (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25091",
	        "AppService": "TuMeke(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25095",
	        "AppService": "Interopio messaging (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25096",
	        "AppService": "VC - Partner API(Prod)",
	        "ServiceOffering": "B2C E-Commerce"
	    },
	    {
	        "ASNumber": "AS25097",
	        "AppService": "VC - Provider and Console portals(Prod)",
	        "ServiceOffering": "B2C E-Commerce"
	    },
	    {
	        "ASNumber": "AS25099",
	        "AppService": "viewLinc PSAS(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25100",
	        "AppService": "Visier(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS25101",
	        "AppService": "Interopio-bilirubin-risk-chart (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25102",
	        "AppService": "VIVA STARS Supplier Diversity Portal(Pro",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25104",
	        "AppService": "Web Content - SCRI.com(Prod)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25106",
	        "AppService": "Work Credit Opportunity(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25107",
	        "AppService": "Interopio-analytics-service (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25108",
	        "AppService": "Workiva Internal Audit Solution(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25109",
	        "AppService": "Interopio-smart-context-resolution (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25110",
	        "AppService": "Active Directory (CA-Canada)(Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS25111",
	        "AppService": "Active Directory (Temp)(Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS25112",
	        "AppService": "Affirmity(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS25117",
	        "AppService": "Interopio-system (Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25120",
	        "AppService": "MMS - TREW Conveyor PLC(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25121",
	        "AppService": "Cypress Syspro ERP(Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS25123",
	        "AppService": "Five9 Contact Center(Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS25124",
	        "AppService": "Google Cloud Vmware Engine(Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS25125",
	        "AppService": "Active Directory Federation Services (ADFS) Prod",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS25127",
	        "AppService": "RBG - Uniprix - Admin (Prod)",
	        "ServiceOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS25136",
	        "AppService": "NorthStar RxP(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25138",
	        "AppService": "Total View(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25141",
	        "AppService": "USON O365 Active Directory Federation Services (ADFS O365)(Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS25142",
	        "AppService": "IBM Sterling Integrator 5.2.4.0(Prod)",
	        "ServiceOffering": "CPQ"
	    },
	    {
	        "ASNumber": "AS25143",
	        "AppService": "ISRM PCI ASV (Qualys)(Prod)",
	        "ServiceOffering": "Governance & Risk Management Service"
	    },
	    {
	        "ASNumber": "AS25144",
	        "AppService": "Ontada PediatricSuite(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25150",
	        "AppService": "Veeva Site Vault(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25151",
	        "AppService": "EA-Anomaly-Detection-System-AZ (Prod)(PaaS)",
	        "ServiceOffering": "PSAS Generics Analytics"
	    },
	    {
	        "ASNumber": "AS25156",
	        "AppService": "Accutrac(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25166",
	        "AppService": "AutoCAD(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25168",
	        "AppService": "Blackbaud(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25174",
	        "AppService": "Edflo(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS25176",
	        "AppService": "Hyperion Shared Services/Workspace(Prod)",
	        "ServiceOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS25178",
	        "AppService": "Intelex - GSS - The PORTAL(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25180",
	        "AppService": "Merrill DataSiteOne(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25186",
	        "AppService": "RHP - Denial Conversion(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25188",
	        "AppService": "Roambee HoneyComb - PSAS(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25189",
	        "AppService": "RXSS - Apple Business Manager(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25190",
	        "AppService": "RXSS - Gitlab(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25191",
	        "AppService": "RXSS - Salesforce(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25192",
	        "AppService": "Sanitas Configuration(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25194",
	        "AppService": "SentinelOne Mobile(Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS25195",
	        "AppService": "Snaplogic(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25196",
	        "AppService": "STP - QC - Telus Jumppoint(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25197",
	        "AppService": "ThoughtSpot(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25198",
	        "AppService": "VC - Mobile Apps Andriod/iOS(Prod)",
	        "ServiceOffering": "B2C E-Commerce"
	    },
	    {
	        "ASNumber": "AS25201",
	        "AppService": "Workiva SOX Compliance Solution(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25204",
	        "AppService": "Interchange(Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS25207",
	        "AppService": "Five9 IVA(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25208",
	        "AppService": "OneTrust Privacy(Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS25209",
	        "AppService": "Treatment Plan Plus (Prod) (SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25210",
	        "AppService": "Bardavon(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25212",
	        "AppService": "HireRight Applicant Center(Prod)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS25214",
	        "AppService": "RHP - PriorAuthPlus(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25216",
	        "AppService": "GSOC Honeywell MaxPro(Prod)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS25218",
	        "AppService": "CAM-Central Access Management Application(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25240",
	        "AppService": "HCA_Development Innovations System Help (DISH)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25242",
	        "AppService": "IBM Transformation Extender Advanced 10.0.1.0(Prod)",
	        "ServiceOffering": "CPQ"
	    },
	    {
	        "ASNumber": "AS25245",
	        "AppService": "MPS ERX Data Insight (DEV/UAT)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25247",
	        "AppService": "MRxTS Snowflake Azure US East 2 Hub (Virginia, USA)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25249",
	        "AppService": "SpiraTeam (Prod)(SaaS)",
	        "ServiceOffering": "Commercial, Strategy & Innovation IT"
	    },
	    {
	        "ASNumber": "AS25258",
	        "AppService": "MMS - Pramata Customer Structure Groupings(Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS25261",
	        "AppService": "Interopion-apps-health-records-standalone(Prod)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25263",
	        "AppService": "interopio-patient-portal(PROD)(PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25265",
	        "AppService": "Interopio-system-status (PROD) (PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25266",
	        "AppService": "Pathfinder (iSeries Impact Analysis Software) (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS25267",
	        "AppService": "interopio-dataadapter-surescripts (PROD) (PaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25270",
	        "AppService": "RBG - Uniprix - TELUS EspacePharma Services (Uniprix) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25273",
	        "AppService": "Sanitas Host Management(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25278",
	        "AppService": "USON Athena IDX  (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS25282",
	        "AppService": "SCRI - iOFFICE (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25314",
	        "AppService": "ScriptMed Enterprise(Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS25321",
	        "AppService": "Genesys Cloud CX (PROD)(SaaS)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS25325",
	        "AppService": "EHR Admin(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25326",
	        "AppService": "FlagSmith(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25329",
	        "AppService": "Jira (ClarusONE)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25330",
	        "AppService": "Navinet Feedback Loop(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25331",
	        "AppService": "OverHaul(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25334",
	        "AppService": "Prescribers API(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25335",
	        "AppService": "Reactor(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25336",
	        "AppService": "Request Pages API(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25337",
	        "AppService": "RXSS - 1Password(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25338",
	        "AppService": "RXSS - Burp Suite Professional(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25339",
	        "AppService": "RXSS - Codemagic(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25340",
	        "AppService": "Text Verification Tool(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25345",
	        "AppService": "MPS ERX Data Insight Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25347",
	        "AppService": "Careers Site[Prod][SaS]",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25348",
	        "AppService": "PharmaClik POS(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25349",
	        "AppService": "Regulatory (Super Matrix)(Prod)",
	        "ServiceOffering": "Order to Cash and Platform"
	    },
	    {
	        "ASNumber": "AS25350",
	        "AppService": "RHP - eVoucherRx(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25351",
	        "AppService": "RXSS - Jenkins(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25352",
	        "AppService": "RXSS - Palo Alto GlobalProtect(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25353",
	        "AppService": "RXSS - Slack(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25355",
	        "AppService": "Tricentis Tosca - Ontada(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25356",
	        "AppService": "NCPDP EHR(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25359",
	        "AppService": "PDTransFac(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25362",
	        "AppService": "MasterControl (NorthStar)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25363",
	        "AppService": "Planful(Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25380",
	        "AppService": "RBG - Category Management  (Prod)",
	        "ServiceOffering": "Canada Retail Merchandising"
	    },
	    {
	        "ASNumber": "AS25382",
	        "AppService": "NorthStar Ireland Lab system (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25385",
	        "AppService": "Healthgraph - Prod",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25391",
	        "AppService": "Transportation",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25404",
	        "AppService": "Confluent Cloud Kafka(Prod)(SaaS)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS25405",
	        "AppService": "BarTender(Prod)",
	        "ServiceOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS25419",
	        "AppService": "CMM Pharmacy Controlled Substance Reporting Automation Script",
	        "ServiceOffering": "CMM Program Pharmacy Platform Management"
	    },
	    {
	        "ASNumber": "AS25427",
	        "AppService": "Ontada Health (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25427",
	        "AppService": "Zetafax(Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS25429",
	        "AppService": "US Oncology Legislative Site(Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25437",
	        "AppService": "RXSavings Solution (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25441",
	        "AppService": "ReflexRx Empty (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25446",
	        "AppService": "RightFax - USON(Prod)",
	        "ServiceOffering": "Automation"
	    },
	    {
	        "ASNumber": "AS25447",
	        "AppService": "ReflexRx QA Jumppoint",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25451",
	        "AppService": "Central Logfile Repository(Prod)",
	        "ServiceOffering": "Ent. Integration Technology Services"
	    },
	    {
	        "ASNumber": "AS25451",
	        "AppService": "Sanitas Pharmacy Automation System",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25457",
	        "AppService": "Core Authorization Service(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25471",
	        "AppService": "Biometric Matching Service(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25482",
	        "AppService": "ReflexRx Cloud (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25484",
	        "AppService": "TheyDo (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25487",
	        "AppService": "Pharma Warehouse Control System (WCS)(Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS25489",
	        "AppService": "Bio-HVS (High Volume Shipping Solution)(Prod)",
	        "ServiceOffering": "Practice Service"
	    },
	    {
	        "ASNumber": "AS25501",
	        "AppService": "SAP CX5 (McKesson Europe Services) (Prod)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25503",
	        "AppService": "SAP CXF (McKesson Europe Services) (Prod)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25505",
	        "AppService": "SAP CXR (McKesson Europe Services)(Prod)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25507",
	        "AppService": "SAP GSE (McKesson Europe Services)(Prod)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25509",
	        "AppService": "SAP GSR (McKesson Europe Services)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25511",
	        "AppService": "Web Content - Genospace.com (Prod)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS25536",
	        "AppService": "WebTMS (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25561",
	        "AppService": "Amjay (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25592",
	        "AppService": "NetApp Active IQ Unified Manager (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS25610",
	        "AppService": "USON Shoreline (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS25712",
	        "AppService": "Spellbook- MCC Legal (Prod)(SaaS)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25715",
	        "AppService": "6Sense (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25745",
	        "AppService": "PSAS DI Retail Support Services (RSS) - Prod",
	        "ServiceOffering": "PSAS Decision Intelligence"
	    },
	    {
	        "ASNumber": "AS25788",
	        "AppService": "PSAS DI - Sales Operations (SOPS) - Prod",
	        "ServiceOffering": "PSAS Decision Intelligence"
	    },
	    {
	        "ASNumber": "AS25796",
	        "AppService": "McKesson Gen AI Platform - Prod",
	        "ServiceOffering": "Gen AI Platform Engineering & Management"
	    },
	    {
	        "ASNumber": "AS25807",
	        "AppService": "USON Asset Transfer Form (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25834",
	        "AppService": "SailPoint Identity Security Cloud (Prod)(SaaS)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS25847",
	        "AppService": "Microsoft SCCM Production USON(Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS25872",
	        "AppService": "PSAS DI Strategic Account Executive Dashboard (SA) (Prod)",
	        "ServiceOffering": "PSAS Decision Intelligence"
	    },
	    {
	        "ASNumber": "AS25882",
	        "AppService": "MMS TUL5 CrossDock (Prod)",
	        "ServiceOffering": "Ent Network Services"
	    },
	    {
	        "ASNumber": "AS25905",
	        "AppService": "Careviso (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS25919",
	        "AppService": "IAM AEMS(Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS25921",
	        "AppService": "MSH Salesforce ORG(Prod)",
	        "ServiceOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS25922",
	        "AppService": "PSaS Conga CLM (USON Payer)(Prod)",
	        "ServiceOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS25923",
	        "AppService": "Salesforce - Liaison Visit & Master Data(Prod)",
	        "ServiceOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS25924",
	        "AppService": "SalesForce Biologics Pricing Request(Prod)",
	        "ServiceOffering": "Ent. Commercial Service Category"
	    },
	    {
	        "ASNumber": "AS25932",
	        "AppService": "3PL Clermont Distribution Center - CMM Third party logistics",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS25941",
	        "AppService": "PSAS DI Community Pharmacy & Health (CPH)(Prod)",
	        "ServiceOffering": "PSAS Decision Intelligence"
	    },
	    {
	        "ASNumber": "AS26003",
	        "AppService": "Aruba Clearpass - (Prod)",
	        "ServiceOffering": "Cyber Protect & Engineering Service"
	    },
	    {
	        "ASNumber": "AS26034",
	        "AppService": "PSAS DI McKesson Health Systems (MHS)(Prod)",
	        "ServiceOffering": "PSAS Decision Intelligence"
	    },
	    {
	        "ASNumber": "AS26043",
	        "AppService": "Imanami 10.0.7784 (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS26045",
	        "AppService": "Apollo(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26062",
	        "AppService": "Wiz (Prod)",
	        "ServiceOffering": "BISO"
	    },
	    {
	        "ASNumber": "AS26074",
	        "AppService": "eHealth Technologies (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS26076",
	        "AppService": "Axonius (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26079",
	        "AppService": "MMS Martech - Salesforce Data Cloud (Prod)(SaaS)",
	        "ServiceOffering": "Marketing & Procurement"
	    },
	    {
	        "ASNumber": "AS26084",
	        "AppService": "KardiaMobile(Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS26093",
	        "AppService": "Insight Health (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS26104",
	        "AppService": "CMM SFDC-MuleSoft (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26112",
	        "AppService": "Aidbox (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26116",
	        "AppService": "MMS DAAA Azure Modernization (Prod)",
	        "ServiceOffering": "Data Engineering Service"
	    },
	    {
	        "ASNumber": "AS26120",
	        "AppService": "SIteCore (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS26155",
	        "AppService": "Terason uSmart Ultrasound (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS26163",
	        "AppService": "OneCloud Zabbix Monitoring(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26164",
	        "AppService": "SRFax(Prod)",
	        "ServiceOffering": "Canada Order Mgmt. & Customer Portal"
	    },
	    {
	        "ASNumber": "AS26165",
	        "AppService": "VPN (SDP)(Prod)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS26166",
	        "AppService": "Rev-Trac(Prod)",
	        "ServiceOffering": "Enterprise Application"
	    },
	    {
	        "ASNumber": "AS26167",
	        "AppService": "PSaS Print Management USP(Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS26168",
	        "AppService": "Synthesia(Prod)",
	        "ServiceOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS26169",
	        "AppService": "Tableau (US Retina)(Prod)",
	        "ServiceOffering": "PSAS Data Strategy & Adv Analytics"
	    },
	    {
	        "ASNumber": "AS26170",
	        "AppService": "Quickmobile(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26171",
	        "AppService": "Controlled Substances Data Clearing House - Bamboo Health(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26172",
	        "AppService": "Github (US Retina)(Prod)",
	        "ServiceOffering": "Customer Reporting and Analytics"
	    },
	    {
	        "ASNumber": "AS26173",
	        "AppService": "Lease Accelerator(Prod)",
	        "ServiceOffering": "HCM Services"
	    },
	    {
	        "ASNumber": "AS26174",
	        "AppService": "Ansible Automation Platform - Enterprise Patch Management(Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS26175",
	        "AppService": "Bamboo Health(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS26176",
	        "AppService": "PayPal(Prod)",
	        "ServiceOffering": "Ent. Finance Service Category"
	    },
	    {
	        "ASNumber": "AS26177",
	        "AppService": "Pharma Supply Agreement Upload tool(Prod)",
	        "ServiceOffering": "Enterprise Application"
	    },
	    {
	        "ASNumber": "AS26178",
	        "AppService": "Tricentis Tosca NA DEV(Prod)",
	        "ServiceOffering": "Enterprise Application"
	    },
	    {
	        "ASNumber": "AS26179",
	        "AppService": "Pharmacy Location Web Service(Prod)",
	        "ServiceOffering": "Ent. Integration Technology Services"
	    },
	    {
	        "ASNumber": "AS26180",
	        "AppService": "Adobe Enterprise Admin Console(Prod)",
	        "ServiceOffering": "Content Mgmt. & Productivity Software"
	    },
	    {
	        "ASNumber": "AS26203",
	        "AppService": "Crisis24 WorldCue(Prod)",
	        "ServiceOffering": "Ent. Data and Platform Engineering"
	    },
	    {
	        "ASNumber": "AS3336",
	        "AppService": "Practice Insights (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3348",
	        "AppService": "iKnowMed G1 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3350",
	        "AppService": "Clear Value Plus (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3351",
	        "AppService": "Clinical Trial Management System (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3355",
	        "AppService": "Learning Management System (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3359",
	        "AppService": "Perceptive Software (Formerly Imagenow) Accounts Payable Document Management (Prod)",
	        "ServiceOffering": "Imaging"
	    },
	    {
	        "ASNumber": "AS3369",
	        "AppService": "Charge Capture (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3383",
	        "AppService": "Printer On (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS3391",
	        "AppService": "Liaison Reporting (Prod)",
	        "ServiceOffering": "Customer Relationship Management"
	    },
	    {
	        "ASNumber": "AS3394",
	        "AppService": "Ontada Oracle My SQL (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3396",
	        "AppService": "Standard HL7 Interfaces (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3416",
	        "AppService": "Avaya (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS3417",
	        "AppService": "Cisco (Prod)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS3427",
	        "AppService": "TotalView Gen 2 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3431",
	        "AppService": "Revenue Manager (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3434",
	        "AppService": "USON Centricity Practice (G4) -Prod",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3440",
	        "AppService": "Practice Insights QCDR (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3443",
	        "AppService": "Lynx Mobile (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3444",
	        "AppService": "iKnowMed G2 (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3446",
	        "AppService": "Workday HRIS (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3451",
	        "AppService": "Cloverleaf (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3472",
	        "AppService": "eCommerce (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3473",
	        "AppService": "EDI Gateway (Prod) - Duplicate",
	        "ServiceOffering": "EDI"
	    },
	    {
	        "ASNumber": "AS3475",
	        "AppService": "PDS (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3476",
	        "AppService": "uCube (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3478",
	        "AppService": "Halo Spectrum (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS3486",
	        "AppService": "Televox (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3487",
	        "AppService": "Solution Reach (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3488",
	        "AppService": "Enghouse Interactive (Prod)",
	        "ServiceOffering": "Practice Success and Support Services"
	    },
	    {
	        "ASNumber": "AS3490",
	        "AppService": "Realmed (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3491",
	        "AppService": "Rubixis (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3493",
	        "AppService": "Navicure (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3494",
	        "AppService": "Payerpath (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3502",
	        "AppService": "IngeniousMeds (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3504",
	        "AppService": "Advanced MD (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3505",
	        "AppService": "Allscripts Tiger (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3506",
	        "AppService": "AllScripts Vision (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3527",
	        "AppService": "MapCheck 2 (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3528",
	        "AppService": "MapCheck 3DVH (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3529",
	        "AppService": "SRS MapCheck (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3535",
	        "AppService": "Profiler Software (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3539",
	        "AppService": "Profiler (Sun Nuclear) (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3540",
	        "AppService": "Profiler 2 (Sun Nuclear) (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3553",
	        "AppService": "Florence (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3555",
	        "AppService": "Availity (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3561",
	        "AppService": "Outcome Health (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3562",
	        "AppService": "DYNR SDX Breath Hold System (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3564",
	        "AppService": "Digi Smart Sense (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3569",
	        "AppService": "AuthPal (Prod)",
	        "ServiceOffering": "Specialty Solutions"
	    },
	    {
	        "ASNumber": "AS3570",
	        "AppService": "Dr. Rounds (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3577",
	        "AppService": "PaxMan Scalp Cooling System (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS3579",
	        "AppService": "TM1 (Prod)",
	        "ServiceOffering": "Accounting & Treasury, and FP&A"
	    },
	    {
	        "ASNumber": "AS9266",
	        "AppService": "MMS Data Rep (Prod)",
	        "ServiceOffering": "Enterprise Infrastructure"
	    },
	    {
	        "ASNumber": "AS9269",
	        "AppService": "Pharma - PRIME (Profit and Risk Information Management Exchange) DB (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9270",
	        "AppService": "Identity and Access Management (MMS) (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS9285",
	        "AppService": "Agenta MMS (Prod)",
	        "ServiceOffering": "Unified Communication & Contact Center"
	    },
	    {
	        "ASNumber": "AS9364",
	        "AppService": "FastTrack (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS9365",
	        "AppService": "Kafka-SIEM Platform (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS9380",
	        "AppService": "Maintenance Connection (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9390",
	        "AppService": "Pharma Distribution Operations Web Portal (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS9415",
	        "AppService": "EnterpriseRx - Shield Services (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9423",
	        "AppService": "PSAS FedEx Shipmanager (Prod)",
	        "ServiceOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS9426",
	        "AppService": "PSAS Vocollect VoiceLink (Prod)",
	        "ServiceOffering": "Regulatory"
	    },
	    {
	        "ASNumber": "AS9447",
	        "AppService": "Generics - GX Services (Prod)",
	        "ServiceOffering": "Gx Product Lifecycle Mgmt and Eng."
	    },
	    {
	        "ASNumber": "AS9449",
	        "AppService": "BADU Cork (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS9479",
	        "AppService": "Security Analytics (Prod)",
	        "ServiceOffering": "Cyber Detect & Respond"
	    },
	    {
	        "ASNumber": "AS9527",
	        "AppService": "Netezza (ScriptServer) - PROD",
	        "ServiceOffering": "Decision Intelligence: PSAS Distribution"
	    },
	    {
	        "ASNumber": "AS9531",
	        "AppService": "ScriptMed Analytics - RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9532",
	        "AppService": "External Physician and Client Portal -  RxCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9534",
	        "AppService": "PP Manager - RX Crossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9535",
	        "AppService": "mPulse - RXCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9536",
	        "AppService": "iCMS - RXCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9537",
	        "AppService": "CE2000 - RXCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9538",
	        "AppService": "Aestiva - RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9539",
	        "AppService": "Team Foundation Server - RXCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9540",
	        "AppService": "ViewPoint - RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9541",
	        "AppService": "Exegis - RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9543",
	        "AppService": "Genexus - RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9544",
	        "AppService": "JBA System 21 - RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9546",
	        "AppService": "CARE BSS/Pharmacy - RXCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9547",
	        "AppService": "Srinsoft Menuing - RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9548",
	        "AppService": "Symantec Workflow - RXCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9549",
	        "AppService": "JKT9000 - RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9551",
	        "AppService": "Debit & Credit Web Portal - RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9553",
	        "AppService": "Brand Support Web API - RxCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9554",
	        "AppService": "RxCrossware NG Query - RXCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9555",
	        "AppService": "ICMS Reporting Portal (RxC / A&A)(Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9556",
	        "AppService": "GoAnywhere  - RXCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9557",
	        "AppService": "Nursing Web Portal - RXCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9559",
	        "AppService": "Alpha Trust eSignature - RXCrossroads (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9560",
	        "AppService": "IBM DataMirror - RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9562",
	        "AppService": "EZPrint -RXCrossroads (Prod)",
	        "ServiceOffering": "CMM Pharmacy Network Platform Management"
	    },
	    {
	        "ASNumber": "AS9588",
	        "AppService": "SolarWinds (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS9597",
	        "AppService": "Pharma DC - 8106 - Olive Branch National Redistribution Center, MS (Prod)",
	        "ServiceOffering": "Distribution Operations Service"
	    },
	    {
	        "ASNumber": "AS9624",
	        "AppService": "Pharma DC - 8321 - Buffalo Central Fill 2, NY (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9625",
	        "AppService": "Pharma DC - 8322 - Everett Costco Central Fill, WA (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9626",
	        "AppService": "Pharma DC - 8323 - Sacramento Costco Central Fill, CA (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9627",
	        "AppService": "Pharma DC - 8325 - Spring Walmart Central Fill, TX (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9628",
	        "AppService": "Pharma DC - 8730 - Orlando Walmart Central Fill, FL (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9631",
	        "AppService": "Hana Innovation Lab - HS3 (PROD)",
	        "ServiceOffering": "Ent. JDE Platform Technology Services"
	    },
	    {
	        "ASNumber": "AS9677",
	        "AppService": "Workday EFT (Prod)",
	        "ServiceOffering": "Workforce Management"
	    },
	    {
	        "ASNumber": "AS9698",
	        "AppService": "CredHub (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9700",
	        "AppService": "Workday (Prod) (Saas)",
	        "ServiceOffering": "Ent. HR Services"
	    },
	    {
	        "ASNumber": "AS9702",
	        "AppService": "Workforce Central (Prod) (SaaS)",
	        "ServiceOffering": "Sales Compensation"
	    },
	    {
	        "ASNumber": "AS9703",
	        "AppService": "ADS Active Directory 2016 (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS9715",
	        "AppService": "Active Directory / Centralized Directory Services (Prod)",
	        "ServiceOffering": "Identity & Access Management"
	    },
	    {
	        "ASNumber": "AS9726",
	        "AppService": "KNAPP - Automation Pharma Canada Brampton DC360 (Prod) ",
	        "ServiceOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS9732",
	        "AppService": "RelayHealth Hub for Canada (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9737",
	        "AppService": "Well.ca Connectship (GCP Cloud Production Environment) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9738",
	        "AppService": "Tulip - Well.ca (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9742",
	        "AppService": "Canada Central Fill Synmed Technology-Ontario (Prod)",
	        "ServiceOffering": "Canada Operations & Compliance"
	    },
	    {
	        "ASNumber": "AS9748",
	        "AppService": "General Product Management (GPM) (Prod)",
	        "ServiceOffering": "Canada Consumer Experience"
	    },
	    {
	        "ASNumber": "AS9760",
	        "AppService": "PTS Command Center (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9765",
	        "AppService": "Secure File Transfer Protocol Services (SFTP) (Loblaws) (Prod)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS9773",
	        "AppService": "System Center Virtual Machine Manager (Prod)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS9778",
	        "AppService": "Sage Accounting (Well.ca) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9801",
	        "AppService": "Varsity FedEx Services (Prod)",
	        "ServiceOffering": "Warehouse Operations"
	    },
	    {
	        "ASNumber": "AS9803",
	        "AppService": "Cork ACT Door Access (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9832",
	        "AppService": "Pivotal Cloud Foundry - Azure East (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS9834",
	        "AppService": "Pivotal Cloud Foundry - US West GCP (Prod)",
	        "ServiceOffering": "Ent. Cloud Platform Tech. Services"
	    },
	    {
	        "ASNumber": "AS9836",
	        "AppService": "PSP - Remote Desktop Services (Prod)",
	        "ServiceOffering": "Ent. Infrastructure Technology"
	    },
	    {
	        "ASNumber": "AS9837",
	        "AppService": "PSP - VDI (Prod)",
	        "ServiceOffering": "Ent. Compute, Storage & Backup Services"
	    },
	    {
	        "ASNumber": "AS9841",
	        "AppService": "NDH vCD Infrastructure (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9843",
	        "AppService": "Virtual Infrastructure Management (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9844",
	        "AppService": "VMWare Cluster - Shared (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9853",
	        "AppService": "Symantec DLP",
	        "ServiceOffering": "Cyber Protect & Engineering"
	    },
	    {
	        "ASNumber": "AS9861",
	        "AppService": "Cisco Unity SpeechView - Prod (SaaS)",
	        "ServiceOffering": "Contact Center Enablement"
	    },
	    {
	        "ASNumber": "AS9869",
	        "AppService": "PSAS Contact Center Technologies Application Support (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9870",
	        "AppService": "RF Menu (Prod)",
	        "ServiceOffering": "Canada Pharma Dist. & Specialty Dist."
	    },
	    {
	        "ASNumber": "AS9889",
	        "AppService": "McKIT NIM Server (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9895",
	        "AppService": "Cork ClarusOne File & Print (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9928",
	        "AppService": "Cork File Server (Prod)",
	        "ServiceOffering": "Endpoint Enablement & End User Hardware"
	    },
	    {
	        "ASNumber": "AS9934",
	        "AppService": "Cork Paddington Print (Prod)",
	        "ServiceOffering": "Employee Support"
	    },
	    {
	        "ASNumber": "AS9940",
	        "AppService": "Cork Warwick Financial Data (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9943",
	        "AppService": "Cork Zerto Azure Site Recovery (BCS DRaaS) (Prod)",
	        "ServiceOffering": "IT Resiliency & Disaster Recovery"
	    },
	    {
	        "ASNumber": "AS9949",
	        "AppService": "SupportNow Managed Service Desk",
	        "ServiceOffering": "Employee Support"
	    },
	    {
	        "ASNumber": "AS9952",
	        "AppService": "Facilities (Prod)",
	        "ServiceOffering": "Ent. Data Center Services"
	    },
	    {
	        "ASNumber": "AS9953",
	        "AppService": "Enterprise Data Centers (Prod)",
	        "ServiceOffering": "Ent. Data Center Services"
	    },
	    {
	        "ASNumber": "AS9970",
	        "AppService": "Follow Me Printing (FMP) (Prod) (SaaS)",
	        "ServiceOffering": "IT Service Management & Analytics"
	    },
	    {
	        "ASNumber": "AS9978",
	        "AppService": "IPCenter - McKesson Dedicated (Prod)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS9980",
	        "AppService": "Shared Virtual I/O Server (VIO) (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	    {
	        "ASNumber": "AS9981",
	        "AppService": "UNIX Clusters (Prod)",
	        "ServiceOffering": "IT Governance & MIM Transformation"
	    },
	    {
	        "ASNumber": "AS9999",
	        "AppService": "VMWare (Prod)",
	        "ServiceOffering": "Non-McKesson Technology Service"
	    },
	 
];

	return appSvcList;
}
