"use client";
import NavBar from "./components/NavBar";
import ReactDOM from "react-dom/client"
import {BrowserRouter, Routes, Route} from "react-router-dom"
import index from "./index"

export default function Home() {
  return (
    <html>
      <head>
      </head>
      <body>
        <div id="root"></div>
        <script src="/index.js"></script>
      </body>
    </html>
  );
}