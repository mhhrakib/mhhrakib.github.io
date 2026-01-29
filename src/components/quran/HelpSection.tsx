import React, { useState } from 'react';
import styles from './HelpSection.module.css';
import { ChevronDown, ChevronUp, HelpCircle } from 'lucide-react';

export const HelpSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className={styles.container}>
            <button
                className={styles.toggleButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <HelpCircle size={20} />
                    <span>How to Use Guide</span>
                </div>
                {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </button>

            {isOpen && (
                <div className={styles.content}>
                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Tracking Modes</h4>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <strong>Memorization</strong>: Track which portions you have memorized by heart.
                            </li>
                            <li className={styles.listItem}>
                                <strong>Reading</strong>: Track your recitation progress (Tilawah).
                            </li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Input Formats</h4>
                        <p>You can enter progress in multiple ways:</p>
                        <ul className={styles.list}>
                            <li className={styles.listItem}>
                                <span className={styles.code}>F</span> or checkbox: Mark the full Surah as completed.
                            </li>
                            <li className={styles.listItem}>
                                <span className={styles.code}>1-10</span>: Mark a range of verses (e.g., verse 1 to 10).
                            </li>
                            <li className={styles.listItem}>
                                <span className={styles.code}>1, 3, 5</span>: Mark specific single verses.
                            </li>
                            <li className={styles.listItem}>
                                <span className={styles.code}>1-5, 10-15</span>: Combine multiple ranges and verses.
                            </li>
                        </ul>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>How are stats calculated?</h4>
                        <p>
                            Progress is calculated based on the <strong>total number of words and characters</strong> in the verses you complete.
                            Since verses vary in length (e.g., Ayatul Kursi vs. a short verse), this gives a much more accurate reflection of your effort than just counting verses.
                        </p>
                    </div>

                    <div className={styles.section}>
                        <h4 className={styles.sectionTitle}>Data & Privacy</h4>
                        <p>
                            All your progress is saved <strong>locally on your device</strong> (in your browser).
                            No data is sent to any server. If you clear your browser data, your progress will be lost.
                            (Export feature coming soon).
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
};
