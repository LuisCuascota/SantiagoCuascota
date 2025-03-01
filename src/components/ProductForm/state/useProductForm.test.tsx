import '@testing-library/jest-dom';
import {act, renderHook} from "@testing-library/react";
import {useProductForm} from "./useProductForm.tsx";
import {ProductFormProps} from "../ProductForm.tsx";
import {ChangeEvent, FormEvent} from "react";

describe('useProductForm state - tests', () => {
    let onSaveMock: jest.Mock
    let propsMock: ProductFormProps

    beforeEach(() => {
        onSaveMock = jest.fn();
        propsMock = {
            onSave: onSaveMock
        }
    })

    it('should render initial state when call hook', () => {
        const {result} = renderHook(() => useProductForm(propsMock));

        expect(result.current.isFormValid).toBeFalsy();
    });

    it('should set form valid true when set to valid values', () => {
        const {result} = renderHook(() => useProductForm(propsMock));

        act(() => {
            result.current.handleChange({target: {value: "111", name: "id"}} as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({target: {value: "producto", name: "name"}} as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({
                target: {
                    value: "descripcion de producto",
                    name: "description"
                }
            } as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({target: {value: "logo", name: "logo"}} as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({
                target: {
                    value: "2025-03-30",
                    name: "date_release"
                }
            } as ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.isFormValid).toBeTruthy();
    });

    it('should set form invalid and error message when update to invalid value', () => {
        const {result} = renderHook(() => useProductForm(propsMock));

        act(() => {
            result.current.handleChange({target: {value: "11", name: "id"}} as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({target: {value: "prod", name: "name"}} as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({
                target: {
                    value: "descri",
                    name: "description"
                }
            } as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({target: {value: "", name: "logo"}} as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({
                target: {
                    value: "2025-01-30",
                    name: "date_release"
                }
            } as ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.isFormValid).toBeFalsy();
        expect(result.current.inputErrorMsg.id).toBeDefined()
        expect(result.current.inputErrorMsg.name).toBeDefined()
        expect(result.current.inputErrorMsg.description).toBeDefined()
        expect(result.current.inputErrorMsg.logo).toBeDefined()
        expect(result.current.inputErrorMsg.date_release).toBeDefined()
    });

    it('should set to empty values when call reload', () => {
        const {result} = renderHook(() => useProductForm(propsMock));

        act(() => {
            result.current.handleChange({target: {value: "111", name: "id"}} as ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.product.id).toBeDefined()

        act(() => {
            result.current.handleReload({
                preventDefault: () => {
                }
            } as FormEvent);
        });

        expect(result.current.product.id).toEqual("")
    });

    it('should can call save method when form is valid', () => {
        const {result} = renderHook(() => useProductForm(propsMock));

        act(() => {
            result.current.handleChange({target: {value: "111", name: "id"}} as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({target: {value: "producto", name: "name"}} as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({
                target: {
                    value: "descripcion de producto",
                    name: "description"
                }
            } as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({target: {value: "logo", name: "logo"}} as ChangeEvent<HTMLInputElement>);
            result.current.handleChange({
                target: {
                    value: "2025-03-30",
                    name: "date_release"
                }
            } as ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.isFormValid).toBeTruthy()

        act(() => {
            result.current.handleSave({
                preventDefault: () => {
                }
            } as FormEvent);
        });

        expect(onSaveMock).toHaveBeenCalledTimes(1)
    });

    it('should not call save method when form is invalid', () => {
        const {result} = renderHook(() => useProductForm(propsMock));

        act(() => {
            result.current.handleChange({target: {value: "111", name: "id"}} as ChangeEvent<HTMLInputElement>);
        });

        expect(result.current.isFormValid).toBeFalsy()

        act(() => {
            result.current.handleSave({
                preventDefault: () => {
                }
            } as FormEvent);
        });

        expect(onSaveMock).toHaveBeenCalledTimes(0)
    });

    it('should init product values when send info in props', () => {
        propsMock.product = {
            id: "111",
            name: "primero",
            description: "primero desc",
            logo: "logo",
            date_release: "",
            date_revision: ""
        }

        const {result} = renderHook(() => useProductForm(propsMock));

        expect(result.current.product.id).toEqual("111")
    });
});
