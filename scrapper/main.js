import { createPostBody, getUrl, parseRawContent } from './scrapper.helpers.js';

import axios from 'axios';

const scrape = async (per_page) => {
  const url = getUrl(per_page);
  const response = await axios.get(url);
  const results = await response.data;

  const postsIds = [];
  const posts = [];
  results.forEach((result) => {
    const post = createPostBody();
    post.title = result.title.rendered;
    post.raw_content = result.content.rendered;
    post.image = result.yoast_head_json.og_image?.[0]?.url;
    post.description = result.yoast_head_json.og_description;
    [post.content, post.fully_parsed] = parseRawContent(
      result.content.rendered
    );

    posts.push(post);
    postsIds.push(result.id);
  });

  return {
    posts,
    url,
    ids: postsIds,
  };
};

export { scrape };
