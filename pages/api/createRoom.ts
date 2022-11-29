import {supabase} from './../../lib/supabase'
import type { NextApiRequest, NextApiResponse } from "next";
import { PostgrestError} from '@supabase/supabase-js';
type Data = {
  room: number;
  users: string[];
  ok: boolean;
};
function generate(n: number): number {
  var add = 1, max = 12 - add;   // 12 is the min safe number Math.random() can generate without it starting to pad the end with zeros.   
  if ( n > max ) {
          return generate(max) + generate(n - max);
  }
  max = Math.pow(10, n+add);
  var min = max/10; // Math.pow(10, n) basically
  var number = Math.floor( Math.random() * (max - min + 1) ) + min;
  return number
}
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | any>
) {
  console.log("hit create room");
  try {
  const roomNumber = generate(6)
  const { data: roomData, error } = await supabase.from('room').insert([{ room_id: roomNumber, max_users: 8, live: true}]).select()
  if(error) {
    throw error
  }
  const room_id = roomData && roomData[0].id as any
  const room = roomData && roomData[0].room_id as any
  const { data, error: addUserError } = await supabase
  .from('users')
  .insert([
    { room_id, user_name: req.body.user,}
  ]).select()
  console.log("user data ",data)
  if(addUserError) {
throw addUserError
  }
  res.status(200).json({ok: true, room: roomNumber,id: room_id});
}
catch(e) {

  return res
    .status(500)
    .send({ ok: false, error: e });
}
}

