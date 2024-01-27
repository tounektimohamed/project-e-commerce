// Functional Component for the Form
// Imports
import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync, formToggle, productsState, updateProductAsync } from "../../Redux/Reducers/productReducer";

export default function Form() {
    // States
    const { update, productToUpdate } = useSelector(productsState);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const dispatch = useDispatch();

    // useEffect to update local state when productToUpdate changes
    useEffect(() => {
        if (update && productToUpdate) {
            // Set local state based on productToUpdate
            setTitle(productToUpdate.title || "");
            setDescription(productToUpdate.description || "");
            setPrice(productToUpdate.price || "");
            setRating(productToUpdate.rating || "");
        } else {
            // Reset local state when not updating
            setTitle("");
            setDescription("");
            setPrice("");
            setRating("");
        }
    }, [update, productToUpdate]);

    // Event Handler
    const onSubmit = (event) => {
        event.preventDefault();
        if (update) {
            dispatch(updateProductAsync({ id: productToUpdate.id, updatedProduct: { title, description, price, rating } }));
        }
        else {
            dispatch(addProductAsync({ product: { title, description, price, rating } }))
        }
        // Clearing states
        setTitle("");
        setDescription("");
        setPrice("");
        setRating("");
    }

    // Returning JSX
    return (
        // Form container
        <div className={styles.formContainer}>
            {/* Form */}
            <form>
                {/* Title */}
                <label htmlFor="name">Name:</label>
                <input
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter name"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                />

                {/* Description */}
                <label htmlFor="description">Description:</label>
                <input
                    type="text"
                    id="description"
                    name="description"
                    placeholder="Enter description"
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                />

                {/* Price */}
                <label htmlFor="price">Price:</label>
                <input
                    type="number"
                    id="price"
                    name="price"
                    placeholder="Enter price"
                    value={price} onChange={(event) => setPrice(event.target.value)}
                />

                {/* Rating */}
                <label htmlFor="rating">Rating:</label>
                <input
                    type="number"
                    id="rating"
                    name="rating"
                    placeholder="Enter rating"
                    value={rating}
                    onChange={(event) => setRating(event.target.value)}
                />

                {/* Submit Button */}
                <button type="submit" onClick={(event) => onSubmit(event)}>{update ? "Update Product" : "Add Product"}</button>
            </form>
            {/* Close */}
            {update && <button type="button" className={styles.closeBtn} onClick={() => dispatch(formToggle())}>Close</button>}
        </div>
    );
}
