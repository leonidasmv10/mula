import React from "react";
import {
  CirclePlay,
  BookIcon,
  GlobeIcon,
  //   MagnifyingGlassIcon,
} from "lucide-react";
import { useGetUser } from "../hooks/useGetUser";
import { Link } from "react-router-dom";

const TriviaOptions = () => {
  const { user, setUser } = useGetUser();

  return (
    <div className="row row-cols-3 g-4 mt-4">
      {user && (
        <div className="col">
          <Link to="/game_setup">
            <button className="btn btn-primary w-100">
              <CirclePlay className="w-8 h-8" />
              <h6>Jugar</h6>
            </button>
          </Link>
        </div>
      )}

      <div className="col">
        <Link to="/ranking">
          <button className="btn btn-success w-100">
            <GlobeIcon className="w-8 h-8" />
            <h6>Ranking</h6>
          </button>
        </Link>
      </div>
      {user && (
        <div className="col">
          <Link to="/statistics">
            <button className="btn btn-warning w-100">
              <BookIcon className="w-8 h-8" />
              <h6>Estadisticas</h6>
            </button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default TriviaOptions;
