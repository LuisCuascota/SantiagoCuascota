import '@testing-library/jest-dom';
import {render, screen, waitFor} from "@testing-library/react";
import {AddProduct} from "./AddProduct.tsx";
import * as reactRouter from "react-router-dom";
import * as reactQuery from "@tanstack/react-query";

jest.mock("@tanstack/react-query")
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn()
}))

describe('AddProduct container - tests', () => {
    let mutateMock: jest.Mock
    let navigateMock: jest.Mock

    beforeEach(() => {
        mutateMock = jest.fn()
        navigateMock = jest.fn()

        jest.spyOn(reactRouter, "useNavigate").mockReturnValue(navigateMock)
        // @ts-ignore
        jest.spyOn(reactQuery, "useMutation").mockReturnValue({mutate: mutateMock})
    })

    it('should render container when call component ', () => {
        render(<AddProduct/>);
        expect(screen.getByText("Formulario de Registro")).toBeInTheDocument();
    });

    it('should  nevigate back when mutate is success', () => {
        // @ts-ignore
        jest.spyOn(reactQuery, "useMutation").mockReturnValue({mutate: mutateMock, isSuccess: true, error: undefined})

        render(<AddProduct/>);

        waitFor(() => {
            expect(mutateMock).toHaveBeenCalledTimes(1);

        })
    });
});
