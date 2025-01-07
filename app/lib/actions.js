export const fetchLanguages = async () => {
    const response = await fetch("/api/code");
    if (!response.ok) {
        throw new Error("Failed to fetch languages");
    }
    return response.json();
};

export const runCode = async (source_code, language_id, stdin) => {
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
    if (!response.ok) {
        throw new Error("Failed to run code");
    }
    return response.json();
};
