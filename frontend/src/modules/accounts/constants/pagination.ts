import TableActionButtons from "../components/TableActionButtons";

export const pagination = true;
export const paginationPageSize = 10;
export const paginationPageSizeSelector = [10, 50, 100];

export const paginationColDefsInitialState = [
  {
    field: "ownerId",
    filter: true,
    flex: 1,
  },
  {
    field: "currency",
    filter: true,
    flex: 1,
  },
  {
    field: "balance",
    filter: true,
    flex: 1,
  },
  {
    field: "actions",
    filter: false,
    cellRenderer: TableActionButtons,
    flex: 1,
  },
];
