import type {MatchInfo} from "../types/ProfileTypes.ts";
import MatchBasicInfo from "./MatchBasicInfo.tsx";
import MatchPlayerInfo from "./player-info/MatchPlayerInfo.tsx";
import MatchPlayersListDefault from "./MatchPlayersListDefault.tsx";
import MatchPlayersListArena from "./player-info/MatchPlayersListArena.tsx";

const styles = {
    win:"bg-glaucous-600 hover:bg-glaucous-700 border-steel-blue-500 text-steel-blue-700",
    loss: "bg-rosewood-600 hover:bg-rosewood-700 border-brick-red-700 text-brick-red-800",
    remake: "bg-graphite-700 hover:bg-graphite-600 border-graphite-800 text-graphite-900",
    error: "bg-graphite-100 border-graphite-100 text-graphite-100",
    shared: "w-200 h-40 border-y-0 border-x-10 border-solid font-default-bold p-2 mt-8 flex flex-row"
};

function MatchCard({matchData, version} : {matchData : MatchInfo, version: string}){
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
    return(
        <div className={style}>
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
    );
}

export default MatchCard;