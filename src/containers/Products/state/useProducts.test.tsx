import {act, renderHook, waitFor} from "@testing-library/react";
import * as reactQuery from "@tanstack/react-query";
import * as reactRouter from "react-router-dom";
import {useProducts} from "./useProducts.tsx";
import {Product} from "../../../shared/Interfaces/Product.interfaces.ts";

jest.mock("@tanstack/react-query")
jest.mock("react-router-dom", () => ({
    useNavigate: jest.fn(),
    useLocation: jest.fn()
}))

describe('useProducts hook - tests', () => {
    let navigateMock: jest.Mock
    let mutateMock: jest.Mock

    beforeEach(() => {
        navigateMock = jest.fn()
        mutateMock = jest.fn()

        jest.spyOn(reactRouter, "useNavigate").mockReturnValue(navigateMock)
        // @ts-ignore
        jest.spyOn(reactQuery, "useMutation").mockReturnValue({mutate: mutateMock})
        // @ts-ignore
        jest.spyOn(reactQuery, "useQuery").mockReturnValue({})
    })


    it('should render initial state when call hook', () => {
        const {result} = renderHook(() => useProducts());

        expect(result.current.data).toBeUndefined()
    });

    it('should navigate when handle add', () => {
        const {result} = renderHook(() => useProducts());

        act(() => {
            result.current.onAdd()
        });

        expect(navigateMock).toHaveBeenCalled()
    });

    it('should navigate when handle edit', () => {
        const {result} = renderHook(() => useProducts());

        act(() => {
            result.current.onEdit({} as Product)
        });

        expect(navigateMock).toHaveBeenCalled()
    });

    it('should open modal when handle delete', () => {
        const {result} = renderHook(() => useProducts());

        act(() => {
            result.current.onDelete("1", "uno")
        });

        expect(result.current.openDeleteModal).toBeTruthy()
    });

    it('should handle mutation when confirm delete', () => {
        const {result} = renderHook(() => useProducts());

        act(() => {
            result.current.onConfirmDelete()
        });

        expect(mutateMock).toHaveBeenCalled()
    });

    it('should close modal when cancel delete', () => {
        const {result} = renderHook(() => useProducts());

        act(() => {
            result.current.onCancelDelete()
        });

        expect(result.current.openDeleteModal).toBeFalsy()
    });

    it('should refetch products  when delete is success', () => {
        const refetchMock = jest.fn()

        // @ts-ignore
        jest.spyOn(reactQuery, "useQuery").mockReturnValue({isSuccess: true, refetch: refetchMock})

        renderHook(() => useProducts());

        waitFor(()=>{
            expect(refetchMock).toHaveBeenCalled()
        })
    });
});
