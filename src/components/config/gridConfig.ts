import {
  GridColDef,
  GridFilterOperator,
  GridFilterItem,
  GridCellParams,
} from "@mui/x-data-grid";

//filtering
//https://mui.com/x/react-data-grid/filtering/        
//期日が過ぎているものだけがtrueになる演算子
const isExpiredOperator: GridFilterOperator = {
  label: "期日超過のみ",
  value: "expired",
  getApplyFilterFn: (filterItem: GridFilterItem) => {
    if (
      !filterItem.columnField ||
      !filterItem.value ||
      !filterItem.operatorValue
    ) {
      return null;
    }
    return (params: GridCellParams): boolean => {
      return new Date(params.value) < new Date();
    };
  },
};

/*
GridColDef:
MUI DataGridのカラムに関するAPI
https://mui.com/x/api/data-grid/grid-col-def/
*/
export const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 90, hide: true },
  {
    field: "users",
    headerName: "ユーザー",
    flex: 100,
    //valueGetter
    //https://mui.com/x/react-data-grid/column-definition/#converting-types
    valueGetter: ({ value }) => {
      return value.handle_name;
    },
  },
  {
    field: "title",
    headerName: "タスク",
    flex: 400,
  },
  {
    field: "expiration",
    headerName: "期日",
    sortable: true,
    type: "date",
    width: 250,
    //文字列型になっているため、一度Date型に変換します。
    valueGetter: ({ value }) => {
      return new Date(value);
    },
    filterOperators: [isExpiredOperator],
  },
];
