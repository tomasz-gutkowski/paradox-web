import type {ArenaModeData} from "../../types/ProfileTypes.ts";

type props = {
    kills: number,
    deaths: number,
    assists: number,
    modeData: ArenaModeData
}

const styles = {
    component : "my ml-3 flex flex-row items-start justify-center",
    augmentBox : "grid grid-cols-3 gap-1 border-solid border-3 bg-graphite-500",
    augmentIcon : "h-8 w-8 bg-graphite-200",
    stats: "pl-2 py-1 border-l-2 mx-4 my-3 py-0 font-default-light font-bold flex items-center justify-center flex-col",
    kda : "text-xl text-graphite-900 px-1 py-0 flex flex-row tracking-widest border-b-1",
    kdaRatio: "mt-1 text-xs text-graphite-900",
}
function ArenaModeScoreboard({kills, deaths, assists, modeData}: props) {
    const augmentIconUrl = 'https://raw.communitydragon.org/latest/game/'

    const augmentsDisplay = modeData.augments.map((a, index) => {
            if(a.id > 0){
                return (<div key={index+"_"+a.id} className={styles.augmentIcon}><img src={augmentIconUrl+a.iconSmall} alt={a.id.toString()}></img></div>)
            }
            else{
                return (<div key={"empty_"+index} className={styles.augmentIcon}></div>)
            }
        }
        );

    const kda = <div className={styles.kda}>{kills+"/"}<div className={"text-red-500"}>{deaths}</div>{"/"+assists}</div>
    const kdaRatio = deaths === 0 ? kills+assists : (kills+assists)/deaths;
    const kdaRatioDisplay = <div>{(kdaRatio).toFixed(2)+"KDA"}</div>;

    return(<div className={styles.component}>
        <div className={styles.augmentBox}>
            {augmentsDisplay}
        </div>
        <div className={styles.stats}>
            <div>
                {kda}
            </div>
            <div className={styles.kdaRatio}>
                {kdaRatioDisplay}
            </div>
        </div>
    </div>)
}

export default ArenaModeScoreboard;