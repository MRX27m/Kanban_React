import { FC, useState } from "react";
import "./styles/styles.css";
import { WorkpresCards } from "./WorkpresCards";
import { AddWorkpres } from "../buttons/AddWorkpres";
import { WorkpresInput } from "../input/WorkpresInput";
import { Route, BrowserRouter, Link, Routes } from "react-router-dom";

export type WorkpresProps = {
  data: string;
  columnName: string;
};

export type StoreWorkpres = {
  name: string;
  id: string;
};

export const SelectWorkpres: FC<StoreWorkpres> = ({ name }) => {
  const [workpres, setWorkpres] = useState<StoreWorkpres[]>([
    { name: "Kanban board", id: crypto.randomUUID() },
  ]);
  const [value, setValue] = useState("");

  const addToWorkpres = () => {
    if (!value.trim()) return;

    setWorkpres((prev) => [...prev, { name: value, id: crypto.randomUUID() }]);
    setValue("");
  };

  return (
    <div>
      <h1 className="title">Виберіть дошку</h1>
      <div className="workpres-board">
        <WorkpresInput
          setValue={setValue}
          value={value}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              addToWorkpres();
            }
          }}
        />

        <AddWorkpres onClick={addToWorkpres} />

        {workpres.map((wp) => (
          <Link
            key={wp.id}
            to={`/workpres/${wp.id}`}
            state={{ name: wp.name }}
            style={{ textDecoration: "none" }}
          >
            <WorkpresCards workpresText={wp.name} />
          </Link>
        ))}
      </div>
    </div>
  );
};
