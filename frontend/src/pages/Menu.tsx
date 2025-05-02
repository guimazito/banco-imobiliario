import React from 'react';
import { Outlet, Link } from "react-router-dom";

export default function Menu() {
  return (
    <>
      <nav>
        <ul>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/form">Formulário</Link>
          </li>
          <li>
            <Link to="/formList">Lista de Usuários</Link>
          </li>
          <li>
            <Link to="/adm2">Adm2</Link>
          </li>
          <li>
            <Link to="/adm">Adm</Link>
          </li>
          <li>
            <Link to="/new-game">New Game</Link>
          </li>
        </ul>
      </nav>

      <Outlet />
    </>
  )
};