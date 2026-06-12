import type {DefaultModeData, IdNameImage} from "../../types/ProfileTypes.ts";

type props = {
    summonerSpells: IdNameImage[],
    kills: number,
    deaths: number,
    assists: number,
    modeData: DefaultModeData
    version: string,
}

const styles = {
    component:  "my-1 mx-3 flex flex-row items-start justify-center",
    icon: "w-8 h-8 bg-black",
    kda: "px-3 border-l-2 mx-4 my-1 py-2 text-graphite-900 font-default-light font-bold flex items-center justify-center flex-col",
}
function DefaultModeScoreboard({summonerSpells, kills, deaths, assists, modeData, version} : props){
    let sumSpellKey = 0;
    const summonerSpellsDisplay = summonerSpells.map(s => <img key={(sumSpellKey++)+"-"+s.id} className={styles.icon} src={`https://ddragon.leagueoflegends.com/cdn/${version}/img/spell/${s.nameImage.image}`} alt={s.nameImage.name}></img>)

    const perksIconUrl = `https://ddragon.leagueoflegends.com/cdn/img/`

    const kda = `${kills}/${deaths}/${assists}`
    const kdaRatio = (deaths === 0 ? (kills+assists).toFixed(2) : ((kills+assists)/deaths).toFixed(2)) + "KDA";

    return(<div className={styles.component}>
        <div className={"border-2 flex"}>
            <div>
                {summonerSpellsDisplay}
            </div>
            <div>
                <img className={styles.icon} src={perksIconUrl+modeData.perks.keystone.nameImage.image}></img>
                <img className={styles.icon} src={perksIconUrl+modeData.perks.subStyle.nameImage.image}></img>
            </div>
        </div>
        <div className={styles.kda}>
            <div className={"text-xl"}>{kda}</div>
            <div className={"text-xs"}>{kdaRatio}</div>
        </div>

    </div>)
}


export default DefaultModeScoreboard;