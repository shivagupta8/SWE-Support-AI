/*
import { NextResponse } from "next/server"
export default function POST(req) {
    console.log('POST /api/chat')
    return NextResponse.json({message: 'Hello From The Server!'})

}*/

import {NextResponse} from 'next/server' // Import NextResponse from Next.js for handling responses
import OpenAI from 'openai' // Import OpenAI library for interacting with the OpenAI API

// System prompt for the AI, providing guidelines on how to respond to users
const systemPrompt= "You are a customer support bot for HadStartAI, assisting users with questions about our AI-powered interview platform for software engineering jobs"+ 
"You have information on HadStartAI features, pricing, interview process, and common technical issues."+
"Be professional, helpful, and concise. Use a friendly but not overly casual tone."+
"Help users navigate the platform, Explain how the AI interview processworks, Assist with account-related queries, Provide basic troubleshooting for technical issues"+
"Clearly state when a query is beyond your capabilities and offer to connect the user with human support."+
"Never share personal user information or sensitive company data."+
" When appropriate, inform users about premium features or services that may benefit them."+
"Feedback: Encourage users to rate their experience after each interaction."+
"Escalation: If unable to resolve an issue, offer to create a support ticket for human follow-up."+
"Updates: Stay current on HadStartAI's latest features and communicate any relevant platform changes to users.";

// POST function to handle incoming requests
export async function POST(req) {
  const openai = new OpenAI() // Create a new instance of the OpenAI client
  const data = await req.json() // Parse the JSON body of the incoming request

  // Create a chat completion request to the OpenAI API
  const completion = await openai.chat.completions.create({
    messages: [{role: 'system', content: systemPrompt}, ...data], // Include the system prompt and user messages
    model: 'gpt-4o-mini', // Specify the model to use
    stream: true, // Enable streaming responses
  })

  // Create a ReadableStream to handle the streaming response
  const stream = new ReadableStream({
    async start(controller) {
      const encoder = new TextEncoder() // Create a TextEncoder to convert strings to Uint8Array
      try {
        // Iterate over the streamed chunks of the response
        for await (const chunk of completion) {
          const content = chunk.choices[0]?.delta?.content // Extract the content from the chunk
          if (content) {
            const text = encoder.encode(content) // Encode the content to Uint8Array
            controller.enqueue(text) // Enqueue the encoded text to the stream
          }
        }
      } catch (err) {
        controller.error(err) // Handle any errors that occur during streaming
      } finally {
        controller.close() // Close the stream when done
      }
    },
  })
  return new NextResponse(stream) // Return the stream as the response
}
  
