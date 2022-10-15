import './App.css';
import UniversityMap from "./features/UniversityMap"
import {useState, createContext} from "react";
import {testMap} from "./data";
import {mapOfUniversity} from "./utils/mapOfUniversity";


export const TrackGraphContext = createContext(null);

function App() {
  const trackGraph = {}
  const [generatedMap, setGeneratedMap] =  useState(testMap);

  const updateItem = (id, updatedItem) => {
    const newMap = [...generatedMap]
    for(let i = 0; i < newMap.length; i++) {
      for(let j = 0; j < newMap[i].length; j++) {
        if(newMap[i][j].id === id){
          newMap[i][j] = updatedItem;
          setGeneratedMap(newMap);
        }
      }
    }  
  }

  return (
    <div className="App">
      <TrackGraphContext.Provider value={trackGraph} >
        <UniversityMap generatedMap={generatedMap} updateItem={updateItem}/>
      </TrackGraphContext.Provider>
    </div>
  );
}

export default App;
