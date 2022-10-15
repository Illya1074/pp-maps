import { v4 as uuidv4 } from 'uuid'


const defaultItem = () => ({
    val: 0,
    id: uuidv4(),
  })

export const mapOfUniversity = (rows, columns) => {
    const map = [];
  
    for(let i = 0; i < rows; i++) {
      map.push([]);
      for(let j = 0; j < columns; j++){
        map[i].push(defaultItem());
      }
    }
  
    return map
  }
  