import PageBlueprint from "../PageBlueprint.tsx";
import ProfileInfo from "./profile-info/ProfileInfo.tsx";
import MatchHistory from "./match-history/MatchHistory.tsx"
import type {MatchInfo, ProfileResponse} from "./utilities/ProfileTypes.ts";
import {useLoaderData} from "react-router-dom";
import {useEffect} from "react";

function ProfilePage(){

    const {profileJson , matchesJson, versionJson, server, anchor} = useLoaderData();
    const profileData = profileJson as ProfileResponse;
    const matchData = matchesJson as MatchInfo[];
    const version = versionJson as string;
    const serverTag = server as string;
    const anchorTime = anchor as number;

    useEffect(() => {
        document.title = `${profileData.player.gameName}#${profileData.player.tagLine}`;
    }, [profileData.player.gameName, profileData.player.tagLine]);


    return(
        <>
            <PageBlueprint>
                <div className="w-28/100">
                    <ProfileInfo key={`${profileData.player.puuid}`}
                                profileData={profileData}
                                version={version} />
                </div>
                <div className="flex-1 min-h-dvh">
                    <MatchHistory key={`${profileData.player.puuid}_${matchData[0]?.matchId ?? "noMatches"}`}
                                  matchData={matchData}
                                  version={version}
                                  puuid={profileData.player.puuid}
                                  serverTag={serverTag}
                                  anchorTime={anchorTime}/>
                </div>
            </PageBlueprint>
        </>
    );
}

export default ProfilePage;