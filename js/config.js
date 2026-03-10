// Dynamic API URL: Uses current origin for deployment/tunnel, or localhost:5000 for local dev (Live Server)
const API_BASE_URL = (window.location.port === '5500' || window.location.protocol === 'file:')
    ? 'http://localhost:5000'
    : window.location.origin;
