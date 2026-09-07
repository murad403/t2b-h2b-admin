"use client";

import React, { ReactNode } from "react";

interface PageContainerProps {
  title: string;
  description?: string;
  actions?: ReactNode;
  children: ReactNode;
}

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  description,
  actions,
  children,
}) => {
  return (
    <div className="p-4 sm:p-6 lg:p-8 space-y-6 max-w-[1600px] mx-auto w-full">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold tracking-tight text-title">
            {title}
          </h1>
          {description && (
            <p className="text-xs text-description font-medium mt-1">
              {description}
            </p>
          )}
        </div>

        {actions && <div className="flex items-center gap-3">{actions}</div>}
      </div>

      {/* Main Page Content */}
      <div>{children}</div>
    </div>
  );
};

export default PageContainer;