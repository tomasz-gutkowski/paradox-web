import type {ArenaModeData, PlayerDisplayInfo} from "../../../utilities/ProfileTypes.ts";
import {getAugmentIconUrl, getChampionIconUrl, getItemIconUrl} from "../../../utilities/constants.ts";


type props = {
    playerDisplayInfo: PlayerDisplayInfo,
    version: string,
    maxTeamDamage: number,
    isInTopHalf: boolean,
}

const styles = {
    component: "flex flex-row font-default-light text-graphite-900 h-12 font-bold",
    itemsCol: "flex flex-col items-center justify-center",
    placement: "w-5 h-5 bg-graphite-200 ml-1 mr-1 my-3.5 flex justify-center items-center rounded",
    champIcon: "w-10 h-10 rounded-full my-1",
    gameName : "p-2 truncate w-38",
    kda: "px-2 w-25",
    dmg: "px-3 w-20",
    augments: "grid grid-cols-3 items-center justify-center",
    items: "flex flex-row px-2 align-middle items-center justify-center",

}

function ExpandedPlayerCellArena({playerDisplayInfo, version, maxTeamDamage, isInTopHalf} : props) {
    const modeData = playerDisplayInfo.modeData as ArenaModeData;

    const placementDisplay = <div className={styles.placement}>{modeData.teamPlacement}</div>;
    let bgColor;

    if (modeData.teamPlacement % 2 === 1) {
        if (isInTopHalf) bgColor = " bg-glaucous-700";
        else bgColor = " bg-rosewood-700";
    }
    else {
        if (isInTopHalf) bgColor = " bg-glaucous-600";
        else bgColor = " bg-rosewood-600";
    }

    const championIconDisplay = <img className={styles.champIcon} src={getChampionIconUrl(version, playerDisplayInfo.championData.id)} alt={playerDisplayInfo.championData.id}></img>
    const levelDisplay = <div className={"ml-1 -mr-3 mt-7.5 rounded-full w-4 h-4 z-0 bg-graphite-200 text-xs flex items-center justify-center align-baseline"}>{playerDisplayInfo.level}</div>

    const kdaDisplay = <div className={"flex flex-row font-bold"}>{playerDisplayInfo.kills}/<div className={"text-brick-red-700"}>{playerDisplayInfo.deaths}</div>/{playerDisplayInfo.assists}</div>;
    const kdaRatio = playerDisplayInfo.deaths === 0 ? (playerDisplayInfo.kills+playerDisplayInfo.assists).toFixed(2) : ((playerDisplayInfo.kills+playerDisplayInfo.assists)/playerDisplayInfo.deaths).toFixed(2);
    const kdaRatioDisplay = <div className={"text-xs"}>{kdaRatio}KDA</div>;

    const dmgDisplay = <div className={"text-xs pb-1"}>{playerDisplayInfo.totalDamageDealtToChampions}</div>;
    const dmgPercent = playerDisplayInfo.totalDamageDealtToChampions*100/maxTeamDamage;
    const dmgBarDisplay = <div className={"h2 w-full rounded-xs bg-graphite-100"}>
        <div className={"h-2 rounded-xs bg-brick-red-600"} style={{width: `${dmgPercent}%`}}></div>
    </div>

    const itemAmmount = 6;

    const augmentsSorted = modeData.augments.sort((a1) => a1.id >= 0 ? -1 : 1)

    const augmentsDisplay = augmentsSorted.map((a, index) => a.id > 0 ?
    <img key={`${index}_${a.id}`} className={"w-7 h-7 border border-graphite-200 bg-graphite-200"} src={getAugmentIconUrl(a.iconSmall)} alt={a.name}></img> :
    <div key={`${index}_empty`} className={"w-7 h-7 bg-graphite-200"}></div>);

    const itemsDisplay = playerDisplayInfo.items.filter((_i,index) => index<itemAmmount).map((i,index) => i.id > 0 ?
        <img key={`${index}_${i.id}`} className={"w-8 h-8 border border-graphite-200"} src={getItemIconUrl(version, i.id)} alt={i.name}></img> :
        <div key={`${index}_empty`} className={"w-8 h-8 bg-graphite-200"}></div>);

    return (<div className={styles.component+bgColor}>
        {placementDisplay}
        {levelDisplay}
        {championIconDisplay}
        <div className={styles.gameName}>
        {playerDisplayInfo.gameName}
        </div>
        <div className={styles.itemsCol+" "+styles.kda}>
            {kdaDisplay}
            {kdaRatioDisplay}
        </div>
        <div className={styles.itemsCol+" "+styles.dmg}>
            {dmgDisplay}
            {dmgBarDisplay}
        </div>
        <div className={styles.items}>
            {augmentsDisplay}
        </div>
        <div className={styles.items}>
            {itemsDisplay}
        </div>
        </div>)

}

export default ExpandedPlayerCellArena