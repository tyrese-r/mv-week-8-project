import {useState} from 'react';
import Choice from './choices';
import Question from './question';

function Questions() {
    //function get guestion from .question
    const getQuestion =async () => {
        questionAPI().then(question => {
            this.setState({questionBank: question});
        });
    };

  return (
    <>
    <div className="Container">
        <div>question display
            <Question/>
            <h1 className="question"></h1>
        </div>
        <div className="content-display">
        <Choice/>
        </div>
        <div>
            <button className="next-button">Next</button>
        </div>
    </div>
    </>
  );
}

export default App;