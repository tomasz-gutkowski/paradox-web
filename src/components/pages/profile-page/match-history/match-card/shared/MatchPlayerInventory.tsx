import type {IdNamePair} from "../../../utilities/ProfileTypes.ts";
import {getItemIconUrl} from "../../../utilities/constants.ts";

const styles = {
    items: "my-8 flex items-start justify-start",
    itemCell: "w-8 h-8 border-1",
    emptyItemSlot: "bg-graphite-200"
}
function MatchPlayerInventory({items, version, size} : {items : IdNamePair[], version : string, size : number}) {
    let itemAmount = size;
    const itemsComponent = items.map(i => {
        if(itemAmount-- <= 0) return;
        if(i.id > 0) return<div key={itemAmount+"_"+i.id} className={styles.itemCell}><img src={getItemIconUrl(version, i.id)}></img></div>;
        else return <div key={itemAmount+"_"+i.id} className={styles.itemCell+" "+styles.emptyItemSlot}></div>;
    });

    return (<div className={styles.items}>
            {itemsComponent}
            </div>
    );
}

export default MatchPlayerInventory;