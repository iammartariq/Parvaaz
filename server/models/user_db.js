import mysql from "mysql"
import {DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, DB_PORT } from '../config/dotenv.js'

const user_tb=mysql.createConnection({
    host:DB_HOST,
    user:DB_USER,
    password:DB_PASSWORD,
    database:DB_NAME,
    port:DB_PORT })

user_tb.connect((err)=>{
    err? console.log("User Table ran into an error",err) : console.log("Connected To user Table")
})

const sql= ` CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fname VARCHAR(50) NOT NULL,
    lname VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL UNIQUE,
    passport_no VARCHAR(9) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    nationality VARCHAR(10) ,
    passportImg VARCHAR(255) ,
    DOB DATE ,
    phoneNo VARCHAR(13),
    cnicNo VARCHAR(13),
    cnicImg VARCHAR(255)
    );` ;
    
user_tb.query(sql,(error)=>{
    if(error){
        console.log("Failed to create User Table: ",error);
    }
})
export default user_tb;