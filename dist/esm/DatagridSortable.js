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
import * as React from 'react';
import DatagridBodySortable from "./DatagridBodySortable";
import { Datagrid } from "ra-ui-materialui";
var DatagridSortable = function (props) { return React.createElement(Datagrid, __assign({}, props, { body: React.createElement(DatagridBodySortable, __assign({}, props)) })); };
export default DatagridSortable;
//# sourceMappingURL=DatagridSortable.js.map