import React from 'react';
import styles from './StatsOverview.module.css';

interface StatProps {
    label: string;
    percentage: number;
    current: number;
    total: number;
    unit: string;
}

const CircularProgress: React.FC<StatProps> = ({ label, percentage, current, total, unit }) => {
    const radius = 50;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (percentage / 100) * circumference;

    return (
        <div className={styles.statCard}>
            <div className={styles.progressCircle}>
                <svg className={styles.progressSvg} viewBox="0 0 120 120">
                    <circle
                        className={styles.progressBg}
                        cx="60"
                        cy="60"
                        r={radius}
                    />
                    <circle
                        className={styles.progressFore}
                        cx="60"
                        cy="60"
                        r={radius}
                        strokeDasharray={`${circumference} ${circumference}`}
                        strokeDashoffset={offset}
                    />
                </svg>
                <div className={styles.progressText}>
                    <span className={styles.progressPercent}>{percentage.toFixed(2)}%</span>
                    <span className={styles.progressLabel}>{label}</span>
                </div>
            </div>
            <div className={styles.statDetails}>
                <div className={styles.detailItem}>
                    <span className={styles.detailValue}>{current.toLocaleString()}</span> / {total.toLocaleString()} {unit}
                </div>
            </div>
        </div>
    );
};

interface StatsOverviewProps {
    stats: {
        words: number;
        chars: number;
        totalAvg: number;
    };
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ stats }) => {
    return (
        <div className={styles.statsContainer}>
            <div className={styles.statCard}>
                <div className={styles.progressCircle}>
                    <svg className={styles.progressSvg} viewBox="0 0 120 120">
                        <circle
                            className={styles.progressBg}
                            cx="60"
                            cy="60"
                            r="50"
                        />
                        <circle
                            className={styles.progressFore}
                            cx="60"
                            cy="60"
                            r="50"
                            strokeDasharray={`${2 * Math.PI * 50} ${2 * Math.PI * 50}`}
                            strokeDashoffset={(2 * Math.PI * 50) - (stats.totalAvg / 100) * (2 * Math.PI * 50)}
                        />
                    </svg>
                    <div className={styles.progressText}>
                        <span className={styles.progressPercent}>{stats.totalAvg.toFixed(2)}%</span>
                    </div>
                </div>
                <h3>Overall Progress</h3>
                <p className={styles.detailItem}>Average of Words & Characters</p>
            </div>

            <CircularProgress
                label="Words"
                percentage={stats.words}
                current={(stats.words / 100) * 77800}
                total={77800} // Total words constant from original app
                unit="words"
            />

            <CircularProgress
                label="Letters"
                percentage={stats.chars}
                current={(stats.chars / 100) * 330709}
                total={330709} // Total chars constant from original app
                unit="letters"
            />
        </div>
    );
};
