(function executeRule(current, previous /*null when async*/) {



    var gru = GlideScriptRecordUtil.get(current);
    
    
      gs.addErrorMessage(gru.getChangedFields());
    
    
    
    })(current, previous);