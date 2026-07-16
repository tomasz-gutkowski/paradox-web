import PageBlueprint from "../PageBlueprint.tsx";
import {isRouteErrorResponse, useRouteError} from "react-router-dom";
import {useEffect} from "react";

const styles = {
    errorBox: "font-default-light font-bold text-graphite-800 flex items-center flex-col w-full",
    statusCode: "text-9xl text-brick-red-600",
    errorText: "pt-10 text-6xl",
}

function PageNotFound(){
    const error = useRouteError();


    useEffect(() => {
        document.title = isRouteErrorResponse(error) ? (error.status).toString() : "404";
        }, [error]);


    const statusMessage = isRouteErrorResponse(error) ?
        (<div className={styles.errorBox}>
            <div className={styles.statusCode}>{error.status}</div>
            <div className={styles.errorText}>{error.data}</div>
        </div>) :
        (<div className={styles.errorBox}>
            <div className={styles.statusCode}>404</div>
            <div className={styles.errorText}>Page not found</div>
        </div>);

    return(
        <PageBlueprint>
            <div className="w-full flex items-center justify-center">
                {statusMessage}
            </div>
        </PageBlueprint>
    );
}

export default PageNotFound;