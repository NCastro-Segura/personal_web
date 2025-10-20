// Netlify Serverless Function to fetch ADS publications
// This handles CORS and API authentication

exports.handler = async function(event, context) {
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

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // ADS API configuration
  const ADS_API_TOKEN = process.env.ADS_API_TOKEN;
  const ORCID_ID = '0000-0002-5870-0443';
  
  // Check if token exists
  if (!ADS_API_TOKEN) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'ADS_API_TOKEN not configured',
        message: 'Please add ADS_API_TOKEN to Netlify environment variables'
      })
    };
  }
  
  // Get pagination parameters from query string
  const queryParams = event.queryStringParameters || {};
  const page = parseInt(queryParams.page) || 1;
  const pageSize = parseInt(queryParams.pageSize) || 10;
  const start = (page - 1) * pageSize;
  
  // ADS API endpoint
  const ADS_URL = 'https://api.adsabs.harvard.edu/v1/search/query';
  
  // Enhanced search query: ORCID OR author name with quotes
  const searchQuery = `orcid:${ORCID_ID} OR author:"Castro-Segura"`;
  
  // Build query URL manually with proper encoding
  // Note: fl parameter should be comma-separated, not array
  const queryUrl = `${ADS_URL}?q=${encodeURIComponent(searchQuery)}&fl=title,author,pub,year,bibcode,citation_count,abstract,doi&rows=${pageSize}&start=${start}&sort=date+desc`;

  try {
    console.log('=== ADS API Request ===');
    console.log('Full URL:', queryUrl);
    console.log('Query:', searchQuery);
    console.log('Page:', page, 'Start:', start, 'Rows:', pageSize);
    
    // Fetch from ADS API
    const response = await fetch(queryUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ADS_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ADS API error:', response.status, errorText);
      throw new Error(`ADS API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    console.log('=== ADS API Response ===');
    console.log('Response keys:', Object.keys(data));
    
    // ADS returns data in a nested structure under 'response'
    if (!data.response) {
      console.error('Unexpected response structure:', JSON.stringify(data, null, 2));
      throw new Error('Unexpected ADS API response structure - missing response object');
    }
    
    const docs = data.response.docs || [];
    const numFound = data.response.numFound || 0;
    
    console.log(`Total found: ${numFound}`);
    console.log(`Returned in this request: ${docs.length}`);
    console.log(`Start: ${data.response.start || 0}`);
    
    // Transform the response to a simpler format
    const publications = docs.map(doc => {
      // Handle fields that might be arrays or strings
      const getFirst = (field) => {
        if (!field) return null;
        return Array.isArray(field) ? field[0] : field;
      };
      
      return {
        title: getFirst(doc.title) || 'Untitled',
        authors: doc.author || [],
        journal: doc.pub || 'Unknown',
        year: doc.year || 'N/A',
        bibcode: doc.bibcode || '',
        citations: doc.citation_count || 0,
        abstract: doc.abstract || '',
        doi: getFirst(doc.doi)
      };
    });

    // Calculate pagination
    const totalResults = numFound;
    const totalPages = Math.ceil(totalResults / pageSize);

    // Calculate statistics for this page
    const totalCitations = publications.reduce((sum, pub) => sum + pub.citations, 0);

    console.log('=== Response Summary ===');
    console.log('Publications returned:', publications.length);
    console.log('Total results:', totalResults);
    console.log('Total pages:', totalPages);
    console.log('Current page:', page);

    // Return success response
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
        pagination: {
          currentPage: page,
          pageSize: pageSize,
          totalResults: totalResults,
          totalPages: totalPages,
          hasNextPage: page < totalPages,
          hasPreviousPage: page > 1,
          start: start,
          end: Math.min(start + pageSize, totalResults)
        },
        stats: {
          totalPublications: totalResults,
          citationsThisPage: totalCitations
        },
        debug: {
          query: searchQuery,
          requestUrl: queryUrl.replace(ADS_API_TOKEN, 'REDACTED'),
          adsResponse: {
            numFound: numFound,
            docsReturned: docs.length,
            start: data.response.start || 0
          }
        }
      })
    };

  } catch (error) {
    console.error('Error in function:', error);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        message: 'Failed to fetch publications from ADS',
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      })
    };
  }
};// Netlify Serverless Function to fetch ADS publications
// This handles CORS and API authentication

exports.handler = async function(event, context) {
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

  // Only allow GET requests
  if (event.httpMethod !== 'GET') {
    return {
      statusCode: 405,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ error: 'Method not allowed' })
    };
  }

  // ADS API configuration
  const ADS_API_TOKEN = process.env.ADS_API_TOKEN; // Set this in Netlify environment variables
  const ORCID_ID = '0000-0002-5870-0443';
  
  // Check if token exists
  if (!ADS_API_TOKEN) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'ADS_API_TOKEN not configured',
        message: 'Please add ADS_API_TOKEN to Netlify environment variables'
      })
    };
  }
  
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