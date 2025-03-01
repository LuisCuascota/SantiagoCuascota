import {act, renderHook} from "@testing-library/react";
import {useProductsTableState} from "./useProductsTable.state.tsx";
import {ProductTableProps} from "../ProductsTable.tsx";
import {Product} from "../../../shared/Interfaces/Product.interfaces.ts";
import {ChangeEvent} from "react";

describe('useProductsTableState hook - tests', () => {
    let propsMock: ProductTableProps

    beforeEach(() => {
        propsMock = {
            products: [],
            isLoading: false,
            onAdd: jest.fn(),
            onEdit: jest.fn(),
            onDelete: jest.fn(),
        }
    })

    it('should render initial state when call hook', () => {
        const {result} = renderHook(() => useProductsTableState(propsMock));

        expect(result.current.filteredProducts).toEqual([]);
    });

    it('should change toggle id when act toggle action', () => {
        const {result} = renderHook(() => useProductsTableState(propsMock));

        act(() => {
            result.current.toggleDropdown("new")
        });

        expect(result.current.idDropdown).toEqual("new");

        act(() => {
            result.current.toggleDropdown("new")
        });

        expect(result.current.idDropdown).toEqual(null);
    });

    it('should not goToPreviousPage when only have 1 page ', () => {
        const {result} = renderHook(() => useProductsTableState(propsMock));

        act(() => {
            result.current.goToPreviousPage()
        });

        expect(result.current.currentPage).toEqual(1);
    });

    it('should not goToNextPage when only have 1 page ', () => {
        const {result} = renderHook(() => useProductsTableState(propsMock));

        act(() => {
            result.current.goToNextPage()
        });

        expect(result.current.currentPage).toEqual(1);
    });

    it('should goToNextPage and goToPreviousPage when have more tha 1 page', () => {
        propsMock.products=[{name:"1", description:"desc"} as Product,{name:"2", description:"desc"} as Product,{name:"3", description:"desc"} as Product,{name:"4", description:"desc"} as Product,{name:"5", description:"desc"} as Product,{name:"6", description:"desc"} as Product,{name:"7", description:"desc"} as Product]
        const {result} = renderHook(() => useProductsTableState(propsMock));

        act(() => {
            result.current.goToNextPage()
        });

        expect(result.current.currentPage).toEqual(2);

        act(() => {
            result.current.goToPreviousPage()
        });

        expect(result.current.currentPage).toEqual(1);
    });

    it('should filter products when handleSearchChange', () => {
        propsMock.products=[{name:"1", description:"111"} as Product,{name:"2", description:"desc"} as Product]
        const {result} = renderHook(() => useProductsTableState(propsMock));

        act(() => {
            result.current.handleSearchChange({target:{value:"1"}} as ChangeEvent<HTMLInputElement>)
        });

        expect(result.current.filteredProducts).toHaveLength(1);
    });

    it('should change itemsPerPage when handleItemsPerPageChange', () => {
        const {result} = renderHook(() => useProductsTableState(propsMock));

        act(() => {
            result.current.handleItemsPerPageChange({target:{value:"10"}} as ChangeEvent<HTMLSelectElement>)
        });

        expect(result.current.itemsPerPage).toEqual(10);
    });
});
