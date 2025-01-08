import axios from "axios";
import { NextResponse } from "next/server";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

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
        return new Response(JSON.stringify(response.data));
    } catch (error) {
        console.error("Error fetching languages:", error);
        return new Response("Failed to fetch languages", { status: 500 });
    }
}

// Post code for execution
export async function POST(request) {
    const { source_code, language_id, stdin } = await request.json();
    console.log(source_code, language_id, stdin, "from post");

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

        // Wait for the submission result with retry mechanism
        const result = await waitForResult(submissionId, options);
        
        const decodedResult = {
            stdout: result.stdout ? Buffer.from(result.stdout, 'base64').toString('utf-8') : null,
            stderr: result.stderr ? Buffer.from(result.stderr, 'base64').toString('utf-8') : null,
            compile_output: result.compile_output ? Buffer.from(result.compile_output, 'base64').toString('utf-8') : null,
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

// Retry mechanism for fetching the result
const waitForResult = async (submissionId, options) => {
    let retries = 5;
    while (retries > 0) {
        try {
            const resultResponse = await axios.get(
                `${options.url}/${submissionId}`,
                {
                    headers: {
                        'x-rapidapi-key': API_KEY,
                        'x-rapidapi-host': 'judge0-ce.p.rapidapi.com',
                    },
                    params: { fields: "*", base64_encoded: 'true' },
                }
            );
            const result = resultResponse.data;

            // Check if result is ready (status.id = 3 indicates completed)
            if (result.status.id === 3) {
                console.log("Execution result ready:", result);
                return result;
            }

            retries--;
            console.log(`Waiting for result... Retries left: ${retries}`);
            await new Promise(res => setTimeout(res, 2000));  // Wait for 2 seconds before retrying
        } catch (error) {
            console.error("Error while waiting for result:", error);
            throw error;
        }
    }
    throw new Error("Timed out while waiting for result.");
};
