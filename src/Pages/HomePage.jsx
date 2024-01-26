// Functional Component for the Home Page
// Imports
import styles from "./HomePage.module.css";
import { HashLoader } from "react-spinners";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, productsState, sortProducts } from "../Redux/Reducers/productReducer";
import ProductsList from "../Components/Products List/ProductsList";


export default function HomePage() {
    // States
    let [color, setColor] = useState("#3498db");
    const { productsLoading } = useSelector(productsState);
    const dispatch = useDispatch();

    // Side effects
    useEffect(() => {
        // Dispacthing async thunks
        dispatch(fetchProductsAsync());
    }, []);

    // Returning JSX
    return (
        <>
            {/* Conditionally rendring loader and home page data here */}
            {productsLoading ?
                <div className={styles.loaderContainer}>
                    <HashLoader size={100} color={color} />
                </div> :
                <div className={styles.homepageContainer}>
                    {/* Price sorting button */}
                    <button type="button" className={styles.sortButton} onClick={() => dispatch(sortProducts())}>Sort By Price</button>
                    <ProductsList />
                </div>
            }
        </>
    )
}