// import "./styles.css";
import Header from "./Header";
import Main from "./Main";
import Loader from "./Loader";
import Error from "./Error";
import StartScreen from "./StartScreen";
import Question from "./Question";
import NextButton from "./NextButton";
import Progress from "./Progress";
import FinishScreen from "./FinishScreen";
import { useEffect, useReducer } from "react";
import { supabase } from "./services/supabase";
const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  quesType: "easy",
  questionsServer: [],
};

const reducer = function (state, action) {
  switch (action.type) {
    case "setCategory":
      return { ...state, quesType: action.payload };
    case "dataRecieved":
      return { ...state, questions: action.payload, status: "ready" };
    case "dataFailed":
      return { ...state, status: "error" };
    case "start":
      return { ...state, status: "active" };
    case "newAnswer":
      const question = state.questions.at(state.index);

      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    case "dataServer":
      return { ...state, questionsServer: action.payload };
    case "nextQuestion":
      return { ...state, index: state.index + 1, answer: null };
    case "finishQuiz":
      return {
        ...state,
        status: "finished",
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      };
    case "initial":
      return { ...state, status: "ready" };
    case "restartQuiz":
      return { ...state, index: 0, answer: null, points: 0, status: "ready" };
    default:
      throw new Error("Wrong Action");
  }
};

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const {
    questions,
    status,
    index,
    answer,
    points,
    highScore,
    quesType,
    questionsServer,
  } = state;

  const numQuestions = questions.length;
  const totalPoints = questions.reduce(
    (acc, question) => acc + question.points,
    0
  );
  console.log(totalPoints, "hereee", questionsServer);
  useEffect(
    function () {
      async function getQuestions() {
        try {
          // const response = await fetch("http://localhost:8000/questions");
          console.log(quesType, "hero hu");

          let { data, error } = await supabase
            .from(quesType + "Questions")
            .select("*");
          if (error) throw new Error(error.message);
          dispatch({ type: "dataRecieved", payload: data });
          // dispatch({ type: "dataServer", payload: easyQuestions });
        } catch (error) {
          // const data = await response.json();
          // dispatch({ type: "dataRecieved", payload: data });
          dispatch({ type: "dataFailed" });
        }
      }

      getQuestions();
    },
    [quesType]
  );

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "loading" && <Loader />}
        {status === "error" && <Error />}
        {status === "ready" && (
          <StartScreen
            dispatch={dispatch}
            numQuestions={numQuestions}
            quesType={quesType}
          />
        )}
        {status === "active" && (
          <>
            <Progress
              index={index}
              numQuestions={numQuestions}
              points={points}
              totalPoints={totalPoints}
              answer={answer}
            />
            <Question
              dispatch={dispatch}
              question={questions[index]}
              answer={answer}
              points={points}
            />
            <NextButton
              index={index}
              numQuestions={numQuestions}
              dispatch={dispatch}
              answer={answer}
            />
          </>
        )}
        {status === "finished" && (
          <>
            <FinishScreen
              points={points}
              totalPoints={totalPoints}
              highScore={highScore}
              dispatch={dispatch}
            />
          </>
        )}
      </Main>
    </div>
  );
}
