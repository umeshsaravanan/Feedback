import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from './config/firebase-config';
import { getDocs,collection,addDoc } from 'firebase/firestore';
import { query, where, updateDoc, doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
function Update() {
  const navigate =useNavigate();
    const getRef=collection(db,"academic_year");
  const [academicYear, setAcademicYear] = useState("");
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([]);

  const [yearList, setYearList] = useState([]);

  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value;
    setSubjects(updatedSubjects);
  };
  const [formCompleted, setFormCompleted] = useState(false);
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

  const handleAddSubject = () => {
    setSubjects([...subjects, '']);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const q = query(collection(db, 'academic_year'), where("year", '==', academicYear));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const docRef = doc(db, 'academic_year', querySnapshot.docs[0].id);
        const academicYearData = querySnapshot.docs[0].data();
        if (academicYearData[semester]) {
          await updateDoc(docRef, { [semester]: subjects });
          console.log('Document successfully updated!');
          navigate('/upd');
        } else {
          await setDoc(doc(db, "academic_year", querySnapshot.docs[0].id), { [semester]: subjects }, { merge: true });
          console.log('New semester added to academic year!');
          navigate('/upd');
        }
      } else {
        console.log('No matching documents');
      }
    } catch (error) {
      console.error('Error updating document: ', error);
    }
  };
  useEffect(() => {
    const isFormCompleted =
      academicYear !== '' &&
      semester !== '' ;
    setFormCompleted(isFormCompleted);
  }, [academicYear,semester]);
  return (
    <div id="ob">
    <div id='nb'>
    <form onSubmit={handleUpdate}>
      <div className="mb-3">
        <label htmlFor="academicYear" className="form-label" id='laadd'>Academic Year</label>
    
        <select
        className="form-control"
        id="sel"
        onChange={(e) => setAcademicYear(e.target.value)}
        required>
           <option value="">---select--- </option>
           {yearList.map((movie) => (
          <option value={movie.year}>{movie.year}</option>))}
        </select>
      </div>
      <div className="mb-3">
        <label htmlFor="semester" className="form-label" id='laadd'>Semester</label>
        <select id='sel'   className="form-control" value={semester} onChange={(e) => setSemester(e.target.value)} required>
        <option value="">---select--- </option>
        <option value="sem1">sem1</option>
        <option value="sem2">sem2</option>
        <option value="sem3">sem3</option>
        <option value="sem4">sem4</option>
        <option value="sem5">sem5</option>
        <option value="sem6">sem6</option>
        <option value="sem7">sem7</option>
        <option value="sem8">sem8</option>
      </select>
       
      </div>
      <div className="mb-3">
        {subjects.map((subject, index) => (
          <input
            type="text"
            className="form-control"
            id='sin'
            value={subject}
            onChange={(e) => handleSubjectChange(index, e.target.value)}
            required
            key={index}
          />
        ))}
        <button type="button" id='bcx' className="btn btn-primary mt-2" onClick={handleAddSubject}>Add</button>
      </div>
      <button type="submit" className="btn btn-primary" id='bcx' onClick={handleUpdate}
      disabled={!formCompleted}>Update</button>
    </form>
    </div>
    </div>
  );
}

export default Update;
