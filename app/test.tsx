'use client'

import React from "react";
import axios from "axios";

// Steps:
// 1. Login
// 2. TASK: Display match {num} and Bot1 vs Bot2    [Display next match <?>]
// 3. Place betting => time's up => see who win
// 4. Update Challonge score
// 5. TASK: fetch who win
// 6. add points if correct
// 7. TASK: Move on to next match

// In finals: best of three, is it betting on who is the winner, not winner of the round?

// Questions:
// 1. How to automatically update to see who is the winner?


export default function Home() {
  type Match = {
    round: number
    matchId: number
    bot1: string
    bot2: string
  }

  const [currentMatch, setCurrentMatch] = React.useState<Match>({
    round: 0,
    matchId: 0,
    bot1: "",
    bot2: "",
  })
  
  // const [nextMatch, setNextMatch] = React.useState<Match>({
  //   round: 0,
  //   matchId: 0,
  //   bot1: "",
  //   bot2: "",
  // })


  // Fetch matches from server
  const getMacthes = async () => {
    try {
      const response = await axios.get('api/matches')
      // console.log(response.data)
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
    const openMatches = matches.filter((round) => round.match.state === "open")
    const currentMatch = openMatches[0].match
    setCurrentMatch({
      round: currentMatch.suggested_play_order, 
      matchId: currentMatch.id,
      bot1: currentMatch.player1_id,
      bot2: currentMatch.player2_id,
      // Question: this round doesn't represent the who won first round etc
    })
  }

  // const getNextMatch = async () => {
  //   const matches = await getMacthes()
  //   const openMatches = matches.filter((round) => round.match.state === "open")

  //   // Check theres next match
  //   console.log(openMatches)
  //   if (openMatches.length > 1) {
  //     const nextMatch = openMatches[1].match
  //     setNextMatch({
  //       round: nextMatch.suggested_play_order,
  //       matchId: nextMatch.id,
  //       bot1: nextMatch.player1_id,
  //       bot2: nextMatch.player2_id,
  //     })
  //   }
  // }

  // Fetch data every 3 seconds
  React.useEffect(() => {
    getCurrentMatch()
    // getNextMatch()

    const intervalId = setInterval(getCurrentMatch, 3000);
    return () => clearInterval(intervalId);
  }, [currentMatch])

  return (
    <main className="min-h-screen bg-gray-100 w-full flex flex-col py-10 items-center gap-5">
      <button className="bg-blue-700 text-white p-5 rounded-xl w-50" onClick={() => getMacthes()}>Get Matches</button>
      <button className="bg-blue-700 text-white p-5 rounded-xl w-50" onClick={() => getCurrentMatch()}>Get Current Matches</button>
      <button className="bg-blue-700 text-white p-5 rounded-xl w-50" onClick={() => getNextMatch()}>Get Next Matches</button>
      <div className="mt-10">
        <h3 className="text-lg font-bold">Current Match</h3>
        <p>ROUND: {currentMatch.round}</p>
        <p>matchId: {currentMatch.matchId}</p>
        <p>bot1: {currentMatch.bot1}</p>
        <p>bot2: {currentMatch.bot2}</p>
      </div>
      {/* <div className="mt-10">
        <h3 className="text-lg font-bold">Next Match</h3>
        <p>ROUND: {currentMatch.round}</p>
        <p>matchId: {nextMatch.matchId}</p>
        <p>bot1: {nextMatch.bot1}</p>
        <p>bot2: {nextMatch.bot2}</p>
      </div> */}
    </main>
  );
}
