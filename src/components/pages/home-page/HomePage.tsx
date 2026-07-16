import PageBlueprint from "../PageBlueprint.tsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";

const styles = {
    component: "flex items-center mt-55 w-full flex-col",
    title: "text-8xl pb-5",
    nameInput: "align-middle px-2 py-1 bg-graphite-200 focus:outline-0 text-2xl font-default-light text-graphite-800 font-bold"
}

document.title = "Home"

function HomePage(){
    const defaultServer = "EUW1";

    const [server, setServer] = useState(defaultServer);
    const navigate = useNavigate();

    function selectServer(e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
        const selectedVal = e.target.value;
        setServer(selectedVal);
    }

    function handleSubmit() {
        const fullGameName = (document.getElementById("fullGameName") as HTMLInputElement).value;

        if(server === "") return;

        const matchName = fullGameName.match(/^[^#]{3,16}#[a-zA-Z0-9]{3,5}$/);

        if(!matchName) return;

        const [gameName, tagLine] = fullGameName.split("#");

        console.log(`/profile/${server}/${gameName}/${tagLine}`);
        navigate(`/profile/${server}/${gameName}/${tagLine}`);
    }



    return(
        <PageBlueprint>
            <div className={styles.component}>
                <img src={"../../../src/assets/webicon.png"} className={"w-64 h-64"}></img>
                <div className={styles.title}></div>
                <form className={"flex flex-col items-center justify-center"}>
                    <div className={"border-3 text-graphite-800"}>
                    <input id={"fullGameName"} className={styles.nameInput} type={"text"}></input>
                    <select defaultValue={defaultServer} onChange={e => selectServer(e)} className={"max-h-100 items-center border-l-2 align-middle px-2 py-1 appearance-none bg-graphite-200 focus:outline-0 border-0 text-2xl text-graphite-800 font-bold"} name={"server"}>
                        <option value={"BR1"}>BR</option>
                        <option value={"EUN1"}>EUNE</option>
                        <option value={"EUW1"}>EUW</option>
                        <option value={"JP1"}> JP </option>
                        <option value={"KR"} >KR</option>
                        <option value={"LA1"}>LAN</option>
                        <option value={"LA2"}>LAS</option>
                        <option value={"ME1"}>ME </option>
                        <option value={"NA1"}>NA</option>
                        <option value={"OC1"}>OCE</option>
                        <option value={"RU"}>RU</option>
                        <option value={"SG2"}>SG</option>
                        <option value={"TR1"}>TR</option>
                        <option value={"TW2"}>TW</option>
                        <option value={"VN2"}>VN</option>
                    </select>
                    </div>
                    <button type={"button"}
                            onClick={() => handleSubmit()}
                            className={"border-3 bg-graphite-300 mt-3 py-2 px-5 text-xl font-default-light text-graphite-800 font-bold rounded-xl"}
                            >SEARCH
                    </button>
                </form>
            </div>
        </PageBlueprint>
    );
}

export default HomePage;