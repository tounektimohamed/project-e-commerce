// Imports
import styles from "./CartItem.module.css";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { decreaseQuantityAsync, increaseQuantityAsync, removeCartItemAsync } from "../../Redux/Reducers/cartReducer";

export default function CartItem({ product, qty, id }) {
    // Dispatch function
    const dispatch = useDispatch();

    // Returning JSX
    return (
        <div className={styles.productContainer}>
            {/* Image */}
            <div className={styles.imageContainer}>
                <img src={product.thumbnail} alt="Product" className={styles.thumbnail} />
            </div>

            {/* Title and Description */}
            <div className={styles.detailsContainer}>
                <h2 className={styles.heading}>{product.title}</h2>
                <p className={styles.description}>{product.description}</p>
            </div>

            {/* Price and Ratings */}
            <div className={styles.priceAndRating}>
                <h2 className={styles.price}>{`$${product.price}`}</h2>
                <ReactStars
                    count={5}
                    value={product.rating}
                    size={20}
                    activeColor="#ffd700"
                    isHalf={true}
                    edit={false}
                />
            </div>

            {/* Quantity Controls */}
            <div className={styles.qtyContainer}>
                <img
                    src="https://cdn-icons-png.flaticon.com/128/3388/3388913.png"
                    alt="Decrease"
                    className={styles.qtyIcon}
                    onClick={() => dispatch(decreaseQuantityAsync(id))}
                />
                <p className={styles.qty}>{qty}</p>
                <img
                    src="https://cdn-icons-png.flaticon.com/128/1828/1828919.png"
                    alt="Increase"
                    className={styles.qtyIcon}
                    onClick={() => dispatch(increaseQuantityAsync(id))}
                />
            </div>

            {/* Remove From Cart Button */}
            <button
                type="button"
                className={styles.removeFromCartBtn}
                onClick={() => dispatch(removeCartItemAsync(id))}
            >
                Remove From Cart
            </button>
        </div>
    );
}