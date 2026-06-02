import { u as useAuthStore, a as useForm, j as jsxRuntimeExports, t, r as registerSchema } from './auth-CwRue-OK.js';

const RegisterPage = () => {
  const { register: registerUser, isLoading } = useAuthStore();
  const { register, handleSubmit, formState: { errors }, setError } = useForm({
    resolver: t(registerSchema)
  });
  const onSubmit = async (data) => {
    try {
      await registerUser(data.email, data.password, data.name);
      window.location.href = "/SelectWorkpres";
    } catch {
      setError("email", { message: "Такий email вже зайнятий" });
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "auth-wrapper", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "auth-box", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "auth-title", children: "Реєстрація" }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit(onSubmit), children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "auth-input", type: "text", placeholder: "Імя", ...register("name") }),
      errors.name && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: errors.name.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "auth-input", type: "email", placeholder: "Email", ...register("email") }),
      errors.email && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: errors.email.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("input", { className: "auth-input", type: "password", placeholder: "Пароль", ...register("password") }),
      errors.password && /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "error-message", children: errors.password.message }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("button", { className: "add-workpres-button", type: "submit", disabled: isLoading, children: isLoading ? "Завантаження..." : "Зареєструватись" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "auth-link", onClick: () => {
      window.location.href = "/login";
    }, children: "Вже є акаунт? Увійти" })
  ] }) });
};

export { RegisterPage, RegisterPage as default };
