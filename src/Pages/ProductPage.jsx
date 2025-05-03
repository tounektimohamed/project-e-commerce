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
    const [isImageZoomed, setIsImageZoomed] = useState(false);
    const [quantity, setQuantity] = useState(1);

    // Params and dispatch function
    const { id } = useParams();
    const dispatch = useDispatch();

    // Side effects
    useEffect(() => {
        // Dispatching actions to productReducer to fetch product by id
        dispatch(getSingleProductById(id));
        // Scroll to top when component mounts
        window.scrollTo(0, 0);
    }, [dispatch, id]);

    // Handle quantity change
    const handleQuantityChange = (newQuantity) => {
        if (newQuantity >= 1 && newQuantity <= 10) {
            setQuantity(newQuantity);
        }
    };

    // Add to cart with quantity
    const handleAddToCart = () => {
        // Create a new product object with the selected quantity
        const productWithQuantity = {
            ...product,
            quantity: quantity || 1 // Ensure quantity is at least 1
        };
        dispatch(addToCartAsync(productWithQuantity, quantity));
    };

    // Toggle image zoom
    const toggleZoom = () => {
        setIsImageZoomed(!isImageZoomed);
    };

    // Returning JSX
    if (productLoading) {
        return (
            // Loading Spinner
            <div className={styles.loaderContainer}>
                <HashLoader size={100} color={"#3b82f6"} />
            </div>
        );
    }

    if (!product) {
        return (
            // Product not found
            <div className={styles.productNotFound}>
                <h2>Product not found</h2>
                <p>The product you're looking for doesn't exist or has been removed.</p>
            </div>
        );
    }

    // Calculate discount percentage if original price exists
    const discountPercentage = product.originalPrice 
        ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100) 
        : null;

    // Product Details
    return (
        // Product page container
        <div className={styles.productPageContainer}>
            <div className={styles.breadcrumbs}>
                <span>Home</span> / <span>{product.category}</span> / <span className={styles.currentBreadcrumb}>{product.title}</span>
            </div>
            
            <div className={styles.productContentWrapper}>
                {/* Images */}
                <div className={styles.imagesContainer}>
                    {product.images && (
                        <>
                            {/* Main pic which is shown */}
                            <div 
                                className={`${styles.mainPicContainer} ${isImageZoomed ? styles.zoomed : ''}`}
                                onClick={toggleZoom}
                            >
                                <img 
                                    src={product.images[imageIndex] || "/placeholder.svg"} 
                                    alt={product.title} 
                                    className={isImageZoomed ? styles.zoomedImage : ''}
                                />
                                {discountPercentage && (
                                    <div className={styles.discountBadge}>-{discountPercentage}%</div>
                                )}
                                {product.stock <= 5 && product.stock > 0 && (
                                    <div className={styles.lowStockBadge}>Only {product.stock} left</div>
                                )}
                            </div>
                            
                            {/* All pics */}
                            <div className={styles.allPicsContainer}>
                                {product.images.map((image, i) => (
                                    <div 
                                        className={`${styles.thumbnailWrapper} ${imageIndex === i ? styles.activeThumbnail : ''}`}
                                        key={i}
                                        onClick={() => setImageIndex(i)}
                                    >
                                        <img
                                            src={image || "/placeholder.svg"}
                                            alt={`${product.title} - view ${i+1}`}
                                        />
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>

                {/* Details */}
                <div className={styles.detailsContainer}>
                    {/* Title and badges */}
                    <div className={styles.titleSection}>
                        <h1 className={styles.title}>{product.title}</h1>
                        <div className={styles.badgeContainer}>
                            {product.inStock && <span className={styles.inStockBadge}>In Stock</span>}
                            {product.freeShipping && <span className={styles.freeShippingBadge}>Free Shipping</span>}
                        </div>
                    </div>
                    
                    {/* Brand and Category */}
                    <div className={styles.productMeta}>
                        <p className={styles.productBrand}>
                            <span className={styles.metaLabel}>Brand:</span> {product.brand}
                        </p>
                        <p className={styles.productCategory}>
                            <span className={styles.metaLabel}>Category:</span> {product.category}
                        </p>
                    </div>

                    {/* Ratings */}
                    <div className={styles.ratingsContainer}>
                        <ReactStars
                            count={5}
                            value={product.rating}
                            size={24}
                            activeColor="#ffd700"
                            isHalf={true}
                            edit={false}
                        />
                        <span className={styles.reviewCount}>({product.reviewCount || 0} reviews)</span>
                    </div>

                    {/* Price */}
                    <div className={styles.priceContainer}>
                        <h2 className={styles.price}>${product.price.toFixed(2)}</h2>
                        {product.originalPrice && (
                            <span className={styles.originalPrice}>${product.originalPrice.toFixed(2)}</span>
                        )}
                    </div>

                    {/* Short description */}
                    <p className={styles.shortDescription}>
                        {product.shortDescription || product.description.substring(0, 120) + '...'}
                    </p>

                    {/* Cart Container to add product to cart here */}
                    <div className={styles.cartContainer}>
                        <div className={styles.quantitySelector}>
                            <button 
                                className={styles.quantityButton}
                                onClick={() => handleQuantityChange(quantity - 1)}
                                disabled={quantity <= 1}
                            >
                                -
                            </button>
                            <span className={styles.quantity}>{quantity}</span>
                            <button 
                                className={styles.quantityButton}
                                onClick={() => handleQuantityChange(quantity + 1)}
                                disabled={quantity >= 10}
                            >
                                +
                            </button>
                        </div>
                        
                        <div className={styles.actionButtons}>
                            <button 
                                type="button" 
                                className={styles.addCartButton} 
                                onClick={handleAddToCart}
                            >
                                Add To Cart
                            </button>
                            <button type="button" className={styles.wishlistButton}>
                                ♥
                            </button>
                        </div>
                    </div>

                    {/* Product features */}
                    <div className={styles.featuresContainer}>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>🚚</span>
                            <span>Fast Delivery</span>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>↩️</span>
                            <span>30-Day Returns</span>
                        </div>
                        <div className={styles.featureItem}>
                            <span className={styles.featureIcon}>🔒</span>
                            <span>Secure Checkout</span>
                        </div>
                    </div>

                    {/* Description */}
                    <div className={styles.descriptionContainer}>
                        <h3 className={styles.descriptionTitle}>Description</h3>
                        <div className={styles.descriptionDivider}></div>
                        <p className={styles.description}>{product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
