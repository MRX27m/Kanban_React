import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/AuthStore";
import { LoginFormData, loginSchema } from "../forms/validation";
import { NavigationEnum } from "../../enum/enums";
import "./styles/styles.css";

export const LoginPage = () => {
  const navigate = useNavigate();
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
      navigate(NavigationEnum.selectWorkSpace);
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
            className="input auth-input"
            type="email"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="error-message">{errors.email.message}</p>
          )}

          <input
            className="input auth-input"
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
          onClick={() => navigate(NavigationEnum.register)}
        >
          Немає акаунту? Зареєструватись
        </p>
      </div>
    </div>
  );
};
