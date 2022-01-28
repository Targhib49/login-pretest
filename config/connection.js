const mysql = require("mysql");
const db = mysql.createConnection({
    host:  "sql6.freesqldatabase.com",
    user: "sql6468637",
    password: "TVwXbnj7AD",
    database: "sql6468637"
});
db.connect(function(err) {
    if (err) {
        console.error('error connecting: ' + err.stack);
        return
    }

    console.log('connected as id ' + db.threadId);
})
module.exports = db;