import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { analyzeEvents } from '../aiAnalysis';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

export default function Dashboard({ website, updateEvents }) {
  const [events, setEvents] = useState(website.events || []);
  const [insights, setInsights] = useState([]);

  useEffect(() => {
    setEvents(website.events || []);
  }, [website]);

  useEffect(() => {
    const newInsights = analyzeEvents(events);
    setInsights(newInsights);
  }, [events]);

  // Summarize events for charts
  const pageViews = {};
  const clicks = {};
  let totalTime = 0;

  events.forEach((event) => {
    if (event.type === 'pageview') {
      pageViews[event.page] = (pageViews[event.page] || 0) + 1;
      totalTime += event.timeSpent || 0;
    } else if (event.type === 'click') {
      clicks[event.element] = (clicks[event.element] || 0) + 1;
    }
  });

  const pageViewData = {
    labels: Object.keys(pageViews),
    datasets: [
      {
        label: 'Page Views',
        data: Object.values(pageViews),
        backgroundColor: 'rgba(26, 35, 126, 0.7)',
      },
    ],
  };

  const clickData = {
    labels: Object.keys(clicks),
    datasets: [
      {
        label: 'Clicks',
        data: Object.values(clicks),
        backgroundColor: 'rgba(0, 188, 212, 0.7)',
      },
    ],
  };

  return (
    <div>
      <h2>Dashboard for {website.url}</h2>
      <div>
        <h3>Key Metrics</h3>
        <p>Total Page Views: {events.filter(e => e.type === 'pageview').length}</p>
        <p>Total Clicks: {events.filter(e => e.type === 'click').length}</p>
        <p>Total Time Spent: {totalTime} seconds</p>
      </div>
      <div style={{ display: 'flex', gap: '20px', marginTop: '20px' }}>
        <div style={{ flex: 1 }}>
          <Bar data={pageViewData} />
        </div>
        <div style={{ flex: 1 }}>
          <Bar data={clickData} />
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Insights</h3>
        {insights.length === 0 ? (
          <p>No insights available yet.</p>
        ) : (
          <ul>
            {insights.map((insight, idx) => (
              <li key={idx}>{insight}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
