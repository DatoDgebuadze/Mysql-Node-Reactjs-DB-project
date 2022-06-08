
import './App.css';
import {useState} from 'react';
import axios from 'axios';  //importing axios

function App() {

  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState('');
  const [position, setPosition] = useState('');
  const [education, setEducation] = useState('');
  const [salary, setSalary] = useState(0);
  const [newSalary, setNewSalary] = useState(0);


  const [Employeelist, setEmployeelist] = useState([]);

  const Addemployee = () => {
    axios.post("http://localhost:3001/create", {
      name: name,
      lastname: lastname,
      age: age,
      gender: gender,
      position: position,
      education: education,
      salary: salary,
    }).then(()=> {
      setEmployeelist([...Employeelist, {
        name: name,
        lastname: lastname,
        age: age,
        gender: gender,
        position: position,
        education: education,
        salary: salary,
      }]);
    });
};

const getemployee = () => {
  axios.get("http://localhost:3001/employees").then((response) => {
    setEmployeelist(response.data);
  });
};

const updateEmployeeSalary = (id) => {
  axios.put("http://localhost:3001/update", { salary: newSalary, id: id }).then(
    (_response) => {
      setEmployeelist(
        Employeelist.map((val) => {
          return val.id === id
            ? {
                id: val.id,
                name: val.name,
                country: val.country,
                age: val.age,
                position: val.position,
                salary: newSalary,
              }
            : val;
        })
      );
    }
  );
};
  return (
    <div className="App">
      <div className="inputs">
      <label>Name:</label>
      <input type="text" onChange={(event) => {setName(event.target.value);}}/>
      <label>Lastname:</label>
      <input type="text" onChange={(event) => {setLastname(event.target.value);}} />
      <label>Age:</label>
      <input type="number" onChange={(event) => {setAge(event.target.value);}} />
      <label>Gender:</label>
      <input type="text" onChange={(event) => {setGender(event.target.value);}} />
      <label>Position:</label>
      <input type ="text" onChange={(event) => {setPosition(event.target.value);}} />
      <label>Education: </label>
      <input type = "text" onChange={(event) => {setEducation(event.target.value);}} />
      <label>Salary/yearly:</label>
      <input type = "number" onChange={(event) => {setSalary(event.target.value);}} />
     
      <button onClick={Addemployee}>Add Employee to a database</button>
      </div>
      <div className='downside'>
      <h1>To output all the data from the database click the button below.</h1>
      <button onClick={getemployee}>Show all available data</button>

        {Employeelist.map((val, key) => {
          return  (
          <div className="list"> 
          
          <h3> name:{val.name}</h3>
          <h3> lastname:{val.lastname}</h3>
          <h3> age:{val.age}</h3>
          <h3>sex:{val.gender}</h3>
          <h3> Recruited as:{val.position}</h3>
          <h3> Degree:{val.education}</h3>
          <h3> Net:{val.salary}</h3>
          
          
          <div>
            {" "}
            <input type='text' placeholder='tanxa' onChange={(event) => {setNewSalary(event.target.value);}}  />
            <button onClick={()=>{updateEmployeeSalary(val.id)}}>update</button>
             </div>
          

          </div>
          );
        })}

         </div>
    </div>
  );
}

// DisplayInfo only logs Salary output, as it seems for now other usestate variables are not being used.
// fixed for now

export default App;
