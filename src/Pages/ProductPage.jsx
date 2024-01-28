// Product page to show all the product details
// Imports
import styles from "./ProductPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getSingleProductById, productsState } from "../Redux/Reducers/productReducer";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { addToCartAsync } from "../Redux/Reducers/cartReducer";

// Functional component for product page
export default function ProductPage() {
    // States
    const [imageIndex, setImageIndex] = useState(0);
    const { selectedProduct, productLoading } = useSelector(productsState);
    const product = selectedProduct;

    // Params and dispatch function
    const { id } = useParams();
    const dispatch = useDispatch();


    // Side effects
    useEffect(() => {
        // Dispatching actions to productReducer to fetch product by id
        dispatch(getSingleProductById(id));
        // isItemInCart(id);
    }, [dispatch, id]);

    // Returning JSX
    if (productLoading) {
        return (
            // Loading Spinner
            <div className={styles.loaderContainer}>
                <HashLoader size={100} color={"#e44d26"} />
            </div>
        );
    }

    if (!product) {
        return (
            // Product not found
            <div className={styles.productPageContainer}>Product not found</div>
        );
    }

    // Product Details
    return (
        // Product page container
        <div className={styles.productPageContainer}>
            {/* Images */}
            <div className={styles.imagesContainer}>
                {product.images && (
                    <>
                        {/* All pics */}
                        <div className={styles.allPicsContainer}>
                            {product.images.map((image, i) => (
                                <img
                                    src={image}
                                    alt={`img-${i}`}
                                    key={i}
                                    onClick={() => setImageIndex(i)}
                                />
                            ))}
                        </div>
                        {/* Thumbnail or main pic which is shown */}
                        <div className={styles.mainPicContainer}>
                            <img src={product.images[imageIndex]} alt="main-img" />
                        </div>
                    </>
                )}
            </div>

            {/* Details */}
            <div className={styles.detailsContainer}>
                {/* Title */}
                <h1 className={styles.title}>{product.title}</h1>
                {/* Brand */}
                <p className={styles.productBrand}>{`Brand: ${product.brand}`}</p>
                {/* Category */}
                <p className={styles.productCategory}>{`Category: ${product.category}`}</p>

                {/* Ratings */}
                <ReactStars
                    count={5}
                    value={product.rating}
                    size={35}
                    activeColor="#ffd700"
                    isHalf={true}
                    edit={false}
                />

                {/* Price */}
                <h2 className={styles.price}>{` $${product.price}`}</h2>

                {/* Cart Container to add product to cart here */}
                <div className={styles.cartContainer}>
                    <button type="button" className={styles.addCartButton} onClick={() => dispatch(addToCartAsync(product))}>
                        Add To Cart
                    </button>
                </div>

                {/* Description */}
                <p className={styles.descriptionTitle}>Description</p>
                <p className={styles.description}>{product.description}</p>
            </div>
        </div>
    );
}
