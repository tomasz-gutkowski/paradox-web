import PageBlueprint from "../PageBlueprint.tsx";
import {useEffect} from "react";



function ProfilePage(){
    useEffect(()=>{
        document.title = "...";
    })

    return(
        <>
            <PageBlueprint>
                <div className={"w-full flex items-center justify-center"}>
                    <div className={"h-32 w-32 animate-spin rounded-full border-12 border-graphite-400 border-r-graphite-800"}></div>
                </div>
            </PageBlueprint>
        </>
    );
}

export default ProfilePage;