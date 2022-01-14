import './Loader.css';
import icon from '../../../assets/images/favicon.png';

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
        placeItems: "center",
        position: "absolute",
        zIndex: "999",
        top: 80,
        bottom: 0
    }

    const defaultStyle = {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "var(--whiteColor)",
        zIndex: "999",
        borderRadius: "50%",
        padding: "10px",
        margin: "auto"
    }

    return (
        <div className='loading'
            style={
                fullScreen ? fullScreenStyle : defaultStyle
            }>

            <div className='loading-spinner'
                style={{
                    width: size ? size : "5vmax",
                    height: size ? size : "5vmax",
                    borderBottom: thickness ? `${thickness}px solid #a139cab4` : "3px solid #a139cab4",
                    borderRadius: "50%"
                }}
            />

            <img className='icon'
                style={{
                    width: size ? size : "5vmax",
                    height: size ? size : "5vmax",
                    animation: "none",
                    aspectRatio: "1/1",
                    position: "absolute",
                    padding: "1vmax"
                }}
                src={icon}
                alt='icon'
                loading='lazy'
            />

        </div>
    )
}

export default Loader;
