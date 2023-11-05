import React from "react";

export default function NextButton({ answer, dispatch, numQuestions, index }) {
  if (answer === null) return null;

  if (index < numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "nextQuestion" })}
        className="btn btn-ui"
      >
        Next
      </button>
    );

  if (index === numQuestions - 1)
    return (
      <button
        onClick={() => dispatch({ type: "finishQuiz" })}
        className="btn btn-ui"
      >
        Finish Quiz
      </button>
    );
}
