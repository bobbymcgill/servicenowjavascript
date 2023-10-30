var tagList = ['Missing GTIN in QP1','Missing GTIN in SAP ECC','Missing GCP/GLN in QP1','Duplicate EPCIS File Received','EPCIS Data Issue','Middleware Issue','Internal System Issue','Others','Pharma - Inbound','Pharma - Outbound','RXC - Inbound','RXC - Outbound','MSH - Inbound','MSH - Outbound','MMS - Inbound','MMS - Outbound','SKY/NS - Inbound','SKY/NS - Outbound'];

for (x=0; x<tagList.length; x++){
	var grTag = new GlideRecord('label');
	grTag.initialize();
	grTag.owner = 'f783c2ee97fe2510319f9204a253af07'; // reference to sys_user
	grTag.type = 'standard';
	grTag.viewable_by = 'groups and users';
	grTag.active=true;
	grTag.group_list = 'f7a7c05d1b4dd8905211311d1e4bcb44'; // reference to group table
	grTag.name = tagList[x];
	grTag.update();
}
