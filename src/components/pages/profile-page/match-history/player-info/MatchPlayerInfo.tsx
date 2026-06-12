import type {ArenaModeData, DefaultModeData, IdNameImage, IdNamePair} from "../../types/ProfileTypes.ts";
import MatchPlayerInventory from "./MatchPlayerInventory.tsx";
import DefaultModeScoreboard from "./DefaultModeScoreboard.tsx";

type props = {
    championName: string,
    level: number,
    summonerSpells: IdNameImage[],
    kills: number,
    deaths: number,
    assists: number,
    items: IdNamePair[],
    modeData: DefaultModeData | ArenaModeData
    version : string,
}

const styles = {
    component: "py-2 px-5 justify-start items-start flex-col",
    topContainer: "w-19 h-19",
    iconContainer: "overflow-hidden rounded-full border-3",
    championIcon: "relative z-0 object-cover scale-112" ,
    level: "relative z-1 w-6 bg-black rounded-full -my-5 -mx-1 flex items-center justify-center",
}

function MatchPlayerInfo({championName, level, summonerSpells, kills, deaths, assists, items, modeData, version} : props){
    const championIcon = `https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championName}.png`

    const defaultSb = <DefaultModeScoreboard summonerSpells={summonerSpells}
                                             kills={kills}
                                             deaths={deaths}
                                             assists={assists}
        /* eslint-disable-next-line @typescript-eslint/ban-ts-comment */
        // @ts-expect-error
                                             modeData={modeData}
                                             version={version}>
    </DefaultModeScoreboard>
    const arenaSb = <div></div>;
    const displayType = "teamPlacement" in modeData ? arenaSb : defaultSb;

    const inventorySize = displayType === arenaSb ? 7 : 8;


    
    return (

        <div className={styles.component}>
            <div className={"flex-row flex"}>
                <div className={styles.topContainer}>
                    <div className={styles.iconContainer}>
                        <img className={styles.championIcon} src={championIcon} alt={championName}></img>
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