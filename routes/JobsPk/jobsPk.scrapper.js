import axios from 'axios';
import { getUrl, parseContent } from './jobsPk.helpers.js';
import { createPostBody } from '../../helpers.js';

const getPosts = async (after) => {
  const url = getUrl(after);
  const response = await axios.get(url);
  const results = await response.data;

  const posts = [];
  results.forEach((result) => {
    const post = createPostBody();

    post.postId = result.id;
    post.postedOn = result.date;
    post.title = result.title.rendered;
    const { content, description, image, isFullyParsed, rawContentText } =
      parseContent(result.content.rendered);

    post.image = image;
    post.content = content;
    post.description = description;
    post.is_fully_parsed = isFullyParsed;
    post.rawContentText = rawContentText;

    posts.push(post);
  });

  return {
    posts,
    url,
  };
};

export default {
  getPosts,
};
