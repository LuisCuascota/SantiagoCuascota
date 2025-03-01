import {ChangeEvent, useEffect, useState} from "react";
import {Product} from "../../../shared/Interfaces/Product.interfaces.ts";
import {ProductTableProps} from "../ProductsTable.tsx";

export const useProductsTableState = (props: ProductTableProps) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [idDropdown, setIdDropdown] = useState<string | null>(null);

    const [filteredProducts, setFilteredProducts] = useState<Product[]>([])

    const totalItems = props.products.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    const toggleDropdown = (id: string) => {
        setIdDropdown(prev => (prev === id ? null : id));
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage(currentPage - 1);
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage(currentPage + 1);
    };

    const handleItemsPerPageChange = (event: ChangeEvent<HTMLSelectElement>) => {
        setItemsPerPage(parseInt(event.target.value));
        setCurrentPage(1);
    };

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setCurrentPage(1);
    };

    useEffect(() => {
        const indexOfLastItem = currentPage * itemsPerPage;
        const indexOfFirstItem = indexOfLastItem - itemsPerPage;

        const products = props.products.filter(product =>
            product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description.toLowerCase().includes(searchTerm.toLowerCase())
        ).slice(indexOfFirstItem, indexOfLastItem);

        setFilteredProducts(products)

    }, [props.products, itemsPerPage, currentPage, searchTerm]);

    return {
        filteredProducts,
        searchTerm,
        totalItems,
        totalPages,
        currentPage,
        itemsPerPage,
        idDropdown,
        toggleDropdown,
        goToNextPage,
        goToPreviousPage,
        handleItemsPerPageChange,
        handleSearchChange,
    }
}
