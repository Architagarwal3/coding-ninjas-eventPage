import React from "react";
import "./App.css";
import Navbar from "./Navbar";
import Header from "./Header";
import Footer from "./Footer";
import Events from "./Events";
function App() {
  return (
    <div className="App">
      <Navbar />
      <Header />
      <Events />
      <Footer />
    </div>
  );
}

export default App;
