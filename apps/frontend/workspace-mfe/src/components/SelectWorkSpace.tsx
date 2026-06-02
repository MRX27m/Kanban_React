import { FC, useState } from "react";
import { Link } from "react-router-dom";
import { WorkSpaceCards } from "./WorkSpaceCards";
import { Input } from "./ui/Input";
import { Modal } from "./ui/Modal";
import { Button } from "./ui/Button";
import {
  useBoards,
  useAddBoard,
  useRemoveBoard,
} from "../store/SelectWorkSpaceStore";
import { boardSchema } from "./validation";
import "../styles/global.css";

export const SelectWorkSpace: FC = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: boards = [], isLoading } = useBoards();
  const addBoard = useAddBoard();
  const removeBoard = useRemoveBoard();

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    window.dispatchEvent(new CustomEvent("auth:logout"));
    window.location.href = "/login";
  };

  const handleAdd = () => {
    const result = boardSchema.safeParse(value);
    if (!result.success) {
      setErrorMessage(result.error.issues[0].message);
      return;
    }
    addBoard.mutate(value, {
      onSuccess: () => {
        setValue("");
        setErrorMessage("");
        setIsOpen(false);
      },
      onError: () => setErrorMessage("Помилка при створенні дошки"),
    });
  };

  if (isLoading) return <div className="title">Завантаження...</div>;

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <h1 className="title">Виберіть дошку</h1>
        <Button children="Вийти" className="back-btn" onClick={logout} />
      </div>
      <div className="workpres-board-wrapper">
        <Button
          children="Add workspace +"
          className="add-workpres-button"
          onClick={() => setIsOpen(true)}
        />
        <div className="workpres-board">
          {boards.map((wp) => (
            <div key={wp.id} style={{ position: "relative" }}>
              <Link
                to={`/workpres/${wp.id}`}
                state={{ name: wp.name }}
                style={{ textDecoration: "none" }}
              >
                <WorkSpaceCards
                  workpresText={wp.name}
                  removeWorkspaceCard={() => removeBoard.mutate(wp.id)}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setValue("");
          setErrorMessage("");
        }}
      >
        <Input
          placeholder="Введіть назву дошки"
          value={value}
          setValue={(v) => {
            setValue(v);
            setErrorMessage("");
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </Modal>
    </div>
  );
};

export default SelectWorkSpace;
