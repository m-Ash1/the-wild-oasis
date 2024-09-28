import supabase, { supabaseUrl } from "./supabase";

export async function signUp({ email, password, fullName }) {
  let { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) {
    throw new Error(error.message);
  }

  return { data, error };
}

export async function login({ email, password }) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function logout() {
  let { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(error.message);
  }
}

export async function updateUser({ password, fullName, avatar }) {
  // Update the user's data
  const updateData = password
    ? { password }
    : fullName && !avatar
    ? { data: { fullName } }
    : avatar
    ? { data: { fullName, avatar } }
    : null;

  const { data, error: updateError } = await supabase.auth.updateUser(
    updateData
  );

  if (updateError) {
    throw new Error(updateError.message);
  }

  if (!avatar) return data;
  // Upload the avatar image
  const fileName = `avatar-${data.user.id}-${Math.random()}`;
  const { error } = await supabase.storage
    .from("avatars")
    .upload(fileName, avatar);

  if (error) {
    throw new Error(error.message);
  }

  // Update the user's avatar

  const { data: updatedUser, error: avatarError } =
    await supabase.auth.updateUser({
      data: {
        avatar: `${supabaseUrl}/storage/v1/object/public/avatars/${fileName}`,
      },
    });

  if (avatarError) {
    throw new Error(avatarError.message);
  }

  return updatedUser;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  return data.user;
}

export async function getUsers() {
  let { data, error } = await supabase.from("profiles").select("*");
  if (error) {
    throw new Error(error.message);
  }

  return data;
}
