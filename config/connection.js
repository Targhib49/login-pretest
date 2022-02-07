const mysql = require("mysql");
const db = mysql.createConnection({
    host:  "bee40vehn9pobx4bvvzk-mysql.services.clever-cloud.com",
    user: "ublzcr94n6myxg6e",
    password: "ly4bjG0ufYqTPdeo9OGw",
    database: "bee40vehn9pobx4bvvzk"
});
db.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return
    }

    console.log('connected as id ' + db.threadId);
})
module.exports = db;