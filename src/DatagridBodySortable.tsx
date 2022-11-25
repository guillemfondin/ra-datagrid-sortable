import React, { cloneElement, ReactElement, useState } from 'react';
import { useUpdate, useRefresh, useNotify, useListContext } from 'ra-core';
import { DatagridRow, DatagridClasses } from 'ra-ui-materialui';
import { ReactSortable } from "react-sortablejs";
import DatagridTable from "./DatagridTable";
import clsx from "clsx";

const DatagridBodySortable = ({
  children,
  data = [],
  expand,
  hasBulkActions = false,
  hover,
  onToggleItem,
  row = <DatagridRow />,
  rowClick,
  rowStyle,
  selectedIds,
  isRowSelectable,
  orderedBy
}: any): ReactElement => {
  const [list, setList] = useState(data);
  const [updatedItems, setUpdatedItems] = useState(0);

  const { resource } = useListContext();
  const [update] = useUpdate();
  const refresh = useRefresh();
  const notify = useNotify();

  const handleChange = (newList: any[]) => {
    setList(newList);
    newList.map(({id, ...item}, index) => {
      const data = {...item, [orderedBy]: index + 1};

      if (data[orderedBy] === item[orderedBy]) {
        return;
      }

      setUpdatedItems(updatedItems => ++updatedItems);

      return update(
        resource,
        {id, data, previousData: item},
        {
          onSuccess: () => {
            refresh()
            notify('ra.notification.updated', {
              type: 'info',
              messageArgs: { smart_count: updatedItems }
            });
          },
          onError: () => {
            notify('ra.notification.http_error', {
              type: 'warning',
            });
            setList(data);
          },
          onSettled: () => {
            setUpdatedItems(0);
          }
        }
      )
    })
  }

  return (
    <ReactSortable
      list={list}
      setList={handleChange}
      tag={DatagridTable}
    >
      {list.map((record: any, rowIndex: any) =>
        cloneElement(
          row,
          {
            className: clsx(DatagridClasses.row, {
              [DatagridClasses.rowEven]: rowIndex % 2 === 0,
              [DatagridClasses.rowOdd]: rowIndex % 2 !== 0,
            }),
            expand,
            hasBulkActions: hasBulkActions && !!selectedIds,
            hover,
            id: record.id ?? `row${rowIndex}`,
            key: record.id ?? `row${rowIndex}`,
            onToggleItem,
            record,
            resource,
            rowClick,
            selectable: !isRowSelectable || isRowSelectable(record),
            selected: selectedIds?.includes(record.id),
            style: rowStyle ? rowStyle(record, rowIndex) : null,
          },
          children
        )
      )}
    </ReactSortable>
  );
}

export default DatagridBodySortable;
