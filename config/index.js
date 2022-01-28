const { SECRET_KEY, REFRESH_KEY} = require("./environment")
const db = require("./connection");

module.exports = {
    db,
    SECRET_KEY,
    REFRESH_KEY
}