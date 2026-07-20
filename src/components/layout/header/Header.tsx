import HeaderSearchBar from "./HeaderSearchBar";

const styles = {
    component: "px-10 bg-graphite-200 w-full h-16 flex items-center border-b-3 border-graphite-600",
    logoType: "w-1/3 flex flex-row items-center",
    imgBox: "w-20 h-16 bg-graphite-800 items-center flex items-center justify-center",
    icon: "w-15 h-15 ",
    title: "px-5 text-2xl font-default-bold text-graphite-800 h-full",

    navIcons: "w-1/3 h-full bg-green-500",

}


function Header(){


    return (
        <header className={styles.component}>
            <div className={styles.logoType}>
                <div className={styles.imgBox}>
                    <img src={"/src/assets/webicon.png"} className={styles.icon}></img>
                </div>
                <div className={styles.title}>
                    TEMP.GG
                </div>
            </div>
            <HeaderSearchBar></HeaderSearchBar>
            <div className={styles.navIcons}>

            </div>
        </header>
    )
}
export default Header;