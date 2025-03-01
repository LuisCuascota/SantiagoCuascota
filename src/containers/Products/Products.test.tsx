import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {Products} from "./Products.tsx";
import * as useProducts from "./state/useProducts.tsx";

jest.mock("./state/useProducts.tsx");
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn()
}))

describe('Products container - tests', () => {

    it('should render form when call component', () => {
        // @ts-ignore
        jest.spyOn(useProducts, "useProducts").mockReturnValue({})

        render(<Products/>);
        expect(screen.getByText('Nombre del producto')).toBeInTheDocument();
    });

    it('should show alert error when exist error on fetch', () => {
        // @ts-ignore
        jest.spyOn(useProducts, "useProducts").mockReturnValue({isError: true})

        render(<Products/>);
        expect(screen.getByText('Error al eliminar Producto')).toBeInTheDocument();
    });
});
