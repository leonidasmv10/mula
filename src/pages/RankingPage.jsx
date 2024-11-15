import BaseLayout from "../components/layouts/BaseLayout";
import { useEffect, useState } from "react";
import CategoriesController from "../controllers/mula/categoriesController";
import TriviaController from "../controllers/mula/triviaController";
import UsersController from "../controllers/mula/usersController";

function RankingPage() {
  const categoriesController = new CategoriesController();
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [categories, setCategories] = useState([]);

  const triviaController = new TriviaController();
  const [ranking, setRanking] = useState([]);

  const usersController = new UsersController();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoriesController.get();
        console.log(data);
        setCategories(data);

        try {
          // Obtén el ranking directamente
          const dataT = await triviaController.get_ranking(selectedCategory);
          setRanking(dataT); // Actualiza el estado de ranking
          console.log(dataT);

          // Obtén los usuarios basándote en dataT directamente
          const usersList = [];
          for (const entry of dataT) {
            console.log("ID: " + entry.userId);
            const user = await usersController.getById(entry.userId);
            usersList.push({ ...entry, user });
          }

          setUsers(usersList); // Actualiza el estado de usuarios
          console.log(usersList);
        } catch (error) {
          console.error("Error al actualizar el ranking y usuarios:", error);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = async (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedCategory(isNaN(selectedValue) ? null : selectedValue);

    try {
      // Obtén el ranking
      const dataT = await triviaController.get_ranking(selectedValue);
      console.log("Respuesta de get_ranking:", dataT);

      // Asegúrate de que sea un array
      if (!Array.isArray(dataT)) {
        console.error("El ranking no es un array:", dataT);
        setRanking([]);
        setUsers([]);
        return;
      }

      setRanking(dataT); // Actualiza el ranking

      // Obtén los usuarios basándote en dataT
      const usersList = [];
      for (const entry of dataT) {
        console.log("ID: " + entry.userId);
        const user = await usersController.getById(entry.userId);
        usersList.push({ ...entry, user });
      }

      setUsers(usersList); // Actualiza los usuarios
      console.log(usersList);
    } catch (error) {
      console.error("Error al actualizar el ranking y usuarios:", error);
    }
  };

  return (
    <>
      <BaseLayout>
        <h1>Ranking de Trivia</h1>
        <h4>Selecciona Categoria</h4>
        <select
          className="form-select"
          aria-label="Default select example"
          value={selectedCategory ?? ""}
          onChange={handleCategoryChange}
        >
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>

        <ul>
          {users.map((item, index) => (
            <li key={index}>
              {item.user?.username || "Usuario desconocido"}:{" "}
              {item.averageCorrectAnswers} puntos
            </li>
          ))}
        </ul>
      </BaseLayout>
    </>
  );
}

export default RankingPage;
