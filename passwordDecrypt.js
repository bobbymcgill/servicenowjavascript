var Encrypter = new GlideEncrypter();  
var current = new GlideRecord('sys_auth_profile_basic');
current.get('3b2bf948879805105bf020e9cebb355c');
var encrypted = current.password; // current.<<your field name>>  
var decrypted = Encrypter.decrypt(encrypted);  
gs.info("encrypted..   " + encrypted);  
gs.info("decrypted..   " + decrypted);