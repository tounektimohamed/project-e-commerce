// Functional component for the cart page
// Imports
import styles from "./CartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartState, fetchCartItemsAsync } from "../Redux/Reducers/cartReducer";
import { HashLoader } from "react-spinners";
import CartItem from "../Components/Cart Item/CartItem";
import { useEffect } from "react";

export default function CartPage() {
    // States
    const { cartItems, cartLoading } = useSelector(cartState);

    // Dispatch function
    const dispatch = useDispatch();

    // Side effects
    useEffect(() => {
        // Dispatching action to cartReducer to fetch all cart items.
        dispatch(fetchCartItemsAsync());   
    },);

    // Returning JSX
    return (
        <>
            {/* Conditionally rendring loader and cart page */}
            {cartLoading ? <div className={styles.loaderContainer} >
                <HashLoader size={100} color={"#e44d26"} />
            </div > :
                <div className={styles.CartPageContainer}>
                    {/* If cart is empty show this */}
                    {cartItems.length === 0 ?
                        <h1 className={styles.noItemsHeading}>No items in the cart!</h1>
                        :
                        <>
                            {/* Else show all cart items */}
                            {cartItems.map((item) => (
                                <CartItem key={item.id} product={item.product} qty={item.qty} id={item.id} />
                            ))}
                        </>
                    }
                </div>
            }
        </>
    )
}