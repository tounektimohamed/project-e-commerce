// Functional Component for the Navbar
// Imports
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";
import { formToggle } from "../../Redux/Reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { cartState, fetchCartItemsAsync } from "../../Redux/Reducers/cartReducer";
import { useEffect, useState } from "react";

export default function Navbar() {
    // Dispatch function
    const dispatch = useDispatch();
    // States
    const { cartItemsCount } = useSelector(cartState);
    const [isMenuOpen, setIsMenuOpen] = useState(false); // State for hamburger menu

    // Side effect
    useEffect(() => {
        // Fetching all cartItems to get cart items length;
        dispatch(fetchCartItemsAsync());
    }, [dispatch]);

    // Function to close the menu
    const closeMenu = () => setIsMenuOpen(false);

    // Returning JSX
    return (
        <>
            {/* Navbar Container */}
            <div className={styles.navbarContainer}>
                {/* Logo */}
                <div className={styles.logo}>
                    <NavLink to={"/"} className={styles.navLink} onClick={closeMenu}>
                        <p>eCommerce</p>
                    </NavLink>
                </div>

                {/* Hamburger Icon */}
                <div className={styles.hamburger} onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                    <div className={styles.bar}></div>
                </div>

                {/* Navbar Items */}
                <div className={`${styles.navItems} ${isMenuOpen ? styles.showMenu : ""}`}>
                    {/* Left Items */}
                    <div className={styles.navItemsLeft}>
                        <NavLink to={"/"} className={styles.navLink} onClick={closeMenu}>
                            <div className={styles.navItem}>
                                <p>Products</p>
                            </div>
                        </NavLink>
                        <div className={styles.navItem} onClick={() => { dispatch(formToggle()); closeMenu(); }}>
                            <p>Add a product</p>
                            <img src="https://cdn-icons-png.flaticon.com/128/9447/9447856.png" alt="Add Product" className={styles.AddProductImg} />
                        </div>
                    </div>

                    {/* Right Items */}
                    <div className={styles.navItemsRight}>
                        <NavLink to={"cart"} className={styles.navLink} onClick={closeMenu}>
                            <div className={styles.navItem} id={styles.cartContainer}>
                                <p className={styles.cartItemsCount}>{cartItemsCount}</p>
                                <p>Cart</p>
                                <img src="https://cdn-icons-png.flaticon.com/128/5952/5952750.png" alt="Cart" className={styles.cartImg} />
                            </div>
                        </NavLink>
                        <div className={styles.navItem} onClick={closeMenu}>
                            <p>User</p>
                            <img src="https://cdn-icons-png.flaticon.com/128/5397/5397570.png" alt="User" className={styles.userImg} />
                        </div>
                    </div>
                </div>
            </div>

            {/* Rendering Children */}
            <Outlet />
        </>
    );
}