import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/AuthStore";
import { RegisterFormData, registerSchema } from "./validation";
import "../styles/auth.css";

export const RegisterPage = () => {
  const { register: registerUser, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data.email, data.password, data.name);
      window.location.href = "/SelectWorkpres";
    } catch {
      setError("email", { message: "Такий email вже зайнятий" });
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <h2 className="auth-title">Реєстрація</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="auth-input"
            type="text"
            placeholder="Імя"
            {...register("name")}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}
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
            {isLoading ? "Завантаження..." : "Зареєструватись"}
          </button>
        </form>
        <p
          className="auth-link"
          onClick={() => {
            window.location.href = "/login";
          }}
        >
          Вже є акаунт? Увійти
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
