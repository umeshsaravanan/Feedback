import { Link, useNavigate } from 'react-router-dom';
import './m.css';
import React,{useState} from 'react';
import ac from './images/aca.png';
import bc from './images/std.png';
import Login from './Login';
import {auth,googleProvider} from "./config/firebase-config";
import { createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import Student from './Student';
function Main_page(props) {
    const[user,setUser]=useState();
    const navigate= useNavigate();
    const signInWithGoogle=async()=>{
        await signInWithPopup(auth,googleProvider );
        navigate('./academics');
        };
        return(
            <div id='main'> <h1 id='mhead'>FACULTY  FEEDBACK  SYSTEM</h1>
            <Link id='k' to="/adlogin">
                <button id="mbut" value="ADMIN" onChange={e=>setUser(e.target.value)}
                onClick={<Login name={user}/>}>
                    <img id='adimg' src={ac} alt="noimage"></img>
                    <h3>ADMIN</h3>
                    </button>
            </Link>
            
                <button id="mbut" value="STUDENT" onClick={signInWithGoogle}
                >
                    <img id='stdimg' src={bc} alt="noimage"></img>
                    <h3>STUDENT</h3>
                    </button>
            </div>       
        );
    }
export default Main_page;























