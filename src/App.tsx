import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import VehicleListPage from "./pages/VehicleListPage";
import { VehicleDetailPage } from "./pages/VehicleDetailPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/vehicles" replace />} />
        <Route path="/vehicles" element={<VehicleListPage />} />
        <Route path="/vehicles/:id" element={<VehicleDetailPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;