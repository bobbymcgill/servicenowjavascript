var CloseIncidentsOver2WeeksOld = Class.create();
CloseIncidentsOver2WeeksOld.prototype = {

    initialize: function() {
    },

    run: function(tableName, encodedQuery) {

        var startTime = new GlideDateTime();
        var startMs = new Date().getTime();

        var processedCount = 0;

        gs.info('[CloseIncidentsOver2WeeksOld] Starting');
        gs.info('[CloseIncidentsOver2WeeksOld] Table: ' + tableName);
        gs.info('[CloseIncidentsOver2WeeksOld] Query: ' + encodedQuery);
        gs.info('[CloseIncidentsOver2WeeksOld] Start: ' + startTime.getDisplayValue());

        var gr = new GlideRecord(tableName);
        gr.addEncodedQuery(encodedQuery);
        gr.query();

        while (gr.next()) {

            // -----------------------------------------
            // PLACEHOLDER FOR ACTUAL PROCESSING
            // -----------------------------------------
            this.processRecord(gr);

            processedCount++;
        }

        var endMs = new Date().getTime();
        var endTime = new GlideDateTime();

        var totalMs = endMs - startMs;
        var totalSeconds = totalMs / 1000;

        var avgMs = processedCount > 0
            ? totalMs / processedCount
            : 0;

        gs.info('[CloseIncidentsOver2WeeksOld] Complete');
        gs.info('[CloseIncidentsOver2WeeksOld] End: ' + endTime.getDisplayValue());
        gs.info('[CloseIncidentsOver2WeeksOld] Records processed: ' + processedCount);
        gs.info('[CloseIncidentsOver2WeeksOld] Total time: ' + totalSeconds.toFixed(2) + ' seconds');
        gs.info('[CloseIncidentsOver2WeeksOld] Average: ' + avgMs.toFixed(2) + ' ms per record');

        return {
            startTime: startTime.getValue(),
            endTime: endTime.getValue(),
            recordCount: processedCount,
            totalMilliseconds: totalMs,
            totalSeconds: totalSeconds,
            averageMilliseconds: avgMs
        };
    },


    processRecord: function(gr) {

        /*
         * PLACE YOUR PROCESSING LOGIC HERE
         *
         * Example:
         *
         * gr.setValue('active', false);
         * gr.update();
         *
         */
		gr.active = false;
		gr.close_code = "Solved (Permanently)";
		gr.close_notes = "Incidents over 2 weeks old are being autoclosed"
		gr.state = 7;
		gr.update();

    },

    type: 'CloseIncidentsOver2WeeksOld'
};
