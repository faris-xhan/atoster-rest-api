import { createPostBody, getUrl } from './scrapper.helpers.js';

import axios from 'axios';

const scrape = async () => {
  const url = getUrl();
  const response = await axios.get(url);
  const results = await response.data;

  const posts = [];
  results.forEach((result) => {
    const post = createPostBody();
    post.title = result.title.rendered;
    post.content = result.content.rendered;
    post.image = result.yoast_head_json.og_image?.[0]?.url;
    post.description = result.yoast_head_json.og_description;

    posts.push(post);
  });

  return posts;
};

export { scrape };
