import { useState } from "react";
import Header from "./Components/Header";
import Recipelist from "./Components/Recipelist";
import { fetchData } from "./Components/Service";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Components/Home";
import About from "./Components/About";
import Login from "./Components/Login";
import Recipes from "./Components/Recipes";
import Register from "./Components/Register";
import ProtectedRoute from "./Components/ProtectedRoute";
import ShoppingList from "./Components/ShoppingList";

function App() {
  const [query, setQuery] = useState("chicken");
  const [data, setData] = useState("");
  const [searchedTerm, setSearchedTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Authentication state

  const searchrecipe = (searchquery) => {
    fetchData(searchquery).then((response) => {
      setData(response);
      console.log(response);
    });
  };

  return (
    <Router>
      <Header
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
      />
      <Routes>
        {/* Public Routes */}
        <Route
          path="/"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        />
        <Route path="/register" element={<Register />} />

        {/* Protected Routes */}
        <Route
          path="/home"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/about"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <About />
            </ProtectedRoute>
          }
        />
        <Route
          path="/recipe"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Recipelist
                query={query}
                setQuery={setQuery}
                data={data}
                setData={setData}
                searchedTerm={searchedTerm}
                setSearchedTerm={setSearchedTerm}
                searchrecipe={searchrecipe}
              />
            </ProtectedRoute>
          }
        />
        <Route
          path="/myrecipes"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <Recipes />
            </ProtectedRoute>
          }
        />
        <Route
          path="/shoppinglist"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ShoppingList />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
