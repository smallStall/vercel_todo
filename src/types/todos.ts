import type { definitions } from "../types/tables"; //Supabaseから引っ張ってきたテーブル等の定義

export type Todo = definitions["todos"]

//timestampがstring型になっているため注意 