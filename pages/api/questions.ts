import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  question: string;
};

const API_KEY = process.env.API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const response = await axios.post(
    "https://api.langa.me/v1/conversation/starter",
    { topics: req.body.topics, limit: 1 },
    { headers: { "X-Api-Key": API_KEY } }
  );
  const conversationStarterText =
    response.data.results[0]?.conversation_starter?.en;

  res.status(200).json({ question: conversationStarterText });
}
