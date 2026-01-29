export interface Verse {
    id: number;
    text: string;
}

export interface Surah {
    id: number;
    name: string;
    transliteration: string;
    type: 'meccan' | 'medinan';
    total_verses: number;
    verses: Verse[];
}

export type QuranData = Surah[];

export interface QuranProgress {
    [surahId: string]: string; // "F" for full, or "1-5, 10-12" for ranges
}

export interface ProgressState {
    memorization: QuranProgress;
    reading: QuranProgress;
}

export interface SurahStats {
    totalVerses: number;
    completedVerses: number;
    completedWords: number;
    completedChars: number;
    totalWords: number;
    totalChars: number;
    isCompleted: boolean;
}

export type ProgressMode = 'memorization' | 'reading';
