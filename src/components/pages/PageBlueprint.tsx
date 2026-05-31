import Footer from "../layout/footer/Footer.tsx";
import Header from "../layout/header/Header.tsx";
import MainContent from "../layout/MainContent.tsx";

type Props = {
    children: React.ReactNode;
}

function PageBlueprint({children}: Props) {
    return(
        <div className="min-h-dvh flex flex-col">
            <Header/>
            <MainContent>
                {children}
            </MainContent>
            <Footer/>
        </div>
    );
}

export default PageBlueprint;