import MatchCard from './MatchCard'
import type {MatchInfo} from '../types/ProfileTypes.ts'
import {useState} from "react";


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

    const matchesDisplay = matches.map(m => <MatchCard key={m.matchId} serverTag={serverTag} matchData={m} version={version}></MatchCard>);

    async function loadMoreMatches() {
        setLoading(true)
        const matchesRes : MatchInfo[] = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/matches/${serverTag}/${puuid}/${anchorTime}?start=${start}`).then((res) => res.json());
        setMatches([...matches, ...matchesRes]);
        setStart(start + matchesRes.length);
        setLoading(false)
    }

    return (
        <div className={styles.component}>
            {matchesDisplay}
            <button className={styles.expandButton} onClick={() => loadMoreMatches()}>{loading ? "LOADING..." : "MORE" }</button>
        </div>
    )
}



export default MatchHistory;