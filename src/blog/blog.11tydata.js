// Directory data for /src/blog. Applies to every Markdown post in this folder, so
// adding a post is just dropping in a new .md file with a few frontmatter fields
// (headline, description, date, summary). Everything below is derived automatically.
module.exports = {
  layout: "post.njk",
  tags: "post",
  ogType: "article",
  author: "Elastic Mint",
  // Default end-of-post call to action. Deliberately a small ask, because most
  // readers arrive from a question rather than with a project in hand. Any post
  // can override these four in its own frontmatter to match what it is about;
  // post.njk carries the same fallbacks so a partial override is safe.
  ctaHeading: "Next step",
  ctaTitle: "Tell us what you are weighing up",
  ctaButton: "Get in touch",
  ctaUrl: "/contact.html",
  bodyClass:
    "wp-singular post-template-default single single-post wp-theme-ElasticMint singular",
  eleventyComputed: {
    // Clean URLs: /blog/<slug>/
    permalink: (data) => `/blog/${data.page.fileSlug}/`,
    // Document <title> and OG title get the site's " - Elastic Mint" suffix;
    // the bare headline is used for the on-page H1 (see post.njk).
    title: (data) => `${data.headline} - Elastic Mint`,
    ogTitle: (data) => `${data.headline} - Elastic Mint`,
    ogDescription: (data) => data.description,
    canonical: (data) =>
      `https://www.elasticmint.com/blog/${data.page.fileSlug}/`,
    ogUrl: (data) => `https://www.elasticmint.com/blog/${data.page.fileSlug}/`,
    schemaGraph: (data) => {
      const url = `https://www.elasticmint.com/blog/${data.page.fileSlug}/`;
      const iso = new Date(data.page.date).toISOString();
      const graph = [
          {
            "@type": "Article",
            "@id": url + "#article",
            isPartOf: { "@id": url },
            author: { "@id": "https://www.elasticmint.com/#organization" },
            publisher: { "@id": "https://www.elasticmint.com/#organization" },
            headline: data.headline,
            description: data.description,
            datePublished: iso,
            dateModified: iso,
            mainEntityOfPage: { "@id": url },
            inLanguage: "en-GB",
          },
          {
            "@type": "WebPage",
            "@id": url,
            url: url,
            name: data.title,
            isPartOf: { "@id": "https://www.elasticmint.com/#website" },
            datePublished: iso,
            dateModified: iso,
            breadcrumb: { "@id": url + "#breadcrumb" },
            inLanguage: "en-GB",
          },
          {
            "@type": "BreadcrumbList",
            "@id": url + "#breadcrumb",
            itemListElement: [
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://www.elasticmint.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Blog",
                item: "https://www.elasticmint.com/blog/",
              },
              { "@type": "ListItem", position: 3, name: data.headline },
            ],
          },
          // WebSite and Organization used to be written out again here. They now come from
          // ../_data/schema.js via the `withSharedSchema` filter in base.njk, the same route the
          // .njk pages use, so the two generators can no longer drift apart. Declare only
          // post-specific nodes below this point.
      ];

      // Optional FAQ block. Driven by the same `faqs` frontmatter that post.njk renders
      // on the page, so the markup can never claim a question the reader cannot see.
      // Answers may contain Markdown links; strip to plain text for the schema.
      if (Array.isArray(data.faqs) && data.faqs.length) {
        const plain = (s) =>
          String(s || "")
            .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
            .replace(/[*_`]/g, "")
            .trim();
        graph.push({
          "@type": "FAQPage",
          "@id": url + "#faq",
          isPartOf: { "@id": url },
          mainEntity: data.faqs.map((f) => ({
            "@type": "Question",
            name: plain(f.q),
            acceptedAnswer: { "@type": "Answer", text: plain(f.a) },
          })),
        });
      }

      return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": graph,
      });
    },
  },
};
