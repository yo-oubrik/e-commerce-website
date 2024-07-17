import React from "react";

interface ISeparator {
  width?: number;
  custom?: string;
}
export const Separator: React.FC<ISeparator> = ({ width = 30, custom }) => (
  <hr style={{ width: `${width}%` }} className={`my-2 ${custom}`} />
);
