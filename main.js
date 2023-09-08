const axios = require('axios')
const config = require('./config')
const { initiazeDB, createTable, insertTable } = require('./database')

const usersQty = config.random_users_generating
const TABLE_NAME = config.table_name

initiazeDB()
getRandomUsers()

async function getRandomUsers() {
    const url = `https://randomuser.me/api/?results=${usersQty}`

    try {
        var users_array = []
        const response = await axios.get(url, { timeout: 1000 });
        const data = response.data

        for (i = 0; i < usersQty; i++) {
            var user_obj = {}
            user_obj.name = data.results[i].name.first
            user_obj.email = data.results[i].email
            user_obj.password = data.results[i].login.password
            user_obj.country = data.results[i].location.country
            user_obj.phone = data.results[i].phone
            users_array.push(user_obj)
        }
        
        insertRandomUsers(users_array) 
    } catch(err) {
        getRandomUsers()
    }
}

const CREATE_TABLE_QUERY = `
CREATE TABLE IF NOT EXISTS ${TABLE_NAME} (
    \tid INT AUTO_INCREMENT NOT NULL,\n
    \tname VARCHAR(45) NOT NULL,\n
    \temail VARCHAR(45) NOT NULL,\n
    \tpassword VARCHAR(45) NOT NULL,\n
    \tcountry VARCHAR(45) NOT NULL,\n
    \tphone VARCHAR(45) NOT NULL,\n
PRIMARY KEY (id));`

const INSERT_QUERY = `
INSERT INTO ${TABLE_NAME} 
(name, email, password, country, phone) 
VALUES (?, ?, ?, ?, ?);`

createTable(CREATE_TABLE_QUERY, TABLE_NAME)

function insertRandomUsers(data){

    for (i = 0; i < data.length; i++) {
        
        const obj = {
            name: data[i].name,
            email: data[i].email,
            password: data[i].password,
            country: data[i].country,
            phone: data[i].phone,
        }

        insertTable(INSERT_QUERY, obj, i)
    }
}