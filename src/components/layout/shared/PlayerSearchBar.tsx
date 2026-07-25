import {useEffect, useState} from "react";
import {useNavigate, useNavigation} from "react-router-dom";
import * as React from "react";

type props = {
    searchBarType: "header" | "main",
}

function PlayerSearchBar({searchBarType}: props) {

    const styles = {
        header: {
            component: "border-3 bg-graphite-200 text-graphite-800 flex items-center justify-center text-2xl",
            searchButton: "p-2 font-default-light text-graphite-800 font-bold hover:bg-graphite-500 cursor-pointer",
            nameInput: "w-120 field-sizing-fixed h-8 border-x-2 align-middle px-2 py-1 bg-graphite-200 focus:outline-0 font-default-light text-graphite-800 font-bold",
            invalidName: "h-8 border-x-2 align-middle px-2 py-1 bg-rosewood-800 focus:outline-0 font-default-light text-graphite-800 font-bold",
            serverSelect: "h-full p-2 items-center align-middle px-2 appearance-none bg-graphite-200 focus:outline-0 border-0 text-graphite-800 font-bold hover:bg-graphite-500 cursor-pointer",
            loadingIcon: "h-8 w-8 animate-spin rounded-full border-5 border-graphite-400 border-r-graphite-800",
            searchIcon: "h-8 w-8",
        },
        main: {
            component: "border-3 bg-graphite-200 text-graphite-800 flex items-center justify-center text-3xl",
            searchButton: "p-2 font-default-light text-graphite-800 font-bold hover:bg-graphite-500 cursor-pointer",
            nameInput: "w-130 field-sizing-fixed h-11 border-x-2 align-middle px-2 py-1 bg-graphite-200 focus:outline-0 font-default-light text-graphite-800 font-bold",
            invalidName: "bg-rosewood-800",
            serverSelect: "h-full p-2 items-center align-middle px-2 appearance-none bg-graphite-200 focus:outline-0 border-0 text-graphite-800 font-bold hover:bg-graphite-500 cursor-pointer",
            loadingIcon: "h-11 w-11 animate-spin rounded-full border-7 border-graphite-400 border-r-graphite-800",
            searchIcon: "h-11 w-11",
        }
    }[searchBarType];

    const nameInputId = `${searchBarType}-fullgamename`

    const navigate = useNavigate();
    const navigation = useNavigation();

    const [server, setServer] = useState(() => sessionStorage.getItem("server") ?? "EUW1");
    const [invalidName, setInvalidName] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() =>{
        // eslint-disable-next-line react-hooks/set-state-in-effect
        if(navigation.state === "idle") setIsLoading(false);
    },[navigation.state]);

    const loading = navigation.state === "loading" && isLoading;


    function selectServer(e: React.ChangeEvent<HTMLSelectElement>) {
        const selectedVal = e.target.value;
        sessionStorage.setItem("server", selectedVal);
        setServer(selectedVal);
    }

    const searchButtonIcon = loading ?
        <div className={styles.loadingIcon}/> :
        <img className={styles.searchIcon} src={"/searchicon.png"} alt={""}></img>;

    function handleSubmit() {
        const fullGameName = (document.getElementById(nameInputId) as HTMLInputElement).value;

        if(server === "") return;

        const matchName = fullGameName.match(/^[^#]{3,16}#[a-zA-Z0-9]{3,5}$/);

        if(!matchName) {
            setInvalidName(true);
            setTimeout(() => setInvalidName(false), 1500);
            return;
        }

        const [gameName, tagLine] = fullGameName.split("#");

        setIsLoading(true);
        sessionStorage.setItem("server", server);
        navigate(`/profile/${server}/${gameName}/${tagLine}`);
    }

    return (
        <div className={styles.component}>
                <button type={"button"}
                        className={styles.searchButton}
                        onClick={() => handleSubmit()}>
                    {searchButtonIcon}
                </button>
                <input id={nameInputId}
                       className={invalidName ? styles.nameInput+" "+styles.invalidName : styles.nameInput}
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

    )

}

export default PlayerSearchBar;