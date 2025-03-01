import "./ProductDeleteModal.css"

interface ProductDeleteModalProps {
    name: string,
    open: boolean,
    onConfirm: () => void,
    onCancel: () => void
}

export const ProductDeleteModal = (props: ProductDeleteModalProps) => {
    if(!props.open) return null

    return (
        <div className="modal-overlay">
            <div className="modal">
                <p>¿Estás seguro de eliminar el producto <b>{props.name}</b>?</p>
                <div className="modal-actions">
                    <button className="modal-btn cancel" onClick={props.onCancel}>Cancelar</button>
                    <button className="modal-btn accept" onClick={props.onConfirm}>Confirmar</button>
                </div>
            </div>
        </div>
    );
}
