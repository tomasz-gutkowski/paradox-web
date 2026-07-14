//backend_url
import type {DefaultModeData, ParticipantDisplayInfo, PlayerDisplayInfo} from "./ProfileTypes.ts";

export const BACKEND_URL: string = import.meta.env.VITE_BACKEND_URL;

//backend calls
export const fetchProfileUrl = (serverId: string, gameName: string, tagLine: string) : string =>
    (`${BACKEND_URL}/api/profile/${serverId}/${gameName}/${tagLine}`);

export const fetchMatchListUrl = (serverId : string, puuid : string, endTime : number) : string =>
    (`${BACKEND_URL}/api/matches/${serverId}/${puuid}/${endTime}`);

export const fetchMatchDetailsUrl = (serverId : string, matchId : string) : string =>
    (`${BACKEND_URL}/api/match/${serverId}/${matchId}`);

export const fetchDataDragonLatestUrl = () => (`${BACKEND_URL}/api/ddragon/latest`)

//datadragon & communitydragon asset calls
export const getProfileIconUrl = (version : string, profileIconId : number) : string =>
    (`https://ddragon.leagueoflegends.com/cdn/${version}/img/profileicon/${profileIconId}.png`);

export const getChampionIconUrl = (version : string, championId : string) : string =>
    (`https://ddragon.leagueoflegends.com/cdn/${version}/img/champion/${championId}.png`);

export const getItemIconUrl = (version : string, itemId : number) : string =>
    (`https://ddragon.leagueoflegends.com/cdn/${version}/img/item/${itemId}.png`);

export const getSummonerSpellIconUrl = (version : string, summonerSpellImage : string) : string =>
    (`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${summonerSpellImage}`);

export const getPerkIconUrl = (perkImage : string) : string =>
    (`https://ddragon.leagueoflegends.com/cdn/img/${perkImage}`);

export const getAugmentIconUrl = (augmentIcon : string) : string =>
    (`https://raw.communitydragon.org/latest/game/${augmentIcon}`);

//sorting by position
export function sortByRoleParticipant(p1:ParticipantDisplayInfo , p2:ParticipantDisplayInfo){
    return POSITION_ORDER[p1.position] - POSITION_ORDER[p2.position];
}

export function sortByRolePlayer(p1:PlayerDisplayInfo, p2:PlayerDisplayInfo){
    return POSITION_ORDER[(p1.modeData as DefaultModeData).position] - POSITION_ORDER[(p2.modeData as DefaultModeData).position];
}

const POSITION_ORDER: Record<string, number> = {
    TOP: 0,
    JUNGLE: 1,
    MIDDLE: 2,
    BOTTOM: 3,
    UTILITY: 4,
};