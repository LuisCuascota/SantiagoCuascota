import '@testing-library/jest-dom';
import {render, screen} from "@testing-library/react";
import {Nav} from "./Nav";

describe('Nav component - tests', () => {
    it('should render Nav when call component', () => {
        render(<Nav />);
        expect(screen.getByText('BANCO')).toBeInTheDocument();
    });
});
