// This is the REST API Ignio calls for standard change

(function process( /*RESTAPIRequest*/ request, /*RESTAPIResponse*/ response) {

    // implement resource here
    try {
        var cmdb_ci = request.body.data.cmdb_ci;
		var duration = request.body.data.duration;
        var start = new GlideDateTime();
		start.addSeconds(5*60); //Adding 5 minutes in seconds  
		var end = new GlideDateTime();
		end.addSeconds(5*60); //Adding 5 minutes in seconds
		end.addSeconds(duration*60*60); //Adding the maintance duration in seconds
		var errbody = new sn_ws_err.ServiceError();
		var cmdbArr = cmdb_ci.split(',');
        if (cmdbArr.length == 0 || !cmdb_ci) {

            errbody.setStatus(400);
            errbody.setMessage('Operation failed');
            errbody.setDetail("Please specify CI details");
            return errbody;
        }
        var res = {};
        var chg = new IgnioInboundChgReqResUtil;
        var req = chg.processReq(request,start, end, cmdbArr);
        if (req) {
            res=chg.processRes(req);
			response.setStatus(201);
            response.setBody(res);
        }
		else
			{
			errbody.setStatus(400);
            errbody.setMessage('Operation failed');
            errbody.setDetail("Change not Created");
            return errbody;
				
			}


    } catch (ex) {
        gs.log("From Ignio Create Change Scripted Rest Resource : " + ex.message);

    }

})(request, response);