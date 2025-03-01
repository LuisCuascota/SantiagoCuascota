import {ProductsTable} from "../../components/ProductsTable/ProductsTable.tsx";
import {ProductDeleteModal} from "../../components/ProductDeleteModal/ProductDeleteModal.tsx";
import {Alert} from "../../components/Alert/Alert.tsx";
import {useProducts} from "./state/useProducts.tsx";

export const Products = () => {
    const {
        openDeleteModal,
        deleteName,
        data,
        isLoading,
        isError,
        error,
        onAdd,
        onEdit,
        onDelete,
        onConfirmDelete,
        onCancelDelete
    } = useProducts()

    return <>
        {isError && <Alert message={"Error al eliminar Producto"}/>}
        <ProductDeleteModal onConfirm={onConfirmDelete} onCancel={onCancelDelete} open={openDeleteModal}
                            name={deleteName}/>
        <ProductsTable products={data ? data.data : []} isLoading={isLoading} error={error} onAdd={onAdd}
                       onEdit={onEdit} onDelete={onDelete}/>
    </>
}
