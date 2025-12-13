import Link from 'next/link';
import portfolioData from '@/data/portfolio.json';
import styles from './Footer.module.css';

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className={styles.footer}>
            <div className={styles.container}>
                <p>© {currentYear} {portfolioData.personal.name}. All rights reserved.</p>

                <div className={styles.links}>
                    <Link href={portfolioData.personal.social.github} target="_blank" rel="noopener noreferrer">
                        GitHub
                    </Link>
                    <Link href={portfolioData.personal.social.linkedin} target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </Link>
                    <Link href={portfolioData.personal.social.scholar} target="_blank" rel="noopener noreferrer">
                        Scholar
                    </Link>
                </div>
            </div>
        </footer>
    );
}
