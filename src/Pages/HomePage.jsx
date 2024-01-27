// Functional Component for the Home Page
// Imports
import styles from "./HomePage.module.css";
import { HashLoader } from "react-spinners";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductsAsync, productsState, sortProducts } from "../Redux/Reducers/productReducer";
import ProductsList from "../Components/Products List/ProductsList";
import Form from "../Components/Form/Form";

export default function HomePage() {
    // States
    const { productsLoading, formVisible, sortPrice } = useSelector(productsState);
    const dispatch = useDispatch();

    // Side effects
    useEffect(() => {
        // Dispacthing async thunks
        dispatch(fetchProductsAsync());
    }, [dispatch]);

    // Returning JSX
    return (
        <>
            {/* Conditionally rendring loader and home page data here */}
            {productsLoading ?
                <div className={styles.loaderContainer}>
                    <HashLoader size={100} color={"#3498db"} />
                </div> :
                <div className={styles.homepageContainer}>
                    {formVisible && <Form />}
                    {/* Price sorting button */}
                    <button type="button" className={styles.sortButton} onClick={() => dispatch(sortProducts())}>{sortPrice ? <img className={styles.close} src="https://cdn-icons-png.flaticon.com/128/1828/1828843.png" alt="img" /> : "Sort By Price"}</button>
                    <ProductsList />
                </div>
            }
        </>
    )
}