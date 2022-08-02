import { NextApiRequest, NextApiResponse } from "next";
import { supabaseServer } from "../../../libs/supabaseServer";
import { SchemaOf } from "yup";
import { signupSchema } from "../../../schema/signupSchema";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.body) {
    if ((await validation(signupSchema, req.body)).isValid) {
      const { user, error } = await supabaseServer.auth.signUp({ email: req.body.email, password: req.body.password })
      if (!user || error) {
        console.error("supabase signUpエラー")
        return res.status(401).send({ error: 'ユーザー登録できません。すでに登録していませんか？' });
      }
      res.status(200).send({});
    }
    else {
      console.error("supabase validationエラー")
      return res.status(401).send({ error: 'ブラウザのJavaScriptを有効にしてください。' });
    }
  }
  //supabaseClient.auth.api.setAuthCookie(req, res);
}

//yup schemaの流用
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