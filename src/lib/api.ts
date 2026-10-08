export const API_BASE_URL =
    process.env.NEXT_PUBLIC_API_BASE_URL ||
    "https://api.api-store.workers.dev/api/bazardor";

export const fetchWithRevalidate = async <T>(
    endpoint: string,
    revalidate: number = 300
): Promise<T | null> => {
    try {
        const res = await fetch(`${API_BASE_URL}${endpoint}`, {
            next: { revalidate },
        });
        if (!res.ok) return null;
        return await res.json();
    } catch (err) {
        console.error("API Error:", err);
        return null;
    }
};