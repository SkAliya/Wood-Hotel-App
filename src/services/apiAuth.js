import supabase from "./supabase";

async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error("Invalid email or password");
  console.log(data);
  return data;
}

export default login;
