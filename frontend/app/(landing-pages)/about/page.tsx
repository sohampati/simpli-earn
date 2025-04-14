import styles from './about.module.css';
import Image from "next/image";
import { Metadata } from "next";
import { FaLinkedin, FaGithub } from "react-icons/fa";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "About Us | SimpliEarn",
};

const teamMembers = [
  {
    name: "Parth Parikh",
    role: "Project Lead",
    description: "I'm a first-year student studying Computer Science with concentrations in intelligence and theory. I'm passionate about real-world AI/ML applications and interested in delving deeper into academic research. In my free time, you can find me pursuing my passion for photography at parks and in nature!",
    image: "/images/team_imgs/Parth_Parikh.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/parthparikh04",
      github: "https://github.com/parthparikh04",
    },
  },
  {
    name: "Evelyn Chen",
    role: "Data Visualization",
    description: "Hello hello! I'm Evelyn (she/her), and I'm from Portland, OR. I love to learn new things and enjoy using my creativity and technical programming experience to build full-stack applications. Aside from computer science, I love rock climbing, all thing outdoors (hiking, catching sunrises/sunsets, running), crafting (birthday cards are so fun!), and taking too many pics on my digital camera.",
    image: "/images/team_imgs/Evelyn_Chen.jpg",
    socials: {
      linkedin: "https://www.linkedin.com/in/evelynchen5/",
      github: "https://github.com/itsevelync",
    },
  },
  {
    name: "Neil Samant",
    role: "RAG",
    description: "Hey! I'm Neil Samant, a mathematics major at Georgia Tech with a concentration in data science and a minor in computer science. I'm passionate about using tech to solve real-world problems, whether that's through building full-stack web apps, diving into machine learning projects, or analyzing data to uncover meaningful insights. I've worked with tools like Python, Java, JavaScript, SQL, and frameworks like React, Flask, and FastAPI, and I'm always looking to learn something new. Outside of tech, I'm a National Master in chess and have been competing for over 10 years. I love thinking strategically, whether it's on the board or in code.",
    image: "/images/team_imgs/Neil_Samant.jpeg",
    socials: {
      linkedin: "https://www.linkedin.com/in/neil-samant",
      github: "https://github.com/neilsam19",
    },
  },
  {
    name: "Kate Li",
    role: "Data Visualization",
    description: "Hi! I'm Kate Li, a computer science major at Georgia Tech with a minor in Linguistics. I love to explore and learn new things, especially when I can use technology to solve real-world problems or chase whatever idea has currently hijacked my brain. I also am in Film Club and a big foodie, so if you have any recommendations for good restaurants or movies, let me know!",
    image: "/images/team_imgs/Kate_Li.png",
    socials: {
      linkedin: "https://www.linkedin.com/in/li-kate",
      github: "https://github.com/li-kate",
    },
  },
];

export default function AboutUs() {
  return (
    <div className={styles.pageContainer}>
      
      <main className={styles.mainContent}>
        {/* Hero Section */}
        <section className={styles.heroSection}>
          <h1>About Us</h1>
            <p className={styles.heroText}>
              As individuals interested in finance, stock trading, and business, we want to develop a financial education platform that focuses on teaching technical terminology and business acumen through live analysis of quarterly earnings calls.
            </p>
            <p className={styles.heroText}>
              We hope that by using this frequent, real, and low-stakes situation, we can create a safe and productive environment to develop people's business intuition and financial knowledge.
            </p>
            <p className={styles.heroText}>
              We are under <a href="https://gtbigdatabigimpact.com/" className={styles.orgLink}>Big Data Big Impact</a>, a Georgia Tech Student Organization.
            </p>
        </section>

        {/* Team Section */}
        <section className={styles.teamSection}>
          <h2>Meet the Team</h2>
          <div className={styles.teamGrid}>
            {teamMembers.map((member, index) => (
              <div key={index} className={styles.teamCard}>
                {/* Profile image is currently a square. Might change to circle if preferred */}
                <div className={styles.profileImage}>
                  <Image 
                    src={member.image} 
                    alt={member.name} 
                    width={150}
                    height={150}
                  />
                </div>
                
                {/* Role/tags here instead? */}
                <h3>{member.name}</h3>
                <p className={styles.role}>{member.role}</p>
                <p className={styles.description}>{member.description}</p>
                {/* Social Icons - idk what images to use so there are none rn*/}
                <div className={styles.socialIcons}>
                  {member.socials.linkedin && (
                    <Link href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </Link>
                  )}
                  {member.socials.github && (
                    <Link href={member.socials.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}