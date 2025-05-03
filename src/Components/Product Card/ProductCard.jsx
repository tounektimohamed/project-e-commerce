// Imports
import { useState } from "react";
import styles from "./ProductCard.module.css";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { deleteProductAsync, setUpdate } from "../../Redux/Reducers/productReducer";
import { Link } from "react-router-dom";
import { addToCartAsync } from "../../Redux/Reducers/cartReducer";

export default function Product({ product }) {
    // States
    const [visible, setVisible] = useState(false);

    // Dispatch function
    const dispatch = useDispatch();

    // Actions
    const addToCart = () => {
        dispatch(addToCartAsync(product));
    };

    // Returning JSX
    return (
        <div
            className={styles.productContainer}
            onMouseOver={() => setVisible(true)}
            onMouseOut={() => setVisible(false)}
        >
            {/* Image */}
            <div className={styles.imageContainer}>
                <img src={product.thumbnail} alt="Product" className={styles.thumbnail} />
            </div>

            {/* Title */}
            <h2 className={styles.heading}>{product.title}</h2>

            {/* Description */}
            <p className={styles.description}>{product.description}</p>

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

            {/* Buttons */}
            <div className={styles.buttonContainer}>
                <Link to={`products/${product.id}`} className={styles.link}>
                    <button type="button" className={styles.moreInfoBtn}>
                        More Info
                    </button>
                </Link>
                <button type="button" className={styles.addToCartBtn} onClick={addToCart}>
                    Add To Cart
                </button>
            </div>

            {/* Delete and Update Icons */}
            {visible && (
                <div className={styles.iconContainer}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/6460/6460112.png"
                        alt="Delete"
                        className={styles.icon}
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(deleteProductAsync(product.id));
                        }}
                    />
                    <img
                        src="https://cdn-icons-png.flaticon.com/128/12493/12493756.png"
                        alt="Update"
                        className={styles.icon}
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(setUpdate(product));
                        }}
                    />
                </div>
            )}
        </div>
    );
}