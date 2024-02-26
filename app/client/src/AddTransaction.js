import { useState } from "react";
import { useNavigate } from 'react-router-dom';

function AddTransaction({ addTransaction, toggle, setTrans, reRenderPage }) {
    let navigate = useNavigate()
    let INITIAL = {
        username: localStorage.getItem("username"),
        "amount": 0.00,
        "date": "MM-DD-YYYY",
        "description": ""


    }

    const [formData, setFormData] = useState(INITIAL);




    let params = "api"
    const handleChange = evt => {
        const { name, value } = evt.target;
        setFormData(fData => ({
            ...fData,
            [name]: value
        }));
    }

    function submitForm(event) {
        event.preventDefault()
        toggle()
        addTransaction(formData, params)
        setTrans(formData)
        reRenderPage()
        navigate("/user")


    }



    return (

        <section className="intro trns">
            <div className="mask d-flex align-items-center h-100" style={{ backgroundColor: 'rgba(0,0,0,0.9)' }}>
                <div className="container">

                    <form className="row justify-content-center" onChange={handleChange} onSubmit={submitForm}>

                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card" style={{ borderRadius: "1rem" }}>
                                <a className="text-decoration-none border-primary text-center" href="/user" style={{ width: "30px", margin: "5px" }} >X</a>
                                <div className="card-body p-5 text-center">

                                    <div className="my-md-5 pb-5">
                                        <h3 className="fw-bold py-5">ADD TRANSACTION</h3>

                                        <i className="fas fa-user-astronaut fa-3x my-5"></i>

                                        <div className="form-outline mb-2">
                                            <input name="description" type="firstName" id="description" className="form-control form-control-lg" autoComplete="description" placeholder="Description" />
                                        </div>

                                        <div className="form-outline mb-2">
                                            <input name="amount" type="number" step=".01" id="form6Example6" className="form-control form-control-lg" placeholder="Amount" autoComplete="amount" />
                                        </div>
                                        <div className="form-outline mb-5">
                                            <input name="transaction_date" type="date"  id="form6Example6" className="form-control form-control-lg"  autoComplete="date" />
                                        </div>

                                        <button className="btn btn-primary btn-lg btn-rounded  text-body px-5 text-white" type="submit" >Add Transaction</button>

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


export default AddTransaction;