export default function Options({ dispatch, answer, question }) {
  const hasAnswered = answer !== null;
  // const point = index === question.correctOption ? question.points : 0;e
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          key={index}
          disabled={hasAnswered}
          onClick={() =>
            dispatch({
              type: "newAnswer",
              payload: index,
            })
          }
          className={`btn btn-option ${index === answer ? "red" : ""} ${
            hasAnswered
              ? index === question.correctOption
                ? "correct"
                : ""
              : ""
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
