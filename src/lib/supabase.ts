import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://wvkdkobsyoiaxzeglfla.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable__uJDlisDzOjBxaaqwJ08vw_18Sx3iAB";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
