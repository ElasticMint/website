// Shared JSON-LD nodes: the Organization and WebSite that appear identically on every page.
//
// Why this file exists. These two nodes used to be written out by hand inside the `schemaGraph`
// frontmatter string of all 20 .njk pages, and separately in blog/blog.11tydata.js. Twenty-one
// copies of the same thing drift, and they did: by 19 August the Organization node carried two
// different `name` values under one `@id`, plus three further field-level differences, and the
// WebSite node carried two more. Everything shared now lives here once.
//
// How it reaches the page. `.eleventy.js` registers a `withSharedSchema` filter that appends these
// nodes to whatever page-specific nodes a template declares; `base.njk` applies it. The blog's
// data file requires this module directly. Pages therefore declare only what is genuinely theirs:
// WebPage, BreadcrumbList, Article, FAQPage, Service.
//
// If you change anything here it changes on all 26 pages at once. That is the point.

const SITE = "https://www.elasticmint.com/";
const ORG_ID = SITE + "#organization";
const SITE_ID = SITE + "#website";
const LOGO_ID = SITE + "#/schema/logo/image/";
const LOGO_URL = SITE + "wp-content/uploads/2023/02/LOGO_mint-back.jpg";

// The one-line company description. Edit it here and nowhere else.
//
// It replaces the keyword-stuffed string that used to sit in `name` on 19 pages: "Elastic Mint
// Bespoke Software Development company in Bristol offering Software Development and IT
// Consultancy". `name` is meant to be the entity's name, and og:site_name has always said
// "Elastic Mint" on every page, so those 19 pages were contradicting themselves. The positioning
// words belong here; "Bristol" is separately asserted in `address.addressLocality` below.
const DESCRIPTION =
  "Elastic Mint is a bespoke software development consultancy in Bristol, UK. " +
  "We work with growing businesses that cannot afford to get their software wrong. " +
  "We build new systems, modernise old ones, and give independent advice on how to move them forwards.";

const organization = {
  "@type": "Organization",
  "@id": ORG_ID,
  name: "Elastic Mint",
  // The registered company name, kept distinct from the name anyone actually uses.
  legalName: "Elastic Mint Ltd",
  url: SITE,
  description: DESCRIPTION,
  logo: {
    "@type": "ImageObject",
    "@id": LOGO_ID,
    inLanguage: "en-GB",
    url: LOGO_URL,
    contentUrl: LOGO_URL,
    width: 1500,
    height: 1060,
  },
  image: { "@id": LOGO_ID },
  sameAs: [
    "https://x.com/elasticmint",
    "https://www.linkedin.com/company/elastic-mint-ltd/",
  ],
  // Locality only, deliberately. There is no premises a client visits, so this stays an
  // Organization rather than a LocalBusiness and carries no streetAddress or postalCode.
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bristol",
    addressRegion: "Bristol",
    addressCountry: "GB",
  },
  areaServed: { "@type": "Country", name: "United Kingdom" },
};

const website = {
  "@type": "WebSite",
  "@id": SITE_ID,
  url: SITE,
  name: "Elastic Mint",
  // Describes the site, where the Organization description above describes the company.
  description: "A refreshing approach to bespoke software development",
  publisher: { "@id": ORG_ID },
  inLanguage: "en-GB",
};

module.exports = {
  organization,
  website,
  // Order matters only for readability of the output.
  sharedNodes: [website, organization],
  ids: { ORG_ID, SITE_ID, LOGO_ID, SITE },
};
