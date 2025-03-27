import styles from './about.module.css';
import Image from "next/image";
import { Metadata } from "next";
import { FaLinkedin, FaGithub } from "react-icons/fa";

export const metadata: Metadata = {
  title: "About Us | SimpliEarn",
};

const teamMembers = [
  {
    name: "Random Person",
    role: "Lead",
    description: "Leads.",
    image: "/team/lead.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/johndoe",
    },
  },
  {
    name: "Jane Smith",
    role: "Member",
    description: "Worked on stuffs.",
    image: "/team/jane.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/janesmith",
      github: "https://github.com/janesmith",
    },
  },
  {
    name: "Joe Smith",
    role: "Member",
    description: "Worked on stuffs as well.",
    image: "/team/joe.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/joesmith",
      github: "https://github.com/joesmith",
    },
  },
  {
    name: "Joe Smith",
    role: "Member",
    description: "Worked on stuffs as well.",
    image: "/team/joe.jpg",
    socials: {
      linkedin: "https://linkedin.com/in/joesmith",
      github: "https://github.com/joesmith",
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
          <p>SimpliEarn. Lorem sdfslkfjk</p>
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
                    <a href={member.socials.linkedin} target="_blank" rel="noopener noreferrer">
                      <FaLinkedin />
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                      <FaGithub />
                    </a>
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