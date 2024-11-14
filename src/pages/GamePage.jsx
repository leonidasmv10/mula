import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import BaseLayout from "../components/layouts/BaseLayout";
import TriviaController from "../controllers/mula/triviaController";

function GamePage() {
  const triviaController = new TriviaController();
  const [searchParams] = useSearchParams();
  const categoryId = searchParams.get("category_id");
  const [questions, setQuestions] = useState([]); // Estado para almacenar las preguntas

  const gameResult = {
    userId: 1,
    correctAnswers: 8,
    categoryId: 9,
    date: "2024-11-14T15:30:00",
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("ID: " + categoryId);

        const data = await triviaController.get_questions(
          categoryId === "1" ? 0 : parseInt(categoryId, 10) + 7
        );

        console.log(data);
        setQuestions(data); // Guarda las preguntas en el estado
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchData();
  }, [categoryId]);

  return (
    <>
      <BaseLayout>
        <h2>Game</h2>
        <div>
          {/* Renderiza las preguntas si existen */}
          {questions.length > 0 ? (
            questions.map((question, index) => (
              <div key={index}>
                <h4>{question.question}</h4>
                <ul>
                  <li>{question.correctAnswer}</li>
                  {question.incorrectAnswers.map((option, idx) => (
                    <li key={idx}>{option}</li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <p>Cargando preguntas...</p>
          )}
        </div>
      </BaseLayout>
    </>
  );
}

export default GamePage;
