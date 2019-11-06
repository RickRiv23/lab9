/* global $*/
const express = require("express");
const app = express();
app.set("view engine", "ejs");
app.use(express.static("assets")); //folder for images, css, js

const request = require('request');
const mysql = require('mysql');

//routes
app.get("/", function(req, res){
    res.render("index");
}); //root route

app.get("/quotes", function(req, res){

    let conn = dbConnection();
    
    conn.connect(function(err) {
        if (err) throw err;
        console.log("Connected!");
        
        let keyword = req.query.searchTerm;
        let sql = `
            SELECT quote, lastName, category FROM q_quotes
            NATURAL JOIN q_author 
            WHERE
            quote LIKE '%${keyword}%'
        `;
        
        conn.query(sql, function (err, rows, fields) {
        if (err) throw err;
            res.send(rows);
        });
    
    });

});//dbTest

//values in red must be updated
function dbConnection(){

    let conn = mysql.createConnection({
        host: "cst336db.space",
        user: "cst336_dbUser27",
        password: "uzef6q",
        database:"cst336_db27"
    }); //createConnection


return conn;

}

//starting server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Express server is running...");
});