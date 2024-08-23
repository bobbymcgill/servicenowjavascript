var data = this.myList(); // Wanted my code up front, and the data at the bottom

var goodCount = 0;
var badCount = 0;

for (var x = 0; x < data.length; x++){
	
	var grpGood = false;
	var svcGood = false;


	var grGroup = new GlideRecord('sys_user_group');
	if (grGroup.get('name',data[x].Group)){
		grpGood = true;
	}

	var grSvcOffer = new GlideRecord('service_offering');
	if (grSvcOffer.get('name',data[x].ServiceOffering)){
		svcGood = true;
	}

	if(grpGood && svcGood){
		
		goodCount++;
		grGroup.u_service_offering = grSvcOffer.sys_id;
		grGroup.update();


	} else {
		badCount++;
		if (!grpGood){
			gs.log('AppSvc-SvcOffer Error: No App Service Found: ' + data[x].AppService + ' --- Record: ' + data[x].ASNumber + " : " + data[x].ServiceOffering);
		}
		if (!svcGood){
			gs.log('AppSvc-SvcOffer Error: No Service Offering Found:' + data[x].ServiceOffering + ' --- Record: ' + data[x].ASNumber + " : " + data[x].ServiceOffering);
		}
	}
}
gs.print("Good Records: " + goodCount + "\nBad Records: " + badCount);

function myList(){
	var myList = [
    {
        "ServiceOffering": "Canada BPS & Specialty Technologies",
        "Group": "BPS-IT-Management"
    },
    {
        "ServiceOffering": "Canada BPS & Specialty Technologies",
        "Group": "Maple PSP Support"
    },
    {
        "ServiceOffering": "Canada BPS & Specialty Technologies",
        "Group": "PDCI Technology Support"
    },
    {
        "ServiceOffering": "Canada BPS & Specialty Technologies",
        "Group": "Provider Strategy Support"
    },
    {
        "ServiceOffering": "Canada SalesForce Common Platforms",
        "Group": "Salesforce Inviva Support"
    },
    {
        "ServiceOffering": "Canada SalesForce Common Platforms",
        "Group": "SFDC_Canada"
    },
    {
        "ServiceOffering": "Non-McKesson Technology Service",
        "Group": "Support STP"
    },
    {
        "ServiceOffering": "Non-McKesson Technology Service",
        "Group": "CMM - Networking"
    },
    {
        "ServiceOffering": "Non-McKesson Technology Service",
        "Group": "CMM Intake Requests"
    },
    {
        "ServiceOffering": "Non-McKesson Technology Service",
        "Group": "CMM-Internal-Infrastructure"
    },
    {
        "ServiceOffering": "Non-McKesson Technology Service",
        "Group": "RxSS_Engineering"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "BoxAccount_Approvers"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "Collaboration_Solutions"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "Mck_Email_Teams_Yammer_SME"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "MCK_SharePoint_PowerTools_OneDrive_SME"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "MCKNET"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "PowerPlatformPL_Approvers"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "TCS_BoxAccountApprovals"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "TCS_Email_Teams_Yammer_CA"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "TCS_Email_Teams_Yammer_NAMCK"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "TCS_Email_Teams_Yammer_USON"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "TCS_PowerPlatformLicenseApproval"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "TCS_SharePoint_PowerTools_OneDrive_USON"
    },
    {
        "ServiceOffering": "Content & Collaboration Technology",
        "Group": "USON MyWorkspace Support"
    },
    {
        "ServiceOffering": "PSaS Decision Intelligence: Distribution",
        "Group": "CPH Dashboard Access Request Approver Group"
    },
    {
        "ServiceOffering": "PSaS Decision Intelligence: Distribution",
        "Group": "CPH Dashboard Access Request Management"
    },
    {
        "ServiceOffering": "PSaS Decision Intelligence: Distribution",
        "Group": "RSS & SA Dashboard Access Request Approver Group"
    },
    {
        "ServiceOffering": "PSaS Decision Intelligence: Distribution",
        "Group": "RSS & SA Dashboard Access Request Management"
    },
    {
        "ServiceOffering": "Enterprise Infrastructure Services",
        "Group": "Compute Engineering"
    },
    {
        "ServiceOffering": "Enterprise Infrastructure Services",
        "Group": "scd_scsunix_gl"
    },
    {
        "ServiceOffering": "Enterprise Infrastructure Services",
        "Group": "Storage and Backup Engineering"
    },
    {
        "ServiceOffering": "Enterprise Infrastructure Services",
        "Group": "TCS_Compute_UNIX_Project"
    },
    {
        "ServiceOffering": "Ent Network Services",
        "Group": "NETAPP"
    },
    {
        "ServiceOffering": "Ent Network Services",
        "Group": "NETSEC_ENGINEERING"
    },
    {
        "ServiceOffering": "Ent Network Services",
        "Group": "NETTOOLS"
    },
    {
        "ServiceOffering": "Ent Network Services",
        "Group": "Network Engineering"
    },
    {
        "ServiceOffering": "Ent Network Services",
        "Group": "NETWORK_DCNTR"
    },
    {
        "ServiceOffering": "Ent Network Services",
        "Group": "NETWORK_IMPL_ENG"
    },
    {
        "ServiceOffering": "Enterprise Data Center Services",
        "Group": "Data Center Facilities Engineering"
    },
    {
        "ServiceOffering": "Non-McKesson Technology Service",
        "Group": "Lease Accelerator Corporate Financial Systems"
    },
    {
        "ServiceOffering": "Ent Cloud Enablement & FinOps  Services",
        "Group": "Mck_Cloud_FinOps"
    },
    {
        "ServiceOffering": "Gen AI Platform & Use Case Delivery",
        "Group": "McKesson Chat App"
    },
    {
        "ServiceOffering": "Ent JDE Platform Technology Services",
        "Group": "Basis OPS"
    },
    {
        "ServiceOffering": "Ent JDE Platform Technology Services",
        "Group": "BASIS_ENH"
    },
    {
        "ServiceOffering": "Ent JDE Platform Technology Services",
        "Group": "BasisOps_BO"
    },
    {
        "ServiceOffering": "Ent JDE Platform Technology Services",
        "Group": "BasisOpsDBA"
    },
    {
        "ServiceOffering": "Ent JDE Platform Technology Services",
        "Group": "BO_Admin"
    },
    {
        "ServiceOffering": "Ent JDE Platform Technology Services",
        "Group": "MMS_E1_CNC"
    },
    {
        "ServiceOffering": "Ent JDE Platform Technology Services",
        "Group": "TCS_MMS_JDE_CNC"
    },
    {
        "ServiceOffering": "Ent Scheduling & Observability Services",
        "Group": "Control-M"
    },
    {
        "ServiceOffering": "Ent Scheduling & Observability Services",
        "Group": "IWS Admins"
    },
    {
        "ServiceOffering": "O&S IntraFusion Service",
        "Group": "INTRAFUSION"
    },
    {
        "ServiceOffering": "Customer Reporting",
        "Group": "MBA-McK Business Analytics-PSAS"
    },
    {
        "ServiceOffering": "Customer Reporting",
        "Group": "TCS_DES_CustomApps_PROEBIT"
    }
];

	return myList;
}
