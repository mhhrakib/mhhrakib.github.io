import React, { useState } from 'react';
import styles from './HelpSection.module.css';
import { HelpCircle, X } from 'lucide-react';

export const HelpSection: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    // Prevent scrolling when modal is open
    React.useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    return (
        <>
            <button
                className={styles.helpTrigger}
                onClick={() => setIsOpen(true)}
            >
                <HelpCircle size={20} />
                <span>How to Use Guide</span>
            </button>

            {isOpen && (
                <div className={styles.overlay} onClick={() => setIsOpen(false)}>
                    <div className={styles.modal} onClick={e => e.stopPropagation()}>
                        <div className={styles.header}>
                            <h3 className={styles.title}>Guide & FAQ</h3>
                            <button className={styles.closeButton} onClick={() => setIsOpen(false)}>
                                <X size={24} />
                            </button>
                        </div>

                        <div className={styles.content}>
                            <div className={styles.section}>
                                <h4 className={styles.sectionTitle}>Tracking Modes</h4>
                                <ul className={styles.list}>
                                    <li className={styles.listItem}>
                                        <strong>Memorization</strong>: Track portions memorized by heart.
                                    </li>
                                    <li className={styles.listItem}>
                                        <strong>Reading</strong>: Track recitation progress.
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.section}>
                                <h4 className={styles.sectionTitle}>Input Formats</h4>
                                <ul className={styles.list}>
                                    <li className={styles.listItem}>
                                        <span className={styles.code}>F</span> or checkbox: Full Surah.
                                    </li>
                                    <li className={styles.listItem}>
                                        <span className={styles.code}>1-10</span>: Range of verses.
                                    </li>
                                    <li className={styles.listItem}>
                                        <span className={styles.code}>1, 3, 5</span>: Specific verses.
                                    </li>
                                </ul>
                            </div>

                            <div className={styles.section}>
                                <h4 className={styles.sectionTitle}>Stats Calculation</h4>
                                <p>
                                    Stats are precise! We count the actual <strong>words and letters</strong> of the verses you complete, not just the verse count.
                                </p>
                                <p className={styles.textSm} style={{ marginTop: '0.5rem', color: 'var(--secondary)' }}>
                                    <strong>Formula:</strong> The overall percentage is an average of your Word Completion % and Letter Completion %. This gives a more accurate representation of volume than just counting verses (since some verses are much longer than others).
                                </p>
                            </div>

                            <div className={styles.section}>
                                <h4 className={styles.sectionTitle}>Data Backup</h4>
                                <p>
                                    Data is saved in your browser. Use the <strong>Export</strong> button to download a backup file, and <strong>Import</strong> to restore it on another device.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
