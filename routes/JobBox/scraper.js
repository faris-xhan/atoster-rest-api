import { createPostBody, getUrl, parseRawContent } from './helpers.js';
import axios from 'axios';

const scrape = async (after) => {
  const url = getUrl(after);
  const response = await axios.get(url);
  const results = await response.data;

  const posts = [];
  results.forEach((result) => {
    const post = createPostBody();
    post.postId = result.id;
    post.postedOn = result.date;
    post.title = result.title.rendered;
    post.image = result.yoast_head_json.og_image?.[0]?.url;
    post.description = result.yoast_head_json.og_description;
    const [c, is_fp, rc] = parseRawContent(result.content.rendered);

    post.content = c;
    post.rawContentText = rc;
    post.is_fully_parsed = is_fp;

    posts.push(post);
  });

  return {
    posts,
    url,
  };
};

export default {
  getPosts: scrape,
  name: 'job-box',
};
