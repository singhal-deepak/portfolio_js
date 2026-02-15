import { useEffect, useState } from "react";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const space = Space_Grotesk({ subsets: ["latin"], variable: "--font-space" });

export default function Home() {

  const [dark, setDark] = useState(true);
  const [activeSection, setActiveSection] = useState("intro");
  const [quoteVisible, setQuoteVisible] = useState(false);

  const theme = {
    bg: dark ? "#0b1020" : "#f4f6fb",
    text: dark ? "white" : "#111",
    card: dark ? "#141a33" : "#ffffff",
    navBg: dark ? "rgba(11,16,32,0.95)" : "rgba(255,255,255,0.95)"
  };

  const scrollTo = (id) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  const scrollTop = () =>
    window.scrollTo({ top: 0, behavior: "smooth" });

  /* ACTIVE SECTION */
  useEffect(() => {
    const sections = ["intro","education","skills","work","projects","contact"];

    const onScroll = () => {
      let current = "intro";
      sections.forEach(sec => {
        const el = document.getElementById(sec);
        if (el && window.scrollY >= el.offsetTop - 200) current = sec;
      });
      setActiveSection(current);
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* QUOTE FADE */
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 1200) setQuoteVisible(true);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /* GITHUB PROJECTS */
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    fetch("https://api.github.com/users/singhal-deepak/repos")
      .then(res => res.json())
      .then(data => {
        if (!Array.isArray(data)) return;
        setRepos(data.filter(r => !r.fork && r.stargazers_count > 0).slice(0,6));
      });
  }, []);

  return (
    <div
      className={`${inter.variable} ${space.variable}`}
      style={{
        background: theme.bg,
        color: theme.text,
        minHeight: "100vh",
        fontFamily: "var(--font-inter)"
      }}
    >

      {/* NAVBAR */}
      <div style={{
        position:"fixed", top:0, width:"100%",
        padding:20, display:"flex",
        justifyContent:"center", gap:30,
        background: theme.navBg, zIndex:999
      }}>
        {["intro","education","skills","work","projects","contact"].map(sec => (
          <span key={sec}
            onClick={()=>scrollTo(sec)}
            style={{
              cursor:"pointer",
              color: activeSection===sec ? "#6c5ce7" : theme.text
            }}>
            {sec.toUpperCase()}
          </span>
        ))}
      </div>

      {/* HOME */}
      <button onClick={scrollTop} style={homeBtn}>Home</button>

      {/* THEME */}
      <button onClick={()=>setDark(!dark)} style={themeBtn}>
        {dark ? "☀️" : "🌙"}
      </button>

      <div style={{ paddingTop:100 }}/>

      {/* HERO */}
      <section id="intro" style={heroSection}>
        <div style={{ flex:1, maxWidth:600 }}>
          <h1 style={h1}>Hi, I'm Deepak</h1>
          <p style={heroBody}>
                  I am an AI-driven Senior Data Engineer (Analytics) and continuous learner with 7 years of experience building scalable, data-intensive systems. Passionate about leveraging data and intelligent technologies to solve complex problems, I bring strong expertise in Python, SQL, DBT, Databricks, Airflow, ETL pipelines, and Tableau.
          </p>
		  <a
  href="/resume/Deepak_Singhal_Resume.pdf"
    download="Deepak_Singhal_Resume.pdf"

  style={{
    display:"inline-block",
    marginTop:30,
    padding:"14px 28px",
    background:"#6c5ce7",
    color:"white",
    borderRadius:12,
    textDecoration:"none",
    fontWeight:600,
    boxShadow:"0 10px 25px rgba(108,92,231,.35)"
  }}
>
  Download Resume ↓
</a>
        </div>

        <img src="/images/home.png" style={heroImage}/>
      </section>

      {/* EDUCATION */}
      <section id="education" style={section}>
        <h2 style={h2}>Education</h2>

        <div style={eduGrid}>
          <EduCard theme={theme} img="/images/nec.png"
            title="Executive Masters in Artificial Intelligence"
            school="New England College (NEC)" />

          <EduCard theme={theme} img="/images/uic.png"
            title="Masters in Business Analytics"
            school="University of Illinois Chicago" />

          <EduCard theme={theme} img="/images/thapar.jpg"
            title="Bachelors in Engineering"
            school="Thapar University" />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" style={section}>
        <h2 style={h2}>Skills</h2>

        <div style={skillsLayout}>
          <div style={{ flex:1 }}>
            {skills.map(s => <SkillBar key={s.name} skill={s}/>)}
          </div>

          <img src="/images/strengths.jpg"
            style={{ maxWidth:400, borderRadius:20 }}
          />
        </div>
      </section>

      {/* WORK */}
      <section id="work" style={section}>
        <h2 style={h2}>Work Experience</h2>

        <div style={workGrid}>
          {jobs.map(job => (
            <WorkCard key={job.title} job={job} theme={theme} />
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" style={section}>
        <h2 style={h2}>Projects</h2>

        <div style={grid}>
          {repos.map(r => (
            <a key={r.id}
              href={r.html_url}
              target="_blank"
              rel="noreferrer"
              style={projectCard(theme)}>
              <h3>{r.name}</h3>
              <p>{r.description}</p>
            </a>
          ))}
        </div>
      </section>

      {/* CONTACT + IMAGE */}
      <section id="contact" style={section}>
        <h2 style={h2}>Contact</h2>

        <div style={{
          display:"flex",
          gap:60,
          flexWrap:"wrap",
          alignItems:"center",
          marginTop:40
        }}>
          <div style={{ flex:1, minWidth:260 }}>
            <p style={{ fontSize:18 }}>
              Email: <b>deepaksinghal112@gmail.com</b>
            </p>

            <a href="https://www.linkedin.com/in/deepak112/"
              target="_blank"
              rel="noreferrer"
              style={{ color:"#6c5ce7", fontSize:18 }}>
              LinkedIn Profile →
            </a>
          </div>

          <img src="/images/contact.webp"
            style={{
              width:"100%",
              maxWidth:420,
              borderRadius:24,
              boxShadow:"0 25px 60px rgba(0,0,0,.2)"
            }}
          />
        </div>
      </section>

      {/* QUOTE */}
      <section style={{
        padding:"120px 20px",
        textAlign:"center",
        opacity: quoteVisible ? 1 : 0,
        transform: quoteVisible ? "translateY(0)" : "translateY(40px)",
        transition:"all 1s ease"
      }}>
        <p style={{
          fontFamily:"var(--font-space)",
          fontSize:"clamp(20px,3vw,28px)",
          fontStyle:"italic"
        }}>
          "What doesn't kill you only makes you stronger."
        </p>

        <p style={{ marginTop:20, opacity:.6 }}>
          — The Dark Knight Rises
        </p>
      </section>

      {/* SCROLL TOP */}
      <button onClick={scrollTop} style={scrollBtn}>↑</button>

    </div>
  );
}

/* COMPONENTS */

function WorkCard({ job, theme }) {
  return (
    <div style={{
      background: theme.card,
      color: theme.text,
      padding:30,
      borderRadius:20,
      boxShadow:"0 15px 40px rgba(0,0,0,.15)"
    }}>
      <img src={job.img} style={{ height:60, marginBottom:20 }} />
      <h3>{job.title}</h3>
      <p style={{ opacity:.7 }}>{job.company}</p>
      <p style={{ marginTop:16 }}>{job.details}</p>
    </div>
  );
}

function EduCard({ img, title, school, theme }) {
  return (
    <div style={{
      background: theme.card,
      color: theme.text,
      padding:30,
      borderRadius:20,
      textAlign:"center",
      boxShadow:"0 15px 40px rgba(0,0,0,.15)"
    }}>
      <img src={img} style={{ height:70, marginBottom:20 }} />
      <h3>{title}</h3>
      <p style={{ opacity:.7 }}>{school}</p>
    </div>
  );
}

function SkillBar({ skill }) {
  return (
    <div style={{ marginBottom:20 }}>
      <div style={{ display:"flex", justifyContent:"space-between" }}>
        <span>{skill.name}</span>
        <span>{skill.level}/10</span>
      </div>
      <div style={{ height:10, background:"#ddd", borderRadius:20 }}>
        <div style={{
          width:`${skill.level*10}%`,
          height:"100%",
          background:"#6c5ce7",
          borderRadius:20
        }}/>
      </div>
    </div>
  );
}

/* DATA */

const skills = [
  { name:"Python", level:8 },
  { name:"SQL", level:9 },
  { name:"Tableau", level:8 },
  { name:"Databricks", level:7 },
  { name:"Airflow", level:7 },
  { name:"Java", level:8 }
];

const jobs = [
  {
    img:"/images/spectramedix.jpg",
    title:"Senior Data Engineer (Analytics)",
    company:"SpectraMD",
    details:"Improved healthcare readmission prediction accuracy by 25% by building production-grade DBT pipelines on Snowflake, orchestrated with Airflow, delivering ML-ready datasets and Tableau analytics. Collaborated with global data science, analytics, and QA teams to ensure consistent business logic and high-quality feature data. Reduced infrastructure costs by $60K/month by optimizing storage using Apache Parquet. Cut manual operational work by 30% by modernizing legacy ingestion into automated Airflow pipelines. Improved compute efficiency by 50% and reduced errors by 80% by automating Tableau publishing and UAT validation for 40M+ row datasets. Accelerated analytics delivery by 30% through reusable Python-based data quality frameworks."
  },
  {
    img:"/images/spectramedix.jpg",
    title:"Data Engineer (Intern)",
    company:"SpectraMD",
    details:"Reduced data processing time by 40% by building a scalable healthcare data lake on AWS S3 and developing ELT pipelines using DBT, Snowflake, and Airflow. Improved analytics performance through STAR schema modeling and enabled business reporting via Tableau dashboards. Designed an MS SQL Server data model with automated date-based backups and historical tracking, supporting visualization and monitoring of 800K+ monthly healthcare records to generate actionable business insights."
  },
  {
    img:"/images/VW.jpg",
    title:"Full Stack Developer",
    company:"Volkswagen",
      details:"Improved user experience by 20% by integrating vehicle equipment services through Spring Boot microservices on AWS while contributing to PRN platform development. Increased online sales by 30% by building authentication workflows, search APIs, and newsletter features using AEM, Java, and React. Reduced data processing latency by 20% by designing an optimized MongoDB architecture supporting real-time customer data for ~400K CMS users."

  },
  {
    img:"/images/spectramedix.jpg",
    title:"Software Developer (Java)",
    company:"SpectraMD",
    details:"Reduced data processing time by 20% by migrating from a monolithic system to a scalable ETL pipeline using Spring Batch and Talend, improving data integration into relational databases. Improved data reliability and reduced manual errors by 20% by automating binary processing and data analysis workflows using Apache Camel and Jaspersoft, streamlining production releases and operational efficiency."
  }
];

/* STYLES */

const section = { padding:"100px 8%" };

const heroSection = {
  padding:"140px 8%",
  display:"flex",
  gap:60,
  flexWrap:"wrap",
  alignItems:"center"
};

const heroImage = { maxWidth:420, borderRadius:24 };

const eduGrid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
  gap:24
};

const skillsLayout = {
  display:"flex",
  gap:60,
  flexWrap:"wrap",
  alignItems:"center"
};

const workGrid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(260px,1fr))",
  gap:24
};

const grid = {
  display:"grid",
  gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",
  gap:24
};

const projectCard = (theme) => ({
  padding:24,
  borderRadius:16,
  background: theme.card,
  color: theme.text,
  textDecoration:"none",
  boxShadow:"0 15px 40px rgba(0,0,0,.15)"
});

const homeBtn = {
  position:"fixed", left:20, top:20,
  padding:"10px 16px",
  background:"#6c5ce7",
  border:"none", borderRadius:8,
  color:"white", zIndex:1000
};

const themeBtn = {
  position:"fixed", right:20, top:20,
  padding:"10px 14px",
  background:"#6c5ce7",
  border:"none", borderRadius:8,
  color:"white", zIndex:1000
};

const scrollBtn = {
  position:"fixed", right:20, bottom:20,
  background:"#6c5ce7",
  border:"none", color:"white",
  padding:"14px 16px",
  borderRadius:"50%",
  fontSize:18,
  zIndex:1000
};

const h1 = {
  fontFamily:"var(--font-space)",
  fontSize:"clamp(42px,6vw,64px)"
};

const h2 = {
  fontFamily:"var(--font-space)",
  fontSize:32
};

const heroBody = {
  marginTop:20,
  fontSize:20,
  lineHeight:1.6
};
