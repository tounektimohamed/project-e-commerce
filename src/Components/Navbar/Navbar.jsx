// Functional Component for the Navbar
// Imports
import { Outlet } from "react-router-dom";
import styles from "./Navbar.module.css";

export default function Navbar() {
    // Returning JSX
    return (
        <>
            <div className={styles.navbarContainer}>
                <div className={styles.navItemsLeft}>
                    <div className={styles.navItem}>
                        <p>eCommerce</p>
                    </div>
                    <div className={styles.navItem}>
                        <p>Products</p>
                    </div>
                    <div className={styles.navItem}>
                        <p>Add a product</p>
                        <img src="https://cdn-icons-png.flaticon.com/128/9447/9447856.png" alt="img" className={styles.AddProductImg} />
                    </div>
                </div>

                <div className={styles.navItemsRight}>
                    <div className={styles.navItem}>
                        <p>Cart</p>
                        <img src="https://cdn-icons-png.flaticon.com/128/5952/5952750.png" alt="img" className={styles.cartImg} />
                    </div>
                    <div className={styles.navItem}>
                        <p>User</p>
                        <img src="https://cdn-icons-png.flaticon.com/128/5397/5397570.png" alt="img" className={styles.userImg} />
                    </div>
                </div>
            </div>

            {/* Rendring Childrens */}
            <Outlet />
        </>
    )
}