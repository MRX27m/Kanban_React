import { u as useAuthStore, a as useForm, j as jsxRuntimeExports, t, l as loginSchema } from './auth-CwRue-OK.js';

const LoginPage = () => {
  const { login, isLoading } = useAuthStore();
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: t(loginSchema)
  });
  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      window.location.href = "/SelectWorkpres";
    } catch {
      setError("email", { message: "Невірний email або пароль" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-box", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "auth-title", children: "Вхід" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "auth-input", type: "email", placeholder: "Email", ...register("email") }),
      errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: errors.email.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "auth-input", type: "password", placeholder: "Пароль", ...register("password") }),
      errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: errors.password.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "add-workpres-button", type: "submit", disabled: isLoading, children: isLoading ? "Завантаження..." : "Увійти" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "auth-link", onClick: () => {
      window.location.href = "/register";
    }, children: "Немає акаунту? Зареєструватись" })
  ] }) });
};

export { LoginPage, LoginPage as default };
