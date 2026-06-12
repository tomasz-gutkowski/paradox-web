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
    gameData : {id: number, info : MapAndModeInfo},
    player : PlayerDisplayInfo,
    participants : ParticipantDisplayInfo[],
    gameEndTimestamp : number,
    gameDuration : number
}

export type MatchDetails = {
    players : PlayerDisplayInfo[],
}

export type MapAndModeInfo = {
    map : string,
    modeName : string
}

export type PlayerDisplayInfo = {
    gameName: string,
    tagline: string,
    championData: ChampionData,
    level: number,
    summonerSpells: IdNameImage[],
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
    augments : IdNamePair[],
}

export type PerksInfo = {
    keystone : IdNameImage,
    primaryStyle : IdNameImage,
    subStyle : IdNameImage,
}

export type IdNameImage = {
    id: number,
    nameImage: {name: string, image: string}
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
    idName: {id: string, name: string},
}

