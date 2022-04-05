import { JSDOM } from 'jsdom';

export const getUrl = (after) => {
  const url = new URL('https://jobs.com.pk/wp-json/wp/v2/posts');
  const params = ['id', 'title', 'content', 'date'];

  url.searchParams.set('orderBy', 'date');
  url.searchParams.set('_fields', params.join(','));
  if (after) {
    url.searchParams.set('after', after);
  }

  return url.href;
};

export const parseTable = (table) => {
  const rows = table.querySelectorAll('tr');
  const values = {};
  for (let row of rows) {
    const key = row.firstChild;
    const value = row.lastChild;
    if (key.textContent.toLowerCase().includes('organization'))
      values.company = value.textContent;
    if (key.textContent.toLowerCase().includes('vacancy'))
      values.positions = value.textContent.split(',');
    if (key.textContent.toLowerCase().includes('education'))
      values.education = value.textContent;
    if (key.textContent.toLowerCase().includes('total'))
      // Remove a plus sign if there is one
      values.total_vacancies =
        value.textContent?.replace(/(\d+)(\+)?/g, '$1') || 1;

    if (key.textContent.toLowerCase().includes('location')) {
      const [locations] = value?.textContent.split('&') || ['Pakistan'];
      const locationsArray = locations.split(',');
      values.address = locationsArray.join(',');
    }
    if (key.textContent.toLowerCase().includes('last date'))
      values.last_date = value.textContent;
  }

  return values;
};

export const parseContent = (content) => {
  const dom = new JSDOM(content);
  const body = dom.window.document.body;

  const image = body.querySelector('img').src;
  const table = body.querySelector('table');
  const cells = parseTable(table);
  const description = body.querySelector('p').textContent;

  const isFullyParsed = Object.keys(cells).length !== 0;
  body.querySelectorAll('script').forEach((s) => s.remove());
  const rawContentText = body.textContent
    .split('\n')
    .filter((line) => /\S/.test(line))
    .map((line) => line.trim())
    .join('\n');

  return {
    image,
    description,
    isFullyParsed,
    rawContentText,
    content: cells,
  };
};
