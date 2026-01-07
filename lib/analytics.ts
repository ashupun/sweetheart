const DATABUDDY_API_KEY = process.env.DATABUDDY_API_KEY;
const DATABUDDY_WEBSITE_ID = process.env.DATABUDDY_WEBSITE_ID;
const API_BASE = "https://api.databuddy.cc/v1";

interface AnalyticsQuery {
  type: string;
  websiteId: string;
  filters?: Record<string, string>;
  limit?: number;
}

export async function queryAnalytics(query: AnalyticsQuery) {
  if (!DATABUDDY_API_KEY) {
    return { error: "Analytics not configured" };
  }

  const response = await fetch(`${API_BASE}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": DATABUDDY_API_KEY,
    },
    body: JSON.stringify({
      type: query.type,
      website_id: query.websiteId,
      filters: query.filters || {},
      limit: query.limit || 100,
    }),
  });

  if (!response.ok) {
    return { error: "Failed to fetch analytics" };
  }

  return response.json();
}

export async function getPageViews(username: string, days = 7) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const response = await fetch(`${API_BASE}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": DATABUDDY_API_KEY,
    },
    body: JSON.stringify({
      type: "pages",
      website_id: DATABUDDY_WEBSITE_ID,
      filters: {
        date_from: startDate,
        date_to: endDate,
        page: `/${username}`,
      },
      limit: 1,
    }),
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;

  const data = await response.json();
  return data;
}

export async function getSummary(days = 7) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  const response = await fetch(`${API_BASE}/query`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": DATABUDDY_API_KEY,
    },
    body: JSON.stringify({
      type: "summary",
      website_id: DATABUDDY_WEBSITE_ID,
      filters: {
        date_from: startDate,
        date_to: endDate,
      },
    }),
    next: { revalidate: 300 },
  });

  if (!response.ok) return null;

  return response.json();
}

export async function getProfileAnalytics(username: string, days = 30) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const response = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": DATABUDDY_API_KEY,
      },
      body: JSON.stringify({
        type: "custom_events",
        website_id: DATABUDDY_WEBSITE_ID,
        filters: {
          date_from: startDate,
          date_to: endDate,
          event_name: "profile_viewed",
          "properties.username": username,
        },
      }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

export async function getLinkClicks(username: string, days = 30) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const response = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": DATABUDDY_API_KEY,
      },
      body: JSON.stringify({
        type: "custom_events",
        website_id: DATABUDDY_WEBSITE_ID,
        filters: {
          date_from: startDate,
          date_to: endDate,
          event_name: "link_clicked",
          "properties.username": username,
        },
      }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

export async function getGeo(username: string, days = 30) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const response = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": DATABUDDY_API_KEY,
      },
      body: JSON.stringify({
        type: "geo",
        website_id: DATABUDDY_WEBSITE_ID,
        filters: {
          date_from: startDate,
          date_to: endDate,
          page: `/${username}`,
        },
        limit: 10,
      }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

export async function getTraffic(username: string, days = 30) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const response = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": DATABUDDY_API_KEY,
      },
      body: JSON.stringify({
        type: "traffic",
        website_id: DATABUDDY_WEBSITE_ID,
        filters: {
          date_from: startDate,
          date_to: endDate,
          page: `/${username}`,
        },
        limit: 10,
      }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

export async function getPerformance(username: string, days = 30) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const response = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": DATABUDDY_API_KEY,
      },
      body: JSON.stringify({
        type: "performance",
        website_id: DATABUDDY_WEBSITE_ID,
        filters: {
          date_from: startDate,
          date_to: endDate,
          page: `/${username}`,
        },
      }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

export async function getSessions(username: string, days = 30) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const response = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": DATABUDDY_API_KEY,
      },
      body: JSON.stringify({
        type: "sessions",
        website_id: DATABUDDY_WEBSITE_ID,
        filters: {
          date_from: startDate,
          date_to: endDate,
          page: `/${username}`,
        },
        limit: 50,
      }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

export async function getEngagement(username: string, days = 30) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const response = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": DATABUDDY_API_KEY,
      },
      body: JSON.stringify({
        type: "engagement",
        website_id: DATABUDDY_WEBSITE_ID,
        filters: {
          date_from: startDate,
          date_to: endDate,
          page: `/${username}`,
        },
      }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

export async function getDevices(username: string, days = 30) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const response = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": DATABUDDY_API_KEY,
      },
      body: JSON.stringify({
        type: "devices",
        website_id: DATABUDDY_WEBSITE_ID,
        filters: {
          date_from: startDate,
          date_to: endDate,
          page: `/${username}`,
        },
        limit: 10,
      }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

export async function getBrowsers(username: string, days = 30) {
  if (!DATABUDDY_API_KEY || !DATABUDDY_WEBSITE_ID) {
    return null;
  }

  const endDate = new Date().toISOString().split("T")[0];
  const startDate = new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString().split("T")[0];

  try {
    const response = await fetch(`${API_BASE}/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": DATABUDDY_API_KEY,
      },
      body: JSON.stringify({
        type: "browsers",
        website_id: DATABUDDY_WEBSITE_ID,
        filters: {
          date_from: startDate,
          date_to: endDate,
          page: `/${username}`,
        },
        limit: 10,
      }),
      next: { revalidate: 300 },
    });

    if (!response.ok) return null;

    return response.json();
  } catch {
    return null;
  }
}

