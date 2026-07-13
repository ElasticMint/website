// Directory data for /src/blog. Applies to every Markdown post in this folder, so
// adding a post is just dropping in a new .md file with a few frontmatter fields
// (headline, description, date, summary). Everything below is derived automatically.
module.exports = {
  layout: "post.njk",
  tags: "post",
  ogType: "article",
  author: "Elastic Mint",
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
      return JSON.stringify({
        "@context": "https://schema.org",
        "@graph": [
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
          {
            "@type": "WebSite",
            "@id": "https://www.elasticmint.com/#website",
            url: "https://www.elasticmint.com/",
            name: "Elastic Mint",
            publisher: { "@id": "https://www.elasticmint.com/#organization" },
            inLanguage: "en-GB",
          },
          {
            "@type": "Organization",
            "@id": "https://www.elasticmint.com/#organization",
            name: "Elastic Mint",
            url: "https://www.elasticmint.com/",
            logo: {
              "@type": "ImageObject",
              "@id": "https://www.elasticmint.com/#/schema/logo/image/",
              url: "https://www.elasticmint.com/wp-content/uploads/2023/02/LOGO_mint-back.jpg",
              contentUrl:
                "https://www.elasticmint.com/wp-content/uploads/2023/02/LOGO_mint-back.jpg",
              width: 1500,
              height: 1060,
            },
            sameAs: [
              "https://x.com/elasticmint",
              "https://www.linkedin.com/company/elastic-mint-ltd/",
            ],
          },
        ],
      });
    },
  },
};
