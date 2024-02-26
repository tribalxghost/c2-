import { useNavigate } from "react-router-dom"
import { Routes, Route } from "react-router-dom";


import Userpage from "./UserPage";
import Notfound from "./Notfound"
import AddGoal from "./AddGoal"


function PrivateRoutes(loggedIn, sendData, port, addAccount, addTransaction, backend, updateGoal, deleteTransaction, login){
let navigate = useNavigate()


if(loggedIn){


    return (
        <>
        <Routes>
        <Route exact path="/user" element={<Userpage port={port} addTransaction={addTransaction} sendData={sendData} backend={backend} updateGoal={updateGoal} deleteTransaction={deleteTransaction} />} />
        <Route exact path="/addgoal" element={<AddGoal sendData={sendData} addAccount={addAccount} />} />
        <Route exact path="*" element={<Notfound />}></Route>
        </Routes>
        </>
    )
    } else {
        navigate("/login")
    }

}


export default PrivateRoutes;