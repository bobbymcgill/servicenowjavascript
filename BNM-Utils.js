    /**
     * @name clearTables
     * @description                 Deletes all records on the list of tables. Sometimes, 
     *                              a custom table is scoped, and the "Delete All Records" 
     *                              button on the table definition form doesn't work.
     * @param {array} tableList     List of table names to have all records deleted
     * @returns                     N/A
     */    
	clearTables: function(tableList){
		for(var x = 0; x &lt; tableList.length; x++){
			var tableName = tableList[x];
			try{
				var gr = new GlideRecord(tableName);
				gr.query();
				gr.deleteMultiple();
				this.logger('Successfully deleted all records in table: ' + tableName);
			}
			catch(err){
				this.logger('Error deleting records in : ' + tableName + ' ' + err);
			}
		}
	
	},
	
    /**
     * @name clearRecords
     * @description                     Deletes records in given table matching the encoded query
     * @param {string} tableName        Name of the table
     * @param {string} encodedQuery     String Encoded Query
     */
	clearRecords: function(tableName, encodedQuery){
		try{
			var gr = new GlideRecord(tableName);
			gr.addEncodedQuery(encodedQuery);
			gr.query();
			gr.deleteMultiple();
			this.logger('Successfully deleted records in table: ' + tableName + ' matching query: ' + encodedQuery);
		}
		catch(err){
			this.logger('Error in deleting desired records in table: ' + tableName + ' with Encoded Query: ' + encodedQuery);
			this.logger('Error message is: ' + err);
		}
		
	},
	
	/**
	 * @name convertFromUTC
	 * @description				Accepts a UTC Formatted time string and returns a ServiceNow GlideDateTime object
	 * @param {string} utcTime 
	 * @returns {object} gdt
	 */
	convertFromUTC: function(utcTime){
		var x = utcTime.split('T')[0];
        x += " " + utcTime.split('T')[1].slice(0, -5); // Removes ".000Z" 
        var gdt = new GlideDateTime(x);
        this.logger('TimeConvert returns: ' + gdt);
        return gdt;
	},
	
	/**
	 * @name convertToUTC
	 * @description				Accepts a GlideDateTime object and returns UTC formatted string
	 * @param {object} snTime 
	 * @returns {string} utcString
	 */
	convertToUTC: function(snTime){
		var gdt = snTime.toString();
		var utcString = gdt.toString().split(' ')[0];
		utcString += 'T' + gdt.toString().split(' ')[1] + '.000Z';
		this.logger('convertToUTC returns: ' + utcString);
		return utcString;
	},
	
	/**
	 * @name	logger
	 * @description						Logs info level messages if the "Debug" flag is set.
	 * @param {string} message 			Message to be logged for debugging
	 * @returns							N/A
	 */
	logger: function(message){
		var prefix = 'Cerna-DEBUG: '; //Create a prefix for your debugging. EX: 'Cerna-DEBUG: '
		if (this.DEBUG == 'true'){
			gs.info(prefix + ' ' + message);
		}
	},

	/**
	 * @name  topRecords
	 * @description						Returns [records] number of records from table named [table], 
	 * 									that match condition [query], and orders descending on field [orderby]
	 * 
	 * @param {string} table			Table name
	 * @param {string} query 			Encoded Query
	 * @param {string} orderBy 			Field to order by
	 * @param {string} records 			Number of records to return
	 * @returns {array} recordsArray	List of sys_id's of records
	 */
	topRecords: function(table, query, orderBy, records) {
		var recordsArray = [];
		topGr = new GlideRecord(table);
		topGr.addEncodedQuery(query);
		topGr.orderByDesc(orderBy);
		topGr.setLimit(records);
		topGr.query();
		while (topGr.next()) {
			recordsArray.push(topGr.sys_id.toString());
		}
		gs.info("recordsArray: " + recordsArray);
		return recordsArray;
    },