import { Routes, Route } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Home from "./Home"
import Login from "./Login";
import Register from "./Register"
import Landing from "./Landing"
import Nav from "./Nav";
import Userpage from "./UserPage";
import Notfound from "./Notfound"
import AddGoal from "./AddGoal"





function WebRoutes({ sendData, port, addAccount, addTransaction, backend, updateGoal, deleteTransaction, login, loginUser }) {
    let [loggedIn, setLogin] = useState(true)
    let user = localStorage.getItem("username")
    let navigate = useNavigate()


    return (
        <>
            <Nav />
            <Routes>
                <Route exact path="/" element={<Landing />}></Route>
                <Route exact path="/login" element={<Login register={"login"} login={login} setlogin={setLogin} />}></Route>
                <Route exact path="/register" element={<Register register={"register"} sendData={sendData} setlogin={setLogin} />}></Route>
                <Route exact path="/home" element={<Home />}></Route>
                <Route exact path="/user" element={<Userpage loggedin={loggedIn} port={port} addTransaction={addTransaction} sendData={sendData} backend={backend} updateGoal={updateGoal} deleteTransaction={deleteTransaction} loginUser={loginUser}/>} />
                <Route exact path="/addgoal" element={<AddGoal sendData={sendData} addAccount={addAccount} loginUser={loginUser} port={port}/>} />
                <Route exact path="*" element={<Notfound />}></Route>


            </Routes>
        </>
    )
}


export default WebRoutes;