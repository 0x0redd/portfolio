// app/page.tsx (if using Next.js 13+ App Router)

import Image from 'next/image';
import Link from 'next/link';

export default function Home() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content">
          <h1>Welcome to <span>Profolio</span></h1>
          <p>
            Hi, I'm Othmane Ferrah, a passionate web developer. This is my portfolio where I showcase my projects, skills, and achievements.
          </p>
          <Link href="/projects" className="cta-button">
            View My Projects
          </Link>
        </div>
        <div className="hero-image">
          <Image
            src="/me.jpg"
            alt="Othmane Ferrah"
            width={400}
            height={400}
            className="profile-image"
          />
        </div>
      </div>
    </section>
  );
}
