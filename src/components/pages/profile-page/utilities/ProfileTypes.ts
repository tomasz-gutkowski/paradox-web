export type ProfileResponse = {
    player : ProfileInfo,
    leagues : LeagueInfo[],
}

export type ProfileInfo = {
    puuid: string,
    gameName : string,
    tagLine : string,
    profileIconId : number,
    summonerLevel : number
}

export type LeagueInfo = {
    queueType: string,
    tier : string,
    rank : string,
    leaguePoints : number
    wins : number,
    losses : number
}

export type MatchInfo = {
    matchId : string,
    gameResult : string,
    gameData : GameModeData,
    player : PlayerDisplayInfo,
    participants : ParticipantDisplayInfo[],
    gameEndTimestamp : number,
    gameDuration : number
}

export type GameModeData = {
    id: number,
    map : string,
    modeName : string,
}

export type MatchDetails = {
    players : PlayerDisplayInfo[],
}

export type PlayerDisplayInfo = {
    gameName: string,
    tagline: string,
    championData: ChampionData,
    level: number,
    summonerSpells: IdNameImageData[],
    kills: number,
    deaths: number,
    assists: number,
    totalDamageDealtToChampions: number,
    items: IdNamePair[],
    modeData : DefaultModeData | ArenaModeData
}

export type DefaultModeData = {
    win : boolean,
    perks : PerksInfo,
    creepScore : number,
    side : string,
    position : string
}

export type ArenaModeData = {
    teamId : number,
    teamPlacement : number,
    augments : AugmentData[],
}

export type PerksInfo = {
    keystone : IdNameImageData,
    primaryStyle : IdNameImageData,
    subStyle : IdNameImageData,
}

export type IdNameImageData = {
    id: number,
    name: string,
    image: string
}

export type IdNamePair = {
    id: number,
    name: string
}

export type ParticipantDisplayInfo = {
    puuid : string,
    gameName : string,
    tagLine : string,
    championData : ChampionData,
    position : string,
    teamId : number
    placement : number
}

export type ChampionData = {
    key: string,
    id: string,
    name: string
}

export type AugmentData = {
    id : number,
    name : string,
    iconLarge : string,
    iconSmall : string,
}

export type ApiErrorResponse = {
    status: number;
    message: string;
    path: string;
    timestamp: string;
}

