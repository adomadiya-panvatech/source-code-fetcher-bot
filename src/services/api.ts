
const API_BASE_URL = 'http://localhost:5000';

// API utility functions
export const apiRequest = async (endpoint: string, options: RequestInit = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const config: RequestInit = {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
  };

  // Add auth token if available
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers = {
      ...config.headers,
      'Authorization': `Bearer ${token}`,
    };
  }

  const response = await fetch(url, config);
  
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  
  return response.json();
};

export const api = {
  // Auth endpoints
  login: (credentials: { email: string; password: string }) =>
    apiRequest('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  
  getProfile: () => apiRequest('/auth/me'),
  
  updateProfile: (profileData: any) =>
    apiRequest('/auth/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    }),

  // Contacts endpoints
  getContacts: () => apiRequest('/contacts'),
  
  createContact: (contactData: any) =>
    apiRequest('/contacts', {
      method: 'POST',
      body: JSON.stringify(contactData),
    }),
  
  getContact: (id: string) => apiRequest(`/contacts/${id}`),
  
  updateContact: (id: string, contactData: any) =>
    apiRequest(`/contacts/${id}`, {
      method: 'PUT',
      body: JSON.stringify(contactData),
    }),
  
  deleteContact: (id: string) =>
    apiRequest(`/contacts/${id}`, {
      method: 'DELETE',
    }),
  
  getContactStats: () => apiRequest('/contacts/stats'),

  // Leads endpoints
  getLeads: () => apiRequest('/leads'),
  
  createLead: (leadData: any) =>
    apiRequest('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    }),
  
  getLead: (id: string) => apiRequest(`/leads/${id}`),
  
  updateLead: (id: string, leadData: any) =>
    apiRequest(`/leads/${id}`, {
      method: 'PUT',
      body: JSON.stringify(leadData),
    }),
  
  deleteLead: (id: string) =>
    apiRequest(`/leads/${id}`, {
      method: 'DELETE',
    }),
  
  getLeadStats: () => apiRequest('/leads/stats'),

  // Opportunities endpoints
  getOpportunities: () => apiRequest('/api/opportunities'),
  
  createOpportunity: (opportunityData: any) =>
    apiRequest('/api/opportunities', {
      method: 'POST',
      body: JSON.stringify(opportunityData),
    }),
  
  getOpportunity: (id: string) => apiRequest(`/api/opportunities/${id}`),
  
  updateOpportunity: (id: string, opportunityData: any) =>
    apiRequest(`/api/opportunities/${id}`, {
      method: 'PUT',
      body: JSON.stringify(opportunityData),
    }),
  
  deleteOpportunity: (id: string) =>
    apiRequest(`/api/opportunities/${id}`, {
      method: 'DELETE',
    }),
  
  getOpportunityStats: () => apiRequest('/api/opportunities/stats'),

  // Accounts endpoints
  getAccounts: () => apiRequest('/users'),
  
  createAccount: (accountData: any) =>
    apiRequest('/users', {
      method: 'POST',
      body: JSON.stringify(accountData),
    }),
  
  getAccount: (id: string) => apiRequest(`/users/${id}`),
  
  updateAccount: (id: string, accountData: any) =>
    apiRequest(`/users/${id}`, {
      method: 'PUT',
      body: JSON.stringify(accountData),
    }),
  
  deleteAccount: (id: string) =>
    apiRequest(`/users/${id}`, {
      method: 'DELETE',
    }),
  
  getAccountStats: () => apiRequest('/users/stats'),

  // Dashboard endpoints
  getDashboardSummary: () => apiRequest('/dashboard/summary'),
  
  getConversionRate: () => apiRequest('/dashboard/conversion-rate'),
  
  getTopPerformers: () => apiRequest('/dashboard/top-performers'),
  
  getMonthlyStats: () => apiRequest('/dashboard/monthly-stats'),
  
  getRecentActivity: () => apiRequest('/dashboard/recent-activity'),
};
