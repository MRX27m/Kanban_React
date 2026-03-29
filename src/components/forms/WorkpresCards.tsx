import { FC } from "react";

type WorkpresCardsProps = {
  workpresText?: string;
};

export const WorkpresCards: FC<WorkpresCardsProps> = ({ workpresText }) => {
  return (
    <button className="workpres-card" type="button">
      {workpresText}
    </button>
  );
};
