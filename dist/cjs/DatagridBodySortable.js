"use strict";
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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
var ra_core_1 = require("ra-core");
var ra_ui_materialui_1 = require("ra-ui-materialui");
var react_sortablejs_1 = require("react-sortablejs");
var DatagridTable_1 = __importDefault(require("./DatagridTable"));
var clsx_1 = __importDefault(require("clsx"));
var DatagridBodySortable = function (_a) {
    var children = _a.children, _b = _a.data, data = _b === void 0 ? [] : _b, expand = _a.expand, _c = _a.hasBulkActions, hasBulkActions = _c === void 0 ? false : _c, hover = _a.hover, onToggleItem = _a.onToggleItem, _d = _a.row, row = _d === void 0 ? react_1.default.createElement(ra_ui_materialui_1.DatagridRow, null) : _d, rowClick = _a.rowClick, rowStyle = _a.rowStyle, selectedIds = _a.selectedIds, isRowSelectable = _a.isRowSelectable, orderedBy = _a.orderedBy;
    var _e = (0, react_1.useState)(data), list = _e[0], setList = _e[1];
    var _f = (0, react_1.useState)(0), updatedItems = _f[0], setUpdatedItems = _f[1];
    var resource = (0, ra_core_1.useListContext)().resource;
    var update = (0, ra_core_1.useUpdate)()[0];
    var refresh = (0, ra_core_1.useRefresh)();
    var notify = (0, ra_core_1.useNotify)();
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
    return (react_1.default.createElement(react_sortablejs_1.ReactSortable, { list: list, setList: handleChange, tag: DatagridTable_1.default }, list.map(function (record, rowIndex) {
        var _a;
        var _b, _c;
        return (0, react_1.cloneElement)(row, {
            className: (0, clsx_1.default)(ra_ui_materialui_1.DatagridClasses.row, (_a = {},
                _a[ra_ui_materialui_1.DatagridClasses.rowEven] = rowIndex % 2 === 0,
                _a[ra_ui_materialui_1.DatagridClasses.rowOdd] = rowIndex % 2 !== 0,
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
exports.default = DatagridBodySortable;
//# sourceMappingURL=DatagridBodySortable.js.map