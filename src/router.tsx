import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./layouts/Layout";
import Spinner from "./components/Spinner/Spinner";
const FavoritesPage = lazy(() => import("./views/FavoritesPage"));
const IndexPage = lazy(() => import("./views/IndexPage"));

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spinner />}>
                <IndexPage/>
              </Suspense>
            }
            index
          />
          <Route
            path="/favorites"
            element={
              <Suspense fallback={<Spinner />}>
                <FavoritesPage />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
