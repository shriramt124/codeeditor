import axios from "axios";
import { NextResponse } from "next/server";
const JUDGE0_API_URL = process.env.JUDGE0_API_URL;
const API_KEY = process.env.API_KEY;

// Get all supported languages
export async function GET() {
    const options = {
        method: 'GET',
        url: 'https://judge0-ce.p.rapidapi.com/languages',
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com'
        }
    };
    try {
        const response = await axios.request(options);
        //console.log(response.data);
        return new Response(JSON.stringify(response.data));
    } catch (error) {
        console.log(error)
        return new Response("Failed to fetch languages", { status: 500 });
    }
}
// Post code for execution
export async function POST(request) {
    const { source_code, language_id, stdin } = await request.json();
    // console.log(data);
//     const sourceCode = `#include <stdio.h>
 
// int main(void) {
//   char name[10];
//   scanf("%s", name);
//   printf("hello, %s\\n", name);
//   return 0;
// }`;

    // const stdin = "world"; 
    const sourceCode = source_code;

    const options = {
        method: 'POST',
        url: 'https://judge0-ce.p.rapidapi.com/submissions',
        params: { fields: '*', base64_encoded: 'true' },  
        headers: {
            'x-rapidapi-key': API_KEY,
            'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
            'Content-Type': 'application/json'
        },
        data: {
            source_code: Buffer.from(sourceCode).toString('base64'),  
            language_id: language_id,  
            stdin: Buffer.from(stdin).toString('base64')  
        }
    };

    try {
        const submissionResponse = await axios.request(options);
        const submissionId = submissionResponse.data.token;

        // Wait for the submission result
        const resultResponse = await axios.get(
            `${options.url}/${submissionId}`,
            {
                headers: {
                    'x-rapidapi-key': API_KEY,
                    'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                },
                params: { fields: "*", base64_encoded: 'true' }, // Keep Base64 encoding
            }
        );

        const result = resultResponse.data;

        // Decode Base64 fields to human-readable format
        const decodedResult = {
            stdout: result.stdout ? Buffer.from(result.stdout, 'base64').toString('utf-8') : null,
            stderr: result.stderr ? Buffer.from(result.stderr, 'base64').toString('utf-8') : null,
            compile_output: result.compile_output
                ? Buffer.from(result.compile_output, 'base64').toString('utf-8')
                : null,
            status: result.status,
            time: result.time,
            memory: result.memory,
        };

        console.log("Decoded Result:", decodedResult); // Log human-readable result
        return new Response(JSON.stringify(decodedResult));
    } catch (error) {
        console.error("Error executing code:", error.response ? error.response.data : error.message);
        return new Response("Error executing code", { status: 500 });
    }
}
