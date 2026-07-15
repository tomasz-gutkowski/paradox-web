import type {DefaultModeData, MatchDetails} from "../../../utilities/ProfileTypes.ts";
import ExpandedPlayerCellDefault from "./ExpandedPlayerCellDefault.tsx";
import {sortByRolePlayer} from "../../../utilities/constants.ts";

type props = {
    version: string,
    matchDetails: MatchDetails,
    gameDuration: number
    ownerGameName: string
    ownerTagLine: string
}

const styles = {
    component: "bg-graphite-600 width-200 rounded-b-xl pb-2.5",
    legend: "flex flex-row bg-graphite-600 font-default-bold text-graphite-900 h-6",
}
function MatchExpandedDefault({version, matchDetails, gameDuration, ownerGameName, ownerTagLine} : props) {
    const sortedPlayers = matchDetails.players.sort((p1, p2) =>
        sortByRolePlayer(p1, p2))
        .sort((p1, p2) =>
            sideVal((p1.modeData as DefaultModeData).side) - sideVal((p2.modeData as DefaultModeData).side));

    const maxDmgBlue = Math.max(...matchDetails.players
        .filter(p => ((p.modeData as DefaultModeData).side).toUpperCase() === "BLUE")
        .map(p => p.totalDamageDealtToChampions))

    const maxDmgRed = Math.max(...matchDetails.players
        .filter(p => ((p.modeData as DefaultModeData).side).toUpperCase() === "RED")
        .map(p => p.totalDamageDealtToChampions))

    const playerCells = sortedPlayers.map(p =>
        (<ExpandedPlayerCellDefault key={`${p.gameName}#${p.tagline}`}
                                    playerDisplayInfo={p}
                                    version={version}
                                    gameDuration={gameDuration}
                                    maxTeamDamage={(p.modeData as DefaultModeData).side.toUpperCase() === "BLUE" ? maxDmgBlue : maxDmgRed}
                                    isOwner={p.gameName === ownerGameName && ownerTagLine === ownerTagLine}
                            />))
    return (
        <div className={styles.component}>
            <div className={styles.legend}>
                <div className={"w-40 pl-25"}>Name</div>
                <div className={"w-25 pl-30"}>KDA</div>
                <div className={"w-25 pl-27"}>CS</div>
                <div className={"w-20 pl-20"}>DMG</div>
            </div>
            {playerCells}
        </div>);
}

const sideVal =  (side : string) : number => {
    return side.toUpperCase() === "BLUE" ? 1 : 2;
}

export default MatchExpandedDefault;