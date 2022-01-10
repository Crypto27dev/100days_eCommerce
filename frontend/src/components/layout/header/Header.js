import './Header.css';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import {
    FiMenu,
    FiX,
    FiUser,
    FiShoppingCart,
    FiSearch,
    FiSettings,
    FiLogOut,
    FiList
} from "react-icons/fi";
import { logout } from "../../../redux/actions/userAction";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Badge from '@mui/material/Badge';


function Header() {

    const dispatch = useDispatch();

    const { isAuthenticated, user, loading } = useSelector((state) => state.user);
    const { cartItems } = useSelector((state) => state.cart);
    
    const navigate = useNavigate();

    const [mobileNav, setMobileNav] = useState(true);
    const [mobileNavActive, setMobileNavActive] = useState(false);
    const [anchorEl, setAnchorEl] = useState(false);

    const handleMenuClick = evt => {
        setAnchorEl(evt.currentTarget);
    }

    const handleCloseMenu = () => {
        setAnchorEl(null);
    }

    const openMenu = Boolean(anchorEl);

    const handleResetMobileNav = () => {
        setMobileNavActive(false);
    }

    const handleLogout = () => {
        dispatch(logout());
    }

    const navigateToDashboard = () => {
        navigate("/dashboard")
    }

    const navigateToProfile = () => {
        navigate("/account")
    }

    const navigateToCart = () => {
        navigate("/cart")
    }

    const navigateToOrders = () => {
        navigate("/orders")
    }

    const UserOptions = [
        {
            icon: <FiShoppingCart />,
            name: "My Cart",
            func: navigateToCart
        },
        {
            icon: <FiList />,
            name: "My Orders",
            func: navigateToOrders
        },
        {
            icon: <FiUser />,
            name: "Profile",
            func: navigateToProfile
        },
        {
            icon: <FiLogOut />,
            name: "Logout",
            func: handleLogout
        }
    ]

    if (isAuthenticated && !loading && user.role === "admin") {
        UserOptions.unshift({
            icon: <FiUser />,
            name: "Dashboard",
            func: navigateToDashboard
        })
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

                <div className='header-icon'
                    onClick={
                        () => {
                            if (mobileNav) handleResetMobileNav()
                            navigate("/cart");
                        }
                    }>
                    <Badge badgeContent={cartItems.length} color='primary'>
                        <FiShoppingCart />
                    </Badge>
                </div>

                {
                    isAuthenticated ?
                        <div>
                            <div className='header-icon'
                                id='user-button'
                                aria-controls={openMenu ? 'user-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={openMenu ? 'true' : undefined}
                                onClick={
                                    (evt) => {
                                        if (mobileNav) handleResetMobileNav();
                                        handleMenuClick(evt);
                                    }
                                }>
                                <FiSettings />
                            </div>
                            <Menu
                                id="user-menu"
                                anchorEl={anchorEl}
                                open={openMenu}
                                onClose={handleCloseMenu}
                                MenuListProps={{
                                    'aria-labelledby': 'user-button',
                                }}>

                                {
                                    UserOptions.map((option, i) => (
                                        <MenuItem
                                            key={i}
                                            onClick={
                                                () => {
                                                    handleCloseMenu();
                                                    option.func();
                                                }
                                            }
                                            style={{
                                                fontSize: 14
                                            }}>
                                            <span style={{
                                                marginRight: 10,
                                                color: "grey"
                                            }}>
                                                {option.icon}
                                            </span>
                                            {option.name}
                                        </MenuItem>
                                    ))
                                }

                            </Menu>
                        </div>
                        :
                        <div className='header-icon'
                            onClick={
                                () => {
                                    if (mobileNav) handleResetMobileNav();
                                    navigate("/login");

                                }
                            }>
                            <FiUser />
                        </div>
                }

            </div>

        </div>
    )
}

export default Header;