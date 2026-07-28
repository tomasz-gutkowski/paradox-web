import type {MatchDetails, MatchInfo} from "../../utilities/ProfileTypes.ts";
import MatchBasicInfo from "./shared/MatchBasicInfo.tsx";
import MatchPlayerInfo from "./shared/MatchPlayerInfo.tsx";
import MatchPlayersListDefault from "./default/MatchPlayersListDefault.tsx";
import MatchPlayersListArena from "./arena/MatchPlayersListArena.tsx";
import {useState} from "react";
import {fetchMatchDetailsUrl} from "../../utilities/constants.ts";
import MatchExpandedDefault from "../match-expanded/default/MatchExpandedDefault.tsx";
import MatchExpandedArena from "../match-expanded/arena/MatchExpandedArena.tsx";

const styles = {
    win:"bg-glaucous-600 hover:bg-glaucous-700 border-steel-blue-500 text-steel-blue-700",
    loss: "bg-rosewood-600 hover:bg-rosewood-700 border-brick-red-700 text-brick-red-800",
    remake: "bg-graphite-700 hover:bg-graphite-600 border-graphite-800 text-graphite-900",
    notDefined: "bg-graphite-100 border-graphite-100 text-graphite-100",
    shared: "w-200 h-40 border-y-0 border-x-10 border-solid font-default-bold p-2 mt-8 flex flex-row cursor-pointer"
};

function MatchCard({serverTag, matchData, version} : {serverTag : string, matchData : MatchInfo, version: string}){
    const [expanded, setExpanded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(false);
    const [matchDetails, setMatchDetails] = useState<MatchDetails>();

    let style : string;

    switch(matchData.gameResult){
        case "WIN":{ style = styles.win; break;}
        case "LOSS":{ style = styles.loss; break;}
        case "REMAKE":{ style = styles.remake; break;}
        default: {style = styles.notDefined; break;}
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

    const isDefaultDisplay = gameResult !== undefined;

    const playerList = isDefaultDisplay ? defaultPlayerList : arenaPlayerList;


    const loadingDisplay = <div className={"width-200 h-128 rounded-b-xl pb-2 bg-graphite-600 flex items-center justify-center text-8xl "}>
                                        <div className={"h-20 w-20 animate-spin rounded-full border-12 border-graphite-400 border-r-graphite-800"}></div>
                                    </div>

    const errorDisplay = <div className={"width-200 h-128 rounded-b-xl pb-2 bg-graphite-600 flex items-center justify-center text-8xl"}>❌</div>

    const expandedDisplay = matchDetails && (isDefaultDisplay ?
        <MatchExpandedDefault version={version}
                              matchDetails={matchDetails}
                              gameDuration={matchData.gameDuration}
                              ownerGameName={matchData.player.gameName}
                              ownerTagLine={matchData.player.tagline}>
        </MatchExpandedDefault> :
        <MatchExpandedArena
        version={version}
        matchDetails={matchDetails}>
        </MatchExpandedArena>)

    async function expandDetails(){
        setError(false);
        setExpanded(!expanded);
        if(!expanded && matchDetails === undefined) {
            try{
                setLoading(true);
                const matchDetailsRes: Response = await fetch(fetchMatchDetailsUrl(serverTag, matchData.matchId))
                if (!matchDetailsRes.ok) throw new Error();

                const matchDetails: MatchDetails = await matchDetailsRes.json();
                setMatchDetails(matchDetails);
            }catch(e){
                setError(true)
                console.error(e);
            }
            finally {
                setLoading(false);
            }
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
            {expanded && (
                <div>
                    {loading && loadingDisplay}
                    {error && errorDisplay}
                    {!loading && !error && expandedDisplay}
                </div>
            ) }
        </div>
    );
}

export default MatchCard;