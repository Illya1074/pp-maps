import React from 'react'
import styled from "styled-components"
import mapImage from '../assets/map.jpg';

// start 87d9f41e-cc03-47d3-af3b-767e0a6b1d8f
// finish 90eb818f-bb21-48e9-99e9-d63dca99f331



const ItemStyled = styled.div`
    width: 20px; 
    height: 20px; 
    background: ${props => props.isActive ? "red" : "transparent"};
    color: ${props => props.color ? "yellow" : "black"};
    cursor: pointer;
` 

const Item = ({item, onItemClick, onDrag, onDrop, highlightItems,wayItems}) => {
    const isHighlighted = highlightItems[item.id];
    const onDragOver = (e) => {
        let event = e;
        event.stopPropagation();
        event.preventDefault();
    }

    return <ItemStyled 
        onClick={() => onItemClick(item)} 
        onDragStart={() => onDrag(item)} 
        onDrop={() => onDrop(item)} 
        onDragOver={onDragOver}
        isActive={isHighlighted}
        color={wayItems.has(item.id)}
        draggable
    > 
        {item.id[0]}
    </ItemStyled>
} 

const Rows = ({generatedMap, onItemClick, onDrag, onDrop, highlightItems, wayItems}) => {
    return (
    <RowsStyled>
        {generatedMap.map((row, i) => 
            <Columns 
            key={i} 
            row={row} 
            onItemClick={onItemClick} 
            onDrag={onDrag} 
            onDrop={onDrop} 
            highlightItems={highlightItems}
            wayItems={wayItems}
            />
        )}
    </RowsStyled>
    )
}

const RowsStyled = styled.div`
    border: 3px solid black;
    background-image: url(${mapImage});
    background-size: cover;
`

const Columns = ({row, onItemClick, onDrag, onDrop, highlightItems, wayItems}) => {
    return <div style={{display: "flex"}}>
        {row.map((item, j) => 
            <Item 
            item={item} 
            key={item.id} 
            onItemClick={onItemClick} 
            onDrag={onDrag} 
            onDrop={onDrop} 
            wayItems={wayItems}
            highlightItems={highlightItems}/>
        )}
    </div>
}

const UniversityMap = ({generatedMap, onItemClick, onDrag, onDrop, highlightItems, wayItems}) => {
  return <Rows 
    generatedMap={generatedMap} 
    onItemClick={onItemClick} 
    onDrag={onDrag} 
    onDrop={onDrop} 
    highlightItems={highlightItems}
    wayItems={wayItems}
  />

}

export default UniversityMap
