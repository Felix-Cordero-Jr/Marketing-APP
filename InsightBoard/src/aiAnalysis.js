/**
 * Basic AI pattern identification logic.
 * For demo purposes, this analyzes events and returns simple insights.
 */

export function analyzeEvents(events) {
  if (!events || events.length === 0) return [];

  const pageViewCounts = {};
  const clickCounts = {};

  events.forEach(event => {
    if (event.type === 'pageview') {
      pageViewCounts[event.page] = (pageViewCounts[event.page] || 0) + 1;
    } else if (event.type === 'click') {
      clickCounts[event.element] = (clickCounts[event.element] || 0) + 1;
    }
  });

  const mostVisitedPage = Object.entries(pageViewCounts).reduce(
    (max, entry) => (entry[1] > max[1] ? entry : max),
    ['', 0]
  )[0];

  const mostClickedElement = Object.entries(clickCounts).reduce(
    (max, entry) => (entry[1] > max[1] ? entry : max),
    ['', 0]
  )[0];

  const insights = [];

  if (mostVisitedPage) {
    insights.push(`Most visited page is "${mostVisitedPage}".`);
  }
  if (mostClickedElement) {
    insights.push(`Most clicked element is "${mostClickedElement}".`);
  }

  return insights;
}
