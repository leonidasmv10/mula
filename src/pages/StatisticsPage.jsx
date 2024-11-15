import BaseLayout from "../components/layouts/BaseLayout";
import { useEffect, useState } from "react";
import CategoriesController from "../controllers/mula/categoriesController";
import TriviaController from "../controllers/mula/triviaController";
import { getUserFromToken } from "../services/auth";

function StatisticsPage() {
  const categoriesController = new CategoriesController();
  const triviaController = new TriviaController();
  const user = getUserFromToken();

  const [categories, setCategories] = useState([]);
  const [personalStats, setPersonalStats] = useState(null); // Estadísticas generales
  const [categoryStats, setCategoryStats] = useState([]); // Estadísticas por categoría

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoriesController.get();
        console.log(data);
        setCategories(data);

        const generalStats = await triviaController.get_user_stats(user.UserId);
        console.log("General Stats:", generalStats);
        setPersonalStats(generalStats);

        const categoryStatsData =
          await triviaController.get_user_category_stats(user.UserId);
        console.log("Category Stats:", categoryStatsData);
        setCategoryStats(categoryStatsData);
      } catch (error) {
        console.error("Error al obtener estadísticas:", error);
      }
    };

    fetchData();
  }, [user.UserId]);

  return (
    <BaseLayout>
      <h2>Mis Estadísticas</h2>

      {personalStats && <PersonalStatsSummary stats={personalStats[0]} />}

      <br></br>
      {categoryStats.length > 0 ? (
        <CategoryStatsTable stats={categoryStats} />
      ) : (
        <p>No hay estadísticas disponibles por categoría.</p>
      )}
    </BaseLayout>
  );
}

export default StatisticsPage;

const PersonalStatsSummary = ({ stats }) => {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">Resumen General</h5>
        <p className="card-text">
          Media de Respuestas Correctas: {stats.averageCorrectAnswers}
        </p>
        <p className="card-text">
          Total de Partidas Jugadas: {stats.totalGamesPlayed}
        </p>
        <p className="card-text">Porcentaje de Éxito: {stats.successRate}%</p>
      </div>
    </div>
  );
};

const CategoryStatsTable = ({ stats }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Categoría ID</th>
          <th>Media de Respuestas Correctas</th>
        </tr>
      </thead>
      <tbody>
        {stats.map((categoryStat, index) => (
          <tr key={index}>
            <td>{categoryStat.categoryId}</td>
            <td>{categoryStat.averageCorrectAnswers}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
