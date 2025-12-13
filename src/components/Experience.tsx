import portfolioData from '@/data/portfolio.json';
import Section from './Section';
import styles from './Experience.module.css';

export default function Experience() {
    const { experience } = portfolioData;

    return (
        <Section id="experience" title="Experience">
            {experience.map((job, index) => (
                <div key={index} className={styles.item}>
                    <div className={styles.header}>
                        <h3 className={styles.role}>{job.role}</h3>
                        <div className={styles.company}>{job.company}</div>
                    </div>
                    <div className={styles.meta}>
                        <span>{job.period}</span>
                        <span>•</span>
                        <span>{job.location}</span>
                    </div>
                    {job.description && (
                        <ul className={styles.description}>
                            {job.description.map((desc, i) => (
                                <li key={i}>{desc}</li>
                            ))}
                        </ul>
                    )}
                </div>
            ))}
        </Section>
    );
}
