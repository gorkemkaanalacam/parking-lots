import { render, screen } from "@testing-library/react";
import App from "./App";

jest.mock("./hooks/useParkingLots", () => ({
  useParkingLots: jest.fn(),
}));

const mockedUseParkingLots = jest.requireMock("./hooks/useParkingLots").useParkingLots;

describe("App Component", () => {
  it("renders loading spinner when loading is true", () => {
    mockedUseParkingLots.mockReturnValue({
      parkingLots: [],
      loading: true,
      error: null,
      getMore: jest.fn(),
    });

    render(<App />);

    expect(screen.getByRole("progressbar")).toBeInTheDocument();
  });

  it("renders error alert when there is an error", () => {
    mockedUseParkingLots.mockReturnValue({
      parkingLots: [],
      loading: false,
      error: "Error fetching data",
      getMore: jest.fn(),
    });

    render(<App />);

    expect(screen.getByText("Error fetching data!.")).toBeInTheDocument();
    expect(screen.getByRole("alert")).toBeInTheDocument();
  });

  it("renders MainTab with parkingLots data", () => {
    const mockParkingLots = [
      {
        id: "1",
        name: "Parking Lot 1",
        address: "Address 1",
        type: "Outdoor",
        status: "Available",
        size: "Large",
        live_date: "2024-01-01",
        image: "https://example.com/image1.jpg",
      },
    ];

    mockedUseParkingLots.mockReturnValue({
      parkingLots: mockParkingLots,
      loading: false,
      error: null,
      getMore: jest.fn(),
    });

    render(<App />);
    expect(screen.getByText("Parking Lot 1")).toBeInTheDocument();
  });

  it("renders MainTab even when parkingLots is empty", () => {
    mockedUseParkingLots.mockReturnValue({
      parkingLots: [],
      loading: false,
      error: null,
      getMore: jest.fn(),
    });

    render(<App />);

    expect(screen.getByTestId("MainTab")).toBeInTheDocument();
  });
});
