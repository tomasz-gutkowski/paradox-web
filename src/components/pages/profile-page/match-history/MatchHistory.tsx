import MatchCard from './match-card/MatchCard.tsx'
import type {MatchInfo, ApiErrorResponse} from '../utilities/ProfileTypes.ts'
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
    expandButton: "flex items-center justify-center my-6 w-200 h-16 text-3xl font-bold tracking-wide text-graphite-800 bg-graphite-300 border-x-10 hover:bg-graphite-500",
}
const fetchCount = 10;

function MatchHistory({matchData, version, puuid, serverTag, anchorTime} : props) {
    const [matches, setMatches] = useState<MatchInfo[]>(matchData)
    const [start, setStart] = useState<number>(fetchCount)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>()
    const [buttonEnabled, setButtonEnabled] = useState<boolean>(true)

    const matchesDisplay = matches.map(m => <MatchCard key={m.matchId} serverTag={serverTag} matchData={m} version={version}></MatchCard>);

    async function loadMoreMatches() {
        setError(undefined);
        setLoading(true);
        const matchesRes: Response = await fetch(fetchMatchListUrl(serverTag, puuid, anchorTime)+"?count="+fetchCount+"&start="+start);

        const matchesJson : ApiErrorResponse | MatchInfo[] = await matchesRes.json();

        if(!matchesRes.ok){
            setLoading(false)
            setError((matchesJson as ApiErrorResponse).message)
        }
        else {
            const newMatches: MatchInfo[] = (matchesJson as MatchInfo[]);

            if (newMatches.length < fetchCount) setButtonEnabled(false);
            setMatches(prev => [...prev, ...newMatches]);
            setStart(prev => prev + newMatches.length);
            setLoading(false)
        }

    }

    const loadingButton = (<button type={"button"} className={styles.expandButton}>
                                    <div className={"h-14 w-14 animate-spin rounded-full border-8 border-graphite-400 border-r-graphite-800"}></div>
                                    </button>)

    const errorButton = (<button type={"button"} className={styles.expandButton} onClick={() => loadMoreMatches()}>
                                    <div className={"text-brick-red-600 text-2xl"}>{error}</div>
                                </button>)

    const expandButton = (<button type={"button"} className={styles.expandButton} onClick={() => loadMoreMatches()}>
                                    <div>MORE</div>
                                    </button>)

    return (
        <div className={styles.component}>
            {matchesDisplay}
            {loading && loadingButton}
            {!!error && errorButton}
            {!loading && !error && buttonEnabled && expandButton}
        </div>
    )
}



export default MatchHistory;