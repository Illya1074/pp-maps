
export class CreateMapGraph {
    constructor(){
        this.entryPoint = null;
        this.mapOfItems = {};
    }

    addMapItemToGraph = (item) => {
        if(!this.entryPoint){
            this.entryPoint = item;
            this.mapOfItems[item.id] = item;
        }
    }

    connectItems = (from, item) => {
        const fromItem = this.mapOfItems[from.id]; 

        if(!fromItem){
            console.log(fromItem, from);
            return;
        } 

        const withItem = this.mapOfItems[item.id] || {...item, neighboursIds: {[fromItem.id]:fromItem.id}}; 
        console.log(fromItem, withItem)
        
        if(fromItem && withItem){
            console.log(fromItem.id, withItem.id)
            fromItem.neighboursIds[withItem.id] = withItem.id;
            withItem.neighboursIds[fromItem.id] = fromItem.id;
            this.mapOfItems[withItem.id] = withItem;
        } 

        console.log(this.mapOfItems);
    }

}
