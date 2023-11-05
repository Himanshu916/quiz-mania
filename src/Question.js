import Options from "./Options";
export default function Question({ question, answer, dispatch, points }) {
  console.log(points);
  return (
    <div>
      <h4>{question.question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}
