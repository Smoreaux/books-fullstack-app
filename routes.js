const express = require('express');
const app = express();
app.use(express.json());
const PORT = 8100;
const { Pool } = require('pg');
const DB_HOST = process.env.DATABASE_HOST || '127.0.0.1'
const cors = require('cors');
app.use(cors());

const pool = new Pool({

    user: 'postgres',
    host: '127.0.0.1',
    database: 'books-db',
    password: 'password',
    port: 5432

});

/*---------------------- GET ALL BOOKS --------------------------- */

app.get("/api/book",(req, res, next)=>{
    pool.query('SELECT * FROM Books', (error, data)=>{
        
        if(error){
            return next(error);
        }
        const bookData = data.rows
        res.send(bookData);
    });
});

app.use((error, req, res, next)=>{
    console.error(error.stack);
    res.status(404).send({error: error});
})

app.listen(PORT, ()=>{
    console.log(`${PORT} is active`)
});