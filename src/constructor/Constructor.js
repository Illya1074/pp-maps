import React, {useState, useEffect} from 'react'
import UniversityMap from "../features/UniversityMap";
import {CreateMapGraph} from "../services/createMapGraph";
import {testMap} from "../data";
import {findTheFastestWay} from "../services/findTheFastestWay";

const mapGraph = new CreateMapGraph();
const mapArray = testMap;
const MapGraphFromLocalStorage = JSON.parse(localStorage.getItem("mapGraph")) || {};
console.log(MapGraphFromLocalStorage)

const Constructor = () => {

  const [onDragValue, setOnDragValue] = useState(null);
  const [onDropValue, setOnDropValue] = useState(null);
  const [way, setWay] = useState(new Set());

  useEffect(() => {
    if(onDropValue){
        mapGraph.connectItems(onDragValue, onDropValue);
        setOnDragValue(null);
        setOnDropValue(null);
    }
  },[onDropValue, onDragValue]);

  return (
    <>
        <UniversityMap 
            generatedMap={mapArray} 
            onDrag={(item) => requestIdleCallback(() => setOnDragValue(item))} 
            onDrop={(item) => requestIdleCallback(() => setOnDropValue(item))}
            onItemClick={(item) => {
              console.log(item);
              mapGraph.addMapItemToGraph({...item, neighboursIds : {}})
            }}
            // highlightItems={mapGraph.mapOfItems}
            highlightItems={MapGraphFromLocalStorage}
            wayItems={way}
        />
        <button onClick={() => {
          localStorage.setItem("mapGraph", JSON.stringify(mapGraph.mapOfItems))
          }}>Save to storage</button>
        <button onClick={() => console.log(JSON.parse(localStorage.getItem("mapGraph")))}>console the map</button>
        <button onClick={() => setWay(findTheFastestWay(
            { 
              mapOfItems: MapGraphFromLocalStorage, 
              fromId:"92e12db5-72a2-452e-bcea-c9c0b8a3c5fa" , 
              toId:"c68b1b6d-039f-41f0-b502-2107425b5291" 
            }
          ))
        }>
          find the way
        </button>
    </>
  )
}

export default Constructor