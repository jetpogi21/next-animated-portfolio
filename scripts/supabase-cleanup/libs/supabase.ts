import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";
config();

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceRoleKey) {
  throw new Error("Supabase URL or service role key is not set");
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey);

export const deleteUserByEmail = async (email: string) => {
  const user = await getUserByEmail(email);

  if (!user) {
    return null;
  }

  const { data, error } = await supabase.auth.admin.deleteUser(user.id);

  if (error) {
    return null;
  }

  return data;
};

export const getUserByEmail = async (email: string) => {
  const response = await supabase.from("users").select("*");
  const data = response.data as { email: string; id: string }[];
  const error = response.error;

  if (error) {
    return null;
  }

  return data.find((user) => user.email === email);
};

export const createOwnerUser = async () => {
  const email = "jet_pradas@yahoo.com";
  const password = process.env.MY_SUPABASE_PASSWORD;

  const { data, error } = await supabase.auth.admin.createUser({
    email,
    password,
    email_confirm: true,
  });

  if (error) {
    return null;
  }

  // Get the id of the admin role in custom_roles table
  const { data: ownerRole, error: ownerRoleError } = await supabase
    .from("custom_roles")
    .select("id")
    .eq("role_name", "owner");

  if (ownerRoleError) {
    throw ownerRoleError;
  }

  //Update the public.users's custom_role_id with the admin role id
  const { data: user, error: userError } = await supabase
    .from("users")
    .update({ custom_role_id: ownerRole[0].id })
    .eq("email", email);

  if (userError) {
    throw userError;
  }

  return data;
};
