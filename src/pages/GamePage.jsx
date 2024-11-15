import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import BaseLayout from "../components/layouts/BaseLayout";
import TriviaController from "../controllers/mula/triviaController";
import { useGetUser } from "../hooks/useGetUser";

function GamePage() {
  const triviaController = new TriviaController();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const categoryId = searchParams.get("category_id");
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState([]);
  const [timer, setTimer] = useState(60);
  const { user, getUser } = useGetUser();

  useEffect(() => {
    getUser();
  }, []);

  // Temporizador que se resetea con cada pregunta
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      handleNextQuestion();
    }
  }, [timer]);

  // Cargar preguntas y mezclarlas una sola vez
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await triviaController.get_questions(
          categoryId === "1" ? 0 : parseInt(categoryId, 10) + 7
        );
        // Mezcla las opciones de cada pregunta antes de establecer el estado
        const shuffledQuestions = data.map((question) => ({
          ...question,
          options: shuffleArray([
            ...question.incorrectAnswers,
            question.correctAnswer,
          ]),
        }));
        setQuestions(shuffledQuestions);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  // Función para avanzar a la siguiente pregunta
  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setTimer(60); // Reinicia el temporizador
    } else {
      // Calcular respuestas correctas y redirigir a GameResultPage
      const correctAnswers = userAnswers.filter(
        (answer) => answer.isCorrect
      ).length;

      const nQuestions = questions.length;
      const gameResult = {
        userId: user.UserId,
        correctAnswers: correctAnswers,
        categoryId: categoryId,
        date: new Date().toISOString(),
      };
      await triviaController.create_game_result(gameResult);
      navigate("/game_result", {
        state: { correctAnswers, totalQuestions: nQuestions, categoryId },
      });
    }
  };

  // Función para registrar la respuesta del usuario y verificar si es correcta
  const handleAnswer = (answer) => {
    const correctAnswer = questions[currentQuestionIndex].correctAnswer;
    const isCorrect = answer === correctAnswer;

    // Mostrar en consola si es correcto o no
    console.log(isCorrect ? "Respuesta correcta" : "Respuesta incorrecta");

    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      { question: questions[currentQuestionIndex].question, answer, isCorrect },
    ]);
    handleNextQuestion();
  };

  return (
    <BaseLayout>
      <h2>Game</h2>
      {questions.length > 0 ? (
        <>
          <QuestionDisplay
            question={questions[currentQuestionIndex]}
            handleAnswer={handleAnswer}
          />
          <Timer time={timer} />
          <GameProgress
            current={currentQuestionIndex + 1}
            total={questions.length}
          />
        </>
      ) : (
        <p>Cargando preguntas...</p>
      )}
    </BaseLayout>
  );
}

// Función para barajar las opciones solo una vez
function shuffleArray(array) {
  return array.sort(() => Math.random() - 0.5);
}

// Componente para mostrar la pregunta y las opciones de respuesta (ya mezcladas)
function QuestionDisplay({ question, handleAnswer }) {
  return (
    <div>
      <h4>{question.question}</h4>
      <ul>
        {question.options.map((option, idx) => (
          <AnswerOption key={idx} option={option} handleAnswer={handleAnswer} />
        ))}
      </ul>
    </div>
  );
}

// Componente de cada opción de respuesta
function AnswerOption({ option, handleAnswer }) {
  return (
    <li onClick={() => handleAnswer(option)} style={{ cursor: "pointer" }}>
      {option}
    </li>
  );
}

// Componente del temporizador
function Timer({ time }) {
  return (
    <div>
      <p>Tiempo restante: {time} segundos</p>
    </div>
  );
}

// Componente para mostrar el progreso del juego
function GameProgress({ current, total }) {
  return (
    <div>
      <p>
        Pregunta {current} de {total}
      </p>
      <progress value={current} max={total}></progress>
    </div>
  );
}

export default GamePage;
