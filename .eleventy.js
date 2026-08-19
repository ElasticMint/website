// markdown-it is what Eleventy uses to render the posts themselves. Reused here so FAQ answers
// in frontmatter can carry links, which is how FAQs feed the interlinking plan.
// Declared in package.json rather than relied on as a hoisted transitive dep of Eleventy: this
// require would break silently the day Eleventy swapped its Markdown library.
const markdownIt = require("markdown-it");
const mdInline = markdownIt({ html: true });

// The Organization and WebSite nodes that are identical on every page. See src/_data/schema.js
// for why they live in one place. Required directly here so the filter below does not depend on
// Eleventy's data cascade, which is not available inside a filter.
const sharedSchema = require("./src/_data/schema.js");

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

  // Append the shared Organization and WebSite nodes to a page's own schema graph.
  // Pages declare only their page-specific nodes in `schemaGraph`; base.njk pipes them through
  // this. Throws rather than silently emitting a half-graph, because malformed JSON-LD is the
  // kind of fault that ships unnoticed and this is the whole reason the nodes were centralised.
  eleventyConfig.addFilter("withSharedSchema", (pageGraph) => {
    if (!pageGraph) return "";
    let parsed;
    try {
      parsed = typeof pageGraph === "string" ? JSON.parse(pageGraph) : pageGraph;
    } catch (e) {
      throw new Error(`schemaGraph is not valid JSON: ${e.message}`);
    }
    const pageNodes = Array.isArray(parsed) ? parsed : parsed["@graph"];
    if (!Array.isArray(pageNodes)) {
      throw new Error("schemaGraph must be an array of nodes or an object with an @graph array");
    }
    // A page redeclaring a shared node would reintroduce exactly the drift this removes.
    const clash = pageNodes.find((n) =>
      n && (n["@id"] === sharedSchema.ids.ORG_ID || n["@id"] === sharedSchema.ids.SITE_ID)
    );
    if (clash) {
      throw new Error(
        `schemaGraph redeclares shared node ${clash["@id"]}; remove it, it comes from src/_data/schema.js`
      );
    }
    return JSON.stringify({
      "@context": "https://schema.org",
      "@graph": [...pageNodes, ...sharedSchema.sharedNodes],
    });
  });

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
