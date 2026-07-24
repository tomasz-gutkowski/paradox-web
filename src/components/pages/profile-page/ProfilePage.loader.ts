import type {MatchInfo, ProfileResponse} from "./utilities/ProfileTypes.ts";
import {type LoaderFunctionArgs} from 'react-router-dom';
import {fetchDataDragonLatestUrl, fetchMatchListUrl, fetchProfileUrl} from "./utilities/constants.ts";

type ApiErrorResponse = {
    status: number;
    message: string;
    path: string;
    timestamp: string;
}

export async function profileLoader({params}: LoaderFunctionArgs) {
    const {server, gameName, tagLine} = params;

    if(!server || !gameName || !tagLine) {
        throw new Response("Missing required params", {status: 400});
    }

    const profileRes: Response = await fetch(fetchProfileUrl(server, gameName, tagLine))
        .catch(() => {
            throw new Response("Unable to reach the server", { status: 503 })
        });

    const profileJson : ApiErrorResponse | ProfileResponse = await profileRes.json();

    if(!profileRes.ok) throw new Response((profileJson as ApiErrorResponse).message ?? "Unexpected error", {status: profileRes.status});


    const anchor = Date.now();


    const matchesRes : Response = await fetch(fetchMatchListUrl(server, (profileJson as ProfileResponse).player.puuid, anchor))
        .catch(() => {
            throw new Response("Unable to reach the server", { status: 503 })
        });

    const matchesJson : ApiErrorResponse | MatchInfo[] = await matchesRes.json();

    if(!matchesRes.ok) throw new Response((matchesJson as ApiErrorResponse).message ?? "Unexpected error", {status: matchesRes.status});

    const versionRes : Response = await fetch (fetchDataDragonLatestUrl())
        .catch(() => {
            throw new Response("Unable to reach the server", { status: 503 })
        });

    if (!versionRes.ok) throw new Response((await (versionRes.json()) as ApiErrorResponse).message ?? "Unexpected error", {status: versionRes.status});


    const versionJson : string = await versionRes.text();


    return {profileJson , matchesJson, versionJson, server, anchor};
}