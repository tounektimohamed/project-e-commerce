// Functional Component for the Products List
// Imports
import { useSelector } from "react-redux"
import styles from "./ProductsList.module.css"
import { productsState } from "../../Redux/Reducers/productReducer"
import Product from "../Product Card/ProductCard"
import { useState } from "react"

export default function ProductsList() {
    // States
    const { sortPrice, products, sortedProducts } = useSelector(productsState)

    // Pagination current page
    const [currentPage, setCurrentPage] = useState(1)
    // Total items per page
    const itemsPerPage = 5
    const lastItemIndex = currentPage * itemsPerPage
    const firstItemIndex = lastItemIndex - itemsPerPage

    // Total products
    const currentProducts = sortPrice
        ? sortedProducts.slice(firstItemIndex, lastItemIndex)
        : products.slice(firstItemIndex, lastItemIndex)

    // Total pages
    const totalPages = Math.ceil((sortPrice ? sortedProducts.length : products.length) / itemsPerPage)

    // Function to change page
    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page)
            // Scroll to top of products list when changing page
            window.scrollTo({
                top: document.querySelector(`.${styles.productsListContainer}`).offsetTop - 100,
                behavior: "smooth",
            })
        }
    }

    // Generate array of page numbers with logic for responsive display
    const getPageNumbers = () => {
        const pageNumbers = []

        // For small number of pages, show all
        if (totalPages <= 7) {
            for (let i = 1; i <= totalPages; i++) {
                pageNumbers.push(i)
            }
        } else {
            // For larger number of pages, show a subset with ellipsis
            if (currentPage <= 3) {
                // Near the start
                for (let i = 1; i <= 5; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push("ellipsis")
                pageNumbers.push(totalPages)
            } else if (currentPage >= totalPages - 2) {
                // Near the end
                pageNumbers.push(1)
                pageNumbers.push("ellipsis")
                for (let i = totalPages - 4; i <= totalPages; i++) {
                    pageNumbers.push(i)
                }
            } else {
                // In the middle
                pageNumbers.push(1)
                pageNumbers.push("ellipsis")
                for (let i = currentPage - 1; i <= currentPage + 1; i++) {
                    pageNumbers.push(i)
                }
                pageNumbers.push("ellipsis")
                pageNumbers.push(totalPages)
            }
        }

        return pageNumbers
    }

    // Returning JSX
    return (
        <>
            {/* Products list container */}
            <div className={styles.productsListContainer}>
                {/* Mapping each product to the product card */}
                {currentProducts.map((product) => (
                    <Product key={product.id} product={product} />
                ))}
            </div>

            {/* Pagination buttons */}
            {totalPages > 1 && (
                <div className={styles.pagination}>
                    <button
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        className={`${styles.paginationButton} ${styles.navButton}`}
                    >
                        Previous
                    </button>

                    {getPageNumbers().map((pageNumber, index) =>
                        pageNumber === "ellipsis" ? (
                            <span key={`ellipsis-${index}`} className={styles.paginationButton}>
                                ...
                            </span>
                        ) : (
                            <button
                                key={pageNumber}
                                onClick={() => handlePageChange(pageNumber)}
                                className={`
                                    ${styles.paginationButton} 
                                    ${currentPage === pageNumber ? styles.activePage : ""}
                                    ${pageNumber > 3 && pageNumber < totalPages - 2 && totalPages > 7 ? styles.hiddenOnMobile : ""}
                                `}
                            >
                                {pageNumber}
                            </button>
                        ),
                    )}

                    <button
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        className={`${styles.paginationButton} ${styles.navButton}`}
                    >
                        Next
                    </button>
                </div>
            )}
            {/* Add dedicated footer spacer */}
            <div className={styles.footerSpacer}></div>
        </>
    )
}
