import React, { useState } from "react";
import MuiAlert from "@material-ui/lab/Alert";
import { useNavigate } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function App() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  let navigate = useNavigate();

  var name = "fritzy";
  var psswrd = "12345";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name === username && psswrd === password) {
      navigate("/home");
    } else {
      setError(true);
    }
  };

  return (
    <div className="App">
      <h1>Trivia</h1>
      <form className="inputCreds">
        <input
          type="text"
          value={username}
          className="creds"
          placeholder="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="text"
          value={password}
          className="creds"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" onClick={handleSubmit}>
          submit
        </button>
        {error && (
          <Alert severity="error" onClick={() => setError(null)}>
            {" "}
          </Alert>
        )}
      </form>
    </div>
  );
}

/**
 * 
 * 
Task title - Build a trivia game. 

A user will land on a page which contains a question and relevant choices. 
The user can log in using email password.

The user can either see his history or play a new game.

If user selects to play a game - 
The user will select a choice and click next. At the end of the quiz, a final score will be displayed.

If user sees his history -
He can see scores of his past games. (Only scores, nothing else required.)

Constraints

It is compulsory to answer each question.
They cannot change any of the previously answered question.


No of questions - 5
Open trivia api - https://opentdb.com/api_config.php
 * 
 */
