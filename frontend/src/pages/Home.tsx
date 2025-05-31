import React, { useEffect } from 'react';

export default function Home() {
  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <>
      <div id="wrapper">
        {/* Header */}
        <header id="header" className="alt">
          <h1>Meng-Syuan (Elmo) Lin</h1>
          <p>
            Software Developer at TSMC | ex-Microsoft, Intel, Hewlett Packard Enterprise
            <br />
          </p>
        </header>

      

        {/* Main Content */}
        <div id="main">
          {/* About Me Section */}
          <section id="intro" className="main spotlight">
            <div className="content">
              <header className="major">
                <h2>About Me</h2>
              </header>
              <p>I'm Elmo Lin, currently working as a Software Developer at TSMC.</p>
            </div>
            <span className="image">
              <img src="/assets/images/Elmo1.jpg" alt="Elmo Lin" />
            </span>
          </section>

          {/* Education Section */}
          <section id="first" className="main special features">
            <header className="major">
              <h2>Education</h2>
            </header>

            <div className="feature-row">
              <div className="feature-icon">
                <img src="/assets/images/NCU.png" alt="NCU Logo" className="logo" />
              </div>
              <div className="feature-content">
                <p>
                  <strong>M.S. in Computer Science</strong>
                  <br />
                  National Central University, <em>Sept. 2022 - July 2024</em>
                  <br />
                  GPA 4.19/4.3
                  <br />
                  Teaching Assistant: “Programming Language”, “Linux Operating System”
                  <br />
                  <a href="https://adl.tw/" className="link-darkred">Advanced Defense Lab</a>
                  <br />
                  Advisor: Prof. <strong><a href="https://staff.csie.ncu.edu.tw/hsufh/" className="link-darkred">Fu-Hau Hsu</a></strong>
                </p>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-icon">
                <img src="/assets/images/NCU.png" alt="NCU Logo" className="logo" />
              </div>
              <div className="feature-content">
                <p>
                  <strong>B.S. in Mechanical Engineering</strong>
                  <br />
                  National Central University, <em>Sept. 2017 - Jun. 2022</em>
                  <br />
                  Minor in Computer Science
                </p>
              </div>
            </div>
          </section>

          {/* Work Experience Section */}
          <section id="second" className="main special features">
            <header className="major">
              <h2>Work Experience</h2>
            </header>

            <div className="feature-row">
              <div className="feature-icon">
                <img src="/assets/images/TSMC.png" alt="TSMC Logo" className="logo" />
              </div>
              <div className="feature-content">
                <p>
                  <strong>
                    Taiwan Semiconductor Manufacturing Company - Software Developer,
                  </strong>{' '}
                  <em>Sep. 2024 -</em>
                </p>
                <ul>
                  <li>DevOps team, Factory Systems Infrastructure Department</li>
                  <li>Implemented OpenTelemetry instrumentation to measure and analyze API latency and performance across multiple applications, enabling data-driven optimizations and improved observability</li>
                  <li>Deployed and managed Apache Airflow to orchestrate ETL workflows, ensuring reliable data pipelines and seamless integration with downstream analytics</li>
                  <li>Maintained and scaled alerting and isolation systems, rolling out deployments across all manufacturing facilities to enhance operational resilience and incident response.</li>
                </ul>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-icon">
                <img src="/assets/images/HPE.png" alt="HPE Logo" className="logo" />
              </div>
              <div className="feature-content">
                <p>
                  <strong>
                    Hewlett Packard Enterprise - System Software Engineer Intern,
                  </strong>{' '}
                  <em>July 2023 - Jun. 2024</em>
                </p>
                <ul>
                  <li>Linux Enablement team, Firmware and OS Engineering Department</li>
                  <li>Developed an automation tool for testing multiple Linux distributions (Ubuntu, RedHat, CentOS, Citrix)</li>
                  <li>Developed a web service to analyze boot log data (30,000+ lines) and extract key information</li>
                </ul>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-icon">
                <img src="/assets/images/intel.png" alt="Intel Logo" className="logo" />
              </div>
              <div className="feature-content">
                <p>
                  <strong>
                    Intel Corporation - Software and Data Analytic Intern,
                  </strong>{' '}
                  <em>July 2022 - Jun. 2023</em>
                </p>
                <ul>
                  <li>Platform Architecture Infrastructure Validation team, Data Center & AI Department</li>
                  <li>Developed an automation tool for setting up environments and running scripts on 50+ servers, reducing setup time by 90%</li>
                  <li>Collaborated with hardware engineers to visualize departmental data and identify weekly trends</li>
                </ul>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-icon">
                <img src="/assets/images/microsoft.png" alt="Microsoft Logo" className="logo" />
              </div>
              <div className="feature-content">
                <p>
                  <strong>
                    Microsoft Corporation - Software Engineer Intern,
                  </strong>{' '}
                  <em>July 2020 - Jun. 2021</em>
                </p>
                <ul>
                  <li>Project Management Team, Cloud Hardware Manufacturing Engineering Department</li>
                  <li>Developed a Python alert service to track supplier performance</li>
                  <li>Built a dashboard to visualize 100+ checklists and assist PMs in analysis</li>
                  <li>Served as a Microsoft Student Ambassador, sharing internship experiences and organizing workshops on campus</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Projects Section */}
          <section id="cta" className="main special features">
            <header className="major">
              <h2>Projects</h2>
            </header>

            <div className="feature-row">
              <div className="feature-icon">
                <img src="/assets/images/linux.png" alt="Linux Project Logo" className="logo" />
              </div>
              <div className="feature-content">
                <p>
                  <strong>Protect Remote Files in Linux, </strong>
                  <em>June 2023 -</em>
                </p>
                <ul>
                  <li>Designed a system to restrict remote file access according to WFH security requirements</li>
                  <li>Placed important file paths into a ban list to block remote access</li>
                  <li>Allowed file access only when connected to the company network</li>
                  <li>Implemented in the OS kernel using sockets to check remote IP and enforce restrictions</li>
                  <li>Completed in C within the Linux Kernel</li>
                  <li>Environment: Virtual Machine on GCP</li>
                </ul>
              </div>
            </div>

            <div className="feature-row">
              <div className="feature-icon">
                <img src="/assets/images/rasberrypi.png" alt="Raspberry Pi Logo" className="logo" />
              </div>
              <div className="feature-content">
                <p>
                  <strong>Operating System Design & Implementation (Bare Programming), </strong>
                  <em>Feb. 2023 - June 2023</em>
                </p>
                <ul>
                  <li>Developed a basic shell and UART bootloader on rpi3b</li>
                  <li>Implemented a simple memory allocator and buddy system</li>
                  <li>Created a Round Robin scheduler</li>
                  <li>Tools: ARM, C, Linux environment, rpi3b</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Skills Section */}
          <section id="skill" className="main special skills">
            <header className="major">
              <h2>Skills</h2>
            </header>
            <div className="badges">
              <img src="https://img.shields.io/badge/c-%2300599C.svg?style=for-the-badge&logo=c&logoColor=white" alt="C Badge" />
              <img src="https://img.shields.io/badge/c++-%2300599C.svg?style=for-the-badge&logo=c%2B%2B&logoColor=white" alt="C++ Badge" />
              <img src="https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white" alt="Java Badge" />
              <img src="https://img.shields.io/badge/go-%2300ADD8.svg?style=for-the-badge&logo=go&logoColor=white" alt="Go Badge" />
              <img src="https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54" alt="Python Badge" />
              <img src="https://img.shields.io/badge/GoogleCloud-%234285F4.svg?style=for-the-badge&logo=google-cloud&logoColor=white" alt="Google Cloud Badge" />
              <img src="https://img.shields.io/badge/django-%23092E20.svg?style=for-the-badge&logo=django&logoColor=white" alt="Django Badge" />
              <img src="https://img.shields.io/badge/flask-%23000.svg?style=for-the-badge&logo=flask&logoColor=white" alt="Flask Badge" />
              <img src="https://img.shields.io/badge/apache-%23D42029.svg?style=for-the-badge&logo=apache&logoColor=white" alt="Apache Badge" />
              <img src="https://img.shields.io/badge/nginx-%23009639.svg?style=for-the-badge&logo=nginx&logoColor=white" alt="Nginx Badge" />
              <img src="https://img.shields.io/badge/redis-%23DD0031.svg?style=for-the-badge&logo=redis&logoColor=white" alt="Redis Badge" />
              <img src="https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB Badge" />
              <img src="https://img.shields.io/badge/postgres-%23316192.svg?style=for-the-badge&logo=postgresql&logoColor=white" alt="Postgres Badge" />
              <img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white" alt="Docker Badge" />
              <img src="https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=for-the-badge&logo=kubernetes&logoColor=white" alt="Kubernetes Badge" />
              <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" alt="JavaScript Badge" />
              <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5 Badge" />
              <img src="https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3 Badge" />
            </div>
          </section>
        </div>

        {/* Footer */}
        <footer id="footer">
          <section>
            <h2>Contact Me</h2>
            <dl className="alt">
              <dt>Address</dt>
              <dd>Taoyuan, Taiwan</dd>
              <dt>Phone</dt>
              <dd>(886) 0958189988</dd>
              <dt>Email</dt>
              <dd><a href="mailto:alvin4883889@gmail.com">alvin4883889@gmail.com</a></dd>
            </dl>
            <ul className="icons">
              <li><a href="https://www.facebook.com/mengxuan.lin1/" className="icon brands fa-facebook-f alt"><span className="label">Facebook</span></a></li>
              <li><a href="https://www.instagram.com/elmoelmo_/" className="icon brands fa-instagram alt"><span className="label">Instagram</span></a></li>
              <li><a href="https://github.com/Elmo-Lin" className="icon brands fa-github alt"><span className="label">GitHub</span></a></li>
              <li><a href="https://www.linkedin.com/in/elmoelmo" className="icon brands fa-linkedin alt"><span className="label">LinkedIn</span></a></li>
            </ul>
          </section>
          <p className="copyright">&copy; Elmo. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
        </footer>
      </div>

      {/* Global CSS */}
      <style>{`
        /* Reset & Global Styles */
        *,
        *::before,
        *::after {
          box-sizing: border-box;
        }
        html, body {
          margin: 0;
          padding: 0;
          font-family: 'Source Sans Pro', sans-serif;
          color: #444;
          line-height: 1.6;
          background: #f4f4f4;
        }
        a {
          color: inherit;
          text-decoration: none;
        }
        ul {
          margin: 0;
          padding: 0;
          list-style: none;
        }
        img {
          max-width: 100%;
          display: block;
        }

        /* Wrapper */
        #wrapper {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }

        /* Header */
        #header {
          background: #2c3e50;
          color: #fff;
          text-align: center;
          padding: 2rem 0 1rem;
        }
        #header h1 {
          margin: 0;
          font-size: 2rem;
        }
        #header p {
          margin: 0.5rem 0 0;
          font-size: 0.9rem;
          font-weight: 300;
        }

        /* Navigation */
        #nav {
          position: sticky;
          top: 0;
          background: rgba(44, 62, 80, 0.95);
          z-index: 100;
        }
        #nav ul {
          display: flex;
          justify-content: center;
        }
        #nav li {
          margin: 0;
        }
        #nav a {
          display: block;
          padding: 1rem 1.5rem;
          color: #fff;
          font-weight: 500;
          transition: background 0.3s;
        }
        #nav a:hover,
        #nav a.active {
          background: #1abc9c;
        }

        /* Main Content */
        #main {
          flex: 1;
          padding: 2rem 1rem;
          max-width: 1000px;
          margin: 0 auto;
        }

        /* Spotlight (About Me) */
        .main.spotlight {
          display: flex;
          flex-wrap: wrap;
          gap: 2rem;
          align-items: center;
          margin-bottom: 4rem;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        }
        .main.spotlight .content {
          flex: 1 1 400px;
          padding: 2rem;
        }
        .main.spotlight .content h2 {
          margin-top: 0;
          font-size: 2rem;
        }
        .main.spotlight .content p {
          margin: 1rem 0 0;
          font-size: 1rem;
        }
        .main.spotlight .image {
          flex: 1 1 5px;
        }
        .main.spotlight .image img {
          width: 100%;
          height: auto;
        }

        /* Features (Education, Work, Projects) */
        .main.special.features {
          margin-bottom: 4rem;
        }
        .main.special.features .major h2 {
          font-size: 2rem;
          margin-bottom: 1.5rem;
          text-align: center;
        }
        .feature-row {
          display: flex;
          align-items: center;
          margin-bottom: 2rem;
          background: #fff;
          border-radius: 8px;
          overflow: hidden;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
        }
        .feature-icon {
          flex: 0 0 100px;
          background: #f0f0f0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 1rem;
        }
        .feature-icon .logo {
          width: 80%;
          height: auto;
        }
        .feature-content {
          flex: 1;
          padding: 1rem 1.5rem;
        }
        .feature-content p {
          margin: 0;
          font-size: 1rem;
        }
        .feature-content ul {
          margin: 0.5rem 0 0;
          padding-left: 1rem;
        }
        .feature-content ul li {
          margin-bottom: 0.5rem;
          font-size: 0.95rem;
          line-height: 1.4;
        }
        .link-darkred {
          color: darkred;
        }

        /* Skills */
        .main.special.skills {
          padding-bottom: 4rem;
        }
        .main.special.skills .badges {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          justify-content: center;
          margin-top: 1rem;
        }
        .main.special.skills .badges img {
          height: 32px;
        }

        /* Footer */
        #footer {
          background: #2c3e50;
          color: #fff;
          padding: 2rem 1rem;
          text-align: center;
        }
        #footer h2 {
          margin: 0 0 1rem;
          font-size: 1.5rem;
        }
        #footer dl.alt {
          margin-bottom: 1rem;
        }
        #footer dt {
          font-weight: bold;
        }
        #footer dd {
          margin: 0 0 0.5rem;
        }
        #footer .icons {
          display: flex;
          justify-content: center;
          gap: 1rem;
          margin: 1rem 0;
        }
        #footer .icons a {
          color: #fff;
          font-size: 1.25rem;
          transition: color 0.3s;
        }
        #footer .icons a:hover {
          color: #1abc9c;
        }
        #footer p.copyright {
          margin: 1rem 0 0;
          font-size: 0.9rem;
          opacity: 0.7;
        }

        /* Responsive */
        @media (max-width: 768px) {
          #main {
            padding: 1rem;
          }
          .feature-row {
            flex-direction: column;
          }
          .feature-icon {
            width: 100%;
          }
          .feature-content {
            padding: 1rem;
          }
          .main.spotlight {
            flex-direction: column;
          }
        }
      `}</style>
    </>
  );
}
