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
  const [personalStats, setPersonalStats] = useState(null);
  const [categoryStats, setCategoryStats] = useState([]);

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

      {/* Verificar si hay estadísticas personales */}
      {personalStats && personalStats.length > 0 ? (
        <PersonalStatsSummary stats={personalStats[0]} />
      ) : (
        <p>No hay estadísticas disponibles. ¡Comienza a jugar!</p>
      )}

      <br></br>

      {/* Verificar si hay estadísticas por categoría */}
      {categoryStats.length > 0 ? (
        <CategoryStatsTable stats={categoryStats} categories={categories} />
      ) : (
        <p>
          No hay estadísticas disponibles por categoría. ¡Juega en diferentes
          categorías para obtener estadísticas!
        </p>
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

const CategoryStatsTable = ({ stats, categories }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>Categoría</th>
          <th>Media de Respuestas Correctas</th>
        </tr>
      </thead>
      <tbody>
        {stats.length > 0 ? (
          stats.map((categoryStat, index) => {
            // Encuentra el nombre de la categoría usando el categoryId
            const categoryName = categories.find(
              (category) => category.id === categoryStat.categoryId
            )?.name;

            return (
              <tr key={index}>
                <td>{categoryName || "Categoría desconocida"}</td>
                <td>{categoryStat.averageCorrectAnswers}</td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan="2">No hay estadísticas disponibles para mostrar.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};
