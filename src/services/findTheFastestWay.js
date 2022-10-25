import {Queue} from "../utils/queue";

const scanGraph = ({mapOfItems, toId, visitiedNeighbours, queue, parents}) => {
    const fromItem = mapOfItems[queue.peek()];

    if(!fromItem){
        return false;
    }
    
    updateParents({item: fromItem, visitiedNeighbours, parents});

    for (const [key] of Object.entries(fromItem.neighboursIds)) {
        const id = key;
        if(id === toId){
            return true;
        }
    }

    addNeighboursToQueue(queue, fromItem, visitiedNeighbours);
    visitiedNeighbours[fromItem.id] = fromItem.id;
    queue.dequeue();
    
    if(queue.length === 0){
        return false;
    }

    return scanGraph({mapOfItems, toId, visitiedNeighbours, queue, parents});
} 

const updateParents = ({item, visitiedNeighbours, parents}) => {
    for (const [key] of Object.entries(item.neighboursIds)) {
        const id = key;
        if(!visitiedNeighbours[id]){
            const rest = parents[item.id] ? parents[item.id] : [];
            parents[item.id] = [
                ...rest,
                id,
            ];
        }
    }
}

const addNeighboursToQueue = (queue, item, visitiedNeighbours) => {

    for (const [key] of Object.entries(item.neighboursIds)) {
        const id = key;
        if(!visitiedNeighbours[id]){
            console.log({parent: item, children: id})
            queue.enqueue(id);
        }
    }
}

const initQueue = (item) => {
    const queue = new Queue(); 
    
    queue.enqueue(item.id);

    return queue;
}

export const findTheFastestWay = ({mapOfItems, fromId, toId}) => {
    const visitiedNeighbours = {};
    const parents = {}
    const queue = initQueue(mapOfItems[fromId]);
    const ways = []
    const waySet = new Set();

    visitiedNeighbours[fromId] = fromId;    

    scanGraph({mapOfItems, fromId, toId, visitiedNeighbours, queue, parents})
    findWays({parents, id: fromId, currentWay: [fromId], ways, toId})

    ways.forEach((way) => {
        way.forEach((id) => {
            waySet.add(id);
        })
    })

    return waySet;
}


const findWays = ({parents, id, currentWay, ways, toId}) => {
    const item = parents[id];

    if(!item){
        return
    }

    item.forEach((id) => {
        const updatedWay = [...currentWay, id];

        if(!parents[toId] && id === toId){
            ways.push(updatedWay)
        }

        return findWays({parents, id, currentWay: updatedWay, ways, toId})
    })
}