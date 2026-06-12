import PageBlueprint from "../PageBlueprint.tsx";
import ProfileInfo from "./profile-info/ProfileInfo.tsx";
import MatchHistory from "./match-history/MatchHistory.tsx"
import type {MatchInfo, ProfileResponse} from "./types/ProfileTypes.ts";
import {useLoaderData} from "react-router-dom";

function ProfilePage(){

    const {profileRes , matchesRes, versionRes} = useLoaderData();
    const profileData = profileRes as ProfileResponse;
    const matchData = matchesRes as MatchInfo[];
    const version = versionRes as string;

    return(
        <>
            <PageBlueprint>
                <div className="w-28/100">
                    <ProfileInfo profileData={profileData} version={version} />
                </div>
                <div className="flex-1 min-h-dvh">
                    <MatchHistory matchData={matchData} version={version}/>
                </div>
            </PageBlueprint>
        </>
    );
}

export default ProfilePage;