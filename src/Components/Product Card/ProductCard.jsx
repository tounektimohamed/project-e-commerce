// Imports
import { useState } from "react";
import styles from "./ProductCard.module.css";
import ReactStars from "react-rating-stars-component";
import { useDispatch } from "react-redux";
import { deleteProductAsync, setUpdate } from "../../Redux/Reducers/productReducer";

export default function Product({ product }) {
    // States
    const [visible, setVisible] = useState(false);
    const dispatch = useDispatch();

    // Returning JSX
    return (
        <>
            {/* Product Container */}
            <div className={styles.productContainer} onMouseOver={() => setVisible(true)} onMouseOut={() => setVisible(false)}>
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
                {/* Add Cart Button */}
                <button type="button" className={styles.addToCartBtn}>Add To Cart</button>
                {/* Delete and update icons container */}
                {visible &&
                    <div className={styles.iconContainer}>
                        {/* Delete Icon */}
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/6460/6460112.png"
                            alt="delete"
                            className={styles.icon}
                            onClick={() => dispatch(deleteProductAsync(product.id))}
                        />

                        {/* Update Icon */}
                        <img
                            src="https://cdn-icons-png.flaticon.com/128/12493/12493756.png"
                            alt="update"
                            className={styles.icon}
                            onClick={() => dispatch(setUpdate(product))}
                        />
                    </div>
                }
            </div>
        </>
    )
}
