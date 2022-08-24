import React, { useState, useEffect, Fragment } from "react";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header/Header";
import Navbar from "./components/Navbar/Navbar";
import Movie from "./components/pages/Movie"
import Footer from "./components/Footer/Footer";
import AddFavorite from "./components/AddFavorite";
import Featured from "./components/Featured/Featured";
import SearchList from "./components/SearchList/SearchList";
import RemoveFavorite from './components/RemoveFavorite';
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import Signup from "./components/pages/Signup";
import Login from "./components/pages/Login";
import Home from "./components/pages/Home";
import SearchResults from "./components/pages/SearchResults";


/**************APOLLO Section ******************** */
const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

library.add(fab);

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});
/**************************************************** */

const App = () => {
    const [favorites, setfavorites] = useState("");
    const [searchValue, setSearchValue] = useState("");
  // useEffect(() => {
  //   const moviefavorites = JSON.parse(
  //     localStorage.getItem('movie-app2-favorites')
  //   )|| []

  //   setfavorites(moviefavorites);
  // }, []);

  // const saveToLocalStorage = (items) => {
  //   localStorage.setItem("movie-app2-favorites", JSON.stringify(items));
  // };

  // const addFavoriteMovie = (Movie) => {
  //   const newFavoriteList = [...AddFavorite, Movie];
  //   setfavorites(newFavoriteList);
  //   saveToLocalStorage(newFavoriteList);
  // };

  // const removeFavorites = (movie) => {
  //   const newFavoriteList = AddFavorite.filter(
  //     (Favorite) => Favorite.imdbID !== movie.imdbID
  //   );

  //   setfavorites(newFavoriteList);
  //   saveToLocalStorage(newFavoriteList);
  // };

  return (
    <ApolloProvider client={client}>
      <div className="App">
        <Router>
          <Fragment>
            <div id="header-bg">
              <Navbar/>
              <Header searchValue={searchValue} setSearchValue={setSearchValue}/>
            </div>
            <Routes>
              <Route exact path='/' element={<Home/>}/>
              <Route exact path='/signup' element={<Signup />} />
              <Route exact path='/login' element={<Login />} />
              <Route exact path='/movie' element={<Movie />} />
              <Route exact path ='/search' element = {<SearchResults/>}/>
            </Routes>
          </Fragment>
        </Router>
        <div>
        </div>
      </div>
      <Footer/>
    </ApolloProvider >
  );
};

export default App;