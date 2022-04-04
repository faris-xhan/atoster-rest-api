import { createPostBody, getUrl, parseRawContent } from './scrapper.helpers.js';

import axios from 'axios';
import Post from '../schema/Post.js';

const scrape = async (per_page) => {
  const url = getUrl(per_page);
  const response = await axios.get(url);
  const results = await response.data;
  const postedIds = await Post.find({});

  const postsIds = [];
  const posts = [];
  results.forEach((result) => {
    const isPosted = postedIds.find((posted) => posted.id === result.id);

    if (isPosted) {
      return;
    }
    const post = createPostBody();
    post.title = result.title.rendered;
    post.image = result.yoast_head_json.og_image?.[0]?.url;
    post.description = result.yoast_head_json.og_description;
    // content, is_fully_parsed, rawContextText
    const [c, is_fp, rc] = parseRawContent(result.content.rendered);

    post.content = c;
    post.rawContentText = rc;
    post.is_fully_parsed = is_fp;

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
