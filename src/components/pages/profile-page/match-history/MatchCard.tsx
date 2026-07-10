import type {MatchDetails, MatchInfo} from "../types/ProfileTypes.ts";
import MatchBasicInfo from "./MatchBasicInfo.tsx";
import MatchPlayerInfo from "./player-info/MatchPlayerInfo.tsx";
import MatchPlayersListDefault from "./MatchPlayersListDefault.tsx";
import MatchPlayersListArena from "./player-info/MatchPlayersListArena.tsx";
import {useState} from "react";

const styles = {
    win:"bg-glaucous-600 hover:bg-glaucous-700 border-steel-blue-500 text-steel-blue-700",
    loss: "bg-rosewood-600 hover:bg-rosewood-700 border-brick-red-700 text-brick-red-800",
    remake: "bg-graphite-700 hover:bg-graphite-600 border-graphite-800 text-graphite-900",
    error: "bg-graphite-100 border-graphite-100 text-graphite-100",
    shared: "w-200 h-40 border-y-0 border-x-10 border-solid font-default-bold p-2 mt-8 flex flex-row"
};

function MatchCard({serverTag, matchData, version} : {serverTag : string, matchData : MatchInfo, version: string}){
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [matchDetails, setMatchDetails] = useState<MatchDetails>();

    let style : string;

    switch(matchData.gameResult){
        case "WIN":{ style = styles.win; break;}
        case "LOSS":{ style = styles.loss; break;}
        case "REMAKE":{ style = styles.remake; break;}
        default: {style = styles.error; break;}
    }

    style = style + " " + styles.shared;

    let gameResult;
    let teamPlacement;

    if("win" in matchData.player.modeData) gameResult = matchData.gameResult;
    else if("teamPlacement" in  matchData.player.modeData) teamPlacement = matchData.player.modeData.teamPlacement;

    const defaultPlayerList = <MatchPlayersListDefault ownerName={matchData.player.gameName}
                                              ownerTag={matchData.player.tagline}
                                              participants={matchData.participants}
                                              version={version}/>
    const arenaPlayerList = <MatchPlayersListArena ownerName={matchData.player.gameName}
                                                     ownerTag={matchData.player.tagline}
                                                     participants={matchData.participants}
                                                     version={version}/>
    const playerList = gameResult === undefined ? arenaPlayerList : defaultPlayerList;

    const expandedDisplay = expanded ? <div className={"width-200 h-4 bg-green-500"}>{loading ? "LOADING..." : "LOADED"}</div> : <div className={"width-200 h-2 bg-red-500"}></div>

    async function expandDetails(){
        setExpanded(!expanded);
        if(!expanded && matchDetails === undefined) {
            setLoading(true);
            const matchDetailsRes: MatchDetails = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/match/${serverTag}/${matchData.matchId}`).then((res) => res.json());
            setMatchDetails(matchDetailsRes);
            setLoading(false);
        }
    }

    return(
        <div>
        <div className={style} onClick={() => expandDetails()}>
            <MatchBasicInfo gameResult={gameResult}
                            teamPlacement={teamPlacement}
                            gameData={matchData.gameData}
                            gameEndTimestamp={matchData.gameEndTimestamp}
                            gameDuration={matchData.gameDuration}
            />
            <MatchPlayerInfo championData={matchData.player.championData}
                             level={matchData.player.level}
                             summonerSpells={matchData.player.summonerSpells}
                             kills={matchData.player.kills}
                             deaths={matchData.player.deaths}
                             assists={matchData.player.assists}
                             items={matchData.player.items}
                             modeData={matchData.player.modeData}
                             gameDuration={matchData.gameDuration}
                             version={version}/>
            {playerList}
        </div>
            {expandedDisplay}
        </div>
    );
}

export default MatchCard;