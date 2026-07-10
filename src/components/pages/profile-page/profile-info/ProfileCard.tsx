import {getProfileIconUrl} from "../utilities/constants.ts";

type Props = {
    gameName : string,
    tagLine : string,
    profileIconId : number,
    summonerLevel : number,
    version : string,
}
const styles = {
    cardStyle: "mb-10 bg-graphite-200 w-100 h-60 p-5 width-10 rounded-xl border-3 border-solid border-alabaster-grey-400 flex flex-col items-center justify-center",
    imgStyle: "size-32 rounded-full border-3 border-solid border-alabaster-grey-400",
    labelStyle: "bg-graphite-800 border-2 border-solid border-alabaster-grey-400 rounded-xl py- px-4 my-2 text-dark-text font-default-bold",
    h4Style: "cursor-pointer text-light-tex font-default-bold",
}

function ProfileCard({gameName, tagLine, profileIconId, summonerLevel, version} : Props) {
    const profileIconUrl = getProfileIconUrl(version, profileIconId);
    const riotId = `${gameName}#${tagLine}`;

    const copyToClipboard = (text: string) => {
        navigator.clipboard.writeText(text);
    }

    return (
        <div className={styles.cardStyle}>
            <img src={profileIconUrl} className={styles.imgStyle} alt={riotId}></img>
            <label className={styles.labelStyle}>{summonerLevel}</label>
            <div>
                <h4 onClick={() => copyToClipboard(riotId)} className={styles.h4Style}>{riotId}</h4>
            </div>
        </div>
    )
}

export default ProfileCard;