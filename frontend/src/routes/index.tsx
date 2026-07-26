import React, { lazy, Suspense } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Layout } from '../components/layout/Layout';
import { ErrorBoundary } from '../components/common/ErrorBoundary';
import { Skeleton } from '../components/ui/Skeleton';

// Lazy-loaded Page Components for Code-Splitting
const Home = lazy(() => import('../pages/Home').then((m) => ({ default: m.Home })));
const ExploreCats = lazy(() => import('../pages/ExploreCats').then((m) => ({ default: m.ExploreCats })));
const CatDetails = lazy(() => import('../pages/CatDetails').then((m) => ({ default: m.CatDetails })));
const Recommendation = lazy(() => import('../pages/Recommendation').then((m) => ({ default: m.Recommendation })));
const Architecture = lazy(() => import('../pages/Architecture').then((m) => ({ default: m.ArchitecturePage })));
const AddCat = lazy(() => import('../pages/AddCat').then((m) => ({ default: m.AddCat })));
const NotFound = lazy(() => import('../pages/NotFound').then((m) => ({ default: m.NotFound })));

const PageLoader = () => (
  <div className="py-12 max-w-5xl mx-auto space-y-6 animate-pulse">
    <Skeleton className="h-10 w-48 rounded-xl" />
    <Skeleton className="h-64 w-full rounded-3xl" />
  </div>
);

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'explore',
        element: (
          <Suspense fallback={<PageLoader />}>
            <ExploreCats />
          </Suspense>
        ),
      },
      {
        path: 'cats/:id',
        element: (
          <Suspense fallback={<PageLoader />}>
            <CatDetails />
          </Suspense>
        ),
      },
      {
        path: 'recommend',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Recommendation />
          </Suspense>
        ),
      },
      {
        path: 'architecture',
        element: (
          <Suspense fallback={<PageLoader />}>
            <Architecture />
          </Suspense>
        ),
      },
      {
        path: 'add-cat',
        element: (
          <Suspense fallback={<PageLoader />}>
            <AddCat />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<PageLoader />}>
            <NotFound />
          </Suspense>
        ),
      },
    ],
  },
]);

export const AppRoutes: React.FC = () => {
  return <RouterProvider router={router} />;
};
