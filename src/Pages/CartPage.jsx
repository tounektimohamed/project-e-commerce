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
    const dispatch = useDispatch();

    // Side effects
    useEffect(() => {
        dispatch(fetchCartItemsAsync());
    },);

    // Returning JSX
    return (
        <>

            {cartLoading ? <div className={styles.loaderContainer} >
                <HashLoader size={100} color={"#e44d26"} />
            </div > : cartItems.length === 0 ? (
                <>
                    <h1 className={styles.noItemsHeading}>No items in the cart!</h1>
                </>
            ) : (
                <div className={styles.CartPageContainer}>
                    {cartItems.map((item) => (
                        <CartItem key={item.id} product={item.product} qty={item.qty} id={item.id} />
                    ))}
                </div>
            )
            }
        </>
    )
}