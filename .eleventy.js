module.exports = function (eleventyConfig) {
  // Format a date as DD.MM.YY to match the site's existing style (e.g. 26.04.26)
  eleventyConfig.addFilter("dmyDate", (value) => {
    const dt = new Date(value);
    const dd = String(dt.getUTCDate()).padStart(2, "0");
    const mm = String(dt.getUTCMonth() + 1).padStart(2, "0");
    const yy = String(dt.getUTCFullYear()).slice(-2);
    return `${dd}.${mm}.${yy}`;
  });

  // Take the first n items of an array (used to show the latest N posts)
  eleventyConfig.addFilter("limit", (arr, n) => (arr || []).slice(0, n));

  // Blog posts, newest first. Posts are tagged "post" via src/blog/blog.11tydata.js
  eleventyConfig.addCollection("posts", (collectionApi) =>
    collectionApi.getFilteredByTag("post").sort((a, b) => b.date - a.date)
  );

  return {
    dir: {
      input: "src",
      includes: "_includes",
      data: "_data",
      output: "docs",
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
