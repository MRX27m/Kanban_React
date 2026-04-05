import React, { FC, useState } from "react";
import { Column } from "../Column";
import { Input } from "../input/Input";
import { Link, useLocation, useParams } from "react-router-dom";
import { Modal } from "../modal/Modal";
import { Button } from "../buttons/Button";
import { useColumnStore } from "../../store/WorkspaceStore";

export const WorkSpace: FC = () => {
  const location = useLocation();

  const boardName = location.state?.name || "Моя дошка";

  const { columns, addColumn } = useColumnStore();

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <h1 className="title">{boardName}</h1>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
        <Input
          placeholder="Введіть назву колонки"
          value={value}
          setValue={setValue}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              addColumn(value);
              setValue("");
              setIsOpen(false);
            }
          }}
        />
      </Modal>
      <Button
        children="Add column +"
        className="add-column"
        onClick={() => setIsOpen(true)}
      />
      <Link to={"/SelectWorkpres"}>
        <button className="back-btn" type="button">
          Boards
        </button>
      </Link>

      <div className="board">
        {columns.map((col, index) => (
          <Column
            key={col.id}
            column={col}
            colIndex={index}
            totalColumns={columns.length}
          />
        ))}
      </div>
    </div>
  );
};
