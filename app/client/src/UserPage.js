import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import AddTransaction from "./AddTransaction";
import UpdateGoal from "./UpdateGoal";
import { useNavigate } from "react-router-dom";





function Userpage({ port, addTransaction, sendData, backend, updateGoal, deleteTransaction, loggedin }) {
  let [data, setData] = useState()
  let [toggle, setToggle] = useState(false)
  let [goalform, setgoalForm] = useState(false)
  let [trans, setTrans] = useState([])
  let [page, updatePage] = useState(false)

  let navigate = useNavigate()

  let username = localStorage.getItem("username")




  function del(event) {
    event.preventDefault()
    let transaction_id = event.currentTarget.dataset.user
    console.log(transaction_id)
    deleteTransaction(transaction_id)
    reRenderPage()

  }

  function reRenderPage() {
    if (page) {
      updatePage(false)
    } else {
      updatePage(true)
    }
  }


  function tggle() {
    if (toggle === false) {
      setToggle(true)
    } else {
      setToggle(false)
    }
  }


  function toggleGoal() {
    if (goalform === false) {
      setgoalForm(true)
    } else {
      setgoalForm(false)
    }
  }


  function redirect(){
    navigate("/login")
  }



  async function getData() {
    let username = localStorage.getItem("username")
    const res1 = await axios.post(`http://localhost:${port}/api`, { username }
    ).then(res => { setData(res.data) })
    return res1
  }
  useEffect(() => {
    getData()
  }, [toggle, page, goalform])













  if (!data) {
    return (

      <h1>LOADINGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGGG</h1>
    )

  } else {
    console.log(data)

    function funds() {

      let amountspent = 0
      for (let i = 0; i < data.transactions.rows.length; i++) {
        amountspent += parseFloat(data.transactions.rows[i].amount)

      }


      console.log(data.goal.goal - amountspent)

      const funds = data.goal.goal - Math.abs(amountspent)
      return funds
    }


    return (

      <div className="text-center user" >
        {toggle ? <div className=""><AddTransaction toggle={tggle} addTransaction={addTransaction} setTrans={setTrans} reRenderPage={reRenderPage} /></div> : null}
        {goalform ? <UpdateGoal toggleGoal={toggleGoal} updateGoal={updateGoal} reRenderPage={reRenderPage} /> : null}

        <div className="card" >

        </div>
        <div className="card" >
          <section className="py-8">
            <div className="container">
              <div className="bg-white rounded shadow overflow-hidden">
                <div className="pt-4 pb-5 px-6 border-bottom border-secondary-light">
                  <h4 className="mb-6">Recent Transactions</h4>



                </div>
                <div className="px-4 table-responsive" >
                  <div className="py-4">
                    <span className="text-start"><h5 className="mb-0 ">GOAL : <span className="text-primary" onClick={toggleGoal}>{(data.goal.goal).toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })}</span></h5>

                      <svg fill={funds() > 0 ? "#198754" : "#dc3545"} width="25%" height="25%" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg badge piggySign"><path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-2.5-.382a.913.913 0 0 0-.91-.91h-.355a3.655 3.655 0 0 0-.833-1.393 3.412 3.412 0 0 1 .369-1.953.199.199 0 0 0-.152-.29.197.197 0 0 0-.124.026L9.914 5.844a3.648 3.648 0 0 0-.738-.075H7.642a3.657 3.657 0 0 0-3.587 2.947.71.71 0 0 0 0 1.419 3.656 3.656 0 0 0 1.001 1.876q.093.092.191.177v1.553a.365.365 0 0 0 .364.364h1.163a.365.365 0 0 0 .365-.364v-.694a3.64 3.64 0 0 0 .503.035h1.534a3.642 3.642 0 0 0 .503-.035v.694a.365.365 0 0 0 .365.364h1.163a.365.365 0 0 0 .364-.364v-1.553q.098-.085.19-.177a3.659 3.659 0 0 0 .891-1.451h.354a.913.913 0 0 0 .91-.91zM9.487 6.32a.364.364 0 1 1 0 .728H7.464a.364.364 0 1 1 0-.728h2.025zm-.003 3.702a.95.95 0 0 1 .235.625.929.929 0 0 1-.466.802 1.478 1.478 0 0 1-.448.19v.193a.364.364 0 0 1-.729 0v-.188a1.662 1.662 0 0 1-.285-.091 1.054 1.054 0 0 1-.406-.297.364.364 0 0 1 .55-.477.338.338 0 0 0 .126.098.928.928 0 0 0 .176.056 1.412 1.412 0 0 0 .19.024.845.845 0 0 0 .43-.119c.134-.086.134-.157.134-.191a.224.224 0 0 0-.056-.146.537.537 0 0 0-.14-.113.727.727 0 0 0-.176-.063.838.838 0 0 0-.174-.017 1.824 1.824 0 0 1-.304-.024 1.396 1.396 0 0 1-.392-.127 1.141 1.141 0 0 1-.374-.3.97.97 0 0 1-.222-.608.98.98 0 0 1 .487-.829 1.458 1.458 0 0 1 .436-.18v-.184a.364.364 0 1 1 .729 0v.193a1.714 1.714 0 0 1 .292.103 1.212 1.212 0 0 1 .354.244.364.364 0 0 1-.514.516.483.483 0 0 0-.14-.096.965.965 0 0 0-.18-.063l-.02-.004a.936.936 0 0 0-.147-.026.83.83 0 0 0-.421.113.261.261 0 0 0-.148.213.251.251 0 0 0 .06.148.417.417 0 0 0 .134.108.67.67 0 0 0 .186.06 1.099 1.099 0 0 0 .184.014 1.557 1.557 0 0 1 .328.035 1.456 1.456 0 0 1 .361.13 1.257 1.257 0 0 1 .35.278z" /></svg>

                    </span>
                    <br></br>
                    <span className="text-start"><h5 className="mb-0">Account : {data.account.account_num}</h5></span>
                    <br></br>
                    <span className="text-start"><h5 className=" ">Balance : {data.account.balance}</h5></span>
                    <br></br>
                    <span className="text-start"><h5 className=" ">Funds Left : {funds()}</h5></span>
                  </div>

                  <div className="pt-3 pb-5 text-center">
                    <a className="btn d-inline-flex align-items-center mx-auto text-decoration-none text-primary" style={{ maxWidth: "max-content" }} href="#">
                      <span className="btn btn-primary" onClick={tggle}>
                        <span className="d-inline-block me-2">
                          <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#ffffff"><path d="M0 0h24v24H0z" fill="none" /><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z" /></svg>
                        </span>
                        Add Transaction</span>
                    </a>
                  </div>
                  <table className="table mb-0 table-borderless table-striped small">
                    <thead>
                      <tr className="text-secondary"><th className="py-3 px-6">Transaction ID</th><th className="py-3 px-6">Date</th><th className="py-3 px-6">Description</th><th className="py-3 px-6">Amount</th><th className="py-3 px-6 text-danger">DELETE</th></tr>
                    </thead>
                    <tbody>

                      <tr>
                        <td className="py-5 px-6">TRANSACTION ID</td>
                        <td className="py-5 px-6">MM-DD-YYYY</td>
                        <td className="py-5 px-6">DESCRIPTION</td>
                        <td className="py-5 px-6">AMOUNT</td>
                        <td className="py-5 px-6">
                          <svg fill="#000000" width="50px" height="50px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg badge"><path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-2.5-.382a.913.913 0 0 0-.91-.91h-.355a3.655 3.655 0 0 0-.833-1.393 3.412 3.412 0 0 1 .369-1.953.199.199 0 0 0-.152-.29.197.197 0 0 0-.124.026L9.914 5.844a3.648 3.648 0 0 0-.738-.075H7.642a3.657 3.657 0 0 0-3.587 2.947.71.71 0 0 0 0 1.419 3.656 3.656 0 0 0 1.001 1.876q.093.092.191.177v1.553a.365.365 0 0 0 .364.364h1.163a.365.365 0 0 0 .365-.364v-.694a3.64 3.64 0 0 0 .503.035h1.534a3.642 3.642 0 0 0 .503-.035v.694a.365.365 0 0 0 .365.364h1.163a.365.365 0 0 0 .364-.364v-1.553q.098-.085.19-.177a3.659 3.659 0 0 0 .891-1.451h.354a.913.913 0 0 0 .91-.91zM9.487 6.32a.364.364 0 1 1 0 .728H7.464a.364.364 0 1 1 0-.728h2.025zm-.003 3.702a.95.95 0 0 1 .235.625.929.929 0 0 1-.466.802 1.478 1.478 0 0 1-.448.19v.193a.364.364 0 0 1-.729 0v-.188a1.662 1.662 0 0 1-.285-.091 1.054 1.054 0 0 1-.406-.297.364.364 0 0 1 .55-.477.338.338 0 0 0 .126.098.928.928 0 0 0 .176.056 1.412 1.412 0 0 0 .19.024.845.845 0 0 0 .43-.119c.134-.086.134-.157.134-.191a.224.224 0 0 0-.056-.146.537.537 0 0 0-.14-.113.727.727 0 0 0-.176-.063.838.838 0 0 0-.174-.017 1.824 1.824 0 0 1-.304-.024 1.396 1.396 0 0 1-.392-.127 1.141 1.141 0 0 1-.374-.3.97.97 0 0 1-.222-.608.98.98 0 0 1 .487-.829 1.458 1.458 0 0 1 .436-.18v-.184a.364.364 0 1 1 .729 0v.193a1.714 1.714 0 0 1 .292.103 1.212 1.212 0 0 1 .354.244.364.364 0 0 1-.514.516.483.483 0 0 0-.14-.096.965.965 0 0 0-.18-.063l-.02-.004a.936.936 0 0 0-.147-.026.83.83 0 0 0-.421.113.261.261 0 0 0-.148.213.251.251 0 0 0 .06.148.417.417 0 0 0 .134.108.67.67 0 0 0 .186.06 1.099 1.099 0 0 0 .184.014 1.557 1.557 0 0 1 .328.035 1.456 1.456 0 0 1 .361.13 1.257 1.257 0 0 1 .35.278z" /></svg>
                        </td>
                      </tr>

                      {
                        data.transactions.rows.map((trans) => {
                          return (<tr key={trans.transaction_id} id={trans.transaction_id}>
                            <td className="py-5 px-6">{trans.transaction_id}</td>
                            <td className="py-5 px-6">{trans.transaction_date === null? "0": (trans.transaction_date).split('T')[0]}</td>
                            <td className="py-5 px-6">{trans.description === null? "Transaction": trans.description}</td>
                            <td className="py-5 px-6">{Math.abs(trans.amount)}</td>
                            <td data-user={trans.transaction_id} className="py-5 px-6" onClick={del}>
                              <svg id={trans.transaction_id} data-user={trans.transaction_id} fill="#000000" width="50px" height="50px" viewBox="-1 0 19 19" xmlns="http://www.w3.org/2000/svg" className="cf-icon-svg badge piggy-icon"><path d="M16.417 9.583A7.917 7.917 0 1 1 8.5 1.666a7.917 7.917 0 0 1 7.917 7.917zm-2.5-.382a.913.913 0 0 0-.91-.91h-.355a3.655 3.655 0 0 0-.833-1.393 3.412 3.412 0 0 1 .369-1.953.199.199 0 0 0-.152-.29.197.197 0 0 0-.124.026L9.914 5.844a3.648 3.648 0 0 0-.738-.075H7.642a3.657 3.657 0 0 0-3.587 2.947.71.71 0 0 0 0 1.419 3.656 3.656 0 0 0 1.001 1.876q.093.092.191.177v1.553a.365.365 0 0 0 .364.364h1.163a.365.365 0 0 0 .365-.364v-.694a3.64 3.64 0 0 0 .503.035h1.534a3.642 3.642 0 0 0 .503-.035v.694a.365.365 0 0 0 .365.364h1.163a.365.365 0 0 0 .364-.364v-1.553q.098-.085.19-.177a3.659 3.659 0 0 0 .891-1.451h.354a.913.913 0 0 0 .91-.91zM9.487 6.32a.364.364 0 1 1 0 .728H7.464a.364.364 0 1 1 0-.728h2.025zm-.003 3.702a.95.95 0 0 1 .235.625.929.929 0 0 1-.466.802 1.478 1.478 0 0 1-.448.19v.193a.364.364 0 0 1-.729 0v-.188a1.662 1.662 0 0 1-.285-.091 1.054 1.054 0 0 1-.406-.297.364.364 0 0 1 .55-.477.338.338 0 0 0 .126.098.928.928 0 0 0 .176.056 1.412 1.412 0 0 0 .19.024.845.845 0 0 0 .43-.119c.134-.086.134-.157.134-.191a.224.224 0 0 0-.056-.146.537.537 0 0 0-.14-.113.727.727 0 0 0-.176-.063.838.838 0 0 0-.174-.017 1.824 1.824 0 0 1-.304-.024 1.396 1.396 0 0 1-.392-.127 1.141 1.141 0 0 1-.374-.3.97.97 0 0 1-.222-.608.98.98 0 0 1 .487-.829 1.458 1.458 0 0 1 .436-.18v-.184a.364.364 0 1 1 .729 0v.193a1.714 1.714 0 0 1 .292.103 1.212 1.212 0 0 1 .354.244.364.364 0 0 1-.514.516.483.483 0 0 0-.14-.096.965.965 0 0 0-.18-.063l-.02-.004a.936.936 0 0 0-.147-.026.83.83 0 0 0-.421.113.261.261 0 0 0-.148.213.251.251 0 0 0 .06.148.417.417 0 0 0 .134.108.67.67 0 0 0 .186.06 1.099 1.099 0 0 0 .184.014 1.557 1.557 0 0 1 .328.035 1.456 1.456 0 0 1 .361.13 1.257 1.257 0 0 1 .35.278z" /></svg>
                            </td>
                          </tr>)
                        })
                      }




                    </tbody>
                  </table>

                </div>
              </div>
            </div>
          </section>
        </div>

      </div>
    )
  }
};


export default Userpage;