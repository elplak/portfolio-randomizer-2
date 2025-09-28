const API_BASE = "http://localhost:4000";

export async function getRandomText(): Promise<string> {
    const res = await fetch(`${API_BASE}/api/texts`);
    if (!res.ok) {
        throw new Error("Failed to fetch text");
    }
    const data = await res.json();
    const text = typeof data.text === "string" ? data.text.trim() : undefined;
    if (!text) {
        throw new Error("Backend did not return a valid text string");
    }
    return text;
}

export async function getRandomImage(width: number, height: number): Promise<string> {
    const res = await fetch(`${API_BASE}/api/images?width=${width}&height=${height}`);
    if (!res.ok) {
        throw new Error("Failed to fetch image");
    }
    const data = await res.json();
    const url = typeof data.url === "string" ? data.url.trim() : undefined;
    if (!url) {
        throw new Error("Backend did not return a valid url string");
    }

    return encodeURI(url);
}