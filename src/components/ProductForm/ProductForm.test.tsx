import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {ProductForm} from "./ProductForm.tsx";
import * as useProductForm from "./state/useProductForm.tsx";
import {Product} from "../../shared/Interfaces/Product.interfaces.ts";

jest.mock("./state/useProductForm.tsx");

describe('ProductFormProps component - test', () => {
    let stateParams: any;

    beforeEach(() => {
        stateParams = {
            inputErrorMsg: {} as Product,
            isFormValid: false,
            product: {} as Product,
            handleReload: jest.fn(),
            handleChange: jest.fn(),
            handleSave: jest.fn()
        }
        jest.spyOn(useProductForm, "useProductForm").mockReturnValue(stateParams)
    })

    it('should render form when call component', () => {
        render(<ProductForm onSave={() => {
        }}/>);
        expect(screen.getByText('Formulario de Registro')).toBeInTheDocument();
    });

    it('should render Alert when send error param', () => {
        render(<ProductForm onSave={() => {
        }} error={{error: ""}} errorMessage={"message"}/>);
        expect(screen.getByText('message')).toBeInTheDocument();
    });

    it('should show error message when have invalid values', () => {
        stateParams = {
            ...stateParams,
            inputErrorMsg: {
                id: "error id",
                name: "error name",
                description: "error description",
                logo: "error logo",
                date_release: "error date_release",
                date_revision: "error date_revision",
            },
        }
        jest.spyOn(useProductForm, "useProductForm").mockReturnValue(stateParams)

        render(<ProductForm onSave={() => {
        }}/>);

        expect(screen.getByText('error id')).toBeInTheDocument();
        expect(screen.getByText('error name')).toBeInTheDocument();
        expect(screen.getByText('error description')).toBeInTheDocument();
        expect(screen.getByText('error logo')).toBeInTheDocument();
        expect(screen.getByText('error date_release')).toBeInTheDocument();
    });
});
