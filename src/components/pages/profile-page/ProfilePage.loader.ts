import type {MatchInfo, ProfileResponse} from "./types/ProfileTypes.ts";
import {type LoaderFunctionArgs} from 'react-router-dom';
import {fetchDataDragonLatestUrl, fetchMatchListUrl, fetchProfileUrl} from "../constants.ts";

export async function profileLoader({params}: LoaderFunctionArgs) {
    const {server, gameName, tagLine} = params;

    if(!server || !gameName || !tagLine) {
        throw new Response("Missing required params", {status: 400});
    }

    const profileRes : ProfileResponse = await fetch(fetchProfileUrl(server, gameName, tagLine)).then((res) => res.json());

    const anchor = Date.now();

    const matchesRes : MatchInfo[] = await fetch(fetchMatchListUrl(server, profileRes.player.puuid, anchor)).then((res) => res.json());

    const versionRes : string = await fetch (fetchDataDragonLatestUrl()).then((res) => res.text());

    return {profileRes , matchesRes, versionRes, server, anchor};
}