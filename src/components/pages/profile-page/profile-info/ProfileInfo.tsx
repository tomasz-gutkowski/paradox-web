import ProfileCard from './ProfileCard'
import RankedCard from './RankedCard'
import type {ProfileResponse} from "../types/ProfileTypes.ts";



const style = "m-10 pt-5 border-alabaster-grey-400 border-y-5 flex flex-col items-center justify-start place-items-";

function ProfileInfo({profileData, version} : {profileData : ProfileResponse, version : string}) {
    const profile = profileData.player;
    const leagues = profileData.leagues;
    const profileCard = <ProfileCard gameName={profile.gameName}
                                        tagLine={profile.tagLine}
                                        profileIconId={profile.profileIconId}
                                        summonerLevel={profile.summonerLevel}
                                        version={version}></ProfileCard>;
    const rankedCards = leagues.sort((l1) => l1.queueType === "RANKED_SOLO_5x5" ? -1 : 1 )
                                            .map(l => <RankedCard
                                                key={l.queueType}
                                            queueType={l.queueType}
                                            tier={l.tier}
                                            rank={l.rank}
                                            leaguePoints={l.leaguePoints}
                                            wins={l.wins}
                                            losses={l.losses}></RankedCard>)

    return(
        <div className={style}>
            {profileCard}
            {rankedCards}
        </div>
    )
}


export default ProfileInfo;