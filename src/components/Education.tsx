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
                        {edu.period} • {edu.location}
                    </div>
                    {edu.details && <p className={styles.details}>{edu.details}</p>}
                </div>
            ))}
        </Section>
    );
}
