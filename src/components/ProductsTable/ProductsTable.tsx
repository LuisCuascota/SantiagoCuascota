import {Product} from "../../shared/Interfaces/Product.interfaces.ts";
import "./ProductsTable.css"
import {useProductsTableState} from "./state/useProductsTable.state.tsx";

export interface ProductTableProps {
    products: Product[],
    isLoading: boolean,
    onAdd: () => void,
    onEdit: (product: Product) => void,
    onDelete: (id: string, name:string) => void,
    error?: object | null
}

export const ProductsTable = (props: ProductTableProps) => {
    const {
        handleItemsPerPageChange,
        handleSearchChange,
        filteredProducts,
        searchTerm,
        totalItems,
        totalPages,
        currentPage,
        itemsPerPage,
        idDropdown,
        toggleDropdown,
        goToPreviousPage,
        goToNextPage
    } = useProductsTableState(props)

    return <>
        <div className="head-container">
            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="search-input"
            />
            <button className={"add-button"} onClick={props.onAdd}>{"Agregar"}</button>
        </div>
        <div className="table-container">
            <table className="table">
                <thead>
                <tr className="table-head">
                    <th>Logo</th>
                    <th>Nombre del producto</th>
                    <th className={"left"}>Descripción</th>
                    <th className={"left"}>Fecha de liberación</th>
                    <th className={"left"}>Fecha de reestructuración</th>
                    <th />
                </tr>
                </thead>
                <tbody>
                {props.isLoading ?
                    (
                        Array.from({length: 5}).map((_, index) => (
                            <tr key={index} className="skeleton-row" data-testid={"skeleton-table"}>
                                <td>
                                    <div className="skeleton skeleton-logo"></div>
                                </td>
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                                <td>
                                    <div className="skeleton skeleton-text"></div>
                                </td>
                                <td/>
                            </tr>
                        ))
                    )
                    : filteredProducts.map((product) => (
                        <tr key={product.id} className="table-body">
                            <td className="center">
                                <img src={product.logo} alt={product.name} className="logo"/>
                            </td>
                            <td className="center">{product.name}</td>
                            <td className="">{product.description}</td>
                            <td className="">{product.date_release}</td>
                            <td className="">{product.date_revision}</td>
                            <td className={"center"}>
                                <button data-testid={"dropdown-button"} className={"action-button"} onClick={() => toggleDropdown(product.id)} >
                                    ⋮
                                </button>
                                {idDropdown===product.id && (
                                    <ul className={"dropdown"}>
                                        <li className={"dropdown-item"} onClick={() => props.onEdit(product)}>Editar</li>
                                        <li className={"dropdown-item"} onClick={() => props.onDelete(product.id, product.name)}>Eliminar</li>
                                    </ul>
                                )}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {filteredProducts.length === 0 && !props.isLoading && !props.error && <div className={"message-box"}>
                {"Sin Resultados..."}
            </div>}
            {props.error && <div className={"message-box"}>
                {"Error en la consulta..."}
            </div>}
            <div className={"pagination-container"}>
                <div>
                    {`${totalItems} Resultados`}
                </div>
                <div>
                    <button
                        onClick={goToPreviousPage}
                        disabled={currentPage === 1}
                        className="page-button"
                    >
                        {"<"}
                    </button>
                    <span className="">
                    {`Página ${currentPage} de ${totalPages}`}
                </span>
                    <button
                        onClick={goToNextPage}
                        disabled={currentPage === totalPages}
                        className="page-button"
                    >
                        {">"}
                    </button>
                </div>
                <div>
                    <select value={itemsPerPage} onChange={handleItemsPerPageChange}>
                        <option value={5}>5</option>
                        <option value={10}>10</option>
                        <option value={20}>20</option>
                    </select>
                </div>
            </div>
        </div>
    </>
}
