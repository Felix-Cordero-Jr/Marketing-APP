/**
 * Tracking script to be embedded in client websites.
 * Collects page views, clicks, and time on page.
 * Stores events in localStorage under 'insightBoardEvents'.
 */

(function() {
  const STORAGE_KEY = 'insightBoardEvents';

  function getEvents() {
    const events = localStorage.getItem(STORAGE_KEY);
    return events ? JSON.parse(events) : [];
  }

  function saveEvents(events) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
  }

  function trackPageView() {
    const events = getEvents();
    const event = {
      type: 'pageview',
      page: window.location.pathname,
      timestamp: Date.now(),
      timeSpent: 0
    };
    events.push(event);
    saveEvents(events);
    return event;
  }

  function trackClick(event) {
    const events = getEvents();
    const clickEvent = {
      type: 'click',
      element: event.target.tagName + (event.target.id ? '#' + event.target.id : ''),
      timestamp: Date.now()
    };
    events.push(clickEvent);
    saveEvents(events);
  }

  let pageViewEvent = trackPageView();

  // Track time on page
  let startTime = Date.now();
  window.addEventListener('beforeunload', () => {
    const endTime = Date.now();
    const timeSpent = Math.round((endTime - startTime) / 1000);
    const events = getEvents();
    // Update last pageview event with timeSpent
    for (let i = events.length - 1; i >= 0; i--) {
      if (events[i].type === 'pageview' && events[i].timestamp === pageViewEvent.timestamp) {
        events[i].timeSpent = timeSpent;
        break;
      }
    }
    saveEvents(events);
  });

  // Track clicks
  document.addEventListener('click', trackClick);
})();
