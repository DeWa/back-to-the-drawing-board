module.exports = {
  eleventyComputed: {
    coverUrl: (data) => {
      if (data.cover) {
        return `./src/${data.page.url}/${data.cover}`;
      } else {
        return '';
      }
    },
  },
};
