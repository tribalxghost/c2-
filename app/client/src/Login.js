


import { useState } from "react";

function Login({sendData}) {

let INITIAL = {
    username: "",
    password: "",

}

    let params = "login"
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
              
              return sendData(formData,params )

          }
        


    return (

        <section className="intro">
            <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: "#D6D6D6" }}>
                <div className="container">
                    <form className="row justify-content-center" onChange={handleChange} onSubmit={submitForm}>
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <div className="card-body p-5 text-center">

                                    <div className="my-md-5 pb-5">

                                        <h1 className="fw-bold mb-3">Login</h1>

                                        <i className="fas fa-user-astronaut fa-3x my-5"></i>

                                        <div className="form-outline mb-3">
                                            <label className="form-label" htmlFor="username">Username</label>
                                            <input name="username" type="input" id="username" className="form-control form-control-lg" autoComplete="username"/>
                                        </div>

                                        <div className="form-outline mb-4">
                                            <input name="password" type="password" id="typePassword" className="form-control form-control-lg" autoComplete="current password" />
                                            <label className="form-label" htmlFor="typePassword" >Password</label>
                                        </div>

                                        <button className="btn btn-primary btn-lg btn-rounded gradient-custom text-body px-5" type="submit">Login</button>

                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account? <a href="#!" className="text-body fw-bold">Sign Up</a></p>
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


export default Login;