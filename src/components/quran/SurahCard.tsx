import React, { useMemo } from 'react';
import styles from './SurahCard.module.css';
import { Surah } from './types';
import { parseAyahInput } from '../../hooks/useQuranProgress';

interface SurahCardProps {
    surah: Surah;
    progressValue: string;
    onUpdate: (value: string) => void;
}

export const SurahCard: React.FC<SurahCardProps> = ({ surah, progressValue, onUpdate }) => {
    const isCompleted = progressValue === 'F';

    // Calculate segments for visualization
    const segments = useMemo(() => {
        const completedSet = parseAyahInput(progressValue, surah.total_verses);
        const segs = [];

        // Simple segmentation: if < 50 verses, show each. If > 50, group them?
        // For visuals, drawing 286 rects is fine for modern browsers, or we can SVG it.
        // Let's use a flex div approach with ratio widths for simplicity if simple range.
        // But for "1, 3, 5" scattered, separate divs are better.
        // Given the constraints, let's create a visual array of 100% width.

        // Optimization: If full, just one green bar.
        if (isCompleted) return [{ completed: true, width: 100 }];
        if (completedSet.size === 0) return [{ completed: false, width: 100 }];

        // Detailed visualization
        const total = surah.total_verses;
        let currentBlock = { completed: completedSet.has(1), count: 0 };
        const blocks = [];

        for (let i = 1; i <= total; i++) {
            const isComp = completedSet.has(i);
            if (isComp !== currentBlock.completed) {
                blocks.push({ ...currentBlock });
                currentBlock = { completed: isComp, count: 1 };
            } else {
                currentBlock.count++;
            }
        }
        blocks.push(currentBlock);

        return blocks.map(b => ({
            completed: b.completed,
            width: (b.count / total) * 100
        }));

    }, [progressValue, surah.total_verses, isCompleted]);

    const completedAyahsCount = useMemo(() => {
        if (progressValue === 'F') return surah.total_verses;
        return parseAyahInput(progressValue, surah.total_verses).size;
    }, [progressValue, surah.total_verses]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const val = e.target.value;
        // Allow digits, commas, hyphens, spaces, and 'f'/'F'.
        if (/^[0-9\-\,\sFf]*$/.test(val)) {
            onUpdate(val);
        }
    };

    const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onUpdate(e.target.checked ? 'F' : '');
    };

    const percent = segments.reduce((acc, seg) => acc + (seg.completed ? seg.width : 0), 0);

    return (
        <div className={styles.card}>
            <div className={styles.header}>
                <div className={styles.surahInfo}>
                    <div className={styles.surahNumber}>{surah.id}</div>
                    <div className={styles.names}>
                        <span className={styles.englishName}>{surah.transliteration}</span>
                        <span className={styles.arabicName}>{surah.name}</span>
                    </div>
                </div>
                <div className={styles.controls}>
                    <span
                        className={styles.badge}
                        title="Based on avg of words & letters, so this % might differ from ayah count %."
                        style={{ cursor: 'help' }}
                    >
                        {Math.round(percent)}%
                    </span>
                    <span className={styles.badge}>
                        {completedAyahsCount} / {surah.total_verses}
                    </span>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={isCompleted}
                        onChange={handleCheckboxChange}
                    />
                </div>
            </div>

            <div className={styles.progressBarContainer}>
                {segments.map((seg, idx) => (
                    <div
                        key={idx}
                        className={`${styles.segment} ${seg.completed ? styles.segmentCompleted : styles.segmentEmpty}`}
                        style={{ width: `${seg.width}%` }}
                    />
                ))}
            </div>

            <div className={styles.inputGroup}>
                <input
                    type="text"
                    className={styles.input}
                    placeholder="e.g. 1-10, 15"
                    value={progressValue === 'F' ? '' : progressValue}
                    disabled={isCompleted}
                    onChange={handleInputChange}
                />
            </div>
        </div>
    );
};
