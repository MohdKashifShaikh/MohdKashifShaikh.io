"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import styles from "./staticParallax.module.scss";

export default function StaticParallax() {
  const ref = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Handle responsive scaling
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 480);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "center center"],
  });
  // CODE MATRIX animations - extended reading time for better UX
  // Stage 1: Animate in (0-0.3), Stage 2: STATIONARY & ZOOM (0.3-0.8), Stage 3: Exit (0.8-1.0)
  // APPEAR - maximum visibility time for reading
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.85, 1], [0, 1, 1, 0]);

  // Enhanced zoom on scroll - more pronounced effect
  const maxScale = isMobile ? 1.12 : 1.2; // Increased for better zoom visibility
  const scale = useTransform(scrollYProgress,[0, 0.25, 0.5, 0.75, 1],[0, 0.5, 0.7, maxScale, maxScale]);
  // const scale = useTransform(scrollYProgress,[0, 0.25, 0.4, 0.75, 1],[0.85, 1, 1.1, maxScale, maxScale]);
  // VISUAL "LOCK" — stay in viewport and zoom only
  // const y = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [50, 0, 0, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.95, 1], [100, 0, 0, 0, -200]);
  // const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [12, 0, 0, -3]);
  // const rotateX = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.95], [25, 0, 0, -3]);
    const rotateX = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [12, 0, 0, -3]);
  // FLOATING ELEMENTS animations - extended stationary period
  const float1Y = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [100, 20, 20, -50]);
  const float2Y = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [-80, -20, -20, 60]);
  const float3Y = useTransform(scrollYProgress, [0, 0.3, 0.8, 1], [120, 30, 30, -80]);
  const floatRotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  // TEXT animations - appear when zoom starts for better visibility
  const titleOpacity = useTransform(scrollYProgress, [0.4, 0.5, 0.85, 1], [0, 1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0.4, 0.5, 0.85, 1], [40, 0, 0, -30]);
  const titleScale = useTransform(scrollYProgress, [0.4, 0.5], [0.9, 1]);

  // Subtle 3D rotation for depth - enhanced for zoom effect
  const codeSnippet = `// Portfolio Developer Profile
import { Developer, Skills, Experience } from '@/types';
import { createInnovation, buildExperience } from '@/utils';

const developer: Developer = {
  name: "Mohd Kashif Shaikh",
  role: "Lead Software Engineer",
  location: "India",
  experience: "4+ Years",
  
  // Core Technologies
  skills: {
    frontend: ["React", "Next.js", "Redux Toolkit", "TypeScript", "Tailwind"],
    backend: ["Node.js", "Express", "MongoDB", "NestJS"],
    tools: ["Postman", "Vite", "Git", "GitHub", "Docker", "CI/CD"],
    unit testing: ["Vitest", "Jest", "React Testing Library"]
  },
  
  // Professional Mission
  mission: async () => {
    const innovation = await createInnovation({
      creativity: "unlimited",
      technology: "cutting-edge",
      impact: "meaningful"
    });
    
    return \`Crafting digital experiences that 
            inspire, engage, and transform ideas 
            into interactive realities\`;
  },
  
  // Development Philosophy
  philosophy: {
    code: "Clean, scalable, and maintainable",
    design: "User-centered with attention to detail",
    approach: "Innovation through collaboration",
    goal: "Building the future, one component at a time"
  },
  
  // Current Focus
  currentlyWorking: [
    "Advanced NextJS",
    "3D Web Experiences", 
    "Performance Optimization",
    "Accessibility Standards"
  ]
};

export default developer;`;

  return (
    <section className={styles.container} ref={ref}>
      <div className={styles.sticky}>
        {/* Floating Geometric Elements */}
        <motion.div
          className={styles.floatingElement1}
          style={{ y: float1Y, rotate: floatRotate }}
        />
        <motion.div
          className={styles.floatingElement2}
          style={{ y: float2Y, rotate: floatRotate }}
        />
        <motion.div
          className={styles.floatingElement3}
          style={{ y: float3Y, rotate: floatRotate }}
        />

        {/* Code Matrix */}
        <motion.div
          className={styles.codeMatrix}
          style={{
            opacity,
            rotateX,
            scale,
            y,
          }}
        >
          <div className={styles.codeWindow}>
            <div className={styles.windowHeader}>
              <div className={styles.windowControls}>
                <span className={styles.control}></span>
                <span className={styles.control}></span>
                <span className={styles.control}></span>
              </div>
              <div className={styles.tabContainer}>
                <div className={styles.activeTab}>
                  <span className={styles.tabIcon}>📄</span>
                  <span className={styles.fileName}>developer.ts</span>
                  <span className={styles.tabClose}>×</span>
                </div>
                <div className={styles.inactiveTab}>
                  <span className={styles.tabIcon}>⚛️</span>
                  <span className={styles.fileName}>portfolio.tsx</span>
                </div>
              </div>
              <div className={styles.headerActions}>
                <span className={styles.branchInfo}>🌿 main</span>
                <span className={styles.statusIndicator}>●</span>
              </div>
            </div>
            <div className={styles.codeContent}>
              <div className={styles.lineNumbers}>
                {Array.from({ length: 42 }, (_, i) => (
                  <span key={i + 1} className={styles.lineNumber}>
                    {i + 1}
                  </span>
                ))}
              </div>
              <div className={styles.codeArea}>
                <pre className={styles.code}>
                  <code>{codeSnippet}</code>
                </pre>
              </div>
            </div>
            <div className={styles.statusBar}>
              <div className={styles.statusLeft}>
                <span className={styles.statusItem}>TypeScript</span>
                <span className={styles.statusItem}>UTF-8</span>
                <span className={styles.statusItem}>LF</span>
              </div>
              <div className={styles.statusRight}>
                <span className={styles.statusItem}>Ln 42, Col 2</span>
                <span className={styles.statusItem}>100%</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Dynamic Title */}
        <motion.div
          className={styles.titleContainer}
          style={{
            opacity: titleOpacity,
            y: titleY,
            scale: titleScale,
          }}
        >
          <h1 className={styles.title}>
            <span className={styles.titleLine1}>Synthesizing Code</span>
            <span className={styles.titleLine2}>Interfaces</span>
          </h1>
          <p className={styles.subtitle}>
            Building tomorrow's web with precision, passion, and purpose
          </p>
        </motion.div>
      </div>
    </section>
  );
}
