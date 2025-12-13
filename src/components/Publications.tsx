import portfolioData from '@/data/portfolio.json';
import Section from './Section';
import styles from './Publications.module.css';

export default function Publications() {
    const { publications } = portfolioData;

    return (
        <Section id="publications" title="Publications">
            <div className={styles.list}>
                {publications.map((pub, index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.year}>{pub.year}</div>
                        <div className={styles.content}>
                            <div className={styles.title}>{pub.title}</div>
                            <div className={styles.authors}>
                                {pub.authors.split('MH Rakib').map((part, i, arr) => (
                                    <span key={i}>
                                        {part}
                                        {i < arr.length - 1 && <strong className="font-bold text-slate-900">MH Rakib</strong>}
                                    </span>
                                ))}
                            </div>
                            <div className={styles.venue}>{pub.venue}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
