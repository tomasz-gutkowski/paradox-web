import type {MapAndModeInfo} from "../types/ProfileTypes.ts";

type props = {
    gameResult?: string,
    teamPlacement?: number,
    gameData: {id: number, info: MapAndModeInfo},
    gameEndTimestamp: number,
    gameDuration: number,
}

const styles = {
    topContainer: "w-2/9 h-full p-2 border-r flex flex-col justify-center",
    gameModeText: "",
    gameResultText: "",
    gameTimeText: "pt-2 font-default-light text-alabaster-grey-400",
    gameFinishText: "font-default-light text-alabaster-grey-400"


};

function MatchBasicInfo({gameResult, teamPlacement, gameData, gameEndTimestamp, gameDuration} : props) {
    let modeName;
    if (gameData.info !== null) modeName = gameData.info.modeName;
    else modeName = "Unknown";

    const gameTimeMins = Math.floor(gameDuration / 60);
    const gameTimeSecs = String(gameDuration % 60).padStart(2, "0");

    const gameFinish = timePassed(gameEndTimestamp);

    const result = gameResult === undefined ? (teamPlacement === undefined ? "Unknown" : placementWithSuffix(teamPlacement)+" place") : gameResultDisplayName(gameResult);



    return(
        <div className={styles.topContainer}>
            <div className={styles.gameModeText}>{modeName}</div>
            <div className={styles.gameResultText}>{result}</div>
            <div className={styles.gameTimeText}>{gameTimeMins+":"+gameTimeSecs}</div>
            <div className={styles.gameFinishText}>{gameFinish}</div>
        </div>
    );
}

function timePassed(gameEndTimestamp: number) : string {
    const minutesPassed = Math.floor((Date.now() - gameEndTimestamp)/60000);
    if (minutesPassed < 60) return minutesPassed + (minutesPassed === 1 ? " minutes ago" : " minute ago");

    const hoursPassed = Math.floor(minutesPassed / 60);
    if (hoursPassed < 24) return hoursPassed + (hoursPassed > 1 ? " hours ago" : " hour ago");

    const daysPassed = Math.floor(hoursPassed / 24);
    return daysPassed + (daysPassed > 1 ? " days ago" : " day ago");
}

function placementWithSuffix(placement: number) : string {
    const mod100 = placement%100;
    if (mod100 >= 11 && mod100 <= 13) return placement+"th";
    switch (placement%10) {
        case 1: return placement+"st";
        case 2: return placement+"nd";
        case 3: return placement+"rd";
        default: return placement+"th";
    }
}

function gameResultDisplayName(gameResult : string) : string {
    switch (gameResult.toLowerCase()) {
        case "win": return "Victory";
        case "loss": return "Defeat";
        case "remake": return "Remake";
        default: return "Unknown";
    }
}


export default MatchBasicInfo