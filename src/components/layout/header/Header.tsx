
import PlayerSearchBar from "../shared/PlayerSearchBar.tsx";
import {useNavigate} from "react-router-dom";

const styles = {
    component: "px-12 bg-graphite-200 w-full h-20 flex items-center border-b-3 border-graphite-600",
    logoType: "w-1/2 flex flex-row items-center",
    imgBox: "w-28 h-18 bg-graphite-200 items-center flex items-center justify-center border-graphite-600",
    icon: "w-18 h-18",
    title: "border-x-3 px-3 text-3xl font-default-bold text-graphite-800 h-full",
    searchBar: "w-1/2 h-full flex flex-row items-center justify-end",
    navIcons: "",
    homeIcon: "h-12 w-12 mx-1",
    homeButton: "mx-4 h-14 p-1 font-bold flex flex-cols items-center justify-center font-default-bold text-graphite-800 text-lg hover:bg-graphite-500",
}


function Header(){
    const homeButtonIcon = <img className={styles.homeIcon} src={"/homeicon.png"} alt={""}></img>;
    const navigate = useNavigate();

    const navigateHome = () => {
        navigate(`/home`);
    }

    return (
        <header className={styles.component}>
            <div className={styles.logoType}>
                <div className={styles.imgBox}>
                    <img src={"/webicon.png"} className={styles.icon} alt={"PARADOX"}></img>
                </div>
                <div className={styles.title}>
                    PARADOX
                </div>
                <button type={"button"}
                        className={styles.homeButton}
                        onClick={() => navigateHome()}>
                    {homeButtonIcon}
                </button>
            </div>
            <div className={styles.searchBar}>
                <PlayerSearchBar searchBarType={"header"}/>
            </div>
        </header>
    )
}
export default Header;