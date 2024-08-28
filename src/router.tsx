import React from 'react'
import './index.css'
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom'
import { lazy } from 'react'
import useAuthStore from './stores/auth.store.ts'
import ErrorPage from './pages/ErrorPage.tsx'
import App from './App.tsx'
import { printerLoader } from './pages/dashboard/printers/PrinterDetailPage.tsx'
const LoginPage = lazy(() => import('./pages/auth/LoginPage.tsx'));
const PrinterDetailPage = lazy(() => import('./pages/dashboard/printers/PrinterDetailPage.tsx'));


const ProtectedRoute: React.FC = () => {
    const [isLoggedIn, isLoading] = useAuthStore((state) => [
        state.isLoggedIn,
        state.isAuthLoading
    ]);

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return isLoggedIn ? <Outlet /> : <Navigate to="/login" />;
};

const authLoader = () => {
    const localStorageUser = localStorage.getItem('auth-storage');
    if (localStorageUser) {
        const userState = JSON.parse(localStorageUser).state;
        console.log(userState);
        if (userState.isLoggedIn) {
            window.location.href = '/';
        }
    }
    return null;
};

export const router = createBrowserRouter([
    {
        errorElement: <ErrorPage />,
        path: '/',
        element: <Navigate to="/dashboard" />
    },
    {
        path: '/dashboard',
        element: <ProtectedRoute />,
        errorElement: <ErrorPage />,
        children: [
            {
                path: '/',
                element: <App />
            },
            {
                path: '/printers',
                element: <div>Dashboard Printers</ div >
            },
            {
                path: '/printers/:printer',
                element: <PrinterDetailPage />,
                loader: printerLoader
            }
        ]
    },
    {
        path: '/login',
        errorElement: <ErrorPage />,
        element: <LoginPage />,
        loader: authLoader
    },
], {
    basename: '/'
});
