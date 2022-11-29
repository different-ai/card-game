import { useState, useEffect} from "react";
import {Input} from './../components/Input'
import { CardCounter } from "../components/CardCounter";
import CardList from "../components/CardList";
import CheckoutForm from "../components/CheckoutForm";
import { Header } from "../components/Header";
import { Pattern2 } from "../components/Pattern2";
import { PrimaryButton } from "../components/PrimaryButton";
import { QuestionGenerator } from "../components/QuestionGenerator";
import axios from "axios";
import { supabase } from "../lib/supabase";

export const navigation = [
  { name: "FAQ", href: "/faq" },
  { name: "Your Deck", href: "/deck" },
];


export default function game() {
  
  const[currentRoom,setRoom] = useState(null)
  const[currentJoinRoom,setJoinRoom] = useState('')
  const[users,setUsers] = useState(null)
  const[roomId,setRoomId] = useState(null)
  const[userName,setName] = useState('')
  const[error, setError] = useState(null)
  const createRoom = async () => {
    const res = await axios.post("/api/createRoom", { user: userName });
    if(res.status === 200) {
setRoom(res.data.room)
setUsers(res.data.users)
setRoomId(res.data.id)
    }
}
const joinRoom = async () => {
  const roomNumber = parseInt(currentJoinRoom)
  const res = await axios.post("/api/joinRoom", { user: userName, room: roomNumber});
  if(res.status === 200) {
    console.log("REs",res.data)
setRoom(res.data.room)
setUsers(res.data.users)
setRoomId(res.data.id)
  }
  else if(res.status === 304) {
    setError(res.data.message)
  }
}
const setupUsers = async (id) => {
  supabase
  .channel(`public:users:room_id=eq.${id}`)
  .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'users', filter: `room_id=eq.${id}` }, (payload => {
    setUsers([...users,payload.new.user_name])
    console.log("payload",payload)
  }))
  .subscribe((status) => {
    console.log("STATUS IS ",status)
  })
}

useEffect(() => {
 if(roomId) {
  setupUsers(roomId);
 }
},[roomId])
  return (
    <div className="relative overflow-hidden bg-white">
      <Pattern2 />

      <div className="relative pt-6 pb-16 sm:pb-24 lg:pb-32">
        <Header />
        <main className="mx-auto mt-16 max-w-7xl px-4 sm:mt-24 sm:px-6 lg:mt-32">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:mx-auto md:max-w-2xl lg:col-span-10 lg:text-left">
              <h1>
                <span className="mt-1 block text-4xl font-bold tracking-tight sm:text-5xl xl:text-6xl">
                  <span className="block text-indigo-600">AI-generated </span>
                  <span className="block text-gray-900">
                    conversation card game to enjoy with your friends & family
                  </span>
                </span>
              </h1>
              { !currentRoom ?
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              Create a room!
              </p> :   <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
              You are in {currentRoom}!
              </p>
} {error &&  <p className="mt-3 text-base text-red-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
             {error}
              </p>}
              { users &&
              <p className="mt-3 text-base text-gray-600 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                {users.join()}
              </p> 
}
              <div className="mt-8 sm:mx-auto sm:max-w-lg sm:text-center lg:mx-0 lg:text-left">
              <Input
              className="min-h-[4rem] max-w-[20rem] mb-2"
              placeholder="Enter username here"
              value={userName}
        onChange={(e) => setName(e.target.value)}
            
            />
            
              <PrimaryButton onClick={() => createRoom()}>Create room</PrimaryButton>
              
             
              </div>
              <PrimaryButton className="my-2" onClick={() => joinRoom()}>Join room</PrimaryButton>
              <Input
              className="min-h-[4rem] max-w-[20rem] mb-2 items-center"
              type="text" 
              pattern="\d*" 
              maxlength="8"
              placeholder="Enter room number to join here"
              value={currentJoinRoom}
        onChange={(e) => setJoinRoom(e.target.value)}
            
            />
            </div>

          </div>
        </main>
      </div>
    </div>
  );
}