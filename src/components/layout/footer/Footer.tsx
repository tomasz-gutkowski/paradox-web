const textStyle = "p-3 pt-5 text-sm align-middle text-center"

function Footer(){
    const name = "lolapilikacjaxdd"
    const disclaimer =  name+" is not endorsed by Riot Games and does not reflect the views or opinions of Riot Games or anyone officially involved in producing or managing Riot Games properties. Riot Games and all associated properties are trademarks or registered trademarks of Riot Games, Inc"
    return (
        <footer className="
        bg-graphite-200
        text-light-text
         w-full
         h-16
         font-tahoma
         border-t
         border-alabaster-grey-400">
        <div className={textStyle}>{disclaimer}</div>
        </footer>
    )
}
export default Footer;