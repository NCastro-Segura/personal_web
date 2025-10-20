// Updated fetchPublications function for your index.html
// Replace the existing fetchPublications function with this

async function fetchPublications() {
    try {
        // Determine the API endpoint based on environment
        // When deployed on Netlify, this will use the serverless function
        // When on GitHub Pages, it falls back to mock data
        const isNetlify = window.location.hostname.includes('netlify.app');
        const apiUrl = isNetlify 
            ? '/.netlify/functions/fetch-publications'
            : null;

        if (apiUrl) {
            // Fetch from Netlify function
            const response = await fetch(apiUrl);
            
            if (!response.ok) {
                throw new Error(`API request failed: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (data.success) {
                // Update statistics with real data
                document.getElementById('pub-count').textContent = data.stats.totalPublications;
                document.getElementById('citation-count').textContent = data.stats.totalCitations;
                document.getElementById('h-index').textContent = data.stats.hIndex;
                
                // Display publications
                displayPublications(data.publications);
            } else {
                throw new Error(data.message || 'Failed to fetch publications');
            }
        } else {
            // Fallback to mock data for GitHub Pages
            console.log('Using mock data - deploy to Netlify for live ADS integration');
            setTimeout(() => {
                const mockPublications = [
                    {
                        title: "A persistent ultraviolet outflow from an accreting neutron star binary transient",
                        authors: ["Castro Segura, N.", "Knigge, C.", "Long, K. S.", "et al."],
                        journal: "Nature",
                        year: "2022",
                        bibcode: "2022Natur.603...52C",
                        citations: 15,
                        abstract: "We report the discovery of persistent UV outflows in the neutron star X-ray binary Swift J1858.6-0814..."
                    },
                    {
                        title: "OPTICAM: A triple-camera optical system designed to explore the fastest timescales in Astronomy",
                        authors: ["Castro Segura, N.", "Knigge, C.", "Acosta-Pulido, J. A.", "et al."],
                        journal: "Monthly Notices of the Royal Astronomical Society",
                        year: "2019",
                        bibcode: "2019MNRAS.490.1035C",
                        citations: 8,
                        abstract: "We present OPTICAM, a high-time resolution, 3-colour, simultaneous optical imaging system..."
                    },
                    {
                        title: "The eclipsing accreting white dwarf Z Chameleontis as seen with TESS",
                        authors: ["Court, J. M. C.", "Scaringi, S.", "Rappaport, S.", "Castro Segura, N.", "et al."],
                        journal: "Monthly Notices of the Royal Astronomical Society",
                        year: "2020",
                        bibcode: "2020MNRAS.494.4656C",
                        citations: 12,
                        abstract: "We present high-cadence photometry of the eclipsing cataclysmic variable Z Chameleontis..."
                    }
                ];
                
                displayPublications(mockPublications);
            }, 2000);
        }
        
    } catch (error) {
        console.error('Error fetching publications:', error);
        showError();
    }
}

function displayPublications(publications) {
    const container = document.getElementById('publications-container');
    const loading = document.getElementById('publications-loading');
    
    loading.style.display = 'none';
    container.innerHTML = '';
    
    // Update statistics if using mock data
    if (!window.location.hostname.includes('netlify.app')) {
        const totalCitations = publications.reduce((sum, pub) => sum + (pub.citations || 0), 0);
        document.getElementById('pub-count').textContent = publications.length + '+';
        document.getElementById('citation-count').textContent = totalCitations + '+';
    }
    
    publications.forEach(pub => {
        const pubElement = document.createElement('article');
        pubElement.className = 'article-card';
        
        // Format authors (limit to first 5 + et al.)
        let authorString = pub.authors.slice(0, 5).join(', ');
        if (pub.authors.length > 5) {
            authorString += ', et al.';
        }
        
        pubElement.innerHTML = `
            <h3>${pub.title}</h3>
            <p style="color: rgba(255, 255, 255, 0.8); font-size: 0.9rem;">${authorString}</p>
            <p><strong>Published in:</strong> ${pub.journal}, ${pub.year}</p>
            <p style="color: rgba(255, 255, 255, 0.7); font-size: 0.9rem;">Citations: ${pub.citations || 0}</p>
            ${pub.abstract ? `<p style="color: rgba(255, 255, 255, 0.6); font-size: 0.85rem; margin-top: 0.5rem;">${pub.abstract.substring(0, 200)}...</p>` : ''}
            <a href="https://ui.adsabs.harvard.edu/abs/${pub.bibcode}" class="article-link" target="_blank">View on ADS →</a>
        `;
        container.appendChild(pubElement);
    });
    
    container.style.display = 'grid';
}

function showError() {
    const loading = document.getElementById('publications-loading');
    loading.innerHTML = `
        <div style="color: #ff6b6b;">Unable to load publications automatically</div>
        <div style="opacity: 0.7; margin-top: 0.5rem;">Please visit ADS directly to view publications</div>
        <div style="margin-top: 1rem;">
            <a href="https://ui.adsabs.harvard.edu/search/q=orcid%3A0000-0002-5870-0443" 
               class="btn" target="_blank" style="display: inline-block; text-decoration: none;">
                View on ADS
            </a>
        </div>
    `;
}

// Load publications when Research tab is clicked
let publicationsLoaded = false;
document.querySelector('[data-tab="research"]').addEventListener('click', function() {
    if (!publicationsLoaded) {
        fetchPublications();
        publicationsLoaded = true;
    }
});