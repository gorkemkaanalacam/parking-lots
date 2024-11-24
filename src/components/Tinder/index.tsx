import { Button, Typography } from "@mui/material";
import './styles.css'
import { ParkingLot } from "../../types/interfaces";
import Card from "../Card";
import { SwipeableHandlers } from "react-swipeable";
import { Favorite, Close } from '@mui/icons-material';

interface ComponentProps {
  parkingLots: ParkingLot[];
  handleSwipe(direction: "left" | "right"): void;
  position: { x: number, y: number };
  isAnimating: boolean;
  swipeHandlers: SwipeableHandlers
}

const Tinder = (props: ComponentProps) => {
  const { parkingLots, handleSwipe, position, isAnimating, swipeHandlers } = props;

  return (
    parkingLots.length > 0 ? (
      <div className="Tinder">
        <div {...swipeHandlers} className="CardContainer">
          {
            parkingLots[1] &&
            <Card parkingLot={parkingLots[1]} handleSwipe={handleSwipe} cardStyle={{ position: "absolute", zIndex: 0 }} />
          }
          <Card parkingLot={parkingLots[0]} position={position} isAnimating={isAnimating} handleSwipe={handleSwipe} />
        </div>
        <div className="ButtonsContainer">

          <Button
            data-testid="Left"
            variant="contained"
            className="Button"
            color="inherit"
            onClick={() => !isAnimating && handleSwipe("left")}
          >

            <Close fontSize="large" color="error" />
          </Button>
          <Button
            data-testid="Right"
            variant="contained"
            className="Button"
            color="inherit"
            onClick={() => !isAnimating && handleSwipe("right")}
          >
            <Favorite fontSize="large" color="success" />
          </Button>
        </div>
      </div>
    ) : (
      <Typography variant="h6" align="center" marginTop="50px">
        No more parking lots to rate!
      </Typography>
    )
  );
};

export default Tinder;
