import React from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import "./style/darkMode.css";
import "./style/lightMode.css";
import Footer from "./components/footer";
import Header from "./components/header";
import { createContext, useState } from "react";
import About from "./components/about";
import { Route, Routes } from "react-router-dom";
import FavCards from "./components/favCards";
import MyCards from "./components/myCards";
import Sandbox from "./components/sandbox";
import Register from "./components/register";
import Login from "./components/login";
import Main from "./components/main";
import Logout from "./components/logout";
import EditUser from "./components/editUser";
import NewCard from "./components/newCard";
import DeleteCard from "./components/deleteCard";
import EditCard from "./components/editCard";
import BusinessPage from "./components/businessPage";

export const ThemeContext = createContext(null);

function App() {
  const [theme, setTheme] = useState("light");
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <div className="app d-flex flex-column min-vh-100" id={theme}>
        <header className="pb-3">
          <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>
        <main className="flex-fill container">
          <Routes>
            <Route path="/" element={<Main searchTerm={searchTerm} />} />
            <Route path="/about" element={<About />} />
            <Route path="/fav-cards" element={<FavCards />} />
            <Route path="/my-cards" element={<MyCards />} />
            <Route path="/business-page/:id" element={<BusinessPage />} />
            <Route path="/sandbox" element={<Sandbox />} />
            <Route path="/register" element={<Register redirect="/main" />} />
            <Route path="/login" element={<Login redirect="/main" />} />
            <Route path="/main" element={<Main searchTerm={searchTerm} />} />
            <Route path="/logout" element={<Logout />} redirect="/main" />
            <Route
              path="/create-card"
              element={<NewCard redirect="/my-cards" />}
            />
            <Route path="/delete-card/:id" element={<DeleteCard />} />
            <Route path="/edit-card/:id" element={<EditCard />} />
            <Route path="/edit-user/:id" element={<EditUser />} />
            <Route path="*" element={<Main searchTerm={searchTerm} />} />
          </Routes>
        </main>
        <footer className="position-sticky bottom-0">
          <Footer />
        </footer>
        <ToastContainer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
