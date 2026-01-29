"use client";

import React, { useState } from 'react';
import styles from './QuranCalculator.module.css';
import { useQuranData } from '../../hooks/useQuranData';
import { useQuranProgress, parseAyahInput } from '../../hooks/useQuranProgress';
import { HelpSection } from './HelpSection';
import { StatsOverview } from './StatsOverview';
import { SurahCard } from './SurahCard';
import { ProgressMode } from './types';
import { ArrowUp } from 'lucide-react';

type SortOption = 'default' | 'progress-desc' | 'progress-asc';

export const QuranCalculator: React.FC = () => {
    const { data: quranData, loading, error } = useQuranData();
    const { progress, updateProgress, getOverallStats, importProgress, resetProgress } = useQuranProgress(quranData);
    const [mode, setMode] = useState<ProgressMode>('memorization');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortOption>('default');
    const [showScrollTop, setShowScrollTop] = useState(false);

    // Scroll detection
    React.useEffect(() => {
        const handleScroll = () => {
            setShowScrollTop(window.scrollY > 300);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (loading) return <div className={styles.loading}>Loading Quran Data...</div>;
    if (error) return <div className={styles.error}>Error: {error}</div>;
    if (!quranData) return null;

    const stats = getOverallStats(mode);

    // Helper to get completion %
    const getProgressPct = (surahId: number, totalVerses: number) => {
        const val = progress[mode][surahId] || '';
        if (!val) return 0;
        if (val === 'F') return 100;
        const completed = parseAyahInput(val, totalVerses);
        return (completed.size / totalVerses) * 100;
    };

    const filteredSurahs = quranData
        .filter(surah =>
            surah.transliteration.toLowerCase().includes(searchQuery.toLowerCase()) ||
            surah.name.includes(searchQuery) ||
            surah.id.toString().includes(searchQuery)
        )
        .sort((a, b) => {
            if (sortBy === 'default') return a.id - b.id;

            const pctA = getProgressPct(a.id, a.total_verses);
            const pctB = getProgressPct(b.id, b.total_verses);

            if (sortBy === 'progress-desc') return pctB - pctA; // High to Low
            if (sortBy === 'progress-asc') return pctA - pctB; // Low to High
            return 0;
        });

    return (
        <div className={styles.container}>
            <header className={styles.header}>
                <h1 className={styles.title}>Quran Progress Tracker</h1>
                <p className={styles.subtitle}>Track your {mode} journey</p>
            </header>

            <div className={styles.controls} style={{ flexWrap: 'wrap' }}>
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

                <input
                    type="text"
                    placeholder="Search Surah..."
                    className={styles.searchInput}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />

                <select
                    className={styles.sortSelect}
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                >
                    <option value="default">Sort: Default</option>
                    <option value="progress-desc">Progress: High → Low</option>
                    <option value="progress-asc">Progress: Low → High</option>
                </select>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button className={styles.modeButton} onClick={() => {
                        const blob = new Blob([JSON.stringify(progress)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `quran-progress-${new Date().toISOString().split('T')[0]}.json`;
                        a.click();
                        URL.revokeObjectURL(url);
                    }}>
                        Export
                    </button>
                    <label className={styles.modeButton} style={{ cursor: 'pointer' }}>
                        Import
                        <input
                            type="file"
                            accept=".json"
                            style={{ display: 'none' }}
                            onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (!file) return;
                                const reader = new FileReader();
                                reader.onload = (ev) => {
                                    try {
                                        const data = JSON.parse(ev.target?.result as string);
                                        importProgress(data);
                                        alert('Progress imported successfully!');
                                    } catch (err) {
                                        alert('Failed to import file');
                                    }
                                };
                                reader.readAsText(file);
                            }}
                        />
                    </label>
                    <button
                        className={styles.modeButton}
                        style={{ color: '#e53e3e', borderColor: '#e53e3e' }}
                        onClick={() => resetProgress(mode)}
                    >
                        Reset
                    </button>
                </div>
            </div>

            <HelpSection />
            <StatsOverview stats={stats} />

            <div className={styles.surahGrid}>
                {filteredSurahs.map((surah) => (
                    <SurahCard
                        key={surah.id}
                        surah={surah}
                        progressValue={progress[mode][surah.id] || ''}
                        onUpdate={(val) => updateProgress(mode, surah.id, val)}
                    />
                ))}
            </div>

            <button
                className={`${styles.scrollTopButton} ${showScrollTop ? styles.visible : ''}`}
                onClick={scrollToTop}
                aria-label="Scroll to top"
            >
                <ArrowUp size={24} />
            </button>
        </div>
    );
};
