import './Loader.css';
import icon from '../../../assets/images/favicon.png';

function Loader({
    fullScreen
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
        top: 0,
        bottom: 0,
        left: 0,
        right: 0
    }

    const defaultStyle = {
        width: "fit-content",
        height: "fit-content",
        backgroundColor: "var(--whiteColor)",
        zIndex: "999",
        borderRadius: "50%",
        margin: "1rem auto",
    }

    return (
        <div className='loading'
            style={
                fullScreen ? fullScreenStyle : defaultStyle
            }>

            <div className='loading-spinner'
                style={{
                    width: "48px",
                    height: "48px",
                    border: "3px solid #d4d4d4",
                    borderRadius: "50%"
                }}
            />

            <div className='loading-spinner-2'
                style={{
                    width: 8,
                    height: "48px",
                    borderTop: "4px solid #A239CA",
                }}
            />

            <img className='icon'
                style={{
                    width: "24px",
                    height: "24px",
                    animation: "none",
                    aspectRatio: "1/1",
                    position: "absolute"
                }}
                src={icon}
                alt='icon'
                loading='lazy'
            />

        </div>
    )
}

export default Loader;
