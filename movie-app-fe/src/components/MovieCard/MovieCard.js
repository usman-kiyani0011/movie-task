import React, { useState } from "react";
import { Rate } from 'antd';
import { ShowToast } from "../../components/ShowToast/ShowToast";
import { postApi } from "../../api/api";
import "./MovieCard.scss";

const MovieCard = ({ data, rate = true }) => {
  const [rating, setRating] = useState(data.avgRating); // Initial rating

  const handleChange = (value) => {
    setRating(value);
  };
  const addRating = async () => {
    try {
      await postApi(`/movies/add-rating`, { movieId: data?._id, rating });
    } catch (error) {
      ShowToast(error?.response?.data?.message, "error");
    }
  }
  return (
    <div className="card-item">
      <div className="card-inner">
        <div className="class-top">
          <img src={data.poster} alt={data.name} />
        </div>
        <div className="card-bottom">
          <div className="card-info flex flex-col justify-between">
            <h4>{data.name}</h4>
            <p>Ratings {data.avgRating}</p>
            {rate &&

              <div className="flex flex-col gap-2">
                <Rate
                  value={rating}
                  count={5}
                  allowClear
                  character="&#9733;"
                  onChange={handleChange}
                  style={{ background: "white" }}
                  className="rounded"
                />
                <button
                  className={`bg-blue-500 text-white font-bold py-2 px-4 rounded ${rating ? "cursor-pointer" : 'cursor-not-allowed'}`}
                  disabled={rating > 0 ? false : true}
                  onClick={() => addRating()}
                >
                  Rate
                </button>
              </div>
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;
