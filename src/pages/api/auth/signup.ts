import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServerClient } from "@supabase/auth-helpers-nextjs"; //https://github.com/supabase-community/auth-helpers/blob/main/packages/nextjs/src/utils/supabaseServerClient.ts
import { SchemaOf } from "yup";
import { signupSchema } from "../../../schema/signupSchema";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body) {
    if ((await validation(signupSchema, req.body)).isValid) {
      const { user, error } = await supabaseServerClient({ req }).auth.signUp({ email: req.body.email, password: req.body.password }, { data: { handle_name: req.body.handleName } });
      if (!user || error) { //TODOどんな状況？
        console.error("supabase signUpエラー")
        return res.status(401).send({ error: 'ユーザー登録できませんでした。' });
      }
      res.status(200).send({});
    }
    else {
      console.error("supabase validationエラー")
      return res.status(401).send({ error: 'ブラウザのJavaScriptを有効にしてください。' });
    }
  }
}

//yup schemaのclient→serverへの流用
//https://github.com/vercel/next.js/discussions/15359
async function validation<T = Record<string, any>>(
  scheme: SchemaOf<T>,
  data: Record<string, any> | null
) {
  try {
    await scheme.validate(data, { abortEarly: false });
    return { isValid: true, errors: null };
  } catch (error) {
    return { isValid: false, error };
  }
}