import type {MatchInfo, ProfileResponse} from "./types/ProfileTypes.ts";
import {type LoaderFunctionArgs} from 'react-router-dom';

export async function profileLoader({params}: LoaderFunctionArgs) {
    const {server, gameName, tagLine} = params;

    const profileRes : ProfileResponse = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/profile/${server}/${gameName}/${tagLine}`).then((res) => res.json());

    const anchorTime = Date.now();

    const matchesRes : MatchInfo[] = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/matches/${server}/${profileRes.player.puuid}/${anchorTime}`).then((res) => res.json());

    const versionRes : string = await fetch (`${import.meta.env.VITE_BACKEND_URL}/api/ddragon/latest`).then((res) => res.text());

    return {profileRes , matchesRes, versionRes};
}