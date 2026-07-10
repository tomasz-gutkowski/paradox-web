import type {DefaultModeData, IdNameImageData} from "../../../utilities/ProfileTypes.ts";
import {getPerkIconUrl, getSummonerSpellIconUrl} from "../../../utilities/constants.ts";

type props = {
    summonerSpells: IdNameImageData[],
    kills: number,
    deaths: number,
    assists: number,
    modeData: DefaultModeData
    gameDuration: number,
    version: string,
}

const styles = {
    component:  "my ml-3 flex flex-row items-start justify-center",
    iconSquare: "border-2 flex",
    summonerSpells: "border-r-2",
    icon: "w-8 h-8 bg-graphite-200",
    stats: "px-3 border-l-2 mx-4 my-0 py-0 font-default-light font-bold flex items-center justify-center flex-col",
    kda: "text-xl text-graphite-900 px-1 py-0 flex flex-row tracking-widest",
    kdaRatio: "text-xs text-graphite-900",
    creepScore: "text-xs text-graphite-900 pt-1 border-t",
}
function ModeSpecificDataDefault({summonerSpells, kills, deaths, assists, modeData, gameDuration, version} : props){

    const summonerSpellsDisplay = summonerSpells.map((s, index) =>
        <img key={index+"-"+s.id} className={styles.icon} src={getSummonerSpellIconUrl(version, s.image)} alt={s.name}></img>)

    const kda = <div className={styles.kda}>{kills+"/"}<div className={"text-red-500"}>{deaths}</div>{"/"+assists}</div>
    const kdaRatio = deaths === 0 ? kills+assists : (kills+assists)/deaths;
    const kdaRatioDisplay = <div>{(kdaRatio).toFixed(2)+"KDA"}</div>;

    const creepScorePerMin = (modeData.creepScore*60/gameDuration).toFixed(1)
    const creepScoreDisplay = <div>{modeData.creepScore+"CS ("+creepScorePerMin+"/m)"}</div>;

    return(<div className={styles.component}>
        <div className={styles.iconSquare}>
            <div className={styles.summonerSpells}>
                {summonerSpellsDisplay}
            </div>
            <div>
                <img className={styles.icon} src={getPerkIconUrl(modeData.perks.keystone.image)} alt={modeData.perks.keystone.name}></img>
                <img className={styles.icon+" border-3 border-graphite-200"} src={getPerkIconUrl(modeData.perks.subStyle.image)} alt={modeData.perks.subStyle.name}></img>
            </div>
        </div>
        <div className={styles.stats}>
            <div>
                {kda}
            </div>
            <div className={styles.kdaRatio}>
                {kdaRatioDisplay}
            </div>
            <div className={styles.creepScore}>
                {creepScoreDisplay}
            </div>
        </div>


    </div>)
}


export default ModeSpecificDataDefault;