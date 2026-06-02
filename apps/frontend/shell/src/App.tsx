import { lazy, Suspense, Component, ReactNode } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { PrivateRoute } from "./components/auth/PrivateRoute";
import { NavigationEnum } from "./enum/enums";

const LoginPage = lazy(() =>
  import("auth/LoginPage").then((m) => ({ default: m.LoginPage ?? m.default })),
);
const RegisterPage = lazy(() =>
  import("auth/RegisterPage").then((m) => ({
    default: m.RegisterPage ?? m.default,
  })),
);
const SelectWorkSpace = lazy(() =>
  import("workspace/SelectWorkSpace").then((m) => ({
    default: m.SelectWorkSpace ?? m.default,
  })),
);
const WorkSpace = lazy(() =>
  import("workspace/WorkSpace").then((m) => ({
    default: m.WorkSpace ?? m.default,
  })),
);

class ErrorBoundary extends Component<
  { children: ReactNode },
  { error: Error | null }
> {
  constructor(props: any) {
    super(props);
    this.state = { error: null };
  }
  static getDerivedStateFromError(error: Error) {
    return { error };
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ color: "#fff", padding: 40, textAlign: "center" }}>
          <h2>Сталась помилка</h2>
          <p style={{ opacity: 0.6, marginTop: 12 }}>
            {this.state.error.message}
          </p>
          <button
            onClick={() => {
              this.setState({ error: null });
              window.location.reload();
            }}
            style={{
              marginTop: 24,
              padding: "10px 24px",
              borderRadius: 20,
              background: "linear-gradient(42deg,#0b2688,#cc088e)",
              color: "#fff",
              border: "none",
              cursor: "pointer",
            }}
          >
            Перезавантажити
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

const Loader = () => (
  <div
    style={{ color: "rgba(255,255,255,0.5)", padding: 40, textAlign: "center" }}
  >
    Завантаження...
  </div>
);

export function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route
              path={NavigationEnum.root}
              element={<Navigate to={NavigationEnum.login} replace />}
            />
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
                  <ErrorBoundary>
                    <WorkSpace />
                  </ErrorBoundary>
                </PrivateRoute>
              }
            />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
