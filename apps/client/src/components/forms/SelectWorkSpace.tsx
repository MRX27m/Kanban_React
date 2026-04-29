import { FC, useState } from "react";
import "./styles/styles.css";
import { WorkSpaceCards } from "./WorkSpaceCards";
import { Input } from "../input/Input";
import { Link } from "react-router-dom";
import { Modal } from "../modal/Modal";
import { Button } from "../buttons/Button";
import {
  useBoards,
  useAddBoard,
  useRemoveBoard,
} from "../../store/SelectWorkSpaceStore";
import { useAuthStore } from "../../store/AuthStore";
import { boardSchema } from "./validation";

export const SelectWorkSpace: FC = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { data: boards = [], isLoading } = useBoards();
  const addBoard = useAddBoard();
  const removeBoard = useRemoveBoard();

  const { logout } = useAuthStore();

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
      onError: () => {
        setErrorMessage("Помилка при створенні дошки");
      },
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setValue("");
    setErrorMessage("");
  };

  if (isLoading) {
    return <div className="title">Завантаження...</div>;
  }

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
                  removeWokSpaceKard={() => removeBoard.mutate(wp.id)}
                  workpresText={wp.name}
                  id={wp.id}
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={handleClose}>
        <Input
          placeholder="Введіть назву дошки"
          setValue={(v) => {
            setValue(v);
            setErrorMessage("");
          }}
          value={value}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleAdd();
          }}
        />
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </Modal>
    </div>
  );
};
