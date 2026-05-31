
const styles = {
    properties: "cursor-pointer align-middle my-2 mx-3 py-2 px-7",
    base: "bg-graphite font-default-bold rounded-3xl text-light-text",
    hover:  "hover:bg-graphite-600",
}

function HeaderButton({title}: {title: string}) {
    return (
        <button
        className={styles.properties+" "+styles.base+" "+styles.hover}>
            {title}
        </button>
    )
}
export default HeaderButton;