import { JSDOM } from 'jsdom';

export const createPostBody = () => ({
  image: '',
  title: '',
  content: {},
  postId: '',
  description: '',
  rawContentText: '',
  is_fully_parsed: false,
  available_vacancies: 1,
});

export const getUrl = (per_page = 20) => {
  const url = new URL('https://jobsbox.pk/wp-json/wp/v2/posts');
  const params = [
    'id',
    'title',
    'content',
    'yoast_head_json.og_image',
    'yoast_head_json.og_description',
  ];

  url.searchParams.set('_fields', params.join(','));
  url.searchParams.set('per_page', per_page);
  url.searchParams.set('orderBy', 'date');

  return url.href;
};

const parseCell = (table, cls) => {
  const keyCell = table.querySelector(cls)?.closest('td');
  const valueCell = keyCell?.nextElementSibling;
  return valueCell?.textContent?.trim();
};

const parseInformationTable = (table) => {
  return {
    education: parseCell(table, '.fa-graduation-cap'),
    total_vacancies: parseCell(table, '.fa-bullhorn'),
    last_date: parseCell(table, '.fa-calendar-alt'),
    location: parseCell(table, '.fa-map-marker'),
    address: parseCell(table, '.fa-map-signs'),
    company: parseCell(table, '.fa-building'),
  };
};

const parsePositionsList = (list) => {
  const liItems = list.querySelectorAll('li');
  return [...liItems].map((position) => position.textContent.trim());
};

export const parseRawContent = (content) => {
  let result = {};
  const dom = new JSDOM(content);
  const body = dom.window.document.body;
  const table = body.querySelector('.posttable');
  const list = body.querySelector('.ttty ul');

  if (table) {
    const cells = parseInformationTable(table);
    result = { ...cells };
  }

  if (list) {
    const positions = parsePositionsList(list);
    result.positions = positions;
  }

  const isFullyParsed = Object.keys(result) !== 0;
  body.querySelector('style')?.remove();
  body.querySelector('.hidedesktop')?.remove();

  const text = body.textContent.trim();
  const rawContentText = text
    .split('\n')
    .filter((line) => /\S/.test(line))
    .join('\n');

  return [result, isFullyParsed, rawContentText];
};
