import {Routes, Route} from "react-router-dom";

import Home from "./Home"
import Login from "./Login";
import Register from "./Register"
import Landing from "./Landing"
import Nav from "./Nav";
import Userpage from "./UserPage";
import Notfound from "./Notfound"
import AddGoal from "./AddGoal"





function WebRoutes({sendData, port, addAccount, addTransaction, backend}){


    return(
        <>
        <Nav />
        <Routes>
        <Route exact path="/" element={<Landing />}></Route>
        <Route exact path="/login" element={<Login register={"login"} sendData={sendData}/>}></Route>
        <Route exact path="/register" element={<Register register={"register"} sendData={sendData}/>}></Route>
        <Route exact path="/home" element={<Home />}></Route>
        <Route exact path="/user" element={<Userpage port={port} addTransaction={addTransaction} sendData={sendData} backend={backend}/>} />
        <Route exact path="/addgoal" element={<AddGoal  sendData={sendData} addAccount={addAccount}/>} />
        <Route  exact path="*" element={<Notfound />}></Route>
        </Routes>
        </>
    )
}


export default WebRoutes;