import * as React from 'react';
import DatagridBodySortable from "./DatagridBodySortable";
import { Datagrid, DatagridProps } from "ra-ui-materialui";

const DatagridSortable = (props: DatagridSortableProps) => <Datagrid {...props} body={<DatagridBodySortable {...props} />} />

export interface DatagridSortableProps extends DatagridProps {
  orderedBy: string;
}

export default DatagridSortable;
