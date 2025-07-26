import { createClient } from "@supabase/supabase-js";

const project = process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL as string;
const pub_key = process.env.NEXT_PUBLIC_SUPABASE_AUTH_PUB_KEY as string;

console.log(project, pub_key);

export const supabase = createClient(project, pub_key);
