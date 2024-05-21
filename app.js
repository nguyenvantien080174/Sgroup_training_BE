var express = require( 'express');
const { body, validationResult } = require('express-validator'); //
const dataFilePath = "./data.json";
const app = express();
var fs = require("fs");
// const readData = () => {
//     const data = fs.readFileSync(dataFilePath);
//     return JSON.parse(data);
// };


//   const writeData = (data) => {
//     fs.writeFileSync(dataFilePath, JSON.stringify(data, null, 2));
// };


app.use(express.json());

//middleware
const validateInput = [
    body('username').isString().withMessage('Username phải là một chuỗi ký tự'),

    body('email').isEmail().withMessage('Email chua dam bao dung dinh dang!!'),
    body('password').isLength({ min: 6 }).withMessage('Password phải có ít nhất 6 ký tự'),

    (req, res, next) =>{
        const error = validationResult(req);
        if(!error.isEmpty()){ //error khong rong la co error
            res.status(400).send({error : error.array()})
        }
        next();  //chuyen sang middleware khac
    }
]

app.post('/register', validateInput, (req, res) =>{
    //const data = readData();
    const newItem = {
        name: req.body.name,
        age: req.body.age,
        adress: req.body.adress,
    };
    // data.push(newItem);
    // writeData(data);
    res.send('Register successful');
    res.json(newItem);
})

app.listen(3000, ()=>{
    console.log('http://localhost:3000');
})