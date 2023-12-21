export default function StartScreen({ dispatch, quesType }) {
  console.log(quesType);
  return (
    <div className="start">
      <h2>Welcome to The React Quiz!</h2>

      <div className="flex-vertical">
        <h2>Choose Level :</h2>
        <div className="flex">
          <button
            onClick={() => dispatch({ type: "setCategory", payload: "easy" })}
            className={`btn ${quesType === "easy" ? "active" : ""} `}
          >
            Easy
          </button>
          <button
            onClick={() => dispatch({ type: "setCategory", payload: "medium" })}
            className={`btn ${quesType === "medium" ? "active" : ""} `}
          >
            Medium
          </button>
          <button
            onClick={() => dispatch({ type: "setCategory", payload: "hard" })}
            className={`btn ${quesType === "hard" ? "active" : ""} `}
          >
            Hard
          </button>
        </div>
      </div>

      {/* <h3>{numQuestions} questions to test your React mastery</h3> */}
      <button
        disabled={!quesType}
        onClick={() => dispatch({ type: "start" })}
        className="btn btn-ui"
      >
        Start
      </button>
    </div>
  );
}
