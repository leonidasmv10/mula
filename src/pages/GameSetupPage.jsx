import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BaseLayout from "../components/layouts/BaseLayout";
import { CirclePlay } from "lucide-react";
import CategoriesController from "../controllers/mula/categoriesController";

function GameSetupPage() {
 
  const categoriesController = new CategoriesController();
  const [selectedCategory, setSelectedCategory] = useState(1);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await categoriesController.get();
        setCategories(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const handleCategoryChange = (event) => {
    const selectedValue = parseInt(event.target.value, 10);
    setSelectedCategory(isNaN(selectedValue) ? null : selectedValue);
  };

  return (
    <>
      <BaseLayout>
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
        <br></br>
        {selectedCategory && (
          <p>
            Categoría seleccionada:{" "}
            {categories.find((cat) => cat.id === selectedCategory)?.name}
          </p>
        )}

        <Link to={`/game?category_id=${selectedCategory}`}>
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
