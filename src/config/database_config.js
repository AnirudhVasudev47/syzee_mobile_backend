const mysql = require('mysql');

config = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'syzee',
  multipleStatements: true,
}
const connection = mysql.createConnection(config); //added the line
connection.connect(function (err) {
  if (err) {
    return console.log('error connecting:' + err.stack);
  }
  console.log('connected successfully to DB.');
});

module.exports = {
  connection: mysql.createConnection(config)
}