import axios from 'axios';

const getPosts = async (after) => {
  return {
    posts: [after],
    ur: after,
  };
};

export default {
  getPosts,
};
