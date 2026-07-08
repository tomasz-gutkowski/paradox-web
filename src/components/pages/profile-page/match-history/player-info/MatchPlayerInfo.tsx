import type {ArenaModeData, ChampionData, DefaultModeData, IdNameImageData, IdNamePair} from "../../types/ProfileTypes.ts";
import MatchPlayerInventory from "./MatchPlayerInventory.tsx";
import DefaultModeScoreboard from "./DefaultModeScoreboard.tsx";
import ArenaModeScoreboard from "./ArenaModeScoreboard.tsx";

type props = {
    championData: ChampionData,
    level: number,
    summonerSpells: IdNameImageData[],
    kills: number,
    deaths: number,
    assists: number,
    items: IdNamePair[],
    modeData: DefaultModeData | ArenaModeData
    gameDuration: number,
    version : string,
}

const styles = {
    component: "py-2 pl-5 justify-start items-start flex-col border-r-1 w-43/100",
    topContainer: "w-19 h-19",
    iconContainer: "overflow-hidden rounded-full border-3",
    championIcon: "relative z-0 object-cover scale-112" ,
    level: "relative z-1 w-6 bg-black rounded-full -my-5 -mx-1 flex items-center justify-center",
}

function MatchPlayerInfo({championData, level, summonerSpells, kills, deaths, assists, items, modeData, gameDuration, version} : props){
    const championIcon = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championData.id}.png`

    const defaultSb = <DefaultModeScoreboard summonerSpells={summonerSpells}
                                             kills={kills}
                                             deaths={deaths}
                                             assists={assists}
                                             modeData={modeData as DefaultModeData}
                                             gameDuration={gameDuration}
                                             version={version}>
    </DefaultModeScoreboard>
    const arenaSb = <ArenaModeScoreboard kills={kills}
                                         deaths={deaths}
                                         assists={assists}
                                         modeData={modeData as ArenaModeData}
                                         version={version}>
    </ArenaModeScoreboard>;

    const displayType = "teamPlacement" in modeData ? arenaSb : defaultSb;

    const inventorySize = displayType === arenaSb ? 7 : 8;


    
    return (

        <div className={styles.component}>
            <div className={"flex-row flex"}>
                <div className={styles.topContainer}>
                    <div className={styles.iconContainer}>
                        <img className={styles.championIcon} src={championIcon} alt={championData.id}></img>
                    </div>

                </div>
                <div>
                    {displayType}
                </div>
            </div>
            <div className={styles.level}>{level}</div>
            <MatchPlayerInventory items={items} version={version} size={inventorySize}></MatchPlayerInventory>
        </div>


    )
}
export default MatchPlayerInfo;