import MatchCard from './MatchCard'
import type {MatchInfo} from '../types/ProfileTypes.ts'

function MatchHistory({matchData, version} : {matchData : MatchInfo[], version : string}) {
        const matches = matchData.map(m => <MatchCard key={m.matchId} matchData={m} version={version}></MatchCard>);
    return (
        <div className="flex flex-col items-center justify-start">
                {matches}
        </div>
    )
}

export default MatchHistory;