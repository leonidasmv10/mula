import { useLocation, useNavigate } from "react-router-dom";

function GameResultPage() {
  const location = useLocation(); // Para obtener los datos del estado de navegación
  const navigate = useNavigate();
  const { correctAnswers, totalQuestions } = location.state || {
    correctAnswers: 0,
    totalQuestions: 0,
  };

  // Función para reiniciar el juego
  const handlePlayAgain = () => {
    navigate("/game");
  };

  // Función para ver el ranking
  const handleViewRanking = () => {
    navigate("/ranking");
  };

  return (
    <div>
      <h2>Resultados del Juego</h2>
      <ScoreSummary
        correctAnswers={correctAnswers}
        totalQuestions={totalQuestions}
      />
      <PlayAgainButton onClick={handlePlayAgain} />
      <ViewRankingButton onClick={handleViewRanking} />
    </div>
  );
}

// Componente para mostrar el resumen de la puntuación
function ScoreSummary({ correctAnswers, totalQuestions }) {
  return (
    <div>
      <p>Respuestas Correctas: {correctAnswers}</p>
      <p>Respuestas Incorrectas: {totalQuestions - correctAnswers}</p>
    </div>
  );
}

// Componente para el botón de "Jugar otra vez"
function PlayAgainButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ margin: "10px" }}>
      Jugar Otra Vez
    </button>
  );
}

// Componente para el botón de "Ver Ranking"
function ViewRankingButton({ onClick }) {
  return (
    <button onClick={onClick} style={{ margin: "10px" }}>
      Ver Ranking
    </button>
  );
}

export default GameResultPage;
