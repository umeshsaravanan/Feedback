import React from "react";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { ac_year } from '../Helper/Context';
import { useEffect } from 'react';
import  firebase from "firebase/app";
import { collection, query, where, getDocs, deleteDoc } from 'firebase/firestore';
import { db } from './config/firebase-config';
import { doc} from 'firebase/firestore';
import { semester } from '../Helper/Context';
function Delete(){
    const [selectedOption, setSelectedOption] = useState('');
    const [yearList, setYearList] = useState([]);
    const navigate= useNavigate();
    const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
      };
     const [fldata,setfl]=useState([]);

      const yearCollection= collection(db,"academic_year");
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

      

    
    const deleteYear = async () => {
       try {
        const q = query(collection(db, 'academic_year'), where("year", '==', selectedOption));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
          deleteDoc(doc.ref);
          getYearList();
        });
        console.log('Documents successfully deleted!');
      } catch (error) {
        console.error('Error deleting documents: ', error);
      }
      };

return(
    <div id="ob">      
        <div id="xz">
            <h3 id="aq">Delete Academic Year</h3>
            <select
        className="form-control"
        id="se"
        onChange={(e) => setSelectedOption(e.target.value)}
        required>
           <option value="">---select--- </option>
           {yearList.map((movie) => (
          <option value={movie.year}>{movie.year}</option>))}
        </select>
             <button id="dcb" type="submit" onClick={() => deleteYear()}>Delete</button>
           
        </div>
        
    </div>
);
}
export default Delete;