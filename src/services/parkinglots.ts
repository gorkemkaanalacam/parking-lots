import { gql } from "@apollo/client";

export const GET_PARKING_LOTS = gql`
  query GetParkingLots($limit: Int, $offset: Int) {
    getAllParkingLots(limit: $limit, offset: $offset) {
      id
      name
      address
      type
      status
      size
      live_date
      image
    }
  }
`;
