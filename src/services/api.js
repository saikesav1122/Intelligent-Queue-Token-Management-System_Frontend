const API_BASE_URL = 'http://localhost:5000/api';

// Generate Token API
export const generateToken = async (customerName, serviceType) => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        customerName,
        serviceType,
        timestamp: new Date().toISOString()
      }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate token');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Get Queue Status
export const getQueueStatus = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/queue-status`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch queue status');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Get All Counters
export const getCounters = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/counters`);
    
    if (!response.ok) {
      throw new Error('Failed to fetch counters');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// Call Next Token
export const callNextToken = async (counterId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/next-token`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ counterId }),
    });

    if (!response.ok) {
      throw new Error('Failed to call next token');
    }

    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};