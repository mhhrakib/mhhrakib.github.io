import { Award, Calendar } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import Section from './Section';
import styles from './Awards.module.css';

export default function Awards() {
    const { awards } = portfolioData;

    // Type guard or safe access if awards might be undefined initially
    if (!awards) return null;

    return (
        <Section id="awards" title="Awards & Certifications">
            <div className={styles.list}>
                {awards.map((award, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.title}>{award.title}</div>
                        <div className={styles.issuer}>{award.issuer}</div>
                        <div className={styles.meta}>
                            <Calendar size={14} /> {award.year}
                        </div>
                        {award.details && <div className={styles.details}>{award.details}</div>}
                    </div>
                ))}
            </div>
        </Section>
    );
}
