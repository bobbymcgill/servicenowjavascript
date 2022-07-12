var gr = new GlideRecord('change_request');
gr.get(sys_id);
var msg = "Change Request sent to Cherwell";
gr.work_notes.setJournalEntry(msg, 'Admin');
gr.update();