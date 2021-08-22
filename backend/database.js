var mariadb = require("mariadb");
var pool = mariadb.createPool({
    host: "localhost",
    port: 3306,
    user: "myuser",
    password: "mypaspord",
    database: "mydatabase"
});
module.exports = {
    pool: pool
}