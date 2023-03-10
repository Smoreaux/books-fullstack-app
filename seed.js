//pool from the following dependencies
const { Pool } = require('pg');

const pool = new Pool({

    user: 'postgres',
    host: '127.0.0.1',
    database: 'books-db',
    password: 'password',
    port: 5432

});

//get into the Authors table to insert your data on authors
pool.query(`SELECT * FROM Authors`, (error, data)=>{

    if(error) {
        console.log('Error retrieving data from the Authors table', error)
        return;
    }
    if(!data || !data.rows || data.rows.length === 0){
        pool.query(`INSERT INTO Authors (name) VALUES ('Maya Angelou') RETURNING *`, (error, data)=>{
            if(error) {
                console.log('Author data insert failed!', error) 
            } else {
                console.log('Author data was sucessfully inserted!', data.rows)
            };
        });
    };
});

//get into the Books table to insert your data on books
pool.query(`SELECT * FROM Books`, (error, data)=>{
    if(error) {
        console.log('Error retrieving data from the Books table', error)
        return;
    }
    if (data.rows.length === 0) {
         pool.query(`INSERT INTO Books (name, Author_id) VALUES ('I know why the caged bird sings', 1) RETURNING *`, (error, data)=>{
            if(error) {
                console.log(`Books data insert failed!`, error)
            } else {
                console.log('Books data was sucessfully inserted!', data.rows)
            }
        });

    };

});