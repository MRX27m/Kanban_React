import { FC } from "react";
import { Button } from "../buttons/Button";

export type WorkSpaceCardsProps = {
  workpresText: string;
  id: string;
  removeWokSpaceKard: () => void;
};

export const WorkSpaceCards: FC<WorkSpaceCardsProps> = ({
  workpresText,
  id,
  removeWokSpaceKard,
}) => {
  return (
    <button className="workpres-card" type="button">
      {workpresText}
      <Button children="X" className="rm-btn" onClick={removeWokSpaceKard} />
    </button>
  );
};
