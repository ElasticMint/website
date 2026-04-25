module.exports = {
  eleventyComputed: {
    prefix: (data) => {
      const url = (data.page && data.page.url) || "";
      const path = url.replace(/^\/+/, "").replace(/index\.html$/, "").replace(/\/$/, "");
      if (!path) return "";
      return "../".repeat(path.split("/").length);
    },
  },
};
