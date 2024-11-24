import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_PARKING_LOTS } from "../services/parkinglots";
import { ParkingLot } from "../types/interfaces";

export const useParkingLots = () => {
    const [parkingLots, setParkingLots] = useState<ParkingLot[]>([]);
    const [offset, setOffset] = useState(0);
    const [isFetchingMore, setIsFetchingMore] = useState(false);
    const { loading, error, data, fetchMore } = useQuery(GET_PARKING_LOTS, {
        variables: { limit: 5, offset },
    });

    useEffect(() => {
        if (data && data.getAllParkingLots) {
            setParkingLots((prev) => [...prev, ...data.getAllParkingLots]);
            setIsFetchingMore(false);
        }
    }, [data]);

    const getMore = () => {
        setParkingLots((prev) => prev.slice(1));
        if (parkingLots.length <= 2 && !isFetchingMore) {
            setIsFetchingMore(true);
            fetchMore({
                variables: { limit: 5, offset: offset + 5 },
            });
            setOffset((prev) => prev + 5);
        }
    };

    return { parkingLots, loading, error, getMore };
};
