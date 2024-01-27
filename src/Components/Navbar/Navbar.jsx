// Functional Component for the Navbar
// Imports
import { NavLink, Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
    // Returning JSX
    return (
        <>
            <div className={styles.navbarContainer}>
                <div className={styles.navItemsLeft}>
                    <NavLink to={"/"} className={styles.navLink}>
                        <div className={styles.navItem}>
                            <p>eCommerce</p>
                        </div>
                    </NavLink>

                    <NavLink to={"/"} className={styles.navLink}>
                        <div className={styles.navItem}>
                            <p>Products</p>
                        </div>
                    </NavLink>

                    <NavLink to={"add-product"} className={styles.navLink}>
                        <div className={styles.navItem}>
                            <p>Add a product</p>
                            <img src="https://cdn-icons-png.flaticon.com/128/9447/9447856.png" alt="img" className={styles.AddProductImg} />
                        </div>
                    </NavLink>
                </div>


                <div className={styles.navItemsRight}>
                    <NavLink to={"cart"} className={styles.navLink}>
                        <div className={styles.navItem}>
                            <p>Cart</p>
                            <img src="https://cdn-icons-png.flaticon.com/128/5952/5952750.png" alt="img" className={styles.cartImg} />
                        </div>
                    </NavLink>
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
