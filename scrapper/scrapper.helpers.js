export const createPostBody = () => ({
  image: '',
  title: '',
  address: '',
  content: '',
  company: '',
  deadline: '',
  location: '',
  posted_on: '',
  positions: [],
  education: '',
  description: '',
  available_vacancies: 1,
});

export const getUrl = () => {
  const url = new URL('https://jobsbox.pk/wp-json/wp/v2/posts');
  const params = [
    'id',
    'title',
    'content',
    'yoast_head_json.og_image',
    'yoast_head_json.og_description',
  ];

  url.searchParams.set('_fields', params.join(','));
  url.searchParams.set('per_page', '20');
  url.searchParams.set('orderBy', 'date');

  return url.href;
};
