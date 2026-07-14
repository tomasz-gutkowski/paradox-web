import type {DefaultModeData, PlayerDisplayInfo} from "../../utilities/ProfileTypes.ts";
import {
    getChampionIconUrl,
    getItemIconUrl,
    getPerkIconUrl,
    getSummonerSpellIconUrl
} from "../../utilities/constants.ts";

type props = {
    playerDisplayInfo: PlayerDisplayInfo,
    version: string,
    gameDuration: number,
    maxTeamDamage: number,
    ownerGameName: string,
    ownerTagLine: string
}

const styles = {
    component : "flex flex-row font-default-light text-graphite-900 h-12 font-bold",
    champIcon : "w-10 h-10 rounded-full m-1",
    itemsCol: "flex flex-col items-center justify-center",
    summonerSpellIcon : "w-5 h-5",
    perkIcon : "w-5 h-5 bg-graphite-200",
    gameName : "p-2 truncate w-38",
    kda: "px-2 w-25",
    cs: "px-2 w-25",
    dmg: "px-3 w-20",
    items: "flex flex-row px-2 align-middle items-center justify-center",
}

function DetailsPlayerCell({playerDisplayInfo, version, gameDuration, maxTeamDamage, ownerGameName, ownerTagLine}: props) {
    const modeData = playerDisplayInfo.modeData as DefaultModeData;

    const bgColor = modeData.side === "BLUE" ?
        (ownerGameName === playerDisplayInfo.gameName && ownerTagLine === playerDisplayInfo.tagline ? " bg-glaucous-700": " bg-glaucous-600") :
        (ownerGameName === playerDisplayInfo.gameName && ownerTagLine === playerDisplayInfo.tagline ? " bg-rosewood-700": " bg-rosewood-600");


    const championIconDisplay = <img className={styles.champIcon} src={getChampionIconUrl(version, playerDisplayInfo.championData.id)} alt={playerDisplayInfo.championData.id}></img>
    const levelDisplay = <div className={"ml-1 -mr-3 mt-7.5 rounded-full w-4 h-4 z-0 bg-graphite-200 text-xs flex items-center justify-center align-baseline"}>{playerDisplayInfo.level}</div>
    const summonerSpellsDisplay = playerDisplayInfo.summonerSpells.map((s, index) =>
        (<img key={`${index}_${s.id}`} className={styles.summonerSpellIcon} src={getSummonerSpellIconUrl(version, s.image)} alt={s.name}></img>));

    const perks = [];
    perks.push(modeData.perks.keystone);
    perks.push(modeData.perks.subStyle);

    const perksDisplay = perks.map((p,index) =>
        (<img key={`${index}_${p.id}`} className={styles.perkIcon} src={getPerkIconUrl(p.image)} alt={p.name}></img>));

    const kdaDisplay = <div className={"flex flex-row font-bold"}>{playerDisplayInfo.kills}/<div className={"text-brick-red-700"}>{playerDisplayInfo.deaths}</div>/{playerDisplayInfo.assists}</div>;
    const kdaRatio = playerDisplayInfo.deaths === 0 ? (playerDisplayInfo.kills+playerDisplayInfo.assists).toFixed(2) : ((playerDisplayInfo.kills+playerDisplayInfo.assists)/playerDisplayInfo.deaths).toFixed(2);
    const kdaRatioDisplay = <div className={"text-xs"}>{kdaRatio}KDA</div>;

    const csDisplay = <div>{modeData.creepScore} CS</div>
    const cspmDisplay = <div className={"text-xs"}>{(modeData.creepScore*60/gameDuration).toFixed(1)}/m</div>

    const dmgDisplay = <div className={"text-xs pb-1"}>{playerDisplayInfo.totalDamageDealtToChampions}</div>;
    const dmgPercent = playerDisplayInfo.totalDamageDealtToChampions*100/maxTeamDamage;
    const dmgBarDisplay = <div className={"h2 w-full rounded-xs bg-graphite-100"}>
        <div className={"h-2 rounded-xs bg-brick-red-600"} style={{width: `${dmgPercent}%`}}></div>
    </div>

    const itemsDisplay = playerDisplayInfo.items.map((i,index) => i.id > 0 ?
    <img key={`${index}_${i.id}`} className={"w-8 h-8 border border-graphite-200"} src={getItemIconUrl(version, i.id)} alt={i.name}></img> :
    <div key={`${index}_empty`} className={"w-8 h-8 bg-graphite-200"}></div>)

    return (<div className={styles.component+bgColor}>
        {levelDisplay}
        {championIconDisplay}
        <div className={styles.itemsCol}>
            {summonerSpellsDisplay}
        </div>
        <div className={styles.itemsCol}>
            {perksDisplay}
        </div>
        <div className={styles.gameName}>
            {playerDisplayInfo.gameName}
        </div>
        <div className={styles.itemsCol+" "+styles.kda}>
            {kdaDisplay}
            {kdaRatioDisplay}
        </div>
        <div className={styles.itemsCol+" "+styles.cs}>
            {csDisplay}
            {cspmDisplay}
        </div>
        <div className={styles.itemsCol+" "+styles.dmg}>
            {dmgDisplay}
            {dmgBarDisplay}
        </div>
        <div className={styles.items}>
            {itemsDisplay}
        </div>
    </div>)
}
export default DetailsPlayerCell;