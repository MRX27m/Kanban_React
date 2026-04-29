import { useEffect } from "react";
import "./styles/styles.css";
import { SelectWorkSpace } from "./components/forms/SelectWorkSpace";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { WorkSpace } from "./components/workspace/WorkSpace";
import { NavigationEnum } from "./enum/enums";
import { LoginPage } from "./components/auth/LoginPage";
import { RegisterPage } from "./components/auth/RegisterPage";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { useAuthStore } from "./store/AuthStore";

export function App() {
  const { init } = useAuthStore();

  useEffect(() => {
    init();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path={NavigationEnum.root} element={<Navigate to={NavigationEnum.login} replace />} />

        <Route path={NavigationEnum.login} element={<LoginPage />} />
        <Route path={NavigationEnum.register} element={<RegisterPage />} />

        <Route
          path={NavigationEnum.selectWorkSpace}
          element={
            <PrivateRoute>
              <SelectWorkSpace />
            </PrivateRoute>
          }
        />
        <Route
          path="/workpres/:id"
          element={
            <PrivateRoute>
              <WorkSpace />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
