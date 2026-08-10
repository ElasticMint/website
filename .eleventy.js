// markdown-it is what Eleventy uses to render the posts themselves. Reused here so FAQ answers
// in frontmatter can carry links, which is how FAQs feed the interlinking plan.
// Declared in package.json rather than relied on as a hoisted transitive dep of Eleventy: this
// require would break silently the day Eleventy swapped its Markdown library.
const markdownIt = require("markdown-it");
const mdInline = markdownIt({ html: true });

module.exports = function (eleventyConfig) {
  // Render a frontmatter string as inline Markdown (links, emphasis) with no wrapping <p>.
  // Used for FAQ answers in src/_includes/post.njk.
  eleventyConfig.addFilter("mdInline", (value) =>
    mdInline.renderInline(String(value || ""))
  );

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
