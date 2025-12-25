'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import styles from './deno.module.scss';

interface Project {
  title: string;
  tech: string[];
  image: string;
  link: string;
}

const PROJECTS: Project[] = [
  { title: 'AI Dashboard', tech: ['React', 'Three.js', 'Node'], image: '/proj1.jpg', link: '#' },
  { title: 'E-Commerce Platform', tech: ['Next.js', 'Tailwind', 'Prisma'], image: '/proj2.jpg', link: '#' },
  { title: 'Real-time Chat', tech: ['Socket.io', 'TypeScript', 'MongoDB'], image: '/proj3.jpg', link: '#' },
];

export default function Deno() {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [scrollY, setScrollY] = useState(0);
  const orbsRef = useRef<(HTMLDivElement | null)[]>([]);
  const cursorRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    setMousePos({ x: e.clientX, y: e.clientY });
  }, []);

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    const handleScroll = () => setScrollY(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleMouseMove]);

  return (
    <main className={styles.main}>
      {/* Magnetic Cursor */}
      <div 
        ref={cursorRef}
        className={styles.cursor}
        style={{
          left: mousePos.x - 12 + 'px',
          top: mousePos.y - 12 + 'px',
        }}
      />

      {/* Morphing 3D Orbs Background */}
      <div className={styles.orbsContainer}>
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            ref={(el) => { orbsRef.current[i] = el; }}
            className={`${styles.orb} ${styles[`orb${i + 1}`]}`}
            style={{
              transform: `
                translateX(${(mousePos.x - window.innerWidth / 2) * 0.03}px)
                translateY(${(mousePos.y - window.innerHeight / 2) * 0.03}px)
                rotateY(${scrollY * 0.1 + i * 30}deg)
              `
            }}
          />
        ))}
      </div>

      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.role} data-scroll={scrollY > 100}>
            FULL-STACK DEVELOPER
          </div>
          <h1 className={styles.name} data-scroll={scrollY > 200}>
            <span>John</span>
            <span>DOE</span>
          </h1>
          <p className={styles.bio} data-scroll={scrollY > 400}>
            Crafting pixel-perfect experiences with React, Next.js, and Three.js. 
            50+ projects shipped. Always shipping.
          </p>
          <div className={styles.cta} data-scroll={scrollY > 600}>
            <a href="#projects" className={styles.ctaButton}>View Work</a>
            <a href="#contact" className={styles.ctaSecondary}>Get In Touch</a>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className={styles.projects}>
        <h2 className={styles.sectionTitle}>Featured Projects</h2>
        <div className={styles.grid}>
          {PROJECTS.map((project, i) => (
            <div 
              key={project.title}
              className={styles.projectCard}
              style={{ '--delay': `${i * 0.1}s` } as React.CSSProperties}
              data-scroll={scrollY > 1000 + i * 100}
            >
              <div className={styles.cardImage}>
                <img src={project.image} alt={project.title} />
                <div className={styles.cardOverlay}>
                  <h3>{project.title}</h3>
                  <div className={styles.techTags}>
                    {project.tech.map(tag => (
                      <span key={tag}>{tag}</span>
                    ))}
                  </div>
                  <a href={project.link}>View Project →</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats */}
      <section className={styles.stats}>
        <div className={styles.stat}>
          <span>50+</span>
          <span>Projects</span>
        </div>
        <div className={styles.stat}>
          <span>2+</span>
          <span>Years Exp</span>
        </div>
        <div className={styles.stat}>
          <span>10k+</span>
          <span>GitHub Stars</span>
        </div>
      </section>
    </main>
  );
}
