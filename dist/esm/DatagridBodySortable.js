var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { cloneElement, useState } from 'react';
import { useUpdate, useRefresh, useNotify, useListContext } from 'ra-core';
import { DatagridRow, DatagridClasses } from 'ra-ui-materialui';
import { ReactSortable } from "react-sortablejs";
import DatagridTable from "./DatagridTable";
import clsx from "clsx";
var DatagridBodySortable = function (_a) {
    var children = _a.children, _b = _a.data, data = _b === void 0 ? [] : _b, expand = _a.expand, _c = _a.hasBulkActions, hasBulkActions = _c === void 0 ? false : _c, hover = _a.hover, onToggleItem = _a.onToggleItem, _d = _a.row, row = _d === void 0 ? React.createElement(DatagridRow, null) : _d, rowClick = _a.rowClick, rowStyle = _a.rowStyle, selectedIds = _a.selectedIds, isRowSelectable = _a.isRowSelectable, orderedBy = _a.orderedBy;
    var _e = useState(data), list = _e[0], setList = _e[1];
    var _f = useState(0), updatedItems = _f[0], setUpdatedItems = _f[1];
    var resource = useListContext().resource;
    var update = useUpdate()[0];
    var refresh = useRefresh();
    var notify = useNotify();
    var handleChange = function (newList) {
        setList(newList);
        newList.map(function (_a, index) {
            var _b;
            var id = _a.id, item = __rest(_a, ["id"]);
            var data = __assign(__assign({}, item), (_b = {}, _b[orderedBy] = index + 1, _b));
            if (data[orderedBy] === item[orderedBy]) {
                return;
            }
            setUpdatedItems(function (updatedItems) { return ++updatedItems; });
            return update(resource, { id: id, data: data, previousData: item }, {
                onSuccess: function () {
                    refresh();
                    notify('ra.notification.updated', {
                        type: 'info',
                        messageArgs: { smart_count: updatedItems }
                    });
                },
                onError: function () {
                    notify('ra.notification.http_error', {
                        type: 'warning',
                    });
                    setList(data);
                },
                onSettled: function () {
                    setUpdatedItems(0);
                }
            });
        });
    };
    return (React.createElement(ReactSortable, { list: list, setList: handleChange, tag: DatagridTable }, list.map(function (record, rowIndex) {
        var _a;
        var _b, _c;
        return cloneElement(row, {
            className: clsx(DatagridClasses.row, (_a = {},
                _a[DatagridClasses.rowEven] = rowIndex % 2 === 0,
                _a[DatagridClasses.rowOdd] = rowIndex % 2 !== 0,
                _a)),
            expand: expand,
            hasBulkActions: hasBulkActions && !!selectedIds,
            hover: hover,
            id: (_b = record.id) !== null && _b !== void 0 ? _b : "row".concat(rowIndex),
            key: (_c = record.id) !== null && _c !== void 0 ? _c : "row".concat(rowIndex),
            onToggleItem: onToggleItem,
            record: record,
            resource: resource,
            rowClick: rowClick,
            selectable: !isRowSelectable || isRowSelectable(record),
            selected: selectedIds === null || selectedIds === void 0 ? void 0 : selectedIds.includes(record.id),
            style: rowStyle ? rowStyle(record, rowIndex) : null,
        }, children);
    })));
};
export default DatagridBodySortable;
//# sourceMappingURL=DatagridBodySortable.js.map