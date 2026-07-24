import PageBlueprint from "../PageBlueprint.tsx";
import {useEffect} from "react";
import PlayerSearchBar from "../../layout/shared/PlayerSearchBar.tsx";

const styles = {
    component: "flex items-center mt-45 w-full flex-col",
    title: "text-6xl pb-5 font-default-bold text-graphite-800",
}

function HomePage(){
    useEffect(() => {
        document.title = "Home";
    })

    return(
        <PageBlueprint>
            <div className={styles.component}>
                <img src={"../../../src/assets/webicon.png"} className={"w-76 h-76"}></img>
                <div className={styles.title}>PARADOX</div>
                <PlayerSearchBar searchBarType={"main"}/>
            </div>
        </PageBlueprint>
    );
}

export default HomePage;