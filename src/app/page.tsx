import Hero from '@/components/Hero';
import Education from '@/components/Education';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Publications from '@/components/Publications';

export default function Home() {
  return (
    <div className="container">
      <Hero />
      <Education />
      <Skills />
      <Experience />
      <Projects />
      <Publications />
    </div>
  );
}
