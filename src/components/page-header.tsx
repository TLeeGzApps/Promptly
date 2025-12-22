import type { FC, PropsWithChildren } from "react";

type PageHeaderProps = {
  title: string;
  description: string;
};

export const PageHeader: FC<PropsWithChildren<PageHeaderProps>> = ({
  title,
  description,
  children,
}) => {
  return (
    <div className="mb-8">
      <h1 className="text-2xl font-bold tracking-tight font-headline md:text-3xl">
        {title}
      </h1>
      <p className="mt-2 text-muted-foreground">{description}</p>
      {children}
    </div>
  );
};
