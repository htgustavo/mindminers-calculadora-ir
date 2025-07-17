import "./App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";

import { DashboardLayout } from "./components/layout/DashboardLayout";
import { OperationProvider } from "./context/OperationContext";
import PageNotFound from "./pages/404";
import Dashboard from "./pages/Dashboard";
import TransactionsPage from "./pages/Transactions";

function App() {
  return (
    <OperationProvider>
      <BrowserRouter>
        <DashboardLayout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/transactions" element={<TransactionsPage />} />

            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </DashboardLayout>
      </BrowserRouter>
    </OperationProvider>
  );
}

export default App;
