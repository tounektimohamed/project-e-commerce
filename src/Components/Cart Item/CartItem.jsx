// Imports
import styles from "./CartItem.module.css";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { decreaseQuantityAsync, increaseQuantityAsync, removeCartItemAsync } from "../../Redux/Reducers/cartReducer";

export default function CartItem({ product, qty, id }) {
    // States
    const dispatch = useDispatch();

    // Returning JSX
    return (
        <>
            {/* Product Container */}
            <div className={styles.productContainer}>
                {/* Image */}
                <img src={product.thumbnail} alt="img" className={styles.thumbnail} />
                {/* Title */}
                <h2 className={styles.heading}>{product.title}</h2>
                {/* Description */}
                <p className={styles.description}>{product.description}</p>
                {/* Price */}
                <h2 className={styles.price}>{`$${product.price}`}</h2>
                {/* Ratings */}
                <ReactStars
                    count={5}
                    value={product.rating}
                    size={24}
                    activeColor="#ffd700"
                    isHalf={true}
                    edit={false}
                />
                {/* Quantity Controls */}
                <div className={styles.priceAndQtyContainer}>
                    <span className={styles.qtyContainer}>
                        <img

                            src="https://cdn-icons-png.flaticon.com/128/3388/3388913.png"
                            alt="Remove"
                            onClick={() => dispatch(decreaseQuantityAsync(id))}
                        />
                        <p>{qty}</p>
                        <img

                            src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
                            alt="Add"
                            onClick={() => dispatch(increaseQuantityAsync(id))}
                        />
                    </span>
                </div>
                {/* Remove From Cart Button */}
                <button
                    type="button"
                    className={styles.removeFromCartBtn}
                    onClick={() => dispatch(removeCartItemAsync(id))}
                >
                    Remove From Cart
                </button>
            </div >
        </>
    );
}
