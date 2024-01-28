// Functional Component for the Products List
// Imports
import { useSelector } from "react-redux";
import styles from "./ProductsList.module.css";
import { productsState } from "../../Redux/Reducers/productReducer";
import Product from "../Product Card/ProductCard";

export default function ProductsList() {
    // States
    const { sortPrice, products, sortedProducts } = useSelector(productsState);

    // Returning JSX
    return (
        // Products list container rendring products based on if sorted price true then sorted products passed else normal products passed
        <div className={styles.productsListContainer}>
            {/* Mapping each product to the product car here */}
            {sortPrice ? sortedProducts.map((product) => (
                <Product
                    key={product.id}
                    product={product}
                />
            )) :
                products.map((product) => (
                    <Product
                        key={product.id}
                        product={product}
                    />
                ))
            }
        </div>
    )
}