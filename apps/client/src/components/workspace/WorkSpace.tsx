import React, { FC, useState, useEffect } from "react";
import { Column } from "./Column";
import { Input } from "../input/Input";
import { Link, useLocation, useParams } from "react-router-dom";
import { Modal } from "../modal/Modal";
import { Button } from "../buttons/Button";
import { useColumnStore } from "../../store/WorkspaceStore";
import { api } from "../../api/api";
import { NavigationEnum } from "../../enum/enums";

export const WorkSpace: FC = () => {
  const location = useLocation();
  const { id } = useParams();

  const boardName = location.state?.name || "Моя дошка";

  const { columns, fetchColumns, addColumn } = useColumnStore();

  const [value, setValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const [memberEmail, setMemberEmail] = useState("");
  const [memberError, setMemberError] = useState("");
  const [memberSuccess, setMemberSuccess] = useState("");
  const [isMemberOpen, setIsMemberOpen] = useState(false);

  useEffect(() => {
    if (id) fetchColumns(id);
  }, [id]);

  const handleAddMember = async () => {
    if (!memberEmail.trim()) return;
    try {
      await api.post(`/boards/${id}/members`, { email: memberEmail });
      setMemberEmail("");
      setMemberError("");
      setMemberSuccess("Учасника додано!");
      setTimeout(() => {
        setMemberSuccess("");
        setIsMemberOpen(false);
      }, 2000);
    } catch (e: any) {
      setMemberSuccess("");
      setMemberError(e?.response?.data?.message || "Користувача не знайдено");
    }
  };

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

      <Modal
        isOpen={isMemberOpen}
        onClose={() => {
          setIsMemberOpen(false);
          setMemberEmail("");
          setMemberError("");
          setMemberSuccess("");
        }}
      >
        <Input
          placeholder="Email учасника"
          value={memberEmail}
          setValue={(v) => {
            setMemberEmail(v);
            setMemberError("");
            setMemberSuccess("");
          }}
          onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") handleAddMember();
          }}
        />
        {memberError && <p className="error-message">{memberError}</p>}
        {memberSuccess && <p className="success-message">{memberSuccess}</p>}
        <Button
          children="Додати"
          className="add-member-btn"
          onClick={handleAddMember}
        />
      </Modal>

      <Button
        children="Add column +"
        className="add-column"
        onClick={() => setIsOpen(true)}
      />

      <Button
        children="+ Учасник"
        className="add-member-button"
        onClick={() => setIsMemberOpen(true)}
      />

      <Link to={NavigationEnum.selectWorkSpace}>
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
