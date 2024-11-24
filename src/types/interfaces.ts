export interface ParkingLot {
  id: string;
  name: string;
  address: string;
  type: string;
  status: string;
  size: string;
  live_date: string;
  image: string;
  rating?: "like" | "dislike";
}