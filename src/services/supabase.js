import { createClient } from "@supabase/supabase-js";
// import API_KEY from "./API_KEY";
const API_KEY = import.meta.env.VITE_API_KEY;

export const supabaseUrl = "https://ongwclrnfeefcrlxbgzy.supabase.co";
const supabaseKey = API_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);
// console.log(supabase);

export default supabase;
