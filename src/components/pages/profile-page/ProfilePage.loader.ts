import type {MatchInfo, ProfileResponse} from "./utilities/ProfileTypes.ts";
import {type LoaderFunctionArgs} from 'react-router-dom';
import {fetchDataDragonLatestUrl, fetchMatchListUrl, fetchProfileUrl} from "./utilities/constants.ts";

export async function profileLoader({params}: LoaderFunctionArgs) {
    const {server, gameName, tagLine} = params;

    if(!server || !gameName || !tagLine) {
        throw new Response("Missing required params", {status: 400});
    }

    const profileRes: Response = await fetch(fetchProfileUrl(server, gameName, tagLine))
        .catch(() => {
            throw new Response("Unable to reach the server", { status: 503 })
        });


    if(!profileRes.ok) throw new Response("Profile data not found", {status: 404});

    const profileJson : ProfileResponse = await profileRes.json();


    const anchor = Date.now();


    const matchesRes : Response = await fetch(fetchMatchListUrl(server, profileJson.player.puuid, anchor))
        .catch(() => {
            throw new Response("Unable to reach the server", { status: 503 })
        });

    if(!matchesRes.ok) throw new Response("Profile data not found", {status: 404});


    const matchesJson : MatchInfo[] = await matchesRes.json();


    const versionRes : Response = await fetch (fetchDataDragonLatestUrl())
        .catch(() => {
            throw new Response("Unable to reach the server", { status: 503 })
        });

    if (!versionRes.ok) throw new Response("Profile data not found", {status: 404});


    const versionJson : string = await versionRes.text();


    return {profileJson , matchesJson, versionJson, server, anchor};
}