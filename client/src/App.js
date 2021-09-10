import React from "react";
import "./App.css";
import AppChild from './AppChild';
import AppState from './context/app/AppState';



function App() {
  return (
    <AppState>
     <AppChild/>
    </AppState>
  );
}

export default App;
