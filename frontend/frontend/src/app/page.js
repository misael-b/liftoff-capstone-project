"use client";
import Layout from "./layout";
import ReactDOM from "react-dom/client"
import {BrowserRouter, Routes, Route} from "react-router-dom"

export default function Home() {
  return (
    <>
        <Layout />
        <div><p>this is a test</p></div>
    </>
  );
}