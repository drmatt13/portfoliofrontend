import React, { useState, useEffect, useRef } from 'react';
import Timer from './Timer';

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max+1));
}

const generateAdditionProblems1 = (array, x, y1, y2) => {
  const problems = [];
  const types = [];
  console.log(array);
  if (array[0]) types.push("+");
  if (array[1]) types.push("-");
  if (array[2]) types.push("x");
  if (array[3]) types.push("/");
  console.log(types);
  for (let i=0; i<x; i++) {
    const num1 = getRandomInt(y1);
    const num2 = getRandomInt(y2);
    const type = types[getRandomInt(types.length-1)]
    problems.push([num1, num2, type]);
  }
  console.log(problems);
  return problems;
}

const ProblemSet = ({ active, addition, subtraction, multiplication, division, range }) => {

  const answeredRef = useRef();
  const inputRef = useRef();
  const pendingRef3 = useRef();
  const pendingRef2 = useRef();
  const pendingRef1 = useRef();

  const [loading, setLoading] = useState(true);
  const [problems, setProblems] = useState([]);
  const [answers, setAnswers] = useState([]);
  const [value, setValue] = useState();

  useEffect(() => {
    setProblems(generateAdditionProblems1([addition, subtraction, multiplication, division], 10, range[0], range[1]));
    console.log(problems.length);
    setLoading(false);
  }, []);

  useEffect(() => {
    if (!loading && (answers.length != problems.length)) {
      inputRef.current.focus();
      if (pendingRef1.current) pendingRef1.current.parentNode.classList.add("fadein1");
      if (pendingRef2.current) pendingRef2.current.parentNode.classList.add("fadein2");
      if (pendingRef3.current) pendingRef3.current.parentNode.classList.add("fadein3");
      inputRef.current.parentNode.classList.add("fadein4");
    }
  }, [loading, answers]);

  const updateInput = ({target: {value}}) => {
    setValue(+value);
    inputRef.current.classList.remove("problemset-input-shake");
    if (!isNaN(value) && !/^\s*$/.test(value)) {
      inputRef.current.classList.add("problemset-input-correct");
      inputRef.current.classList.remove("problemset-input-incorrect");
    }
    else if (/^\s*$/.test(value)) {
      inputRef.current.classList.remove("problemset-input-correct");
      inputRef.current.classList.remove("problemset-input-incorrect");
    }
    else {
      inputRef.current.classList.remove("problemset-input-correct");
      inputRef.current.classList.add("problemset-input-incorrect");
    }
  }

  const submitHandler = e => {
    e.preventDefault();
    if (!active) return;
    const index = inputRef.current.getAttribute("index");
    const answer = +problems[index][0] + +problems[index][1];
    if (value !== answer) {
      inputRef.current.classList.remove("problemset-input-correct");
      inputRef.current.classList.add("problemset-input-incorrect");
      inputRef.current.classList.add("problemset-input-shake");
    }
    else {
      setAnswers([...answers, answer]);
      inputRef.current.classList.remove("problemset-input-correct");
      inputRef.current.classList.remove("problemset-input-incorrect");
      inputRef.current.value="";
      inputRef.current.parentNode.classList.add("fadeout1");
      if (answers.length >= 1) answeredRef.current.parentNode.classList.add("fadeout2");
      inputRef.current.parentNode.parentNode.classList.add(`slide${answers.length+1}`);
      setValue("");
    }
  }

  if (loading) return <div>Loading...</div>;
  return (
    <form onSubmit={submitHandler}>
      <div className="problemset-problems">
        {(problems.length>0) && <>{problems.map((problem, index) => (<div className={`problemset-problem`} key={index}>
          <div>{problem[0]} {problem[2]}</div>
          <div>{problem[1]} =</div>
          {answers.length > index+1 && <div className="problemset-span">{answers[index]}</div>}
          {answers.length == index+1 && <span ref={answeredRef} className="problemset-span">{answers[index]}</span>}
          {answers.length == index && <input ref={inputRef} index={index} onChange={updateInput} className="problemset-input" pattern="\d*" type="text" />} 
          {/* maxLength={2} */}
          {answers.length == index-1 && <span ref={pendingRef3} className="problemset-span"></span>}
          {answers.length == index-2 && <span ref={pendingRef2} className="problemset-span"></span>}
          {answers.length == index-3 && <span ref={pendingRef1} className="problemset-span"></span>}
          {answers.length < index-3 && <span className="problemset-span"></span>}
        </div>))}</>}
      </div>
    </form>
  )
}

const WorkSheet = ({addition, subtraction, multiplication, division, range, duration}) => {

  const [status, setStatus] = useState(true);

  return (
    <div>
      <Timer duration={duration} setStatus={setStatus} />
      <ProblemSet 
        active={status} 
        addition={addition} 
        subtraction={subtraction} 
        multiplication={multiplication} 
        division={division} 
        range={range} 
      />
    </div>
  )
}

export default WorkSheet
