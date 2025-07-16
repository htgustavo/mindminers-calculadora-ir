import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DashboardLayout } from "./components/layout/DashboardLayout";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <BrowserRouter>
      <DashboardLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </DashboardLayout>
    </BrowserRouter>
  );
}

export default App;
