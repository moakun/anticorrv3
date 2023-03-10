import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../../index.css';
import questions from './questions';

function Quiz() {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const handlePrevious = () => {
    const prevQues = currentQuestion - 1;
    prevQues >= 0 && setCurrentQuestion(prevQues);
  };
  const handleNext = () => {
    const nextQues = currentQuestion + 1;
    nextQues < questions.length && setCurrentQuestion(nextQues);
  };

  const handleAnswerOption = (answer) => {
    setSelectedOptions([
      (selectedOptions[currentQuestion] = { answerByUser: answer }),
    ]);
    setSelectedOptions([...selectedOptions]);
    console.log(selectedOptions);
  };

  const handleSubmitButton = () => {
    let newScore = 0;
    for (let i = 0; i < questions.length; i++) {
      questions[i].answerOptions.map(
        (answer) =>
          answer.isCorrect &&
          answer.answer === selectedOptions[i]?.answerByUser &&
          (newScore += 1)
      );
    }
    setScore(newScore);
    setShowScore(true);
  };

  const ButtonAtt = () => {
    return (
      <div>
        <span className="text-green-400">Bravo!</span>
        <Link to="/attestation">
          <button className="flex flex-col font-poppins bg-blue-500 text-white p-3 mt-5 rounded hover:text-black transition ease-in delay-50">
            Votre Attestation Ici!
          </button>
        </Link>
      </div>
    );
  };

  const ButtonRetry = () => {
    return (
      <div>
        <span className="text-red-500">Note insuffisante</span>
        <Link to="/quizError">
          <button className="flex flex-col font-poppins bg-blue-500 text-white p-3 ml-7 mt-5 rounded hover:text-black transition ease-in delay-50">
            Réessayez
          </button>
        </Link>
      </div>
    );
  };

  const ButtonChoice = () => {
    const lastScore = score;
    if (lastScore >= 8) {
      return <ButtonAtt />;
    } else {
      return <ButtonRetry />;
    }
  };

  return (
    <div className="flex flex-col w-screen px-5 h-screen bg-white justify-center items-center">
      <div className="flex flex-col w-full">
        {showScore ? (
          <h1 className="text-3xl font-semibold text-center text-black font-poppins">
            Votre Score est de {score}0% <br />
            <div className="flex flex-col justify-center items-center m-5">
              <ButtonChoice />
            </div>
          </h1>
        ) : (
          <>
            <div className="flex flex-col items-center ">
              <h4 className="mt-10 text-xl text-black font-poppins ">
                Question {currentQuestion + 1} sur {questions.length}
              </h4>
              <div className="mt-4 text-2xl text-black font-poppins">
                {questions[currentQuestion].question}
              </div>
            </div>
            <div className="flex flex-col font-poppins justify-center items-center">
              {questions[currentQuestion].answerOptions.map((answer, index) => (
                <div
                  key={index}
                  className="flex items-center w-full py-4 pl-5 m-2 ml-0 border-2 cursor-pointer rounded-xl bg-blue-500"
                  onClick={(e) => handleAnswerOption(answer.answer)}
                >
                  <input
                    type="radio"
                    name={answer.answer}
                    value={answer.answer}
                    checked={
                      answer.answer ===
                      selectedOptions[currentQuestion]?.answerByUser
                    }
                    onChange={(e) => handleAnswerOption(answer.answer)}
                    className="w-6 h-6 bg-black"
                  />

                  <p className=" ml-6 text-white">{answer.answer}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-around w-full mt-4 text-white">
              <button
                onClick={handlePrevious}
                className="p-5 bg-blue-500 rounded-lg font-poppins"
              >
                Précédent
              </button>
              <button
                onClick={
                  currentQuestion + 1 === questions.length
                    ? handleSubmitButton
                    : handleNext
                }
                className="p-5 bg-blue-500 rounded-lg font-poppins"
              >
                {currentQuestion + 1 === questions.length ? 'Finir' : 'Suivant'}
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Quiz;
