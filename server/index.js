// setting up simple express server


const express = require('express');
const app = express()
const mysql = require('mysql');
const cors = require('cors');

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'rijika',
    database: 'employeesysdb',
});


app.post('/create', (req, res) => {
    const name = req.body.name;
    const lastname = req.body.lastname;
    const age = req.body.age;
    const gender = req.body.gender;
    const position = req.body.position;
    const education = req.body.education;
    const salary = req.body.salary; 

    db.query(
    'INSERT INTO employees (name, lastname, age, gender, position, education, salary) VALUES(?,?,?,?,?,?,?)',
    [name, lastname, age, gender, position, education, salary], 
    (err, result) =>{
        if (err) {
            console.log(err)
        } else{
            res.send('Yvela monacemi gagzavnilai monacemta bazashi');
        }
    }
     
    );
})
app.get("/employees", (req, res) => {
    db.query("SELECT * FROM employees", (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });
  app.put("/update", (req, res) => {
    const id = req.body.id;
    const salary = req.body.salary;
    db.query(
      "UPDATE employees SET salary = ? WHERE id = ?",
      [salary, id],
      (err, result) => {
        if (err) {
          console.log(err);
        } else {
          res.send(result);
        }
      }
    );
  });




app.listen(3001, () =>{
console.log("Server, warmatebit gaeshva port 3001-ze");
});