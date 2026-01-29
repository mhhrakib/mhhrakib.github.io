"use client";

import React, { useState } from 'react';
import styles from './QuranCalculator.module.css';
import { useQuranData } from '../../hooks/useQuranData';
import { useQuranProgress, parseAyahInput } from '../../hooks/useQuranProgress';
import { HelpSection } from './HelpSection';
import { StatsOverview } from './StatsOverview';
import { SurahCard } from './SurahCard';
import { ProgressMode } from './types';
import { ArrowUp, Share2 } from 'lucide-react';
// ... existing imports

export const QuranCalculator: React.FC = () => {
    // ... existing hooks

    // ... const stats = ...

    const handleShare = async () => {
        const shareData = {
            title: 'Quran Progress Tracker',
            text: `I'm tracking my ${mode} journey with this Quran Calculator!`,
            url: window.location.href,
        };

        try {
            if (navigator.share) {
                await navigator.share(shareData);
            } else {
                await navigator.clipboard.writeText(`${shareData.text}\n${shareData.url}`);
                alert('Link copied to clipboard!');
            }
        } catch (err) {
            console.error('Error sharing:', err);
        }
    };

    // ... existing return ...

    <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button className={styles.modeButton} onClick={handleShare} title="Share">
            <Share2 size={18} />
        </button>
        {/* Export Button */}
        <button className={styles.modeButton} onClick={() => {
            // ... export logic
        }}>
            Export
        </button>
        {/* Import Button */}
        <label className={styles.modeButton} style={{ cursor: 'pointer' }}>
            Import
            <input
            // ... import logic
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
            </div >

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
        </div >
    );
};
