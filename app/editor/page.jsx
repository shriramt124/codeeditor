"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { fetchLanguages, runCode } from "../lib/actions";
import { useRouter } from "next/navigation";
 
const MonacoEditor = dynamic(() => import("@monaco-editor/react"), { ssr: false });

const Editor = () => {
    const router = useRouter(); // For routing
    const [code, setCode] = useState("");
    const [languageId, setLanguageId] = useState(54);  
    const [languages, setLanguages] = useState([]);
    const [stdin, setStdin] = useState("");
    const [output, setOutput] = useState("");
    const [loading, setLoading] = useState(false);  

    useEffect(() => {
        const loadLanguages = async () => {
            try {
                const languagesData = await fetchLanguages();
                setLanguages(languagesData);
            } catch (error) {
                console.error("Error fetching languages:", error);
            }
        };
        loadLanguages();
    }, []);
    
    const runCode = async () => {
        setLoading(true);  
        try {
            const res = await runCode(code, languageId, stdin);
            setOutput(res.stdout || res.stderr || "No output");
        } catch (error) {
            console.error("Error running the code:", error);
            setOutput("Error running the code: " + error.message);
        } finally {
            setLoading(false);  
        }
    };

    return (
        <div className="flex flex-col min-h-screen bg-gray-900 text-white">
            {/* Header */}
            <header className="p-4 bg-gray-800 text-center text-xl font-bold shadow-md flex justify-between items-center">
                <span>Online Code Runner</span>
                <button
                    onClick={() => router.push("/")} // Navigate to home page
                    className="bg-blue-600 hover:bg-blue-700 text-sm font-semibold px-4 py-2 rounded-lg"
                >
                    Go to Home
                </button>
            </header>

            {/* Main Content */}
            <main className="flex flex-col md:flex-row p-4 sm:p-8 gap-6">
                {/* Code Editor Section */}
                <div className="flex-1 flex flex-col bg-gray-800 rounded-lg shadow-lg">
                    <div className="p-4 flex justify-between items-center border-b border-gray-700">
                        <h2 className="text-lg font-semibold">Write Your Code</h2>
                        <select
                            onChange={(e) => setLanguageId(e.target.value)}
                            value={languageId}
                            className="bg-gray-700 text-sm px-3 py-2 rounded-lg border-none focus:outline-none"
                        >
                            {languages.map((lang) => (
                                <option key={lang.id} value={lang.id}>
                                    {lang.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="flex-1 overflow-hidden">
                        <MonacoEditor
                            language={
                                languages.find((lang) => lang.id === parseInt(languageId))?.name.toLowerCase() || "python"
                            }
                            theme="vs-dark"
                            value={code}
                            onChange={(newValue) => setCode(newValue)}
                            options={{ selectOnLineNumbers: true }}
                            className="h-[300px] md:h-[500px] lg:h-[600px]"
                        />
                    </div>
                </div>

                {/* Output Section */}
                <div className="flex-1 flex flex-col bg-gray-800 rounded-lg shadow-lg sm:mt-0 mt-6">
                    <div className="p-4 border-b border-gray-700">
                        <h2 className="text-lg font-semibold">Input & Output</h2>
                    </div>
                    <div className="p-4 flex flex-col gap-4 flex-1">
                        <textarea
                            className="w-full p-3 bg-gray-700 rounded-lg text-sm focus:outline-none resize-none"
                            placeholder="Enter input data (stdin)"
                            value={stdin}
                            onChange={(e) => setStdin(e.target.value)}
                        ></textarea>
                        <button
                            onClick={runCode}
                            disabled={loading}
                            className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-sm font-semibold px-4 py-2 rounded-lg"
                        >
                            {loading ? "Running..." : "Run Code"}
                        </button>
                        <div className="flex-1 bg-gray-700 rounded-lg p-4 overflow-auto">
                            <h3 className="font-semibold mb-2">Output:</h3>
                            <pre className="text-sm whitespace-pre-wrap">{output}</pre>
                        </div>
                    </div>
                </div>
            </main>

        </div>
    );
};

export default Editor;
