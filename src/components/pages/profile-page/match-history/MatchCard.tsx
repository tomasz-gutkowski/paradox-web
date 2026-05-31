import type {MatchInfo} from "../types/ProfileTypes.ts";

const styles = {
    win:"bg-glaucous-600 hover:bg-glaucous-700 w-200 h-40 border-y-0 border-x-10 border-solid border-steel-blue mt-8",
    loss: "bg-rosewood-600 hover:bg-rosewood-700 w-200 h-40 border-y-0 border-x-10 border-solid border-brick-red-700 mt-8",
    remake: "bg-graphite-700 hover:bg-graphite-600 w-200 h-40 border-y-0 border-x-10 border-solid border-graphite-800 mt-8",
    error: "bg-graphite-900 hover:bg-graphite-900 w-200 h-40 border-y-0 border-x-10 border-solid border-graphite-100 mt-8"
};

function MatchCard({matchData} : {matchData : MatchInfo}){
    let style : string;

    switch(matchData.gameResult){
        case "WIN":{ style = styles.win; break;}
        case "LOSE":{ style = styles.loss; break;}
        case "REMAKE":{ style = styles.remake; break;}
        default: {style = styles.error; break;}
    }


    return(
        <div className={style}>

        </div>
    );
}

export default MatchCard;