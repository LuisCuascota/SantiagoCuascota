import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {useMutation, useQuery} from "@tanstack/react-query";
import {deleteProduct, getProducts} from "../../../services/Product/Product.service.ts";
import {PathEnum} from "../../../shared/enums/Path.enum.ts";
import {Product} from "../../../shared/Interfaces/Product.interfaces.ts";

export const useProducts=()=>{
    const navigate = useNavigate();
    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteId, setDeleteId] = useState("")
    const [deleteName, setDeleteName] = useState("")

    const {data: data, isLoading, error, refetch} = useQuery({queryKey: ["Products"], queryFn: getProducts});
    const {mutate, isSuccess, isError} = useMutation({mutationFn: (id: string) => deleteProduct(id)})

    const onAdd = () => {
        navigate(PathEnum.ADD);
    }

    const onEdit = (product: Product) => {
        navigate(PathEnum.UPDATE, {state: product})
    }

    const onDelete = (id: string, name: string) => {
        setOpenDeleteModal(true)
        setDeleteName(name)
        setDeleteId(id)
    }

    const onConfirmDelete = () => {
        mutate(deleteId)
        setOpenDeleteModal(false)
        setDeleteName("")
        setDeleteId("")
    }

    const onCancelDelete = () => {
        setOpenDeleteModal(false)
        setDeleteName("")
        setDeleteId("")
    }

    useEffect(() => {
        if(isSuccess)
            refetch()
    }, [isSuccess]);

    return {
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
    }
}
