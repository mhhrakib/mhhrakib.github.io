import portfolioData from '@/data/portfolio.json';
import Section from './Section';
import styles from './Skills.module.css';

export default function Skills() {
    const { skills } = portfolioData;
    // Convert object to array for easier mapping if needed, or map manually
    const categories = [
        { name: 'Languages', items: skills.languages },
        { name: 'Frameworks', items: skills.frameworks },
        { name: 'Tools & Platforms', items: skills.tools },
    ];

    return (
        <Section title="Technical Skills">
            <div style={{ display: 'grid', gap: '2rem', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))' }}>
                {categories.map((category) => (
                    <div key={category.name} className={styles.category}>
                        <h3 className={styles.categoryTitle}>{category.name}</h3>
                        <div className={styles.list}>
                            {category.items.map((skill) => (
                                <span key={skill} className={styles.skill}>{skill}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
