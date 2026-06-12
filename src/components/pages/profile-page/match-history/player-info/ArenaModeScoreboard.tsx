import type {ArenaModeData} from "../../types/ProfileTypes.ts";

type props = {
    kills: number,
    deaths: number,
    assists: number,
    modeData: ArenaModeData,
    version: string,
}

function ArenaModeScoreboard({kills, deaths, assists, modeData, version}: props) {
    return(<div></div>)
}

export default ArenaModeScoreboard;