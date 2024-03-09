import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";



let INITIAL = {
  "username": localStorage.getItem("username"),
  "balance": 0.00,
  "account_id": "0000000000",
  "goal": 0.00

}

let username = localStorage.getItem("username")
let token = localStorage.getItem("token")





function AddGoal({ addAccount, port }) {
 
  let navigate = useNavigate()
  const [formData, setFormData] = useState(INITIAL);
  let [loggedIn, setLogin] = useState(false)
  let [tog, toggle] = useState(false)
  let params = "addgoal"


  async function Check(username, token){
    
    let result = await axios.post(`http://localhost:${port}/check`, {data:{"username": username, "token":token}}).then(res => {return res.data.data})
  console.log(result)
    if(result){
    setLogin(true)
  } else {
    setLogin(false)
  }
  return result
}


useEffect(()=>{
  

    console.log(username, token)
    Check(username, token)

},[tog])


  

  const handleChange = evt => {

    const { name, value } = evt.target;
    setFormData(fData => ({
      ...fData,
      [name]: value
    }));
  }

  function submitForm(event) {
    event.preventDefault()
    Check()
    if(loggedIn){
      addAccount(formData, params)

    }else {
      navigate("/login")
    }


  }







  return (
    <section className="intro">
      <div className="bg-image-vertical h-100" style={{ backgroundColor: "#D6D6D6" }}>
        <div className="mask d-flex align-items-center h-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-12 col-lg-10">
                <div className="card" style={{ "borderRadius": "1rem" }}>
                  <div className="card-body p-5">

                    <h1 className="mb-5 text-center">Account</h1>

                    <form onChange={handleChange} onSubmit={submitForm}>




                      <div className="form-outline mb-4">
                        <input name="balance" type="number" step=".01" id="form6Example3" className="form-control" placeholder="0.00" />
                        <label className="form-label" htmlFor="form6Example3">Balance</label>
                      </div>


                      <div className="form-outline mb-4">
                        <input name="account_num" type="number" id="form6Example4" className="form-control" placeholder="0000000000" />
                        <label className="form-label" htmlFor="form6Example4">Account Number</label>
                      </div>





                      <div className="form-outline mb-4">
                        <input name="goal" type="number" step=".01" id="form6Example6" className="form-control" placeholder="Goal" />
                        <label className="form-label" htmlFor="form6Example6">How much do you want to save?</label>
                      </div>

                      <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="checking" />
                        <label className="form-check-label" htmlFor="exampleRadios1">Checkings</label>
                      </div>
                      <div className="form-check mb-4">
                        <input className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value="savings" />
                        <label className="form-check-label" htmlFor="exampleRadios2">Savings</label>
                      </div>



                      <button type="submit" className="btn btn-primary btn-rounded btn-block ">Add Account</button>
                    </form>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}



export default AddGoal;