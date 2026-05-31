import PageBlueprint from "../PageBlueprint.tsx";
import ProfileInfo from "./profile-info/ProfileInfo.tsx";
import MatchHistory from "./match-history/MatchHistory.tsx"
import {type LoaderFunctionArgs, useLoaderData} from 'react-router-dom';
import type {MatchInfo, ProfileResponse} from "./types/ProfileTypes.ts";



export async function profileLoader({params}: LoaderFunctionArgs) {
    const {server, gameName, tagLine} = params;
    const profileRes : ProfileResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${server}/${gameName}/${tagLine}`).then((res ) => res.json());

    const matchesRes : MatchInfo[] = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/matches/${server}/${profileRes.player.puuid}`).then((res) => res.json());

    return {profileRes , matchesRes};
}

function ProfilePage(){

    const {profileRes , matchesRes} = useLoaderData();
    const profileData = profileRes as ProfileResponse;
    const matchData = matchesRes as MatchInfo[];

    return(
        <>
            <PageBlueprint>
                <div className="w-28/100">
                    <ProfileInfo profileData={profileData} />
                </div>
                <div className="flex-1 min-h-dvh">
                    <MatchHistory matchData={matchData} />
                </div>
            </PageBlueprint>
        </>
    );
}

export default ProfilePage;