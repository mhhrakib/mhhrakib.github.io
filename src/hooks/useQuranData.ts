import { useState, useEffect } from 'react';
import { QuranData } from '../components/quran/types';

interface UseQuranDataResult {
    data: QuranData | null;
    loading: boolean;
    error: string | null;
}

// Global cache to prevent re-fetching
let cachedData: QuranData | null = null;
let fetchPromise: Promise<QuranData> | null = null;

export const useQuranData = (): UseQuranDataResult => {
    const [data, setData] = useState<QuranData | null>(cachedData);
    const [loading, setLoading] = useState<boolean>(!cachedData);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (cachedData) {
            setData(cachedData);
            setLoading(false);
            return;
        }

        if (!fetchPromise) {
            fetchPromise = fetch('/quran-optimized.json')
                .then((res) => {
                    if (!res.ok) throw new Error('Failed to load Quran data');
                    return res.json();
                })
                .then((data) => {
                    cachedData = data;
                    return data;
                });
        }

        fetchPromise
            .then((data) => {
                setData(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    return { data, loading, error };
};
