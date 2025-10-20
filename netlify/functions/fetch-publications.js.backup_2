<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="Dr. Noel Castro Segura - Astrophysicist specializing in compact objects and time domain astronomy">
    <title>Dr. Noel Castro Segura - Astrophysicist</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif;
            background: linear-gradient(135deg, #0c0c1e 0%, #1a1a3e 50%, #2d2d5f 100%);
            color: white;
            overflow-x: hidden;
            height: 100vh;
        }
        .constellation-bg { position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; }
        .dot {
            position: absolute; width: 3px; height: 3px;
            background: rgba(255, 255, 255, 0.8);
            border-radius: 50%;
            animation: twinkle 3s infinite alternate;
        }
        .line {
            position: absolute; height: 1px;
            background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
            transform-origin: left center;
        }
        @keyframes twinkle { 0% { opacity: 0.3; } 100% { opacity: 1; } }
        .header {
            background: rgba(12, 12, 30, 0.9);
            backdrop-filter: blur(10px);
            border-bottom: 1px solid rgba(255, 255, 255, 0.1);
            padding: 1rem 0;
        }
        .header-content { max-width: 1200px; margin: 0 auto; padding: 0 2rem; }
        .logo { font-size: 1.5rem; font-weight: bold; margin-bottom: 1rem; text-align: center; }
        .tabs {
            display: flex; justify-content: center; gap: 0;
            border-bottom: 2px solid rgba(255, 255, 255, 0.1);
            flex-wrap: wrap;
        }
        .tab {
            background: transparent; color: rgba(255, 255, 255, 0.7);
            border: none; padding: 1rem 2rem; cursor: pointer;
            transition: all 0.3s; border-bottom: 3px solid transparent;
            font-size: 1rem;
        }
        .tab:hover { color: white; background: rgba(255, 255, 255, 0.05); }
        .tab.active {
            color: #64b5f6; border-bottom-color: #64b5f6;
            background: rgba(100, 181, 246, 0.1);
        }
        .content-area {
            height: calc(100vh - 200px);
            overflow-y: auto;
            padding: 2rem;
        }
        .tab-content {
            display: none; max-width: 1200px;
            margin: 0 auto; animation: fadeIn 0.3s ease-in-out;
        }
        .tab-content.active { display: block; }
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .home-content { text-align: center; padding: 3rem 0; }
        .home-content h1 {
            font-size: 3rem; margin-bottom: 1rem;
            background: linear-gradient(135deg, #64b5f6, #90caf9);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
        }
        .home-content p { font-size: 1.2rem; margin-bottom: 1rem; opacity: 0.8; }
        .stats {
            display: flex; justify-content: center;
            gap: 3rem; margin-top: 3rem; flex-wrap: wrap;
        }
        .stat-item {
            text-align: center; padding: 1.5rem;
            background: rgba(255, 255, 255, 0.05);
            border-radius: 10px; border: 1px solid rgba(255, 255, 255, 0.1);
            min-width: 150px;
        }
        .stat-number { font-size: 2.5rem; font-weight: bold; color: #64b5f6; }
        .about-content {
            display: grid; grid-template-columns: 300px 1fr;
            gap: 3rem; align-items: start; padding: 2rem 0;
        }
        .profile-placeholder {
            width: 250px; height: 250px;
            background: rgba(255, 255, 255, 0.1);
            border-radius: 50%; display: flex;
            align-items: center; justify-content: center;
            border: 2px solid #64b5f6; margin: 0 auto;
        }
        .about-text { font-size: 1.1rem; line-height: 1.6; }
        .about-text p { margin-bottom: 1.5rem; }
        .research-content { padding: 2rem 0; }
        .featured-articles {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
            gap: 2rem;
        }
        .article-card {
            background: rgba(255, 255, 255, 0.05);
            padding: 2rem; border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            transition: transform 0.3s, border-color 0.3s;
        }
        .article-card:hover { transform: translateY(-5px); border-color: #64b5f6; }
        .article-card h3 { color: #64b5f6; margin-bottom: 1rem; font-size: 1.3rem; }
        .article-card p { line-height: 1.6; margin-bottom: 1rem; }
        .article-link { color: #64b5f6; text-decoration: none; font-weight: bold; }
        .article-link:hover { text-decoration: underline; }
        .contact-content { max-width: 800px; margin: 0 auto; padding: 2rem 0; }
        .contact-form {
            background: rgba(255, 255, 255, 0.05);
            padding: 2rem; border-radius: 10px;
            border: 1px solid rgba(255, 255, 255, 0.1);
            margin-bottom: 3rem;
        }
        .form-group { margin-bottom: 1.5rem; }
        .form-group label { display: block; margin-bottom: 0.5rem; color: #64b5f6; }
        .form-group input, .form-group textarea {
            width: 100%; padding: 0.75rem;
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
            border-radius: 5px; color: white; font-family: inherit;
        }
        .form-group input:focus, .form-group textarea:focus {
            outline: none; border-color: #64b5f6;
        }
        .btn {
            background: linear-gradient(135deg, #64b5f6, #42a5f5);
            color: white; padding: 0.75rem 2rem;
            border: none; border-radius: 5px;
            cursor: pointer; transition: transform 0.3s;
            font-size: 1rem;
        }
        .btn:hover { transform: translateY(-2px); }
        .global-footer {
            position: fixed; bottom: 0; left: 0; right: 0;
            display: flex; justify-content: center; gap: 2rem;
            padding: 1rem 2rem;
            background: rgba(12, 12, 30, 0.8);
            backdrop-filter: blur(15px);
            border-top: 1px solid rgba(100, 181, 246, 0.2);
            z-index: 1000; flex-wrap: wrap;
        }
        .footer-link {
            display: flex; align-items: center; gap: 0.5rem;
            padding: 0.5rem 1rem;
            background: rgba(100, 181, 246, 0.1);
            border: 1px solid rgba(100, 181, 246, 0.3);
            border-radius: 25px; color: #64b5f6;
            text-decoration: none; transition: all 0.3s;
            font-size: 0.9rem; font-weight: 500;
        }
        .footer-link:hover {
            background: rgba(100, 181, 246, 0.2);
            border-color: #64b5f6;
            transform: translateY(-2px);
        }
        .footer-link svg { width: 18px; height: 18px; }
        .section-title {
            font-size: 2.5rem; margin-bottom: 2rem;
            text-align: center; color: #64b5f6;
        }
        @media (max-width: 768px) {
            .about-content { grid-template-columns: 1fr; }
            .home-content h1 { font-size: 2rem; }
            .tab { padding: 0.75rem 1rem; font-size: 0.9rem; }
            .featured-articles { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <div class="constellation-bg" id="constellation"></div>
    
    <header class="header">
        <div class="header-content">
            <div class="logo">Dr. Noel Castro Segura - Astrophysicist</div>
            <nav class="tabs">
                <button class="tab active" data-tab="home">Home</button>
                <button class="tab" data-tab="about">About</button>
                <button class="tab" data-tab="research">Research</button>
                <button class="tab" data-tab="publications">Publications</button>
                <button class="tab" data-tab="contact">Contact</button>
            </nav>
        </div>
    </header>
    
    <div class="global-footer">
        <a href="https://orcid.org/0000-0002-5870-0443" class="footer-link" target="_blank">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.372 0 0 5.372 0 12s5.372 12 12 12 12-5.372 12-12S18.628 0 12 0zM7.369 4.378c.525 0 .947.431.947.947 0 .525-.422.947-.947.947-.525 0-.946-.422-.946-.947 0-.516.421-.947.946-.947zm-.722 3.038h1.444v10.041H6.647V7.416zm3.562 0h3.9c3.712 0 5.344 2.653 5.344 5.025 0 2.578-2.016 5.016-5.325 5.016h-3.919V7.416zm1.444 1.303v7.444h2.297c2.359 0 3.588-1.444 3.588-3.722 0-2.016-1.091-3.722-3.847-3.722h-2.038z"/></svg>
            ORCID
        </a>
        <a href="https://github.com/NCastro-Segura" class="footer-link" target="_blank">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
            GitHub
        </a>
        <a href="cv.pdf" class="footer-link" target="_blank">
            <svg viewBox="0 0 24 24" fill="currentColor"><path d="M14,2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18A2,2 0 0,0 20,20V8L14,2M18,20H6V4H13V9H18V20Z"/></svg>
            Download CV
        </a>
    </div>
    
    <main class="content-area">
        <div id="home" class="tab-content active">
            <div class="home-content">
                <h1>Dr. Noel Castro Segura</h1>
                <p>Astrophysicist & Research Fellow</p>
                <p>University of Southampton</p>
                <p>Specialist in compact objects, time domain astronomy, and accretion physics</p>
            </div>
        </div>
        
        <div id="about" class="tab-content">
            <h2 class="section-title">About Me</h2>
            <div class="about-content">
                <div><div class="profile-placeholder"><span>Profile Photo</span></div></div>
                <div class="about-text">
                    <p>I am an astrophysicist specializing in compact objects and time domain astronomy at the University of Southampton. My research focuses on understanding the fundamental processes of accretion and outflows in neutron stars and black holes.</p>
                    <p>My work combines multi-wavelength observational astronomy with theoretical modeling to explore some of the most extreme environments in the universe. I am particularly interested in how matter behaves under the extreme gravitational fields of compact objects.</p>
                    <p>Current research interests include X-ray binary systems, accretion disc winds, neutron star binaries, and the development of high-speed optical instrumentation for time-resolved astronomy. I am actively involved in the development of OPTICAM, a triple-camera optical system designed to explore the fastest timescales in astronomy.</p>
                    <p>I contribute to international collaborations and use data from space-based missions as well as ground-based telescopes to study the rapid variability and outflow phenomena in accreting compact objects.</p>
                </div>
            </div>
        </div>
        
        <div id="research" class="tab-content">
            <h2 class="section-title">Research & Publications</h2>
            <div class="stats" style="margin-bottom: 3rem;">
                <div class="stat-item"><div class="stat-number">25+</div><div>Publications</div></div>
                <div class="stat-item"><div class="stat-number">200+</div><div>Citations</div></div>
                <div class="stat-item"><div class="stat-number">8</div><div>h-index</div></div>
            </div>
            <div class="research-content">
                <div class="featured-articles">
                    <article class="article-card">
                        <h3>A persistent ultraviolet outflow from an accreting neutron star binary transient</h3>
                        <p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">Castro Segura, N., Knigge, C., Long, K. S., et al.</p>
                        <p><strong>Published in:</strong> Nature, 2022</p>
                        <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Citations: 15</p>
                        <a href="https://ui.adsabs.harvard.edu/abs/2022Natur.603...52C" class="article-link" target="_blank">View on ADS →</a>
                    </article>
                    <article class="article-card">
                        <h3>OPTICAM: A triple-camera optical system designed to explore the fastest timescales in Astronomy</h3>
                        <p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">Castro Segura, N., Knigge, C., Acosta-Pulido, J. A., et al.</p>
                        <p><strong>Published in:</strong> Monthly Notices of the Royal Astronomical Society, 2019</p>
                        <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Citations: 8</p>
                        <a href="https://ui.adsabs.harvard.edu/abs/2019MNRAS.490.1035C" class="article-link" target="_blank">View on ADS →</a>
                    </article>
                    <article class="article-card">
                        <h3>The eclipsing accreting white dwarf Z Chameleontis as seen with TESS</h3>
                        <p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">Court, J. M. C., Scaringi, S., Rappaport, S., Castro Segura, N., et al.</p>
                        <p><strong>Published in:</strong> Monthly Notices of the Royal Astronomical Society, 2020</p>
                        <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Citations: 12</p>
                        <a href="https://ui.adsabs.harvard.edu/abs/2020MNRAS.494.4656C" class="article-link" target="_blank">View on ADS →</a>
                    </article>
                </div>
                <div style="text-align: center; margin-top: 3rem;">
                    <p style="opacity: 0.8; margin-bottom: 1rem;">Featured publications - For complete list visit ADS</p>
                    <a href="https://ui.adsabs.harvard.edu/search/q=orcid%3A0000-0002-5870-0443" class="btn" target="_blank" style="display: inline-block; text-decoration: none;">View All Publications on ADS</a>
                </div>
            </div>
        </div>
        
        <div id="publications" class="tab-content">
            <h2 class="section-title">All Publications</h2>
            <div style="text-align: center; padding: 2rem;">
                <p style="opacity: 0.8; margin-bottom: 2rem;">For a complete and up-to-date list of all publications, please visit:</p>
                <a href="https://ui.adsabs.harvard.edu/search/q=orcid%3A0000-0002-5870-0443" class="btn" target="_blank" style="display: inline-block; text-decoration: none; margin-bottom: 2rem;">View All Publications on ADS</a>
                <br>
                <a href="https://orcid.org/0000-0002-5870-0443" class="btn" target="_blank" style="display: inline-block; text-decoration: none;">View ORCID Profile</a>
            </div>
        </div>
        
        <div id="contact" class="tab-content">
            <h2 class="section-title">Contact Me</h2>
            <div class="contact-content">
                <form class="contact-form" id="contactForm">
                    <div class="form-group"><label for="name">Name</label><input type="text" id="name" name="name" required></div>
                    <div class="form-group"><label for="email">Email</label><input type="email" id="email" name="email" required></div>
                    <div class="form-group"><label for="subject">Subject</label><input type="text" id="subject" name="subject" required></div>
                    <div class="form-group"><label for="message">Message</label><textarea id="message" name="message" rows="6" required placeholder="Your message here..."></textarea></div>
                    <button type="submit" class="btn">Send Message</button>
                </form>
            </div>
        </div>
    </main>
    
    <script>
        // Constellation animation
        function createConstellation(){const e=document.getElementById("constellation"),t=40,n=[];for(let o=0;o<t;o++){const t=document.createElement("div");t.className="dot";const l=100*Math.random(),a=100*Math.random();t.style.left=l+"%",t.style.top=a+"%",t.style.animationDelay=3*Math.random()+"s",e.appendChild(t),n.push({element:t,x:l,y:a,vx:.02*(Math.random()-.5),vy:.02*(Math.random()-.5)})}!function t(){e.querySelectorAll(".line").forEach(e=>e.remove()),n.forEach(e=>{e.x+=e.vx,e.y+=e.vy,(e.x<=0||e.x>=100)&&(e.vx*=-1),(e.y<=0||e.y>=100)&&(e.vy*=-1),e.x=Math.max(0,Math.min