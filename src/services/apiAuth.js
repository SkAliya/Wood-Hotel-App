import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

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

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  // const { data, error } = await supabase
  //   .from("auth.users")
  //   .select("*")
  //   .eq("id", session.user.id)
  //   .single();

  if (error) throw new Error("There is no user logged");

  return data?.user;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}

export async function updateCurrentUser({ password, fullName, avatar }) {
  console.log(avatar);
  let updateField;
  if (fullName) updateField = { data: { fullName } };
  if (password) updateField = { password };

  // 1.update user data based on filed
  const { data, error } = await supabase.auth.updateUser(updateField);
  if (!avatar) return data;

  if (error) throw new Error(error.message);

  // 2.upload avatar to storage bucket avatars
  let fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error: storageError } = await supabase.storage
    .from("avatar")
    .upload(fileName, avatar);
  // .upload(fileName, avatar, { upsert: true }); orverde existing 1
  if (storageError) throw new Error(storageError.message);

  // 3.update the avatar of currentuser
  const { data: updatedData, error: error2 } = await supabase.auth.updateUser({
    data: {
      avatar: `${supabaseUrl}/storage/v1/object/public/avatar/${fileName}`,
    },
  });
  if (error2) throw new Error(error2.message);

  return updatedData;
}
