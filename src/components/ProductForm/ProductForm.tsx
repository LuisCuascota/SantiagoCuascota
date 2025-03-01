import {Product} from "../../shared/Interfaces/Product.interfaces.ts";
import "./ProductForm.css"
import {useProductForm} from "./state/useProductForm.tsx";
import {Alert} from "../Alert/Alert.tsx";

export interface ProductFormProps {
    onSave: (product: Product) => void
    product?: Product,
    error?: boolean
    errorMessage?: string
}

export const ProductForm = (props: ProductFormProps) => {
    const {product, inputErrorMsg, isFormValid, handleSave, handleChange, handleReload} = useProductForm(props)

    return (
        <div className={"product-container"}>
            {props.error && props.errorMessage && <Alert message={props.errorMessage}/>}
            <h2 className={"title"}>{"Formulario de Registro"}</h2>
            <form onSubmit={handleSave} className="product-form">
                <div className={"row"}>
                    <div className={"col"}>
                        <label>ID</label>
                        <input
                            type="text"
                            name="id"
                            value={product.id}
                            onChange={handleChange}
                            readOnly={!!props.product}
                            className={inputErrorMsg.id ? "input-error" : ""}
                        />
                        {inputErrorMsg.id && <span className="error">{inputErrorMsg.id}</span>}
                    </div>
                    <div className={"col"}>
                        <label>Nombre</label>
                        <input
                            type="text"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className={inputErrorMsg.name ? "input-error" : ""}
                        />
                        {inputErrorMsg.name && <span className="error">{inputErrorMsg.name}</span>}
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <label>Descripción</label>
                        <input
                            type="text"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className={inputErrorMsg.description ? "input-error" : ""}
                        />
                        {inputErrorMsg.description && <span className="error">{inputErrorMsg.description}</span>}
                    </div>
                    <div className={"col"}>
                        <label>Logo</label>
                        <input
                            type="text"
                            name="logo"
                            value={product.logo}
                            onChange={handleChange}
                            className={inputErrorMsg.logo ? "input-error" : ""}
                        />
                        {inputErrorMsg.logo && <span className="error">{inputErrorMsg.logo}</span>}
                    </div>
                </div>
                <div className={"row"}>
                    <div className={"col"}>
                        <label>Fecha liberación</label>
                        <input
                            type="date"
                            name="date_release"
                            value={product.date_release}
                            onChange={handleChange}
                            className={inputErrorMsg.date_release ? "input-error" : ""}
                        />
                        {inputErrorMsg.date_release && <span className="error">{inputErrorMsg.date_release}</span>}
                    </div>
                    <div className={"col"}>
                        <label>Fecha Revisión</label>
                        <input
                            type="date"
                            name="date_revision"
                            value={product.date_revision}
                            readOnly
                        />
                    </div>
                </div>
                <div className={"bottom"}>
                    <button className={"reload"} disabled={!!props.product} onClick={handleReload}>{"Reiniciar"}</button>
                    <button data-testid={"add-button"} type="submit" className={"send"} disabled={!isFormValid}>{"Enviar"}</button>
                </div>
            </form>
        </div>
    );
}
