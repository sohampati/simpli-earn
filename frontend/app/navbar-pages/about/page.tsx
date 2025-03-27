import NavBar from "@/app/components/navbar";
import Head from 'next/head';
import styles from './about.module.css';

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
      <Head> {/* Might get rid of montserrat section since it's in global css? */}
        <title>About Us</title>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;700&display=swap" rel="stylesheet" />
      </Head>
      
      <NavBar />
      
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
                  <img 
                    src={member.image} 
                    alt={member.name} 
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
                      <img src="/icons/linkedin.svg" alt="LinkedIn" />
                    </a>
                  )}
                  {member.socials.github && (
                    <a href={member.socials.github} target="_blank" rel="noopener noreferrer">
                      <img src="/icons/github.svg" alt="GitHub" />
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