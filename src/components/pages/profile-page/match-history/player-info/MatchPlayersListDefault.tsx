import type {ParticipantDisplayInfo} from "../../types/ProfileTypes.ts";
import {getChampionIconUrl} from "../../../constants.ts";

type props = {
    ownerName: string,
    ownerTag: string,
    participants: ParticipantDisplayInfo[]
    version: string
}

const styles = {
    component: "px-3 flex flex-row items-center justify-center font-default-light",
    playerCell: "flex flex-row text-xs line-clamp-2 w-30 items-center pl-1",
    championIcon: "w-6 h-6 rounded-full mr-1 my-[2px]",
    playerName: "truncate text-graphite-900",
}

function MatchPlayersListDefault({ownerName, ownerTag, participants, version} : props){

    const blue : ParticipantDisplayInfo[] = [];
    const red : ParticipantDisplayInfo[] = [];

    participants.forEach(p => p.teamId === 100 ? blue.push(p) : red.push(p));

    function sortByRole(p1:ParticipantDisplayInfo , p2:ParticipantDisplayInfo){
        return POSITION_ORDER[p1.position] - POSITION_ORDER[p2.position];
    }

    blue.sort((p1,p2) => sortByRole(p1,p2));
    red.sort((p1,p2) => sortByRole(p1,p2));



    function mapPlayer(p : ParticipantDisplayInfo){
        const ownerStyle = (ownerName === p.gameName && ownerTag === p.tagLine) ? "font-bold" : "font-medium";
        const topBorder = flag ? "border-t-1" : "";
        flag = true;
        return  (<div key={p.puuid} className={styles.playerCell+" "+topBorder}>
            <img className={styles.championIcon} src={getChampionIconUrl(version, p.championData.id)} alt={p.championData.id}></img>
            <span className={styles.playerName+" "+ownerStyle}>{p.gameName}</span>
        </div>)}

    let flag = false;
    const blueTeam = blue.map(p => mapPlayer(p));
    flag = false;
    const redTeam = red.map(p => mapPlayer(p));


    return (<div className={styles.component}>
        <div>
            {blueTeam}
        </div>
        <div>
            {redTeam}
        </div>
    </div>)
}

const POSITION_ORDER: Record<string, number> = {
    TOP: 0,
    JUNGLE: 1,
    MIDDLE: 2,
    BOTTOM: 3,
    UTILITY: 4,
};

export default MatchPlayersListDefault;