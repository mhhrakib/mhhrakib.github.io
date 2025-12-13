import Link from 'next/link';
import { ExternalLink, Github } from 'lucide-react';
import portfolioData from '@/data/portfolio.json';
import Section from './Section';
import styles from './Projects.module.css';

export default function Projects() {
    const { projects } = portfolioData;

    return (
        <Section id="projects" title="Projects">
            <div className={styles.grid}>
                {projects.map((project, index) => (
                    <div key={index} className={styles.card}>
                        <h3 className={styles.cardTitle}>
                            <Link href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                                {project.title}
                                <ExternalLink size={16} />
                            </Link>
                        </h3>
                        <p className={styles.cardDesc}>{project.description}</p>
                        <div className={styles.tags}>
                            {project.tech.map((tech) => (
                                <span key={tech} className={styles.tag}>{tech}</span>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </Section>
    );
}
