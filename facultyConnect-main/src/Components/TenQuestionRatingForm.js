import React, { useState } from 'react';
import Rating from 'react-rating-stars-component';
import './ques.css';
import { useEffect } from 'react';
import { db } from './config/firebase-config';
import { semester } from "../Helper/Context";
import { ac_year } from '../Helper/Context';
import { getDocs,collection,addDoc ,query,where,updateDoc} from 'firebase/firestore';
import { useContext } from 'react';
import { subz } from '../Helper/Context';
import { useNavigate } from 'react-router-dom';
export function TenQuestionRatingForm() {
  const navigate=useNavigate();
  const questionList = [
    'Teacher comes to the class in time.',
    'Teacher comes well prepared in the subject.',
    'Aims / Objectives of the lesson are made clear.',
    'The lesson is organised and presented clearly.',
    'Teacher plans and prepares course materials and additional information.',
    'Teacher speaks clearly and audibly.',
    'Teacher writes and draws legibly.',
    'Teacher provide examples of concepts/principles / explanations are clear and effective.',
    "Teacher's pace and level of instruction are suited to the needs of students.",
    'Teacher offers assistancce and counselling to the needy students.',
    'Teacher asks questions to promote interaction and reflective thinking.',
    'Teacher encourages questioning / raising doubts by students and answers them well.',
    'Teacher ensures learner activity and problems solving ability in the class.',
    'Teacher encourages, compliments and praises originality and creativity displayed by the student.',
    'Teacher gives interesting assignments that motivate students to seek knowledge and sharpen skills.',
    'Teacher engages classes regularly and maintains descipline.',
    'Teacher covers the syllabus completely and at appropriate pace.',
    'Teacher holds tests regularly which are helpful to students in building up confidence in their acquisition and application of knowledge.',
    "Teacher's marking of answer scripts is fair and impartial.",
    'Teacher is prompt in valuing and returning the answer scripts provising feedback on performance.'
  ];
    const [ratings, setRatings] = useState(Array(questionList.length).fill(0));
    const [allQuestionsRated, setAllQuestionsRated] = useState(true);
    const {sem,setSem}=useContext(semester);
    const {yr,setYear}= useContext(ac_year);
    const {sub,setSub}= useContext(subz);

    useEffect(() => {
      setAllQuestionsRated(ratings.every((rating) => rating !== 0));
    }, [ratings]);
    const handleSubmit = async(event) => {
      event.preventDefault();
      console.log(ratings);
      if (!allQuestionsRated) {
        return;
      }
      const getRef=collection(db,"rating");
      const existingDocs = await getDocs(
        query(
          collection(db, "rating"),
          where("year", "==", yr),
          where("semester", "==", sem),
          where("subject", "==", sub)
        )
      );
      if (existingDocs.size > 0) {
        const doc = existingDocs.docs[0];
        const existingRatings = doc.data().rate || [];
        const updatedRatings = [...existingRatings, averageRating.toFixed(2)];
        await updateDoc(doc.ref, { rate: updatedRatings });
      } else {
        const data = { year: yr, semester: sem, subject: sub, rate: [averageRating.toFixed(2)] };
        await addDoc(getRef, data);
      }
      navigate('/');
    };
  
    const handleRatingChange = async(index, value) => {
      const newRatings = [...ratings];
      newRatings[index] = value;
      setRatings(newRatings);
    };
    
   
    const averageRating =
    ratings.reduce((total, rating) => total + rating, 0) / questionList.length;

    return (
      <form id='fques' onSubmit={handleSubmit}>
        {questionList.map((question, index) => (
          <div id='qbox' key={index}>
            <p id='qlist'>{question}</p>
            <Rating 
              classNames="star-rate"
              id={`rating-${index}`}
              emptySymbol="fa fa-circle-o fa-2x"
              fullSymbol="fa fa-circle fa-2x"
              fractions={2}
              onChange={(value) => handleRatingChange(index, value)}
            />
          </div>
        ))}
        <button type="submit"  disabled={!allQuestionsRated} id='qq'>Submit</button>
        <p>Average rating: {averageRating.toFixed(2)}</p>
      </form>
    );
  }

  