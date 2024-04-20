import { NextApiRequest, NextApiResponse } from "next";
import { createClient } from "@supabase/supabase-js";
export const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
};

export const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const { data, error } = await supabase.from("messages").select("*");
  if (error) {
    return res.status(500).json({ error: error.message });
  }
  return res.status(200).json({ data });
};
