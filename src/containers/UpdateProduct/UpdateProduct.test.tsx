import '@testing-library/jest-dom';
import {render, screen, waitFor} from "@testing-library/react";
import * as reactRouter from "react-router-dom";
import * as reactQuery from "@tanstack/react-query";
import {UpdateProduct} from "./UpdateProduct.tsx";
import {Location} from "react-router-dom";

jest.mock("@tanstack/react-query")
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn()
}))

describe('UpdateProduct container - tests', () => {
    let mutateMock: jest.Mock
    let navigateMock: jest.Mock

    beforeEach(() => {
        mutateMock = jest.fn()
        navigateMock = jest.fn()

        jest.spyOn(reactRouter, "useNavigate").mockReturnValue(navigateMock)
        jest.spyOn(reactRouter, "useLocation").mockReturnValue({state: {}} as Location)
        // @ts-ignore
        jest.spyOn(reactQuery, "useMutation").mockReturnValue({mutate: mutateMock})
    })

    it('should render container when call component ', () => {
        render(<UpdateProduct/>);
        expect(screen.getByText("Formulario de Registro")).toBeInTheDocument();
    });

    it('should  nevigate back when mutate is success', () => {
        // @ts-ignore
        jest.spyOn(reactQuery, "useMutation").mockReturnValue({mutate: mutateMock, isSuccess: true, error: undefined})

        render(<UpdateProduct/>);

        waitFor(() => {
            expect(mutateMock).toHaveBeenCalledTimes(1);

        })
    });
});
