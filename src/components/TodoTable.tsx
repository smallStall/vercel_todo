import { DataGrid, GridFilterModel, GridLinkOperator } from "@mui/x-data-grid";
import {
  Typography,
  TextField,
  Box,
  Button,
  Checkbox,
  FormGroup,
  FormControlLabel,
} from "@mui/material";
import { useEffect, useState, useCallback } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import type { Todo } from "../types/todos";
import { NoRowsOverlay } from "../components/NoRowsOverlay";
import { NoResultsOverlay } from "../components/NoResultsOverlay";
import { columns } from "./config/gridConfig";
import { InsertTodoDialog } from "./InsertTodoDialog";
import { UpdateTodoDialog } from "../components/UpdateTodoDialog";
import { useUser } from "@supabase/auth-helpers-react";

export default function TodoTables() {
  const { user } = useUser();
  const [todos, setTodos] = useState<Todo[] | null>(null);
  const [searchStr, setSearchStr] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpired, setIsExpired] = useState(false);
  const [isInsertOpen, setIsInsertOpen] = useState(false);
  const [isUpdateOpen, setIsUpdateOpen] = useState(false);
  const [todo, setTodo] = useState<Todo | null>(null);
  const loadData = useCallback(async () => {
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
      todoテーブルにはSELECTに対しuid() = user_idが設定されています。
      uid()はクライアントのユーザーIDを取得する関数で、user_idはユーザーIDが格納されているカラムです。
      そうすると、SELECTするたびにuser_idがログインしているユーザーと等しい行だけを取得できます。
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
      .is("is_completed", isCompleted)
      .order("expiration");
    if (error) {
      console.error(error.details);
      return;
    }
    //完了済のタスクはかなりのデータ量になる可能性があるので、初めにフォームを読み込んだときには
    //データを取得しないことにしました。
    setTodos(data);
    setIsLoading(false);
  }, [isCompleted]);

  useEffect(() => {
    loadData();
  }, [loadData]); // isCompleted（完了済を表示）が変更されるたびに実行

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

  const strfilterModel: GridFilterModel = {
    items: [
      {
        columnField: "title",
        operatorValue: "contains",
        value: searchStr,
      },
    ],
  };

  return (
    <Box sx={{ height: 400, width: "90%", margin: "2% 5% 2% 5%" }}>
      <Typography variant="h1">TODOリスト</Typography>
      <TextField
        label="タスク検索"
        sx={{ width: "18em" }}
        onChange={(e) => {
          setSearchStr(e.target.value);
        }}
      >
        {searchStr}
      </TextField>
      <FormGroup
        sx={{
          display: "grid",
          gridTemplateColumns: "180px 4fr minmax(130px, 1fr)",
          margin: "20px 20px 10px 20px",
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
        <Button variant="contained" onClick={() => setIsInsertOpen(true)}>
          +タスク追加
        </Button>
      </FormGroup>
      <DataGrid
        //MUI DataGrid API
        //https://mui.com/x/api/data-grid/data-grid/
        //MS Excelに近いことが色々できます
        rows={todos == null ? [] : todos}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        disableSelectionOnClick
        components={{
          NoRowsOverlay: NoRowsOverlay,
          NoResultsOverlay: NoResultsOverlay,
        }}
        loading={isLoading}
        filterModel={isExpired ? filterModel : strfilterModel}
        disableColumnFilter={true}
        onCellClick={(params) => {
          if (typeof params.id !== "string" || !user) {
            return;
          }
          const tempTodo: Todo = {
            id: params.row.id,
            title: params.row.title,
            content: params.row.content,
            user_id: user.id,
            expiration: params.row.expiration,
            is_completed: params.row.is_completed,
          };
          setTodo(tempTodo);
          setIsUpdateOpen(true);
        }}
      />
      <InsertTodoDialog
        open={isInsertOpen}
        onClose={(isOK: boolean) => {
          setIsInsertOpen(false);
          if (isOK) {
            loadData();
          }
        }}
      />
      {todo ? (
        <UpdateTodoDialog
          open={isUpdateOpen}
          todo={todo}
          onClose={(isOK: boolean) => {
            setIsUpdateOpen(false);
            if (isOK) {
              loadData();
            }
          }}
        />
      ) : null}
    </Box>
  );
}
