// Functional Component for the Form
// Imports
import React, { useEffect, useState } from "react";
import styles from "./Form.module.css";
import { useDispatch, useSelector } from "react-redux";
import { addProductAsync, formToggle, productsState, updateProductAsync } from "../../Redux/Reducers/productReducer";
import { toast } from "react-toastify";

export default function Form() {
    // States
    const { update, productToUpdate } = useSelector(productsState);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [rating, setRating] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [brand, setBrand] = useState("");
    const [category, setCategory] = useState("");
    const dispatch = useDispatch();

    // useEffect to update local state when productToUpdate changes
    useEffect(() => {
        if (update && productToUpdate) {
            // Set local state based on productToUpdate
            setTitle(productToUpdate.title || "");
            setDescription(productToUpdate.description || "");
            setPrice(productToUpdate.price || "");
            setRating(productToUpdate.rating || "");
            setThumbnail(productToUpdate.thumbnail || "");
            setBrand(productToUpdate.brand || "");
            setCategory(productToUpdate.category || "");
        } else {
            // Reset local state when not updating
            setTitle("");
            setDescription("");
            setPrice("");
            setRating("");
            setThumbnail("");
            setBrand("");
            setCategory("");
        }
    }, [update, productToUpdate]);

    // Event Handler
    const onSubmit = (event) => {
        event.preventDefault();
        // Validation if any field is empty
        if (!title || !description || !price || !rating || !thumbnail || !brand || !category) {
            return toast.error("Please Enter All Fields!");
        }

        // If update, dispatch update async thunk.
        if (update) {
            dispatch(updateProductAsync({
                id: productToUpdate.id,
                updatedProduct: {
                    title,
                    description,
                    price,
                    rating,
                    thumbnail,
                    brand,
                    category
                }
            }));
        }
        // Else, dispatch add async thunk.
        else {
            dispatch(addProductAsync({
                product: {
                    title,
                    description,
                    price,
                    rating,
                    thumbnail,
                    brand,
                    category
                }
            }))
        }
        // Clearing states
        setTitle("");
        setDescription("");
        setPrice("");
        setRating("");
        setThumbnail("");
        setBrand("");
        setCategory("");
    }

    // Returning JSX
    return (
        <>
            <div className={styles.overlay}></div>
            <div className={styles.formContainer}>
                <h1 style={{ color: "#3498db" }}>{update ? "Update Product" : "Add New Product"}</h1>
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
                        required
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
                        required
                        onChange={(event) => setDescription(event.target.value)}
                    />

                    {/* Price */}
                    <label htmlFor="price">Price:</label>
                    <input
                        type="number"
                        id="price"
                        name="price"
                        placeholder="Enter price"
                        required
                        value={price} onChange={(event) => setPrice(event.target.value)}
                    />

                    {/* Rating */}
                    <label htmlFor="rating">Rating (0-5):</label>
                    <input
                        type="number"
                        id="rating"
                        name="rating"
                        placeholder="Enter rating"
                        value={rating}
                        required
                        min="0"
                        max="5"
                        onChange={(event) => setRating(event.target.value)}
                    />

                    {/* Thumbnail URL */}
                    <label htmlFor="thumbnail">Thumbnail URL:</label>
                    <input
                        type="text"
                        id="thumbnail"
                        name="thumbnail"
                        placeholder="Enter thumbnail URL"
                        value={thumbnail}
                        required
                        onChange={(event) => setThumbnail(event.target.value)}
                    />

                    {/* Brand */}
                    <label htmlFor="brand">Brand:</label>
                    <input
                        type="text"
                        id="brand"
                        name="brand"
                        placeholder="Enter brand"
                        value={brand}
                        required
                        onChange={(event) => setBrand(event.target.value)}
                    />

                    {/* Category */}
                    <label htmlFor="category">Category:</label>
                    <input
                        type="text"
                        id="category"
                        name="category"
                        placeholder="Enter category"
                        value={category}
                        required
                        onChange={(event) => setCategory(event.target.value)}
                    />
                </form>
                {/* Submit Button */}
                <button type="submit" onClick={(event) => onSubmit(event)}>{update ? "Update Product" : "Add Product"}</button>
                {/* Close */}
                <button type="button" className={styles.closeBtn} onClick={() => dispatch(formToggle())}>Close</button>
            </div>
        </>
    );
}
