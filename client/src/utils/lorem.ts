declare global {
    interface Window {
        _loremCache?: string[];
    }
}

export async function getLoremCached(paragraphs: number = 1): Promise<string> {
    if (!window._loremCache) {
        try {
            const url = `https://baconipsum.com/api/?type=meat-and-filler&paras=5&format=text`;
            const res = await fetch(url);
            if (res.ok) {
                window._loremCache = (await res.text()).split("\n");
            }
        } catch (err) {
            console.warn("Bacon Ipsum API failed. Using fallback", err);
            window._loremCache = [
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
                "Praesent commodo cursus magna.",
                "Donec ullamcorper nulla non metus auctor fringilla."
            ];
        }
    }

    const cache = window._loremCache!;
    return cache.slice(0, paragraphs).join(" ");
}