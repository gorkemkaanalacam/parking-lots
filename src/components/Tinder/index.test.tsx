import { render, screen, fireEvent } from "@testing-library/react";
import Tinder from "./index";
import { ParkingLot } from "../../types/interfaces";

const mockParkingLots: ParkingLot[] = [
    {
        id: "1",
        name: "Parking Lot 1",
        address: "Address 1",
        type: "mall",
        status: "inactive",
        size: "25",
        live_date: "2024-01-01",
        image: "https://example.com/image1.jpg",
    },
    {
        id: "2",
        name: "Parking Lot 2",
        address: "Address 2",
        type: "mall",
        status: "active",
        size: "30",
        live_date: "2024-01-02",
        image: "https://example.com/image2.jpg",
    },
];

jest.mock("react-swipeable", () => ({
    useSwipeable: jest.fn(() => ({
        ref: jest.fn(),
        onSwiped: jest.fn(),
        onSwipeStart: jest.fn(),
        onSwipeEnd: jest.fn(),
    })),
}));


describe("Tinder Component", () => {
    it("renders parking lots correctly", () => {
        const mockHandleSwipe = jest.fn();
        render(
            <Tinder
                parkingLots={mockParkingLots}
                handleSwipe={mockHandleSwipe}
                position={{ x: 0, y: 0 }}
                isAnimating={false}
                swipeHandlers={{ ref: jest.fn() }}
            />
        );

        expect(screen.getByText("Parking Lot 1")).toBeInTheDocument();
        expect(screen.getByText("Address 1")).toBeInTheDocument();
        expect(screen.getByText("Parking Lot 2")).toBeInTheDocument();
    });

    it("displays 'No more parking lots to rate!' when the list is empty", () => {
        const mockHandleSwipe = jest.fn();
        render(
            <Tinder
                parkingLots={[]}
                handleSwipe={mockHandleSwipe}
                position={{ x: 0, y: 0 }}
                isAnimating={false}
                swipeHandlers={{ ref: jest.fn() }}
            />
        );

        expect(screen.getByText("No more parking lots to rate!")).toBeInTheDocument();
    });

    it("calls handleSwipe when the buttons are clicked", () => {
        const mockHandleSwipe = jest.fn();
        render(
            <Tinder
                parkingLots={mockParkingLots}
                handleSwipe={mockHandleSwipe}
                position={{ x: 0, y: 0 }}
                isAnimating={false}
                swipeHandlers={{ ref: jest.fn() }}
            />
        );

        fireEvent.click(screen.getByTestId("Left"));
        expect(mockHandleSwipe).toHaveBeenCalledWith("left");

        fireEvent.click(screen.getByTestId("Right"));
        expect(mockHandleSwipe).toHaveBeenCalledWith("right");
    });

    it("disables buttons when isAnimating is true", () => {
        const mockHandleSwipe = jest.fn();
        render(
            <Tinder
                parkingLots={mockParkingLots}
                handleSwipe={mockHandleSwipe}
                position={{ x: 0, y: 0 }}
                isAnimating={true}
                swipeHandlers={{ ref: jest.fn() }}
            />
        );

        fireEvent.click(screen.getByTestId("Left"));
        expect(mockHandleSwipe).not.toHaveBeenCalled();

        fireEvent.click(screen.getByTestId("Right"));
        expect(mockHandleSwipe).not.toHaveBeenCalled();
    });
});
