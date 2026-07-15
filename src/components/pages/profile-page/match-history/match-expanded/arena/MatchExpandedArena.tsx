import type {ArenaModeData, MatchDetails} from "../../../utilities/ProfileTypes.ts";
import ExpandedPlayerCellArena from "./ExpandedPlayerCellArena.tsx";

type props = {
    version: string,
    matchDetails: MatchDetails,
    ownerGameName: string,
    ownerTagLine: string
}

const styles = {
    component: "bg-graphite-600 width-200 rounded-b-xl pb-2.5",
    legend: "flex flex-row bg-graphite-600 font-default-bold text-graphite-900 h-6",
}

function MatchExpandedArena({version, matchDetails} : props) {
    const sortedPlayers = matchDetails.players.sort((p1,p2) =>
        (p1.modeData as ArenaModeData).teamPlacement - (p2.modeData as ArenaModeData).teamPlacement);

    const lastPlacement = Math.max(...matchDetails.players.map(p =>
        (p.modeData as ArenaModeData).teamPlacement));

    const teamMaxDmg = new Map<number, number>();

    for(let i = 1; i <= lastPlacement; i++){
        const maxDmg = Math.max(...matchDetails.players
            .filter(p => (p.modeData as ArenaModeData).teamPlacement === i)
            .map(p => p.totalDamageDealtToChampions));
        teamMaxDmg.set(i, maxDmg);
    }

    const playerCells = sortedPlayers.map(p =>
        (<ExpandedPlayerCellArena key={`${p.gameName}#${p.tagline}`}
                                  playerDisplayInfo={p}
                                  version={version}
                                  maxTeamDamage={teamMaxDmg.get((p.modeData as ArenaModeData).teamPlacement) || p.totalDamageDealtToChampions}
                                  isInTopHalf={(p.modeData as ArenaModeData).teamPlacement <= lastPlacement/2}
        />)
    )

    return (
        <div className={styles.component}>
            <div className={styles.legend}>
                <div className={"w-40 pl-21"}>Name</div>
                <div className={"w-25 pl-25"}>KDA</div>
                <div className={"w-25 pl-22"}>DMG</div>
            </div>
            {playerCells}
        </div>)
}

export default MatchExpandedArena;