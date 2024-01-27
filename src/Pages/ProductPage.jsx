// Imports
import styles from "./ProductPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchProductById, fetchProductsAsync, productsState } from "../Redux/Reducers/productReducer";
import ReactStars from "react-rating-stars-component";
import { useEffect, useState } from "react";
import HashLoader from "react-spinners/HashLoader";
import { addToCartAsync, cartState, fetchCartItemsAsync, isItemInCart } from "../Redux/Reducers/cartReducer";

export default function ProductPage() {
    // States
    const { id } = useParams();
    const dispatch = useDispatch();
    const { selectedProduct, productLoading } = useSelector(productsState);
    const product = selectedProduct;
    const [imageIndex, setImageIndex] = useState(0);
    const { cartItem } = useSelector(cartState);
    const [qty, setQty] = useState(cartItem ? cartItem.qty : 0);

    // Side effects
    useEffect(() => {
        // Dispatching actions
        dispatch(fetchProductById(id));
    }, [id, dispatch]);

    // Returning JSX
    return (
        <div className={styles.productPageContainer}>
            {/* Loading Spinner */}
            {productLoading && (
                <div className={styles.loaderContainer}>
                    <HashLoader size={100} color={"#e44d26"} />
                </div>
            )}

            {/* Product Details */}
            {!productLoading && !product ? (
                <div className={styles.productPageContainer}>Product not found</div>
            ) : (
                <>
                    {/* Images */}
                    <div className={styles.imagesContainer}>
                        {product.images && (
                            <>
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
                                <div className={styles.mainPicContainer}>
                                    <img src={product.images[imageIndex]} alt="main-img" />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Details */}
                    <div className={styles.detailsContainer}>
                        <h1 className={styles.title}>{product.title}</h1>
                        <p className={styles.productBrand}>{`Brand: ${product.brand}`}</p>
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

                        {/* Cart Container */}
                        <div className={styles.cartContainer}>
                            <div className={styles.buttons}>
                                <button type="button">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/8162/8162980.png"
                                        alt="add"
                                    />
                                </button>
                                <p>{qty}</p>
                                <button type="button">
                                    <img
                                        src="https://cdn-icons-png.flaticon.com/128/8162/8162945.png"
                                        alt="minus"
                                    />
                                </button>
                            </div>
                            <button type="button" className={styles.addCartButton} onClick={() => dispatch(addToCartAsync(product))}>
                                Add To Cart
                            </button>
                        </div>

                        {/* Description */}
                        <p className={styles.descriptionTitle}>Description</p>
                        <p className={styles.description}>{product.description}</p>
                    </div>
                </>
            )}
        </div>
    );
}
