import { SchemaOf } from "yup";

//yup schemaのclient→serverへの流用
//https://github.com/vercel/next.js/discussions/15359
export async function validationHelper<T = Record<string, any>>(
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