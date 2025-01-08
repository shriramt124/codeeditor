export const fetchLanguages = async () => {
    const response = await fetch("/api/code");
    const data = await response.json();
    if (!response.ok) {
        throw new Error("Failed to fetch languages");
    }
    return data;
};

export const executeCode = async (source_code, language_id, stdin) => {
    console.log(source_code, language_id, stdin);
    const response = await fetch("/api/code", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            source_code,
            language_id,
            stdin,
        }),
    });

    // Parse the response once here
    const data = await response.json();
    console.log(data);

    if (!response.ok) {
        throw new Error("Failed to run code");
    }

    return data; // Return the parsed data instead of calling response.json() again
};

