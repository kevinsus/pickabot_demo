'use client'

import React from "react";
import axios from "axios";

// Questions:
// 1. How to automatically update to see who is the winner? fetch every 3 secs
// 2. In finals: best of three, is it betting on who is the winner, not winner of the round?

export default function Home() {
  type Match = {
    round: number
    match: number
    matchId: number
    bot1: string
    bot2: string
  }

  const [currentMatch, setCurrentMatch] = React.useState<Match>({
    round: 0,
    match: 0,
    matchId: 0,
    bot1: "",
    bot2: "",
  })
  
  // Fetch matches from server
  const getMacthes = async () => {
    try {
      const response = await axios.get('api/matches')
      console.log(response.data)
      return response.data
    } catch (error) {
      console.error(error)
    }
  }

  const getCurrentMatch = async () => {
    // To get current match:
    // 1. Fetch all matches
    // 2. Filter match.completed_at null
    // 3. Current Match = first object in the array

    const matches = await getMacthes()
    const openMatches = matches.filter((round:any) => round.match.state === "open")
    const currentMatch = openMatches[0].match
    setCurrentMatch({
      round: currentMatch.round, 
      match: currentMatch.suggested_play_order,
      matchId: currentMatch.id,
      bot1: currentMatch.player1_id,
      bot2: currentMatch.player2_id,
    })
  }

  const getWinner = () => {

  }

  const getBot = () => {
    // TODO: 
  }

  // Fetch data every 3 seconds
  React.useEffect(() => {
    getCurrentMatch()

    const intervalId = setInterval(getCurrentMatch, 3000);
    return () => clearInterval(intervalId);
  }, [])

  return (
    <main className="min-h-screen bg-gray-100 w-full flex flex-col py-10 items-center gap-5">      
      <p>Winner: TODO show whose the winner</p>
      
      <div className="mt-10">
        <h3 className="text-lg font-bold">ROUND: {currentMatch.round}</h3>
        <p>Match: {currentMatch.match}</p>
        <p>matchId: {currentMatch.matchId}</p>
        <p>bot1: {currentMatch.bot1}</p>
        <p>bot2: {currentMatch.bot2}</p>
      </div>
    </main>
  );
}
