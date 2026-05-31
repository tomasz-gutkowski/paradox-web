import HeaderButton from "./HeaderButton.tsx";
import HeaderTextField from "./HeaderTextField.tsx";

function Header(){
    return (
        <header className="
        bg-graphite-200
        text-text-light
         w-full
         h-16
         font-default-light
         place-content-center
         flex
         justify-between
         items-center
         pl-10
         pr-10
         border-b
         border-alabaster-grey-400
         ">
            <div className="w-3/8 flex items-center justify-start">
                <HeaderButton title={"HOME"}></HeaderButton>
                <HeaderButton title={"EXAMPLE"}></HeaderButton>
            </div >
            <div className="text-graphite-200 font-default-bold text-2xl w-2/8 flex items-center justify-center bg-alabaster-grey">
                <img src="/src/assets/webicon.png" className="w-16 h-16"></img><h1>NAZWA STRONY</h1>
            </div>
            <div className="w-3/8 flex items-center justify-end">
                <HeaderButton title={"SEARCH"}></HeaderButton>
                <HeaderTextField></HeaderTextField>
            </div>

        </header>
    )
}
export default Header;