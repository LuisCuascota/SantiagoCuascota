import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {ProductDeleteModal} from "./ProductDeleteModal.tsx";

describe('ProductDeleteModal component - tests', () => {
    it('should show modal when render component', () => {
        render(<ProductDeleteModal name={"Test"} open={true} onConfirm={()=>{}} onCancel={()=>{}}/>);

        expect(screen.getByText("Test")).toBeInTheDocument();
    });

    it('should not show modal when open is false', () => {
        render(<ProductDeleteModal name={"Test"} open={false} onConfirm={()=>{}} onCancel={()=>{}}/>);

        expect(screen.queryByText("Test")).not.toBeInTheDocument();
    });
});
