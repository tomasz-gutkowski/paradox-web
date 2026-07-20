import PageBlueprint from "../PageBlueprint.tsx";
import {useEffect} from "react";



function ProfilePage(){
    useEffect(()=>{
        document.title = "...";
    })

    return(
        <>
            <PageBlueprint>
                <div></div>
            </PageBlueprint>
        </>
    );
}

export default ProfilePage;