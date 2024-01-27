// Functional component for add product page
// Imports
import { useEffect } from "react";
import Form from "../Components/Form/Form";
import { useDispatch, useSelector } from "react-redux";
import { formClose, productsState } from "../Redux/Reducers/productReducer";

export default function AddProductPage() {
    // States
    const { update } = useSelector(productsState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(formClose());
    }, [update, dispatch])
    // Returning JSX
    return (
        <Form />
    )
}