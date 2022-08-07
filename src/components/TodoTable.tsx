import Box from "@mui/material/Box";
import {
  DataGrid,
  GridFilterModel,
  GridLinkOperator,
} from "@mui/x-data-grid";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import Button from "@mui/material/Button";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Todo } from "../types/todos";
import { NoRowsOverlay } from "../components/NoRowsOverlay";
import { NoResultsOverlay } from "../components/NoResultsOverlay";
import { columns } from "./config/gridConfig";

export default function TodoTables() {
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      /*
      下記コードについて
      SupabaseではFirebaseと同様に、クライアント側から直接DBのデータを取得します。
      セキュリティルールはFirebaseと同様にホワイトリスト方式です。
      つまり、セキュリティを有効にした状態でルールを何も書かなければクライアントからは何もできません。
      大きな違いは「何を対象にセキュリティルールを指定するか」です。
      Firebaseではドキュメントにread/writeを指定するのに対し、SupabaseではテーブルのCRUDに対しRow Level Security(RLS)を指定します。
      これはSQLのWHERE句を常時つけるようなイメージです。
      todosテーブルのRLSが有効になっているため、SELECTするだけでuserが絞られたtodosが返ってきます。
      todoテーブルにはSELECTに対しauth.role()='authenticated'が設定されています。
      そうすると、SELECTするたびに認証されたユーザーだけが行を取得できます。
      */
      const { data, error } = await supabaseClient
        .from<Todo>("todos")
        .select("*, users (handle_name)")
        /*
        上記コードについて
        todosテーブルにはusersテーブルとのリレーションシップがあるため、
        select('users (handle_name)')によりusersテーブルのhandle列が自動的に取得できます。
        Postgrestより
        https://postgrest.org/en/stable/api.html#embedding-disambiguation
        */
        .is("is_completed", isCompleted).order('expiration');
      //完了済のタスクはかなりのデータ量になる可能性があるので、初めにフォームを読み込んだときには
      //データを取得しないことにしました。
      setTodos(data);
      setIsLoading(false);
    }
    loadData();
  }, [isCompleted]);

  const filterModel: GridFilterModel = {
    items: [
      {
        columnField: "expiration",
        operatorValue: "expired",
        value: new Date(),
      },
    ],
    linkOperator: GridLinkOperator.And,
  };

  const nonfilterModel: GridFilterModel = {
    items: [],
  };

  return (
    <Box sx={{ height: 400, width: "90%", margin: "2% 5% 2% 5%" }}>
      <Typography variant="h1">TODO</Typography>
      <FormGroup
        sx={{
          display: "grid",
          gridTemplateColumns: "180px 4fr minmax(130px, 1fr)",
          margin: "0 20px 10px 20px",
        }}
      >
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsExpired(event.target.checked);
              }}
            />
          }
          label="期限超過のみ"
        />
        <FormControlLabel
          control={
            <Checkbox
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                setIsCompleted(event.target.checked);
              }}
            />
          }
          label="完了済を表示"
        />
        <Button variant="contained">+タスク追加</Button>
      </FormGroup>
      <DataGrid
        //MUI DataGrid API
        //https://mui.com/x/api/data-grid/data-grid/
        //MS Excelに近いことが色々できます
        rows={todos == null ? [] : todos}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
        disableSelectionOnClick
        components={{
          NoRowsOverlay: NoRowsOverlay,
          NoResultsOverlay: NoResultsOverlay
        }}
        loading={isLoading}
        filterModel={isExpired ? filterModel : nonfilterModel}
        disableColumnFilter={true}
      />
    </Box>
  );
}
