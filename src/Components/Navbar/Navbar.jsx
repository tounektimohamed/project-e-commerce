// Functional Component for the Navbar
// Imports
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";
import { formToggle } from "../../Redux/Reducers/productReducer";
import { useDispatch, useSelector } from "react-redux";
import { cartState, fetchCartItemsAsync } from "../../Redux/Reducers/cartReducer";
import { useEffect } from "react";

export default function Navbar() {
    // Dispatch function
    const dispatch = useDispatch();
    // States
    const { cartItemsCount } = useSelector(cartState);

    // Side effect 
    useEffect(() => {
        // Fetching all cartItems to get cart items length;
        dispatch(fetchCartItemsAsync());
    }, [dispatch]);

    // Returning JSX
    return (
        <>
            {/* Navbar Container */}
            <div className={styles.navbarContainer}>

                {/* Navbar left part items container */}
                <div className={styles.navItemsLeft}>

                    {/* Home Or Logo with Navlink */}
                    <NavLink to={"/"} className={styles.navLink}>
                        <div className={styles.navItem}>
                            <p>eCommerce</p>
                        </div>
                    </NavLink>

                    {/* Home Or Products with Navlink */}
                    <NavLink to={"/"} className={styles.navLink}>
                        <div className={styles.navItem}>
                            <p>Products</p>
                        </div>
                    </NavLink>

                    {/* Add to product nav item */}
                    <div className={styles.navItem} onClick={() => dispatch(formToggle())}>
                        <p>Add a product</p>
                        <img src="https://cdn-icons-png.flaticon.com/128/9447/9447856.png" alt="img" className={styles.AddProductImg} />
                    </div>
                </div>

                {/* Navbar right part items container */}
                <div className={styles.navItemsRight}>

                    {/* Cart with Navlink */}
                    <NavLink to={"cart"} className={styles.navLink}>
                        <div className={styles.navItem} id={styles.cartContainer}>
                            <p className={styles.cartItemsCount}>{cartItemsCount}</p>
                            <p>Cart</p>
                            <img src="https://cdn-icons-png.flaticon.com/128/5952/5952750.png" alt="img" className={styles.cartImg} />
                        </div>
                    </NavLink>

                    {/* User navitem */}
                    <div className={styles.navItem}>
                        <p>User</p>
                        <img src="https://cdn-icons-png.flaticon.com/128/5397/5397570.png" alt="img" className={styles.userImg} />
                    </div>
                </div>
            </div>

            {/* Rendering Children */}
            <Outlet />
        </>
    )
}
