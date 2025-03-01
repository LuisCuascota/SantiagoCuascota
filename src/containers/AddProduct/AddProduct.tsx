import {ProductForm} from "../../components/ProductForm/ProductForm.tsx";
import {useMutation} from "@tanstack/react-query";
import {checkProduct, postProduct} from "../../services/Product/Product.service.ts";
import {Product} from "../../shared/Interfaces/Product.interfaces.ts";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

export const AddProduct = () => {
    const navigate = useNavigate();
    const postMutation = useMutation({mutationFn: postProduct})
    const checkMutation = useMutation({mutationFn: checkProduct})
    const [newProduct, setNewProduct] = useState<Product>()

    const onSave = (product: Product) => {
        checkMutation.mutate(product.id)
        setNewProduct(product)
    }

    useEffect(() => {
        if (checkMutation.isSuccess && newProduct && !checkMutation.data)
            postMutation.mutate(newProduct)
    }, [checkMutation.isSuccess]);

    useEffect(() => {
        if (postMutation.isSuccess && !postMutation.error)
            navigate(-1)

    }, [postMutation.isSuccess, postMutation.error]);


    return <ProductForm onSave={onSave} error={postMutation.isError || checkMutation.isError || checkMutation.data} errorMessage={"Error al guardar Producto."}/>
}
