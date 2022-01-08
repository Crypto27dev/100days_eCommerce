import './Loader.css';

function Loader({
    fullScreen,
    size,
    thickness
}) {

    const fullScreenStyle = {
        width: "100vw",
        maxWidth: "100%",
        height: "100vh",
        backgroundColor: "var(--whiteColor)",
        display: "grid",
        placeItems: "center"
    }

    const defaultStyle = {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "var(--whiteColor)",
        zIndex: "999",
        borderRadius: "50%",
        padding: "10px",
        display: "block",
        margin: "auto"
    }

    return (
        <div className='loading'
            style={
                fullScreen ? fullScreenStyle : defaultStyle
            }>

            <div style={{
                width: size ? size : "5vmax",
                height: size ? size : "5vmax",
                borderBottom: thickness ? `${thickness}px solid rgb(110, 110, 110)` : "3px solid rgb(110, 110, 110)",
                borderRadius: "50%"
            }}
            ></div>

        </div>
    )
}

export default Loader;
