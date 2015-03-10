var db_user  = process.env.db_user || 'abeam';
var db_pass  = process.env.db_pass || '';
var db_host  = process.env.db_host || 'localhost';
var db_port  = process.env.db_port || '27017';
var db_name  = process.env.db_name || 'abeam_sentrack';

module.exports = {
    db: 'mongodb://' + db_user + ':' + db_pass + '@' + db_host + ':' + db_port + '/' + db_name,
    tokenSecret: process.env.tokenSecret || 'aN9u8lQI5XqF6PLf3J@S'
}
