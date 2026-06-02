import { FC } from "react";
import { Button } from "./ui/Button";

export type WorkSpaceCardsProps = {
  workpresText: string;
  removeWorkspaceCard: () => void;
};

export const WorkSpaceCards: FC<WorkSpaceCardsProps> = ({
  workpresText,
  removeWorkspaceCard,
}) => (
  <button className="workpres-card" type="button">
    {workpresText}
    <Button children="X" className="rm-btn" onClick={removeWorkspaceCard} />
  </button>
);

export default WorkSpaceCards;
