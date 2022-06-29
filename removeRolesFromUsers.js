var userList = ['e1j30wn','e2d4mwb','e2y15w4','e327byk','e4mmcju','e5j401t','e789yiz','e7dk187','e82o50m','e8wojqq','eaio221','ec0flhj','ecig870','ecpx3to','ecuvuss','ecvktoh','edzk4ic','egibtle','egtwpwv','ei6086f','ei61218','el40zd4','el6ibpb','emw5i4i','eob3rtz','eootf6f','epwa7ud','es0014e','esf25t3','et0no5r','etopw4r','etsd1gr','ev1kie7','ev2nbyd','exouljq'];

for (var x = 0; x < 5; x++){
	gs.print('EID: ' + userList[x]);
	var user = new GlideRecord('sys_user');
	user.addQuery('u_mck_username',userList[x]);
	user.query();
	while(user.next()){
		gs.print('User Name: ' + user.name);
		var gr = new GlideRecord('sys_user_has_role');
		gr.addQuery('user',user.sys_id);
		gr.query();
		while (gr.next()){
				gs.print('User: ' + gr.user.GetDisplayName() + 'has role: ' + gr.role);
				//gr.inherited = false;
				//gr.update();
				//gr.deleteRecord();
			}
	}
}
