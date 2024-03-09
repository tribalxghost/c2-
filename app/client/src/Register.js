import { useState } from "react";
import { useNavigate } from "react-router-dom"


let INITIAL = {
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    confirmPassword: "",

}


function Register({sendData}) {
    let navigate = useNavigate()
    let params = "register"
    const [formData, setFormData] = useState(INITIAL);


 
        
        const handleChange = evt => {
            
            const { name, value } = evt.target;
            setFormData(fData => ({
              ...fData,
              [name]: value
            }));

          }

          function submitForm(event){
              event.preventDefault()
              sendData(formData,params )
              
                
          }
        




    return (

        <section className="intro">
            <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#D6D6D6" }}>
                <div className="container">
                    <form className="row justify-content-center" onChange={handleChange} onSubmit={submitForm}>
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card" >
                                <div className="card-body p-5 text-center">

                                    <div className="my-md-5 pb-5" >

                                        <h1 className="fw-bold mb-4">Register</h1>

                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="username">Username</label>
                                            <input name="username" type="input" id="username" className="form-control form-control-lg" autoComplete="username"/>
                                        </div>

                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="firstName">First Name</label>
                                            <input name="firstName" type="input" id="firstName" className="form-control form-control-lg" autoComplete="given-name"/>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="lastName">Last Name</label>
                                            <input name="lastName" type="input" id="lastName" className="form-control form-control-lg" autoComplete="family-name"/>
                                        </div>
                                        <div className="form-outline mb-2">
                                            <label className="form-label" htmlFor="typeEmail">Email</label>
                                            <input name="email" type="email" id="typeEmail" className="form-control form-control-lg" autoComplete="email" />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="typePassword" >Password</label>
                                            <input name="password" type="password" id="typePassword" className="form-control form-control-lg" autoComplete="new-password" />
                                        </div>

                                        <div className="form-outline mb-4">
                                            <label className="form-label" htmlFor="confirmPassword" >Confirm Password</label>
                                            <input name="confirmPassword" type="password" id="confirmPassword" className="form-control form-control-lg" autoComplete="new-password" />
                                        </div>

                                        <button className="btn btn-primary btn-lg btn-rounded gradient-custom text-body px-5 mb-3" type="submit">Submit</button>

                                        <div>
                                            <p className="mb-0">Already have an account? <a href="/login" className="text-body fw-bold">Login</a></p>
                                        </div>
                                    </div>


                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </section>
    )

}







export default Register;