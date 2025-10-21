// Debug version of fetch-publications function
// Use this to see EXACTLY what's happening

exports.handler = async function(event, context) {
  console.log('========================================');
  console.log('FUNCTION INVOKED');
  console.log('========================================');
  console.log('Event:', JSON.stringify(event, null, 2));
  
  // Handle CORS preflight
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

  // Only allow GET
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

  const ADS_API_TOKEN = process.env.ADS_API_TOKEN;
  const ORCID_ID = '0000-0002-5870-0443';
  
  console.log('Token exists:', !!ADS_API_TOKEN);
  console.log('Token length:', ADS_API_TOKEN ? ADS_API_TOKEN.length : 0);
  
  if (!ADS_API_TOKEN) {
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: 'ADS_API_TOKEN not configured'
      })
    };
  }
  
  // Get query parameters
  const queryParams = event.queryStringParameters || {};
  console.log('Query params received:', queryParams);
  
  const page = parseInt(queryParams.page) || 1;
  const pageSize = parseInt(queryParams.pageSize) || 10;
  const start = (page - 1) * pageSize;
  
  console.log('Parsed pagination:');
  console.log('  page:', page);
  console.log('  pageSize:', pageSize);
  console.log('  start:', start);
  
  // Build query
  const nameVariations = [
        'author:"Castro-Segura"',
        'author:"Castro Segura"',
        'author:"Castro Segura, Noel"',
        'author:"Castro Segura, N."',
        'author:"Segura, N. Castro"',
        'author:"Segura, Noel Castro"',
        `orcid:${ORCID_ID}`
    ];
  const searchQuery = `(${nameVariations.join(' OR ')}) NOT author:"Segura, C"`;
  const baseUrl = 'https://api.adsabs.harvard.edu/v1/search/query';
  
  // Build URL exactly like the working local test
  const queryUrl = `${baseUrl}?q=${encodeURIComponent(searchQuery)}&fl=title,author,pub,year,bibcode,citation_count,abstract,doi&rows=${pageSize}&start=${start}&sort=date+desc`;
  
  console.log('========================================');
  console.log('ADS API REQUEST');
  console.log('========================================');
  console.log('Search query:', searchQuery);
  console.log('Full URL:', queryUrl);
  console.log('');

  try {
    const fetchStart = Date.now();
    
    const response = await fetch(queryUrl, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${ADS_API_TOKEN}`,
        'Content-Type': 'application/json'
      }
    });
    
    const fetchTime = Date.now() - fetchStart;
    console.log(`Fetch completed in ${fetchTime}ms`);
    console.log('Response status:', response.status);
    console.log('Response headers:', JSON.stringify(Object.fromEntries(response.headers.entries()), null, 2));

    if (!response.ok) {
      const errorText = await response.text();
      console.error('ADS API ERROR:', response.status);
      console.error('Error body:', errorText);
      
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: false,
          error: `ADS API error: ${response.status}`,
          details: errorText,
          debug: {
            queryUrl: queryUrl.replace(ADS_API_TOKEN, 'REDACTED')
          }
        })
      };
    }

    const data = await response.json();
    
    console.log('========================================');
    console.log('ADS API RESPONSE');
    console.log('========================================');
    console.log('Response keys:', Object.keys(data));
    
    if (!data.response) {
      console.error('CRITICAL: Missing response object!');
      console.error('Full data:', JSON.stringify(data, null, 2));
      
      return {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          success: false,
          error: 'Unexpected ADS response structure',
          receivedKeys: Object.keys(data),
          fullResponse: data
        })
      };
    }
    
    const docs = data.response.docs || [];
    const numFound = data.response.numFound || 0;
    const responseStart = data.response.start || 0;
    
    console.log('CRITICAL VALUES:');
    console.log('  numFound:', numFound, '<-- TOTAL publications in ADS');
    console.log('  docs.length:', docs.length, '<-- Returned in this response');
    console.log('  start:', responseStart, '<-- ADS start position');
    console.log('  requested start:', start);
    console.log('  requested rows:', pageSize);
    
    // Transform publications
    const publications = docs.map((doc, index) => {
      const pub = {
        title: (Array.isArray(doc.title) ? doc.title[0] : doc.title) || 'Untitled',
        authors: doc.author || [],
        journal: doc.pub || 'Unknown',
        year: doc.year || 'N/A',
        bibcode: doc.bibcode || '',
        citations: doc.citation_count || 0,
        abstract: doc.abstract || '',
        doi: (Array.isArray(doc.doi) ? doc.doi[0] : doc.doi) || null
      };
      
      if (index < 3) {
        console.log(`  Publication ${index + 1}:`, pub.year, '-', pub.title.substring(0, 50));
      }
      
      return pub;
    });
    
    console.log('Transformed', publications.length, 'publications');

    // Calculate pagination
    const totalResults = numFound;
    const totalPages = Math.ceil(totalResults / pageSize);
    const totalCitations = publications.reduce((sum, pub) => sum + pub.citations, 0);

    console.log('========================================');
    console.log('PAGINATION CALCULATION');
    console.log('========================================');
    console.log('  totalResults (numFound):', totalResults);
    console.log('  pageSize:', pageSize);
    console.log('  totalPages:', totalPages);
    console.log('  currentPage:', page);
    console.log('  hasNextPage:', page < totalPages);
    console.log('  hasPreviousPage:', page > 1);

    const responseBody = {
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
        functionVersion: 'debug-v1',
        query: searchQuery,
        requestedPage: page,
        requestedPageSize: pageSize,
        requestedStart: start,
        adsNumFound: numFound,
        adsDocsReturned: docs.length,
        adsStart: responseStart,
        calculatedTotalPages: totalPages,
        fetchTimeMs: fetchTime
      }
    };
    
    console.log('========================================');
    console.log('FINAL RESPONSE');
    console.log('========================================');
    console.log('Sending response with:');
    console.log('  publications:', publications.length);
    console.log('  totalResults:', totalResults);
    console.log('  totalPages:', totalPages);
    console.log('  currentPage:', page);
    console.log('========================================');

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET, OPTIONS',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(responseBody)
    };

  } catch (error) {
    console.error('========================================');
    console.error('EXCEPTION CAUGHT');
    console.error('========================================');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    
    return {
      statusCode: 500,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        success: false,
        error: error.message,
        stack: error.stack,
        type: error.constructor.name
      })
    };
  }
};