import axios from "axios";
import { NextResponse } from "next/server";

const tournament = 'ramsoc_demo2'
const matchesLink = `https://api.challonge.com/v1/tournaments/${tournament}/matches.json`
const challongApiKey = process.env.CHALLONGE_API_KEY

export async function GET () {
  // Make requests to challonge server
  try {
    const response = await axios.get(matchesLink, {
        params: {
            api_key: challongApiKey
        }
    })
    
    // How to return response from api route to the client side
    // https://stackoverflow.com/questions/76875479/how-to-return-a-response-from-an-api-route-and-use-it-on-the-client-in-the-app-r
    return NextResponse.json(response.data)
  } catch (error) {
    console.error(error)

    // https://nextjs.org/docs/app/api-reference/functions/next-response
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}