"use client";
import Layout from "./layout";
import NavBar from "./components/NavBar"

export default function Home() {
  return (
    <>
      <div style={{margin:70}}>
        <p style={{ color: "#005F6A", fontSize: 50}}>Welcome to The Marketplace!</p>
        <p>Click <a href="http://localhost:3000/posts" style={{ color:"blue" }}>Here</a> to view all posts</p>
      </div>
    </>
  );
}