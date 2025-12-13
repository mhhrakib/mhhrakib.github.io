import Link from 'next/link';
import { ArrowRight, Github, Linkedin, GraduationCap, Mail } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import Section from './Section';
import styles from './Hero.module.css';

export default function Hero() {
    const { name, title, social, email } = portfolioData.personal;

    return (
        <Section className={styles.hero}>
            <span className={styles.greeting}>Hi, my name is</span>
            <h1 className={styles.name}>{name}.</h1>
            <h2 className={styles.title}>{title}.</h2>

            <div className={styles.actions}>
                <a href={`mailto:${email}`} className={`${styles.button} ${styles.primary}`}>
                    <Mail size={18} />
                    Contact Me
                </a>
                <Link href="#projects" className={`${styles.button} ${styles.secondary}`}>
                    View Projects <ArrowRight size={18} />
                </Link>
            </div>

            <div className={styles.actions} style={{ marginTop: '3rem' }}>
                <a href={social.github} target="_blank" rel="noopener noreferrer" className={styles.secondary} style={{ padding: '0.5rem' }}>
                    <Github size={24} />
                </a>
                <a href={social.linkedin} target="_blank" rel="noopener noreferrer" className={styles.secondary} style={{ padding: '0.5rem' }}>
                    <Linkedin size={24} />
                </a>
                <a href={social.scholar} target="_blank" rel="noopener noreferrer" className={styles.secondary} style={{ padding: '0.5rem' }}>
                    <GraduationCap size={24} />
                </a>
            </div>
        </Section>
    );
}
