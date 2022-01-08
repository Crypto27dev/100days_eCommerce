import './Header.css';
import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FiMenu,
    FiX,
    FiUser,
    FiShoppingCart,
    FiSearch
} from "react-icons/fi";

// const mapState = ({ auth, userData }) => ({
//     auth: auth,
//     userData: userData
// })

function Header() {

    // const { auth } = useSelector(mapState);

    let navigate = useNavigate();

    const profileOptionsRef = useRef();

    const [mobileNav, setMobileNav] = useState(true);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const [showProfileOptions, setShowProfileOptions] = useState(false);

    const handleResetMobileNav = () => {
        setMobileNavActive(false);
    }

    useEffect(() => {
        window.addEventListener("load", () => {
            if (window.innerWidth <= 992) {
                setMobileNav(true);
            }
            else {
                setMobileNav(false);
            }
        })

        window.addEventListener("resize", () => {
            if (window.innerWidth <= 992) {
                setMobileNav(true);
            }
            else {
                setMobileNav(false);
            }
        })
        return () => {
            window.removeEventListener("load", () => { })
            window.removeEventListener("resize", () => { })
        }
    }, [])

    useEffect(() => {
        const checkIfClickedOutside = e => {
            if (
                showProfileOptions &&
                profileOptionsRef.current &&
                !profileOptionsRef.current.contains(e.target)
            ) {
                setShowProfileOptions(false)
            }
        }
        document.addEventListener("mousedown", checkIfClickedOutside)
        return () => {
            document.removeEventListener("mousedown", checkIfClickedOutside)
        }
    }, [showProfileOptions])

    return (
        <div className="header" id="header">

            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center"
            }}>
                {/* Mobile Nav Toggle */}
                <button className="mobile-nav-toggle"
                    onClick={
                        () => setMobileNavActive(!mobileNavActive)
                    }>
                    {
                        mobileNavActive ?

                            <FiX />
                            :
                            <FiMenu />
                    }
                </button>
                {/* Mobile Nav Toggle */}

                <div className="logo"
                    onClick={
                        () => {
                            if (mobileNav) handleResetMobileNav()
                            navigate("/")
                        }
                    }>
                    {/* <img className="logo-img"
                    width="100%"
                    height="100%"
                    src={Logo}
                    alt="logo-img"
                    loading="lazy"
                /> */}
                    Ecommerce
                </div>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div className={
                    mobileNav ?
                        mobileNavActive ?
                            "mobile-nav mobile-nav-active"
                            : "mobile-nav"
                        :
                        "nav-menu"
                }>
                    <ul>

                        <li>
                            <button
                                onClick={
                                    () => {
                                        if (mobileNav) handleResetMobileNav()
                                        navigate("/");
                                    }
                                }>
                                Home
                            </button>
                        </li>

                        <li>
                            <button onClick={
                                () => {
                                    if (mobileNav) handleResetMobileNav()
                                    navigate("/products");
                                }
                            }>
                                Products
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={
                                    () => {
                                        if (mobileNav) handleResetMobileNav()
                                        navigate("/contact");
                                    }
                                }>
                                Contact
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={
                                    () => {
                                        if (mobileNav) handleResetMobileNav()
                                        navigate("/about");
                                    }
                                }>
                                About
                            </button>
                        </li>
                    </ul>

                </div>
            </div>

            <div style={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between"
            }}>

                <div className='header-icon'
                    onClick={
                        () => {
                            if (mobileNav) handleResetMobileNav()
                            navigate("/search");
                        }
                    }>
                    <FiSearch />
                </div>

                <div className='header-icon'>
                    <FiShoppingCart />
                </div>

                <div className='header-icon'>
                    <FiUser />
                </div>

            </div>

        </div>
    )
}

export default Header;