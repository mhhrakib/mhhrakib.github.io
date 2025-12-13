import styles from './Section.module.css';

interface SectionProps {
    id?: string;
    title?: string;
    children: React.ReactNode;
    className?: string;
}

export default function Section({ id, title, children, className = '' }: SectionProps) {
    return (
        <section id={id} className={`${styles.section} ${className}`}>
            <div className={styles.container}>
                {title && <h2 className={styles.title}>{title}</h2>}
                {children}
            </div>
        </section>
    );
}
