import {ProductForm} from "../../components/ProductForm/ProductForm.tsx";
import {useMutation} from "@tanstack/react-query";
import {putProduct} from "../../services/Product/Product.service.ts";
import {Product} from "../../shared/Interfaces/Product.interfaces.ts";
import { useEffect} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export const UpdateProduct=()=>{
    const navigate = useNavigate();
    const location = useLocation();
    const product = location.state as Product;

    const {mutate,isSuccess,isError}= useMutation({mutationFn:(data:Product)=>putProduct(data, data.id)})


    const onSave=(product:Product)=>{
        mutate(product)
    }

    useEffect(() => {
        if(isSuccess && !isError)
            navigate(-1)

    }, [isSuccess,isError]);


    return <ProductForm onSave={onSave} error={isError} errorMessage={"Error al editar Producto."} product={product}/>
}
