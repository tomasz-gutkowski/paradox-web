import {useState} from "react";
import {useNavigate, useNavigation} from "react-router-dom";

const styles = {
    component: "w-1/3 h-full flex flex-row items-center justify-center",
    searchButton: "bg-graphite-200 p-1 m-1 text-xl font-default-light text-graphite-800 font-bold",
    nameInput: "border-l-2 align-middle px-2 py-1 bg-graphite-200 focus:outline-0 text-2xl font-default-light text-graphite-800 font-bold",
    serverSelect: "ml-1 items-center border-l-2 align-middle px-2 py-1 appearance-none bg-graphite-200 focus:outline-0 border-0 text-2xl text-graphite-800 font-bold"
}

function HeaderSearchBar() {
    const defaultServer = "EUW1";
    const nameInputId = "header-fullgamename"

    const navigate = useNavigate();
    const navigation = useNavigation();

    const [server, setServer] = useState(defaultServer);


    const loading = navigation.state === "loading";


    function selectServer(e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>) {
        const selectedVal = e.target.value;
        setServer(selectedVal);
    }

    const searchButtonIcon = loading ?
        <div className="h-8 w-8 animate-spin rounded-full border-5 border-graphite-400 border-r-graphite-800" /> :
        <img className="h-8 w-8" src={"/src/assets/searchIcon.png"} alt={""}></img>;

    function handleSubmit() {
        const fullGameName = (document.getElementById(nameInputId) as HTMLInputElement).value;

        if(server === "") return;

        const matchName = fullGameName.match(/^[^#]{3,16}#[a-zA-Z0-9]{3,5}$/);

        if(!matchName) return;

        const [gameName, tagLine] = fullGameName.split("#");

        navigate(`/profile/${server}/${gameName}/${tagLine}`);
    }

    return (
        <div className={styles.component}>

            <div className={"border-3 text-graphite-800 flex items-center justify-center"}>
                <button type={"button"}
                        className={styles.searchButton}
                        onClick={() => handleSubmit()}>
                    {searchButtonIcon}
                </button>
                <input id={nameInputId}
                       className={styles.nameInput}
                       type={"text"}>
                </input>
                <select defaultValue={server}
                        className={styles.serverSelect}
                        onChange={(e) => selectServer(e)}>
                    <option value={"BR1"}> BR  </option>
                    <option value={"EUN1"}>EUNE</option>
                    <option value={"EUW1"}>EUW </option>
                    <option value={"JP1"}> JP  </option>
                    <option value={"KR"}>  KR  </option>
                    <option value={"LA1"}> LAN </option>
                    <option value={"LA2"}> LAS </option>
                    <option value={"ME1"}> ME  </option>
                    <option value={"NA1"}> NA  </option>
                    <option value={"OC1"}> OCE </option>
                    <option value={"RU"}>  RU  </option>
                    <option value={"SG2"}> SG  </option>
                    <option value={"TR1"}> TR  </option>
                    <option value={"TW2"}> TW  </option>
                    <option value={"VN2"}> VN  </option>
                </select>
            </div>
            </div>
    )

}

export default HeaderSearchBar;