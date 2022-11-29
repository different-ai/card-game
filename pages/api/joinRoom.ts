import {supabase} from '../../lib/supabase'
import type { NextApiRequest, NextApiResponse } from "next";
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
  console.log("hit join room",req.body);
  try {
  const { data: roomData, error } = await supabase
  .from('room').select().eq('room_id',req.body.room).eq('live',true)
  if(error) {
throw error
  }
  const { data: userData, error: usersError } = await supabase
  .from('users').select().eq('room_id',roomData[0].id)
 
  if(usersError) {
    throw usersError
      }
      const found = userData.some(user => user.user_name === req.body.user);
    if(found) {
      return res
    .status(304)
    .send({ ok: false, message: "The selected username for this room already exists, please choose another one." });
    }
  const { data: usersData, error: addUserError } = await supabase
  .from('users')
  .insert([
    { room_id: roomData[0].id, user_name: req.body.user,}
  ])
  if(addUserError) {
    throw addUserError
      }
  res.status(200).json({ok: true,room: req.body.room,users:[...userData.map(user => user.user_name),req.body.user], id: roomData[0].id});
}
catch(e) {
  return res
    .status(500)
    .send({ ok: false, error: e });
}
}

