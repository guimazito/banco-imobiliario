import React from "react";
import Home from "./Home";
import NewGame from "./NewGame";
// import NoPage from "./pages/NoPage";
import { BrowserRouter, Routes, Route, Router } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/new-game" element={<NewGame />} />
          {/* <Route path="*" element={<NoPage />} />  */}
      </Routes>
    </BrowserRouter>
  );
}