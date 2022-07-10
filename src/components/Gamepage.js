import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Gamepage() {
  const url = "https://opentdb.com/api.php?amount=10";

  const [questions, setQuestions] = useState([]);
  const [isPending, setPending] = useState(true);
  const [error, setError] = useState(null);
  const [answerSelected, setAnswerSelected] = useState(false);
  const [idx, setIdx] = useState(0);
  const [score, setScore] = useState(0);

  let navigate = useNavigate();
  let history = 1;

  const handleListItemClick = (event) => {
    setAnswerSelected(true);

    if (event.target.value === questions[idx].answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      setIdx(idx + 1);
      setAnswerSelected(false);
    }, 2500);
    // if (idx + 1 < questions.length) {

    // }
    if (idx + 1 >= questions.length) {
      setIdx(0);
      setQuestions([]);
      if (localStorage.getItem("history") === null) {
        localStorage.setItem("history", history);
        localStorage.setItem("score1", score);
        console.log("history not present");
      } else {
        history = parseInt(localStorage.getItem("history"));
        localStorage.setItem("history", history + 1);
        history++;
        console.log("history present");
        localStorage.setItem(`score${history}`, score);
      }
      navigate("/home");
    }
  };

  useEffect(() => {
    setTimeout(() => {
      fetch(url)
        .then((res) => {
          if (!res.ok) {
            throw Error("couldn't fetch the deets");
          }
          return res.json();
        })
        .then((response) => {
          setPending(false);

          const insertQuestions = response.results.map((loadedQuestion) => {
            const splicedQuestion = {
              question: loadedQuestion.question
            };

            let answersChoices = [...loadedQuestion.incorrect_answers];

            if (loadedQuestion.incorrect_answers.length === 1) {
              splicedQuestion.answer = Math.floor(Math.random() * 1) + 1;
            } else {
              splicedQuestion.answer = Math.floor(Math.random() * 3) + 1;
            }

            splicedQuestion["choices"] = [];

            answersChoices.splice(
              splicedQuestion.answer - 1,
              0,
              loadedQuestion.correct_answer
            );

            answersChoices.forEach((choice, index) => {
              // splicedQuestion["choice" + (index + 1)] = choice;
              splicedQuestion.choices.push(choice);
            });
            return splicedQuestion;
          });
          setQuestions(insertQuestions);
          setError("no error");
        })
        .catch((err) => {
          setError(err.message);
          setPending(false);
        });
    }, 3000);
  }, []);

  const getClass = (i) => {
    if (!answerSelected) {
      return ``;
    }
    if (i === questions[idx].answer) {
      return `correct`;
    } else {
      return `incorrect`;
    }
  };

  return (
    <>
      <div className="container">
        {isPending && <div className="state">Loading...</div>}
      </div>
      {error === "no error" && (
        <div className="container">
          <p className="number">Question {idx + 1}</p>
          <h3 className="question">{questions[idx].question}</h3>
          <ul className="choices">
            {questions[idx].choices.map((choice, i) => (
              <li
                value={i}
                key={i}
                onClick={handleListItemClick}
                className={`${getClass(i)} button`}
              >
                {choice}
              </li>
            ))}
          </ul>
          <h5 className="score">Score:{score}</h5>
        </div>
      )}
    </>
  );
}
