import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/AuthStore";
import { LoginFormData, loginSchema } from "./validation";
import "../styles/auth.css";

export const LoginPage = () => {
  const { login, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      await login(data.email, data.password);
      window.location.href = "/SelectWorkpres";
    } catch {
      setError("email", { message: "Невірний email або пароль" });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Вхід</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}
          <input
            className="auth-input"
            type="password"
            placeholder="Пароль"
            {...register("password")}
          />
          {errors.password && (
            <p className="error-message">{errors.password.message}</p>
          )}
          <button
            className="add-workpres-button"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Завантаження..." : "Увійти"}
          </button>
        </form>
        <p
          className="auth-link"
          onClick={() => {
            window.location.href = "/register";
          }}
        >
          Немає акаунту? Зареєструватись
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
