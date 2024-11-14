import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BaseLayout from "../components/layouts/BaseLayout";
import { CirclePlay } from "lucide-react";
import CategoriesController from "../controllers/mula/categoriesController";
import OpenTriviaController from "../controllers/openTriviaController";

function GameSetupPage() {
  const openTriviaController = new OpenTriviaController();
  const categoriesController = new CategoriesController();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoriesController.get();
        setCategories(data);
        const dataT = await openTriviaController.getTrivia(9);
        console.log(dataT);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <BaseLayout>
        <h4>Selecciona Categoria</h4>
        <select className="form-select" aria-label="Default select example">
          <option value="">Seleccione una categoría</option>
          {/* Mapea las categorías al <select> */}
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <br></br>

        <Link to="/game">
          <button className="btn btn-success w-100">
            <CirclePlay className="w-8 h-8" />
            <h6>Jugar</h6>
          </button>
        </Link>
      </BaseLayout>
    </>
  );
}

export default GameSetupPage;
