import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");
  if (error) {
    console.error(error);
    throw new Error("Couldn't load cabins data");
  }
  return data;
}

export async function deleteCabin(id) {
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) throw new Error("Couldn't delete cabin");
  return data;
}

export async function creatEditCabin(newCabin, id) {
  const hasImage = newCabin.image?.startsWith?.(supabaseUrl);

  const imageName = `${Math.random()}-${newCabin.image.name}`.replaceAll(
    "/",
    ""
  );

  const imageURL = hasImage
    ? newCabin.image
    : `${supabaseUrl}/storage/v1/object/public/cabinImages/${imageName}`;
  // https://ongwclrnfeefcrlxbgzy.supabase.co/storage/v1/object/public/cabinImages//cabin-001.jpg

  let query = supabase.from("cabins");

  // 1.CREATE CABIN
  // if no such cabin id exits, creates new 1
  if (!id) query = query.insert([{ ...newCabin, image: imageURL }]);

  // 2.EDIT CABIN
  //if id exits update
  if (id)
    query = query
      .update({ ...newCabin, image: imageURL })
      .eq("id", id)
      .select();

  const { data, error } = await query.select().single();

  // if error in creating cabin
  if (error) throw new Error("Couldn't create cabin");

  // 3.UPLOAD IMG
  // if hasimg return early data
  if (hasImage) return data;

  // uploading image to storage bucket from our local machine
  const { error: storageError } = await supabase.storage
    .from("cabinImages")
    .upload(imageName, newCabin.image);
  // if error in uploading cabin image to storage
  if (storageError) {
    await supabase.from("cabins").delete().eq("id", data.id);
    throw new Error("There's no cabin image provided!, Couldn't create cabin");
  }

  return data;
}
