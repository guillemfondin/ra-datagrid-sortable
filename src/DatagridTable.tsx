import React, { forwardRef } from "react";
import { DatagridClasses } from 'ra-ui-materialui';
import { TableBody } from '@mui/material';
import clsx from "clsx";

const DatagridTable = forwardRef<HTMLDivElement, any>(
  (
    {
      children,
      className,
      ...rest
    },
    ref
  ) => (
    <TableBody
      ref={ref}
      className={clsx('datagrid-body', className, DatagridClasses.tbody)}
      {...rest}
    >
      {children}
    </TableBody>
  )
)

DatagridTable.displayName = "DatagridTableRef";

export default DatagridTable;
