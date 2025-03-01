import {ChangeEvent, FormEvent, useEffect, useState} from "react";
import {Product} from "../../../shared/Interfaces/Product.interfaces.ts";
import {ProductFormProps} from "../ProductForm.tsx";

const initialProduct: Product = {
    id: "",
    name: "",
    description: "",
    logo: "",
    date_release: "",
    date_revision: ""
}

enum PRODUCT_ERROR_MSG {
    ID = "El ID es requerido y debe tener entre 3 y 10 caracteres.",
    NAME = "El nombre es requerido y debe tener entre 5 y 100 caracteres.",
    DESCRIPTION = "La descripción es requerida y debe tener entre 10 y 200 caracteres.",
    LOGO = "El logo es requerido.",
    DATE_RELEASE = "La fecha de liberación es requerida y debe ser igual o posterior a hoy.",
}

export const useProductForm = (props: ProductFormProps) => {
    const [product, setProduct] = useState<Product>(props.product ? props.product : initialProduct);
    const [inputErrorMsg, setInputErrorMsg] = useState<Product>(initialProduct);
    const [isFormValid, setIsFormValid] = useState(false);

    const setValidationMsg = (name: string, msg: PRODUCT_ERROR_MSG | "", isError?: boolean) => {
        setInputErrorMsg(prev => ({...prev, [name]: msg}));
        if (isError) setIsFormValid(false);
    }

    const validate = (name: string, value: string) => {
        const today = new Date().toISOString().split('T')[0];

        switch (name) {
            case "id":
                if (!value || value.length < 3 || value.length > 10) {
                    setValidationMsg("id", PRODUCT_ERROR_MSG.ID, true)
                } else setValidationMsg("id", "");
                return
            case "name":
                if (!value || value.length < 5 || value.length > 100) {
                    setValidationMsg("name", PRODUCT_ERROR_MSG.NAME, true)
                } else setValidationMsg("name", "");
                return
            case "description":
                if (!value || value.length < 10 || value.length > 200) {
                    setValidationMsg("description", PRODUCT_ERROR_MSG.DESCRIPTION, true)
                } else setValidationMsg("description", "");
                return
            case "logo":
                if (!value) {
                    setValidationMsg("logo", PRODUCT_ERROR_MSG.LOGO, true)
                } else setValidationMsg("logo", "");
                return
            case "date_release":
                if (!value || value < today) {
                    setValidationMsg("date_release", PRODUCT_ERROR_MSG.DATE_RELEASE, true)
                } else setValidationMsg("date_release", "");
                return
        }

    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const {name, value} = e.target;

        setProduct(prev => ({...prev, [name]: value}));
        validate(name, value)
    };

    const handleReload = (e: FormEvent) => {
        e.preventDefault();
        setInputErrorMsg(initialProduct)
        setProduct(initialProduct)
        setIsFormValid(false)
    };

    const handleSave = (e: FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            props.onSave(product);
        }
    };

    useEffect(() => {
        if (product.date_release) {
            const releaseDate = new Date(product.date_release + 'T00:00:00');
            const revisionDate = new Date(releaseDate.setFullYear(releaseDate.getFullYear() + 1));

            setProduct(prev => ({...prev, date_revision: revisionDate.toISOString().split('T')[0]}));
        } else {
            setProduct(prev => ({...prev, date_revision: ""}));
        }
    }, [product.date_release]);

    useEffect(() => {
        if (!inputErrorMsg.id &&
            !inputErrorMsg.name &&
            !inputErrorMsg.description &&
            !inputErrorMsg.logo &&
            !inputErrorMsg.date_release &&
            product.id &&
            product.name &&
            product.description &&
            product.logo &&
            product.date_release)
            setIsFormValid(true)
        else
            setIsFormValid(false)
    }, [inputErrorMsg]);

    return {
        isFormValid,
        product,
        inputErrorMsg,
        handleReload,
        handleChange,
        handleSave
    }
}
