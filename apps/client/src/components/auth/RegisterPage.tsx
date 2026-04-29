import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../../store/AuthStore";
import { RegisterFormData, registerSchema } from "../forms/validation";
import { NavigationEnum } from "../../enum/enums";
import "./styles/styles.css";

export const RegisterPage = () => {
  const navigate = useNavigate();
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
      navigate(NavigationEnum.selectWorkSpace);
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
            className="input auth-input"
            type="text"
            placeholder="Ім'я"
            {...register("name")}
          />
          {errors.name && (
            <p className="error-message">{errors.name.message}</p>
          )}

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
            {isLoading ? "Завантаження..." : "Зареєструватись"}
          </button>
        </form>
        <p className="auth-link" onClick={() => navigate(NavigationEnum.login)}>
          Вже є акаунт? Увійти
        </p>
      </div>
    </div>
  );
};
