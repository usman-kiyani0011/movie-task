import "./App.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./components/Home/Home";
import MovieDetails from "./components/MovieDetails/MovieDetails";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import Footer from "./components/Footer/Footer";
import SignUp from "./components/SignUp/SignUp";
import SignIn from "./components/SignIn/SignIn";
import ReccomendedMovieListing from "./components/RecommendedMovies/RecommendedMovies";
import UpdateProfile from "./components/UpdateProfile/UpdateProfile";

function App() {
  return (
    <div className="App">
      <BrowserRouter>

        <div className="">
          <Routes>
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/signin" element={<SignIn />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/recomended-movies" element={<ReccomendedMovieListing />} />
            <Route path="/profile" element={<UpdateProfile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
