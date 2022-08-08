import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServerClient } from "@supabase/auth-helpers-nextjs"; //https://github.com/supabase-community/auth-helpers/blob/main/packages/nextjs/src/utils/supabaseServerClient.ts
import { signupSchema } from "../../../schema/signupSchema";
import { validationHelper } from "../../../schema/helper";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body) {
    if ((await validationHelper(signupSchema, req.body)).isValid) {
      const { user, error } = await supabaseServerClient({ req }).auth.signUp({ email: req.body.email, password: req.body.password }, { data: { handle_name: req.body.handleName } });
      if (!user || error) {
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