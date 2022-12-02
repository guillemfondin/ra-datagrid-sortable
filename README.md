# ra-datagrid-sortable

Drag'n'drop sortable datagrid for [react-admin](https://github.com/marmelab/react-admin) base on  [react-sortablejs](https://github.com/SortableJS/react-sortablejs)

## Installation

```shell
npm install ra-datagrid-sortable

// or

yarn add ra-datagrid-sortable
```

## Usage

```tsx
import React, { FC } from 'react';
import { TextField, List } from "react-admin";
import { DatagridSortable } from "ra-datagrid-sortable";

const MyResourceList = (): FC => {
  return (
    <List>
      <DatagridSortable orderedBy={'order'}>
        <TextField source={'id'} />
        <TextField source={'foo'} />
        <TextField source={'bar'} />
      </DatagridSortable>
    </List>
  );
}

export default MyResourceList;

```
