"use client";

import React, { useState } from 'react';
import styles from './QuranCalculator.module.css';
import { useQuranData } from '../../hooks/useQuranData';
import { useQuranProgress } from '../../hooks/useQuranProgress';
import { HelpSection } from './HelpSection';
import { StatsOverview } from './StatsOverview';
import { SurahCard } from './SurahCard';
import { ProgressMode } from './types';

export const QuranCalculator: React.FC = () => {
    const { data: quranData, loading, error } = useQuranData();
    const { progress, updateProgress, getOverallStats } = useQuranProgress(quranData);
    const [mode, setMode] = useState<ProgressMode>('memorization');

    if (loading) return <div className={styles.loading}>Loading Quran Data...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!quranData) return null;

    const stats = getOverallStats(mode);

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Quran Progress Tracker</h1>
                <p className={styles.subtitle}>Track your {mode} journey</p>
            </header>

            <div className={styles.controls}>
                <div className={styles.modeToggle}>
                    <button
                        className={`${styles.modeButton} ${mode === 'memorization' ? styles.modeActive : ''}`}
                        onClick={() => setMode('memorization')}
                    >
                        Memorization
                    </button>
                    <button
                        className={`${styles.modeButton} ${mode === 'reading' ? styles.modeActive : ''}`}
                        onClick={() => setMode('reading')}
                    >
                        Reading
                    </button>
                </div>
            </div>

            <HelpSection />
            <StatsOverview stats={stats} />

            <div className={styles.surahGrid}>
                {quranData.map((surah) => (
                    <SurahCard
                        key={surah.id}
                        surah={surah}
                        progressValue={progress[mode][surah.id] || ''}
                        onUpdate={(val) => updateProgress(mode, surah.id, val)}
                    />
                ))}
            </div>
        </div>
    );
};
