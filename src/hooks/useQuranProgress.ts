import { useState, useEffect } from 'react';
import { QuranData, ProgressState, QuranProgress, ProgressMode } from '../components/quran/types';

// Helper to parse ayah input string into a Set of numbers
export const parseAyahInput = (input: string, totalVerses: number): Set<number> => {
    const completed = new Set<number>();
    const parts = input.split(',').map((p) => p.trim());

    parts.forEach((part) => {
        if (part === 'F' || part === 'f') {
            for (let i = 1; i <= totalVerses; i++) completed.add(i);
        } else if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            if (!isNaN(start) && !isNaN(end)) {
                for (let i = Math.min(start, end); i <= Math.max(start, end); i++) {
                    if (i >= 1 && i <= totalVerses) completed.add(i);
                }
            }
        } else {
            const num = Number(part);
            if (!isNaN(num) && num >= 1 && num <= totalVerses) completed.add(num);
        }
    });

    return completed;
};

// Calculate words and characters for a specific Surah based on completed verses
export const getSurahStats = (surah: any, completedAyahs: Set<number>) => {
    let completedWords = 0;
    let completedChars = 0;
    let totalWords = 0;
    let totalChars = 0;

    surah.verses.forEach((verse: any) => {
        const text = verse.text;
        const words = text.split(/\s+/).length;
        const chars = text.replace(/\s+/g, '').length;

        totalWords += words;
        totalChars += chars;

        if (completedAyahs.has(verse.id)) {
            completedWords += words;
            completedChars += chars;
        }
    });

    return { completedWords, completedChars, totalWords, totalChars };
};

export const useQuranProgress = (quranData: QuranData | null) => {
    const [progress, setProgress] = useState<ProgressState>({
        memorization: {},
        reading: {},
    });

    // Load from localStorage
    useEffect(() => {
        const saved = localStorage.getItem('quranProgress');
        if (saved) {
            try {
                setProgress(JSON.parse(saved));
            } catch (e) {
                console.error('Failed to parse progress', e);
            }
        }
    }, []);

    // Save to localStorage whenever progress changes
    useEffect(() => {
        localStorage.setItem('quranProgress', JSON.stringify(progress));
    }, [progress]);

    const updateProgress = (mode: ProgressMode, surahId: number, value: string) => {
        setProgress((prev) => {
            const nextMode = { ...prev[mode] };
            if (!value) {
                delete nextMode[surahId];
            } else {
                nextMode[surahId] = value;
            }
            return { ...prev, [mode]: nextMode };
        });
    };

    const getOverallStats = (mode: ProgressMode) => {
        if (!quranData) return { words: 0, chars: 0, totalAvg: 0 };

        let completedWords = 0;
        let completedChars = 0;
        // Total constants from original app (or calculated dynamically)
        // Original app says: Words 77,800, Chars 330,709.
        // We can calculate dynamically for accuracy if data is full.
        // Let's calculate dynamically once to be safe or use constants if data is partial.
        // Given we have full json, let's sum it up.

        let totalWords = 0;
        let totalChars = 0;

        quranData.forEach((surah) => {
            const surahProgress = progress[mode][surah.id] || '';
            const completedAyahs = parseAyahInput(surahProgress, surah.total_verses);
            const stats = getSurahStats(surah, completedAyahs);

            completedWords += stats.completedWords;
            completedChars += stats.completedChars;
            totalWords += stats.totalWords;
            totalChars += stats.totalChars;
        });

        if (totalWords === 0) return { words: 0, chars: 0, totalAvg: 0 };

        const wordPct = (completedWords / totalWords) * 100;
        const charPct = (completedChars / totalChars) * 100;

        return {
            words: wordPct,
            chars: charPct,
            totalAvg: (wordPct + charPct) / 2,
        };
    };

    const importProgress = (data: ProgressState) => {
        setProgress(data);
    };

    return { progress, updateProgress, getOverallStats, importProgress };
};
