import { useState } from "react";
import { HashRouter, Routes, Route } from "react-router-dom";
import "./App.css";

// Pages
import Index from "./pages/Index";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ApplicationProgress from "./pages/ApplicationProgress";
import VerificationForm from "./pages/VerificationForm";
import VerificationHistory from "./pages/VerificationHistory";
import CreditPurchase from "./pages/CreditPurchase";
import NotFound from "./pages/NotFound";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <HashRouter>
      <Toaster></Toaster>
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/application-progress" element={<ApplicationProgress />} />
        <Route path="/verification-form/:type" element={<VerificationForm />} />
        <Route path="/verification-history" element={<VerificationHistory />} />
        <Route path="/credit-purchase" element={<CreditPurchase />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
