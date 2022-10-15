import React from 'react'
import styled from "styled-components"

// start 87d9f41e-cc03-47d3-af3b-767e0a6b1d8f
// finish 90eb818f-bb21-48e9-99e9-d63dca99f331

const ItemStyled = styled.div`
    width: 20px; 
    height: 20px; 
    background: ${props => props.isActive ? "red" : "#eee"};
    cursor: pointer;
` 

const Item = ({item, updateItem}) => {
    // onClick={() => updateItem(item.id, {...item, val:1})}
    return <ItemStyled isActive={item.val} onClick={() => console.log(item)}> 
        {item.val}
    </ItemStyled>
} 

const Rows = ({generatedMap, updateItem}) => {
    return (
    <>
        {generatedMap.map((row, i) => 
            <Columns key={i} row={row} updateItem={updateItem}/>
        )}
    </>
    )
}

const Columns = ({row, updateItem}) => {
    return <div style={{display: "flex"}}>
        {row.map((item, j) => 
            <Item item={item} key={item.id} updateItem={updateItem}/>
        )}
    </div>
}

const UniversityMap = ({generatedMap, updateItem}) => {
    console.log(generatedMap);
  return <Rows generatedMap={generatedMap} updateItem={updateItem}/>
}

export default UniversityMap
