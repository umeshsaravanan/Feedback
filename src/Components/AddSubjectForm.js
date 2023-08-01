import React, { useState,useEffect } from 'react';
import { db } from './config/firebase-config';
import { getDocs,collection,addDoc } from 'firebase/firestore';

function AddSubjectForm() {
    const getRef=collection(db,"academic_year");
  const [academicYear, setAcademicYear] = useState('');
  const [semester, setSemester] = useState('');
  const [subjects, setSubjects] = useState([]);
  const [formCompleted, setFormCompleted] = useState(false);
  const [academicYearError, setAcademicYearError] = useState('');
  const [warningMessage, setWarningMessage] = useState('');

  const handleSubjectChange = (index, value) => {
    const updatedSubjects = [...subjects];
    updatedSubjects[index] = value;
    setSubjects(updatedSubjects);
  };

  const handleAddSubject = () => {
    setSubjects([...subjects, '']);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    // Perform any desired actions with the collected data (e.g., submit to backend, update state, etc.)
    const querySnapshot = await getDocs(getRef);
  const academicYears = querySnapshot.docs.map((doc) => doc.data().year);
  if (academicYears.includes(academicYear)) {
    setWarningMessage('Academic year already exists. Please update.');
    return;
  }
    console.log('Academic Year:', academicYear);
    console.log('Semester:', semester);
    console.log('Subjects:', subjects);
    
    setAcademicYear('');
    setSemester('');
    setSubjects([]);
    let a={year : academicYear}
    a[semester]=subjects
      await addDoc(getRef,a)
  };
  useEffect(() => {
    const isFormCompleted =
      academicYear !== '' &&
      semester!== '';
    setFormCompleted(isFormCompleted);
  }, [academicYear,semester]);
  const handleAcademicYearChange = e => {
    const value = e.target.value;
    const valid = /^[2][0][2-3][0-9][-][2][0][2-4][0-9]$/.test(value);
    setAcademicYear(value);
    setAcademicYearError(valid ? '' : 'Academic year must be in the format "2020-2024".');
  };
  return (
    <div id="ob">
    <div id='nb'>
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label htmlFor="academicYear" className="form-label" id='laadd'>Academic Year (20XX-20XX)</label>
        <input
          type="text"
          className="form-control"
          id="academicYear"
          value={academicYear}
          pattern="20[0-9][0-9]-20[0-9][0-9]"
          onChange={handleAcademicYearChange}
          required
        />
        {academicYearError && (
  <h4 className="invalid-feedback">{academicYearError}</h4>
)}
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
        <button type="button" id='bcx' className="btn btn-primary mt-2" onClick={handleAddSubject}>Add Subject</button>
      </div>
      <button type="submit" className="btn btn-primary" id='bcx' disabled={!formCompleted}>Submit</button>
    </form>
    <p id='ko'>{warningMessage}</p>
    </div>
    </div>
  );
}

export default AddSubjectForm;
