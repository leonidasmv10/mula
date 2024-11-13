import React from "react";
import {
  LightbulbIcon,
  BookIcon,
  GlobeIcon,
  //   MagnifyingGlassIcon,
} from "lucide-react";
import { useGetUser } from "../hooks/useGetUser";

const TriviaGameBootstrap = () => {
  const { user, setUser } = useGetUser();

  return (
    <div className="card">
      <div className="card-header">
        <h5 className="card-title">Menú</h5>
      </div>
      <div className="card-body">
        <div className="d-flex justify-content-center align-items-center">
          <div className="position-relative">
            <img src="/mula_savia.webp" className="img-fluid" alt="..."></img>
            {/* <img src="/mula_savia.webp" className="rounded mx-auto d-block" alt="..."></img> */}
          </div>
        </div>
        <div className="row row-cols-3 g-4 mt-4">
          {user && (
            <div className="col">
              <button className="btn btn-primary w-100">
                <LightbulbIcon className="w-8 h-8" />
                <h6>Jugar</h6>
              </button>
            </div>
          )}

          <div className="col">
            <button className="btn btn-success w-100">
              <BookIcon className="w-8 h-8" />
              <h6>Ranking</h6>
            </button>
          </div>
          <div className="col">
            <button className="btn btn-warning w-100">
              <GlobeIcon className="w-8 h-8" />
            </button>
          </div>
          {/* <div className="col">
            <button className="btn btn-purple w-100">
              <MagnifyingGlassIcon className="w-8 h-8" />
            </button>
          </div> */}
          <div className="col">
            <button className="btn btn-danger w-100">
              <LightbulbIcon className="w-8 h-8" />
            </button>
          </div>
          <div className="col">
            <button className="btn btn-info w-100">
              <BookIcon className="w-8 h-8" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TriviaGameBootstrap;
