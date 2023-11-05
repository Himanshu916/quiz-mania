import React from "react";

export default function FinishScreen({
  points,
  totalPoints,
  highScore,
  dispatch,
}) {
  const percentage = (points / totalPoints) * 100;
  return (
    <>
      <p className="result">
        You Scored {points} out of {totalPoints} ({Math.round(percentage)}%)
      </p>
      <p className="highscore">(highScore : {highScore})</p>
      <button
        onClick={() => dispatch({ type: "restartQuiz" })}
        className="btn btn-ui"
      >
        Restart
      </button>
    </>
  );
}
