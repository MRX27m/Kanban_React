import { FC, useState } from "react";
import "./styles/styles.css";
import { WorkSpaceCards } from "./WorkSpaceCards";
import { Input } from "../input/Input";
import { Link } from "react-router-dom";
import { Modal } from "../modal/Modal";
import { Button } from "../buttons/Button";
import { useBoardStore } from "../../store/SelectWorkSpaceStore";

export const SelectWorkSpace: FC = () => {
  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { boards, addBoard, removeBoard } = useBoardStore();

  const handleAdd = () => {
    const error = addBoard(value);

    if (error) {
      setErrorMessage(error);
      return;
    }

    setValue("");
    setErrorMessage("");
    setIsOpen(false);
  };

  const handleClose = () => {
    setIsOpen(false);
    setValue("");
    setErrorMessage("");
  };

  return (
    <div>
      <h1 className="title">Виберіть дошку</h1>
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
                  removeWokSpaceKard={() => removeBoard(wp.id)}
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
