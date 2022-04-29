//Use in onLoad script on form
function onLoad() {
	var changeNum = getParameterValue('sysparm_change');
	g_form.setValue('u_change',changeNum);
   
}
 function getParameterValue(name) {
        var url = top.location.href;
        var value = new URLSearchParams(url).get(name);
        if (value) {
			//alert('First value');
            return value;
        }
        if (!value) {
            var gUrl = new GlideURL();
            gUrl.setFromCurrent();
            value = gUrl.getParam(name);
			//alert('Second Value');
            return value;
        }
   }