import { Calendar, MapPin } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import Section from './Section';
import styles from './Education.module.css';

export default function Education() {
    const { education } = portfolioData;

    return (
        <Section id="education" title="Education">
            {education.map((edu, index) => (
                <div key={index} className={styles.item}>
                    <div className={styles.school}>{edu.institution}</div>
                    <div className={styles.degree}>{edu.degree}</div>
                    <div className={styles.meta}>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', marginRight: '1rem' }}>
                            <Calendar size={14} /> {edu.period}
                        </span>
                        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                            <MapPin size={14} /> {edu.location}
                        </span>
                    </div>
                    {edu.details && <p className={styles.details}>{edu.details}</p>}
                </div>
            ))}
        </Section>
    );
}
