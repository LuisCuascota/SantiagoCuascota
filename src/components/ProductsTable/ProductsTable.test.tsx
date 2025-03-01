import {fireEvent, render, screen} from "@testing-library/react";
import '@testing-library/jest-dom';

import {ProductsTable, ProductTableProps} from "./ProductsTable.tsx";

describe('ProductsTable component - test', () => {
    let propsMock: ProductTableProps

    beforeEach(() => {
        propsMock = {
            products: [{id: "1", name: "uno", description: "desc", logo: "logo", date_release: "", date_revision: ""}],
            isLoading: false,
            onAdd: jest.fn(),
            onEdit: jest.fn(),
            onDelete: jest.fn(),
        }
    })

    it('should render form when call component', () => {
        render(<ProductsTable {...propsMock}/>);
        expect(screen.getByText('Nombre del producto')).toBeInTheDocument();
    });

    it('should render error table when send error prop', () => {
        propsMock.error = {msg: ""}
        render(<ProductsTable {...propsMock}/>);
        expect(screen.getByText('Error en la consulta...')).toBeInTheDocument();
    });

    it('should render skeleton table when send loading prop', () => {
        propsMock.isLoading = true
        render(<ProductsTable {...propsMock}/>);
        expect(screen.getAllByTestId('skeleton-table')).toHaveLength(5);
    });

    it('should show dropdown options when click in options button', () => {
        render(<ProductsTable {...propsMock}/>);

        const button = screen.getByTestId("dropdown-button");
        fireEvent.click(button);

        expect(screen.getByText('Editar')).toBeInTheDocument();
    });

    it('should handle events when click in  dropdown options', () => {
        const onEditMock:jest.Mock=jest.fn()
        const onDeleteMock:jest.Mock=jest.fn()

        propsMock.onEdit=onEditMock
        propsMock.onDelete=onDeleteMock

        render(<ProductsTable {...propsMock}/>);

        const button = screen.getByTestId("dropdown-button");
        fireEvent.click(button);

        const editButton = screen.getByText("Editar");
        const deleteButton = screen.getByText("Eliminar");

        fireEvent.click(editButton);
        fireEvent.click(deleteButton);

        expect(onEditMock).toHaveBeenCalledTimes(1);
        expect(onDeleteMock).toHaveBeenCalledTimes(1);
    });
});
