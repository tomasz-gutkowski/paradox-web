import MatchCard from './match-card/MatchCard.tsx'
import type {MatchInfo} from '../utilities/ProfileTypes.ts'
import {useState} from "react";
import {fetchMatchListUrl} from "../utilities/constants.ts";


type props = {
    matchData : MatchInfo[],
    version : string,
    puuid : string,
    serverTag : string,
    anchorTime : number
}

const styles = {
    component: "flex flex-col items-center justify-start",
    expandButton: "my-6 w-200 h-16 text-3xl font-bold tracking-wide text-graphite-800 bg-graphite-300 border-x-10 hover:bg-graphite-500",
}

function MatchHistory({matchData, version, puuid, serverTag, anchorTime} : props) {
    const [matches, setMatches] = useState<MatchInfo[]>(matchData)
    const [start, setStart] = useState<number>(20)
    const [loading, setLoading] = useState<boolean>(false)
    const [buttonEnabled, setButtonEnabled] = useState<boolean>(true)

    const matchesDisplay = matches.map(m => <MatchCard key={m.matchId} serverTag={serverTag} matchData={m} version={version}></MatchCard>);

    async function loadMoreMatches() {
        setLoading(true)
        const matchesRes : MatchInfo[] = await fetch(fetchMatchListUrl(serverTag, puuid, anchorTime)+"?start="+start).then((res) => res.json());
        if(matchesRes.length < 20) setButtonEnabled(false);
        setMatches([...matches, ...matchesRes]);
        setStart(start + matchesRes.length);
        setLoading(false)
    }

    const expandButton = buttonEnabled ?
        (<button className={styles.expandButton} onClick={() => loadMoreMatches()}>{loading ? "LOADING..." : "MORE" }</button>) :
        <div className={"my-4"}></div>;

    return (
        <div className={styles.component}>
            {matchesDisplay}
            {expandButton}
        </div>
    )
}



export default MatchHistory;