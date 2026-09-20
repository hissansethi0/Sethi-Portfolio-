import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { PortfolioProvider } from './context/PortfolioContext';
import { ProtectedRoute } from './components/ProtectedRoute';
import { Home } from './pages/Home';

// Lazy load non-critical and administrative routes for lightning-fast initial page load
const ProjectDetails = lazy(() => import('./pages/ProjectDetails').then(m => ({ default: m.ProjectDetails })));
const AdminLogin = lazy(() => import('./pages/AdminLogin').then(m => ({ default: m.AdminLogin })));
const AdminDashboard = lazy(() => import('./pages/AdminDashboard').then(m => ({ default: m.AdminDashboard })));

const PageFallback: React.FC = () => (
  <div className="min-h-screen bg-[#05070A] flex items-center justify-center">
    <div className="w-8 h-8 border-2 border-[#1683FF] border-t-transparent rounded-full animate-spin" />
  </div>
);

export const App: React.FC = () => {
  return (
    <AuthProvider>
      <PortfolioProvider>
        <Router>
          <Suspense fallback={<PageFallback />}>
            <Routes>
              {/* Public Home Route */}
              <Route path="/" element={<Home />} />

              {/* Individual Project Details */}
              <Route path="/project/:id" element={<ProjectDetails />} />

              {/* Admin Authentication */}
              <Route path="/admin/login" element={<AdminLogin />} />

              {/* Protected Admin Control Suite */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Catch-all redirect */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Router>
      </PortfolioProvider>
    </AuthProvider>
  );
};

export default App;
