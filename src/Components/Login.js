import React from "react";
import './m.css';
import log from './images/log.png'
import { useNavigate } from "react-router-dom";
import {auth,googleProvider} from "./config/firebase-config";
import { createUserWithEmailAndPassword,signInWithPopup } from "firebase/auth";
import { useState } from "react";
const Login=(props)=>{
	// const[email,setEmail]=useState("");;
	// const [password,setPassword]=useState("");
	// const signIn=async()=>{
    // await createUserWithEmailAndPassword(auth,email,password);
	// };
	const isadmin = props.isadmin;
	const signInWithGoogle=async()=>{
		await signInWithPopup(auth,googleProvider );
		};
    const navigate=useNavigate();
    const [input, setInput] = React.useState({ email: '', password: '' });

	const [errorMessage, seterrorMessage] = React.useState('');
	const [successMessage, setsuccessMessage] = React.useState('');

	const handleChange = e => {
		setInput({ ...input, [e.target.name]: e.target.value });
	};
    const formSubmitter = e => {
		e.preventDefault();
		setsuccessMessage('');
		// if (!emailValidator(input.email)) return seterrorMessage('Please enter valid email id');

		// if (!passwordValidator(input.password))
		// 	return seterrorMessage(
		// 		'Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters'
		// 	);
		// setsuccessMessage('Successfully Validated');
		// if(input.email !== 'admin@a.com' || input.password !== 'Password@1') return seterrorMessage('Invalid email or password');
        if(input.email === 'admin@a.com' || input.password === 'Password@1')
		navigate('/admin');

		else{
			seterrorMessage('Invalid username or password');
		}

		// localStorage.setItem('auth', true)

	};
return(
<div id="back">
    <h1 id="head">HELLO {props.name}</h1>
    <div id="box">
        <img id="lg" src={log} alt="s"></img>
        <h3 id='ln'>Login Page</h3>
    <input type="text" className="form-control" name="email" placeholder="Username" onChange={handleChange} required></input>
    <br></br>

    <input type="password" name="password" onChange={handleChange} placeholder="Password" className="form-control" required></input>

	<input id="sub" type="submit" onClick={formSubmitter}></input>

    
    {errorMessage.length > 0 && (<div className="msg">{errorMessage}</div>)}
    {successMessage.length > 0 && (	<div className="msg">{successMessage}</div>)}
	{/* <button id="sub" onClick={signInWithGoogle}>google</button> */}
    </div>
    
</div>);
}
export default Login;