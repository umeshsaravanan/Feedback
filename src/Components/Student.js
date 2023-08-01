import React, { useContext } from "react";
import Sem from "./Sem";
import { useState } from "react";
import { auth } from "./config/firebase-config";
import { signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { db } from './config/firebase-config';
import { getDocs,collection,addDoc } from 'firebase/firestore';
import { ac_year } from "../Helper/Context";
const Student=(props)=>{
    // const [user,setUser]=useState('');
    // fetch().then(res=>res.json())
    // .then(res=> setUser(res))
    const [selectedOption, setSelectedOption] = useState('');
    const [yearList, setYearList] = useState([]);

 const navigate=useNavigate();
  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    setYear(e.target.value);
  };
  const logout = async () => {
    
    try {
        
      await signOut(auth);
      if (yr === "") {
        alert("Please select an academic year.");
      }
      else{
        navigate('/');
      }
      
      
    } catch (err) {
      console.error(err);
    }
  };
  const {yr,setYear}=useContext(ac_year);
  const yearCollectionRef = collection(db, "academic_year"); 
     
      
  const getYearList = async () => {
    try {
      const data = await getDocs(yearCollectionRef);
      const filteredData = data.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setYearList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getYearList();
  }, []); 

        return(
            <div id='ip'>
            <h1 id="navb">
             Academic year <br></br><div id="y">{props.year}</div>
             <select id='sel' value={selectedOption} onChange={handleOptionChange}>
        <option value="">---select--- </option>
        {yearList.map((movie) => (
          <option value={movie.year}>{movie.year}</option>))}
      </select>
      <button id='lot'  onClick={logout}>Logout</button>
            </h1>
            <div><Sem /></div>
            </div>
            );
           
}
export default Student;