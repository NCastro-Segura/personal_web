// Netlify Serverless Function to fetch ADS publications
// This handles CORS and API authentication

exports.handler = async function(event, context) {
  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // ADS API configuration
  const ADS_API_TOKEN = process.env.ADS_API_TOKEN; // Set this in Netlify environment variables
  const ORCID_ID = '0000-0002-5870-0443';
  
  // ADS API endpoint
  const ADS_URL = 'https://api.adsabs.harvard.edu/v1/search/query';
  
  // Query parameters
  const params = new URLSearchParams({
    q: `orcid:${ORCID_ID}`,
    fl: 'title,author,pub,year,bibcode,citation_count,abstract',
    rows: '10',
    sort: 'year desc'
  });

  try {
    // Fetch from ADS API
    const response = await fetch(`${ADS_URL}?${params}`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ADS_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error(`ADS API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform the response to a simpler format
    const publications = data.response.docs.map(doc => ({
      title: doc.title ? doc.title[0] : 'Untitled',
      authors: doc.author || [],
      journal: doc.pub || 'Unknown',
      year: doc.year || 'N/A',
      bibcode: doc.bibcode || '',
      citations: doc.citation_count || 0,
      abstract: doc.abstract || ''
    }));

    // Calculate statistics
    const totalCitations = publications.reduce((sum, pub) => sum + pub.citations, 0);
    const hIndex = calculateHIndex(publications.map(p => p.citations));

    // Return success response with CORS headers
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: true,
        publications: publications,
        stats: {
          totalPublications: publications.length,
          totalCitations: totalCitations,
          hIndex: hIndex
        }
      })
    };

  } catch (error) {
    console.error('Error fetching publications:', error);
    
    // Return error response
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        message: 'Failed to fetch publications from ADS'
      })
    };
  }
};

// Calculate h-index from citation counts
function calculateHIndex(citations) {
  if (!citations || citations.length === 0) return 0;
  
  // Sort citations in descending order
  const sorted = citations.sort((a, b) => b - a);
  
  let hIndex = 0;
  for (let i = 0; i < sorted.length; i++) {
    if (sorted[i] >= i + 1) {
      hIndex = i + 1;
    } else {
      break;
    }
  }
  
  return hIndex;
}

// Handle CORS preflight requests
if (event.httpMethod === 'OPTIONS') {
  return {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Access-Control-Allow-Methods': 'GET, OPTIONS'
    },
    body: ''
  };
}