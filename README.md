# db_populate
## Instructions
1. Open your Workbench and create an DB called 'test'
2. Run npm install all
3. Put the configurations of the users and your DB in config.js, example:
```javascript
module.exports = config = {

    random_users_generating: 100,
    table_name: 'users_test',

    db_host: 'localhost',
    db_user: 'root',
    db_password: '',
    db_name: 'test',

}
```
4. Run node main.js
