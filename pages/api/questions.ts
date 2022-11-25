import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  questions: string[];
};

const API_KEY = process.env.API_KEY;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log(API_KEY);
  console.log("hit questions");



  const response = await axios.post(
    "https://api.langa.me/v1/conversation/starter",
    { topics: req.body.topics, limit: 3 },
    { headers: { "X-Api-Key": API_KEY, 'accept-encoding': '*' } }
  );
  const questions = response.data.results;
  console.log(questions, response.data);

  res.status(200).json({ questions });
}
