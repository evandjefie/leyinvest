import { useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider, useDispatch } from "react-redux";
import { store, AppDispatch } from "./store";
import { restoreSession } from "./store/slices/authSlice";
import { useAppSelector } from "./store/hooks";

// Pages
import Dashboard from "./pages/Dashboard";
import Portfolio from "./pages/Portfolio";
import Analysis from "./pages/Analysis";
import Profile from "./pages/Profile";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import VerifyEmailPage from "./pages/auth/VerifyEmailPage";
import CompleteProfilePage from "./pages/auth/CompleteProfilePage";
import ForgotPassword from "./pages/auth/ForgotPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import VerifyCodeReset from "./pages/auth/VerifyCodeReset";
import GoogleCallback from "./pages/auth/GoogleCallback";
import NotFound from "./pages/NotFound";

// Layout
import MainLayout from "./components/layout/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";

const queryClient = new QueryClient();

const AppContent = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated, loading } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // Sauvegarder la route actuelle avant le refresh
    const currentPath = window.location.pathname;
    if (isAuthenticated && currentPath !== '/auth/login' && currentPath !== '/auth/register') {
      localStorage.setItem('lastRoute', currentPath);
    }
  }, [isAuthenticated]);

  useEffect(() => {
    const restoreUserSession = async () => {
      const result = await dispatch(restoreSession());
      
      // Après la restauration, rediriger vers la dernière route ou dashboard
      if (restoreSession.fulfilled.match(result)) {
        const lastRoute = localStorage.getItem('lastRoute');
        if (lastRoute && lastRoute !== window.location.pathname) {
          window.location.href = lastRoute;
        }
      }
    };
    
    restoreUserSession();
  }, [dispatch]);

  return (
    <>
      <Toaster />
      <Sonner />
      <BrowserRouter>
          <Routes>
            {/* Auth Routes */}
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/register" element={<Register />} />
            <Route path="/auth/verify-email" element={<VerifyEmailPage />} />
            <Route path="/auth/complete-profile" element={<CompleteProfilePage />} />
            <Route path="/auth/verify-code-reset" element={<VerifyCodeReset />} />
            <Route path="/auth/forgot-password" element={<ForgotPassword />} />
            <Route path="/auth/reset-password" element={<ResetPassword />} />
            <Route path="/auth/google/callback" element={<GoogleCallback />} />
            
            {/* Protected Routes */}
            <Route path="/" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <MainLayout>
                  <Dashboard />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/portfolio" element={
              <ProtectedRoute>
                <MainLayout>
                  <Portfolio />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/analysis" element={
              <ProtectedRoute>
                <MainLayout>
                  <Analysis />
                </MainLayout>
              </ProtectedRoute>
            } />
            <Route path="/profile" element={
              <ProtectedRoute>
                <MainLayout>
                  <Profile />
                </MainLayout>
              </ProtectedRoute>
            } />
            
            {/* Catch-all route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
    </>
  );
};

const App = () => (
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </QueryClientProvider>
  </Provider>
);

export default App;
