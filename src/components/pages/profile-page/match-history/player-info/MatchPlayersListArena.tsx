import type {ParticipantDisplayInfo} from "../../types/ProfileTypes.ts";

type props = {
    ownerName: string,
    ownerTag: string,
    participants: ParticipantDisplayInfo[]
    version: string
}

const styles = {
    top: "inline-block align-middle",
    component: "pl-3 pr-2 items-center justify-center font-default-light w-66 h-full",
    playerCell: "flex flex-row text-xs line-clamp-2 items-center pl-1 h-full",
    championIcon: "w-6 h-6 rounded-full mr-1 my-[2px]",
    playerName: "truncate text-graphite-900",
}

function MatchPlayersListArena({ownerName, ownerTag, participants, version} : props){
    participants.sort((p1,p2) => p1.placement - p2.placement);

    let teamSize = 0;
    while(participants[teamSize].placement == 1) teamSize++;

    const gridStyle = teamSize === 2 ? " grid grid-cols-2" : " grid grid-cols-3";


    let topBorderFlag = teamSize;

    function mapPlayer(p : ParticipantDisplayInfo) {
        const ownerStyle = (ownerName === p.gameName && ownerTag === p.tagLine) ? "font-bold" : "font-medium";
        const topBorder = topBorderFlag-- <= 0 ? " border-t-1" : "";

        return (
            <div key={p.puuid} className={styles.playerCell+topBorder}>

                <img className={styles.championIcon}
                     src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${p.championData.id}.png`}
                     alt={p.championData.id}>
                </img>
                <span className={styles.playerName + " " + ownerStyle}>{p.gameName}</span>
            </div>)
    }

    const topHalf = (participants.length/(teamSize*2));
    const participantsList = participants.filter(p => p.placement <= topHalf).map(p => mapPlayer(p));

    return(<div className={styles.top}>
        <div className={styles.component+gridStyle}>
        {participantsList}
    </div>
    </div>)
}



export default MatchPlayersListArena;