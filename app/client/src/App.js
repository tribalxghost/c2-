
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import axios from "axios"
import { useEffect, useState } from 'react';
import Nav from './Nav'


import WebRoutes from "./Routes";




// Steps:

// // 1 import modules
// // 2 Define routes
// // 3 Get data from server


const PORT = +process.env.PORT || 3001;

function App() {
  const [backend, setBackend] = useState(null)
  

  useEffect(() => {
    async function getData(){
      const res = await axios.get(`http://localhost:${PORT}/api`)
      const { works } = res.data
      setBackend(works)

    }

     getData()
     
  },[])


  async function sendData(formData, params){
      const result = await axios.post(`http://localhost:${PORT}/register/${params}`, {formData}
      ).then(res => {return res})
      
  }

  async function addAccount(formData, params){
    const result = await axios.post(`http://localhost:${PORT}/${params}`, {formData}
    ).then(res => {return res})
    
}


async function addTransaction(formData){
  let username = localStorage.getItem("username")
  const result = await axios.post(`http://localhost:${PORT}/addtransaction`, {formData, username}
  ).then(res => {return res})
  console.log(result)
}

  

  return (
    <div className="App">
      <WebRoutes sendData={sendData} addAccount={addAccount} addTransaction={addTransaction} backend={backend} port={PORT}/>
    </div>
  );
}

export default App;
