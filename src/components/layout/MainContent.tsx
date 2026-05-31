type Props = {
    children: React.ReactNode;
}
const style = "bg-graphite-400 text-light-text w-full flex font-tahoma min-h-dvh";

function MainContent({children} : Props) {
    return(<main className={style}>
        {children}
        </main>)
}
export default MainContent;