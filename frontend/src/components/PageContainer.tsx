import React from "react";

interface Props {
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

const PageContainer: React.FC<Props> = ({ title, children }: Props) => {
  return (
    <div>
      <h1>{title}</h1>
      {children}
    </div>
  );
};

export default PageContainer;
