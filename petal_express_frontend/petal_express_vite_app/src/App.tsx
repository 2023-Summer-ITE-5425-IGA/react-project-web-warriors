import React, {useEffect, useState} from "react";
import "./App.css";


interface FlowersProp {
  flowers: string[];
}

function App() {
  const [flowers, setFlowers] = useState<FlowersProp>({ flowers: [] });

useEffect(() => {
  fetch("http://localhost:5000/allflowers").then(
    response => response.json()
  ).then(
    data => {
      setFlowers(data);
    }
  )
},[])

  return (
    <>
      <h1>Welcome to Petal Express!</h1>
      {flowers.flowers.length ===0? (
        <p>Loading...</p>
      ):(
        flowers.flowers.map((flower,i)=>(
          <p key={i}>{flower}</p>
        ))
      )}
    </>
  );
}

export default App;
