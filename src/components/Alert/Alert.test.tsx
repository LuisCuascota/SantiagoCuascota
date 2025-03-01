import '@testing-library/jest-dom';
import {act, fireEvent, render, screen} from "@testing-library/react";
import {Alert} from "./Alert.tsx";

jest.useFakeTimers();

describe('Alert component - tests', () => {
    it('should render Alert when call component', () => {
        render(<Alert message={"Alert Test"}/>);
        expect(screen.getByText("Alert Test")).toBeInTheDocument();
    });

    it('should close Alert when pass ore than 5 secs', () => {
        render(<Alert message={"Alert Test 2"}/>);

        expect(screen.getByText("Alert Test 2")).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(6000);
        });

        expect(screen.queryByText("Alert Test 2")).not.toBeInTheDocument();
    });

    it('should close Alert when click on close button', () => {
        render(<Alert message={"Alert Test 3"}/>);

        expect(screen.getByText("Alert Test 3")).toBeInTheDocument();

        const button = screen.getByTestId("close-modal");
        fireEvent.click(button);

        expect(screen.queryByText("Alert Test 3")).not.toBeInTheDocument();
    });


});
