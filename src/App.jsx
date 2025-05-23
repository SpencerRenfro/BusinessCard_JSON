import "./App.css";
import BusinessCard from "./BusinessCard";

function App() {
  return (
    <div className="app-container">
      <h1>Interactive Developer Business Card</h1>
      <BusinessCard
        name="Spencer Renfro"
        title="Software Developer"
        email="developer@spencerwrenfro.com"
      />
      <p className="instructions">
        Click the buttons below the card to flip it or print it
      </p>
    </div>
  );
}

export default App;
