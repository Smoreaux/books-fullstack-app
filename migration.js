//pool from the following dependencies
const { Pool } = require('pg');

const pool = new Pool({

    user: 'postgres',
    host: '127.0.0.1',
    database: 'books-db',
    password: 'password',
    port: 5432

});

//createing tables in oder and in the same function..
pool.query(`CREATE TABLE IF NOT EXISTS Authors (
    id serial PRIMARY KEY,
    name text)`, (error, data)=>{
        if (error) {
            console.log('Your Authors Table was not created!')
            console.log(error)
        } else {
            console.log('Your Authors Table was created!');
            pool.query(`CREATE TABLE IF NOT EXISTS Books (
                id serial PRIMARY KEY,
                name text,
                Author_id INT NOT NULL,
                FOREIGN KEY (Author_id) REFERENCES Authors (id) ON DELETE CASCADE
            )`, (error, data)=>{
                if (error) {
                    console.log('Your Books Table was not created!')
                    console.log(error)
                } else {
                    console.log("Your Books Table was created!");
                    console.log(data.rows);
                }
            });
        }
    });

