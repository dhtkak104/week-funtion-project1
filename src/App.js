import React from 'react';
import logo from './logo.svg';
import './App.css';

function App(props) {
  const msg = props.msg;
  const data = msg.split("\n");
  const print = data.map((subject, index) =>
    <li key={index}>{subject}</li>
  )
  return (
    <div className="App">
      {/*<h1>이름: {props.name}</h1>
      <h1>성별: {props.sex}</h1>
      <h1>나이: {props.age}</h1>*/}
      <ul>{print}</ul>
    </div>
  );
}

export default App;
