const mysql = require('mysql2')
const config = require('./config')
const connection = mysql.createConnection({
    host: config.db_host,
    user: config.db_user,
    password: config.db_password,
    database: config.db_name,
})

initiazeDB()

function initiazeDB() {

    connection.connect((err) => {
        if (err) {
            console.error(err); return
        }
        console.log('Database connection successfully established.');
    })

}

async function createTable(CREATE_TABLE_QUERY, table_name) {

    const DROP_TABLE_QUERY = `DROP TABLE IF EXISTS ${table_name}`;
    connection.query(DROP_TABLE_QUERY, (err) => {
        if (err) { console.error(err) } 
    })

    connection.query(CREATE_TABLE_QUERY, (err) => {
        if (err) {
            console.error(err); return
        }
        console.log('Table created successfully.')
    })

}

function insertTable(INSERT_QUERY, obj, i) {

    connection.query(INSERT_QUERY, [
        obj.name,
        obj.email,
        obj.password,
        obj.country,
        obj.phone,
    ], (err) => {
        if (err) { console.error(err); return }
        console.log(`user ${i+1} inserted successfully.`)
    })

}

module.exports = { initiazeDB, createTable, insertTable }