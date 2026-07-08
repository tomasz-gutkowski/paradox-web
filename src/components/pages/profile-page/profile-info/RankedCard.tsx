type Props = {
    queueType: string,
    tier : string,
    rank : string,
    leaguePoints : number
    wins : number,
    losses : number
}

const styles = {
    cardStyle: "pt-2 pb-2 mb-10 bg-graphite-200 w-60 h-76 rounded-xl border-3 border-solid border-alabaster-grey-400 flex flex-col items-center justify-center",
    imgStyle: "h-23/40",
    queueTitle: "-mt-[70px] p-10 py-0 px-2 rounded-xl border-2 border-alabaster-grey-400 bg-alabaster-grey-400 text-dark-text font-default-bold",
    rankedInfo: "w-1/1 h-1/4 border-t-2 pt-2 border-alabaster-grey-400 text-light-text font-default-light flex flex-col items-center",
    rankName: "text-lg font-default-bold",
    scoreStyle: "flex flex-row ",
    winsStyle: "text-[#00FF00] pr-2",
    lossesStyle: "text-[#FF0000] pl-2"
}

function RankedCard({queueType, tier, rank, leaguePoints, wins, losses}: Props) {
    const queueName = getQueueDisplayName(queueType);
    const tierIconPath = "/src/assets/tier-icons/" + tier.toLowerCase() + ".png";
    const fullRankName = tier + " " +(tier === "UNRANKED" || tier === "MASTER" || tier ==="GRANDMASTER" || tier === "CHALLENGER" ? "" : rank);
    const winRatio = ((wins / (wins+losses)*100).toFixed(0)).toString() + "%WR";
    return (
        <div className={styles.cardStyle}>

            <h1 className={styles.queueTitle}>{queueName}</h1>
            <img src={tierIconPath} className={styles.imgStyle} alt=""></img>
            <div className = {styles.rankedInfo}>
                <div className = {styles.rankName}>{fullRankName}</div>
                <div>{leaguePoints.toString() + " LP"}</div>
                <div className={styles.scoreStyle}><div className={styles.winsStyle}>{wins+"W"}</div>|<div className={styles.lossesStyle}>{losses+"L"}</div></div>
                <div>{winRatio}</div>
            </div>
        </div>
    )

}

function getQueueDisplayName(queueType: string) : string {
    switch (queueType) {
        case "RANKED_SOLO_5x5":
            return "RANKED SOLO/DUO"
        case "RANKED_FLEX_SR":
            return "RANKED FLEX"
        case "RANKED_PREMADE_5x5":
            return "RANKED FIVES"
        default:
            return queueType
    }
}
export default RankedCard;