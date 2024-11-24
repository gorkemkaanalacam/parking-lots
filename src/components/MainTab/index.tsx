import { useState } from "react";
import { Tabs, Tab } from "@mui/material";
import Tinder from "../Tinder";
import Summary from "../Summary";
import { ParkingLot } from "../../types/interfaces";
import { useSwipe } from "../../hooks/useSwipe";
import './styles.css'


interface ComponentProps {
  parkingLots: ParkingLot[];
  getMore(): void;
}

const MainTab = (props: ComponentProps) => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [choices, setChoices] = useState<ParkingLot[]>([]);
  const { parkingLots, getMore } = props;

  const onRated = (direction: "left" | "right") => {
    if (parkingLots.length === 0 || isAnimating) return;

    const currentLot = parkingLots[0];

    setTimeout(() => {

      setChoices((prev) => {
        if (direction === "right")
          return [...prev, { ...currentLot, rating: "like" }]
        if (direction === "left")
          return [...prev, { ...currentLot, rating: "dislike" }]

        return [...prev]
      });
      getMore();
    }, 300);
  };

  const { isAnimating, position, swipeHandlers, handleSwipe } = useSwipe({ onRated: onRated });

  return (
    <div data-testid="MainTab" className="MainTab">
      <Tabs className="Tabs" value={selectedTab} onChange={(e, newValue) => setSelectedTab(newValue)} centered>
        <Tab label="tinder" />
        <Tab label="summary" />
      </Tabs>
      {selectedTab === 0 && (
        <Tinder parkingLots={parkingLots} handleSwipe={handleSwipe} position={position} isAnimating={isAnimating} swipeHandlers={swipeHandlers} />
      )}
      {selectedTab === 1 && (
        <Summary choices={choices} />
      )}
    </div>
  );
};

export default MainTab;
