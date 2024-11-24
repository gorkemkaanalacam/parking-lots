import React from "react";
import { CircularProgress, Alert } from "@mui/material";
import { useParkingLots } from "./hooks/useParkingLots";
import MainTab from "./components/MainTab";
import "./App.css";

const App: React.FC = () => {
  const { parkingLots, loading, error, getMore } = useParkingLots();

  return (
    <div className="Container">
      {error && <Alert severity="error">Error fetching data!.</Alert>}
      {loading && <CircularProgress className="ProgressBar" />}
      <MainTab parkingLots={parkingLots} getMore={getMore} />
    </div>
  );
};

export default App;
