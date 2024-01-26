// Imports
import styles from "./ProductCard.module.css";
import ReactStars from "react-rating-stars-component";

export default function Product({ product }) {
    // Returning JSX
    return (
        <div className={styles.productContainer}>
            <img src={product.thumbnail} alt="img" className={styles.thumbnail} />
            <h2 className={styles.heading}>{product.title}</h2>
            <p className={styles.description}>{product.description}</p>
            <h2 className={styles.price}>{`$${product.price}`}</h2>
            <ReactStars
                count={5}
                value={product.rating}
                size={24}
                activeColor="#ffd700"
                isHalf={true}
                edit={false}
            />
            <button type="button" className={styles.addToCartBtn}>Add To Cart</button>
        </div>
    )
}
