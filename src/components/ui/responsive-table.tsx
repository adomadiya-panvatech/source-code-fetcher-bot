
import * as React from "react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const ResponsiveTable = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => {
  const isMobile = useIsMobile();
  
  return (
    <div
      ref={ref}
      className={cn(
        "relative w-full",
        isMobile ? "overflow-visible" : "overflow-auto",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});
ResponsiveTable.displayName = "ResponsiveTable";

const ResponsiveTableContent = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => {
  const isMobile = useIsMobile();
  
  return (
    <table
      ref={ref}
      className={cn(
        "w-full caption-bottom text-sm",
        isMobile && "hidden", // Hide table on mobile, use cards instead
        className
      )}
      {...props}
    />
  );
});
ResponsiveTableContent.displayName = "ResponsiveTableContent";

const ResponsiveTableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <thead ref={ref} className={cn("[&_tr]:border-b", className)} {...props} />
));
ResponsiveTableHeader.displayName = "ResponsiveTableHeader";

const ResponsiveTableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn("[&_tr:last-child]:border-0", className)}
    {...props}
  />
));
ResponsiveTableBody.displayName = "ResponsiveTableBody";

const ResponsiveTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted",
      className
    )}
    {...props}
  />
));
ResponsiveTableRow.displayName = "ResponsiveTableRow";

const ResponsiveTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
ResponsiveTableHead.displayName = "ResponsiveTableHead";

const ResponsiveTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement>
>(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn("p-4 align-middle [&:has([role=checkbox])]:pr-0", className)}
    {...props}
  />
));
ResponsiveTableCell.displayName = "ResponsiveTableCell";

// Mobile card view for table data
const ResponsiveTableCards = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & {
    data: any[];
    renderCard: (item: any, index: number) => React.ReactNode;
  }
>(({ className, data, renderCard, ...props }, ref) => {
  const isMobile = useIsMobile();
  
  if (!isMobile) return null;
  
  return (
    <div
      ref={ref}
      className={cn("space-y-4 lg:hidden", className)}
      {...props}
    >
      {data.map((item, index) => renderCard(item, index))}
    </div>
  );
});
ResponsiveTableCards.displayName = "ResponsiveTableCards";

export {
  ResponsiveTable,
  ResponsiveTableContent,
  ResponsiveTableHeader,
  ResponsiveTableBody,
  ResponsiveTableRow,
  ResponsiveTableHead,
  ResponsiveTableCell,
  ResponsiveTableCards,
};
