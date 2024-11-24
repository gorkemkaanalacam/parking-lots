import React from "react";
import { Card, CardActions, CardContent, Typography } from "@mui/material";
import './styles.css'
import { ParkingLot } from "../../types/interfaces";

interface ComponentProps {
    parkingLot: ParkingLot;
    handleSwipe(direction: "left" | "right"): void;
    position?: { x: number, y: number };
    isAnimating?: boolean;
    cardStyle?: React.CSSProperties;
}

const CardComponent = (props: ComponentProps) => {
    const { parkingLot, position, isAnimating, cardStyle } = props;

    return (
        <Card
            className="Card"
            style={{
                transform: position ? `translate(${position.x}px, ${position.y}px) rotate(${position.x / 20}deg)` : undefined,
                transition: isAnimating ? "transform 0.3s ease" : "none",
                ...cardStyle
            }}
        >
            <CardContent className="CardContent" style={{ backgroundImage: `url('${parkingLot.image}')` }} />
            <CardActions className="CardActions">
                <Typography variant="body1">
                    {parkingLot.name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {parkingLot.address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                    {parkingLot.size} - {parkingLot.type} - {parkingLot.status}
                </Typography>
            </CardActions>
        </Card>
    );
};

export default CardComponent;
