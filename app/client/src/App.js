
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';
import Nav from './Nav'
import { useNavigate } from 'react-router-dom';


import WebRoutes from "./Routes";




// Steps:

// // 1 import modules
// // 2 Define routes
// // 3 Get data from server


const PORT = +process.env.PORT || 3001;


function App() {



  const [backend, setBackend] = useState(null)
  const navigate = useNavigate()


  async function getData() {
    const res = await axios.get(`http://localhost:${PORT}/api`)
    const { works } = res.data
    setBackend(works)
   
  }

  useEffect(() => {
    getData()
    
  }, [])


  let token = localStorage.getItem("token")


  async function sendData(formData, params) {
    const result = await axios.post(`http://localhost:${PORT}/register/${params}`, { formData }
    ).then(res => { return res })

  }

  async function login(formData) {
    const result = await axios.post(`http://localhost:${PORT}/login`, { formData }
    ).then(res => { return res })
    if (result.data !== false) {

      let { username } = result.data.user
      localStorage.clear()
      localStorage.setItem("username", username)
      localStorage.setItem("token", token)
      navigate("/user")

    } else {
      console.log("Failure")
    }


  }


  async function updateGoal(formData) {
    const result = await axios.put(`http://localhost:${PORT}/updategoal`, { formData }).then(res => { return res })
  }


  async function addAccount(formData, params) {
    const result = await axios.post(`http://localhost:${PORT}/${params}`, { formData }
    ).then(res => { return res })
  }


  async function addTransaction(formData) {
    let username = localStorage.getItem("username")
    const result = await axios.post(`http://localhost:${PORT}/addtransaction`, { formData, username }
    ).then(res => { return res })
  }


  async function deleteTransaction(transaction_id) {
    let username = localStorage.getItem("username")
    let formData = { username: username, transaction_id: transaction_id }
    const result = await axios.delete(`http://localhost:${PORT}/deletetransaction`, { data: formData })
    console.log("deleted")

  }


  return (
    <div className="App">
      <WebRoutes login={login} sendData={sendData} addAccount={addAccount} addTransaction={addTransaction} backend={backend} port={PORT} updateGoal={updateGoal} deleteTransaction={deleteTransaction} />
    </div>
  );
}

export default App;