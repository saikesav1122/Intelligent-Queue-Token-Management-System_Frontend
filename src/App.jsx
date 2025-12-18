import { BrowserRouter, Routes, Route } from "react-router-dom";
import ServiceSelection from "./pages/serviceSelection";
import TokenGenerated from "./pages/tokenGenerated";
import TokenPopup from "./pages/tokenPopup";
import NowServing from "./pages/nowServing";
import KioskDashboard from "./pages/kioskDashboard";
import Counter from "./pages/counter";
import Admin from "./pages/admin";


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ServiceSelection />} />
        <Route path="/kiosk" element={<KioskDashboard />} />
        <Route path="/token" element={<TokenGenerated />} />
        <Route path="/now-serving" element={<NowServing />} />
        <Route path="/token-popup" element={<TokenPopup />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
