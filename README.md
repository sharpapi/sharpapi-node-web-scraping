![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Web Scraping API for Node.js

## 🌐 Scrape web content with ease — powered by SharpAPI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-web-scraping.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-web-scraping)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-web-scraping.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Web Scraping** fetches and extracts content from web pages, providing structured data including page metadata, content, links, and more in a machine-readable JSON format. Perfect for data collection, content aggregation, SEO analysis, and research.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Examples](#examples)
6. [Use Cases](#use-cases)
7. [Response Format](#response-format)
8. [AI Integration](#ai-integration)
9. [API Endpoint](#api-endpoint)
10. [Related Packages](#related-packages)
11. [License](#license)

---

## Requirements

- Node.js >= 16.x
- npm or yarn

---

## Installation

### Step 1. Install the package via npm:

\`\`\`bash
npm install @sharpapi/sharpapi-node-web-scraping
\`\`\`

### Step 2. Get your API key

Visit [SharpAPI.com](https://sharpapi.com/) to get your API key.

---

## Usage

\`\`\`javascript
const { SharpApiWebScrapingService } = require('@sharpapi/sharpapi-node-web-scraping');

const apiKey = process.env.SHARP_API_KEY; // Store your API key in environment variables
const service = new SharpApiWebScrapingService(apiKey);

async function scrapeWebsite() {
  try {
    // Scrape a webpage
    const data = await service.scrapeUrl('https://sharpapi.com');

    console.log('Title:', data.title);
    console.log('Description:', data.meta_description);
    console.log('Keywords:', data.meta_keywords);
    console.log('Content length:', data.content.length);
    console.log('Links found:', data.links.length);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

scrapeWebsite();
\`\`\`

---

## API Documentation

This endpoint is **synchronous** and returns data immediately (no polling required).

### Method

#### `scrapeUrl(url)`

Scrape a webpage and extract its content in structured format.

**Parameters:**
- `url` (string, required): The URL to scrape (e.g., 'https://example.com' or 'example.com')

**Returns:** Promise<object> - Structured page data with metadata, content, and links

**Extracts:**
- **Page metadata**: Title, description, keywords, author
- **Open Graph tags**: OG:title, OG:description, OG:image, OG:type
- **Twitter Card tags**: Twitter:card, Twitter:title, Twitter:description
- **Content structure**: Headings (H1-H6), paragraphs, main content
- **Links**: Internal and external links with anchors
- **Meta information**: Language, charset, viewport, canonical URL
- **Timestamps**: Extraction date and time

**Example:**
\`\`\`javascript
const data = await service.scrapeUrl('https://example.com');
console.log('Page Title:', data.title);
console.log('Main Content:', data.content);
console.log('All Links:', data.links);
\`\`\`

---

## Examples

### Basic Web Scraping

\`\`\`javascript
const { SharpApiWebScrapingService } = require('@sharpapi/sharpapi-node-web-scraping');

const service = new SharpApiWebScrapingService(process.env.SHARP_API_KEY);

async function scrapeExample() {
  const result = await service.scrapeUrl('https://sharpapi.com');

  console.log('=== Page Information ===');
  console.log('Title:', result.title);
  console.log('Description:', result.meta_description);
  console.log('Language:', result.language);
  console.log('Canonical URL:', result.canonical_url);

  console.log('\\n=== Content ===');
  console.log('Characters:', result.content.length);
  console.log('Preview:', result.content.substring(0, 200) + '...');

  console.log('\\n=== Links Found ===');
  console.log('Total links:', result.links.length);
  result.links.slice(0, 5).forEach(link => {
    console.log(\`- \${link.text || 'No text'}: \${link.url}\`);
  });
}

scrapeExample();
\`\`\`

### Extract Social Media Metadata

\`\`\`javascript
const service = new SharpApiWebScrapingService(process.env.SHARP_API_KEY);

async function getSocialMetadata(url) {
  const data = await service.scrapeUrl(url);

  console.log('=== Open Graph Tags ===');
  console.log('OG:Title:', data.og_title);
  console.log('OG:Description:', data.og_description);
  console.log('OG:Image:', data.og_image);
  console.log('OG:Type:', data.og_type);

  console.log('\\n=== Twitter Card ===');
  console.log('Card Type:', data.twitter_card);
  console.log('Title:', data.twitter_title);
  console.log('Description:', data.twitter_description);
  console.log('Image:', data.twitter_image);
}

getSocialMetadata('https://example.com/article');
\`\`\`

### SEO Analysis

\`\`\`javascript
const service = new SharpApiWebScrapingService(process.env.SHARP_API_KEY);

async function analyzeSEO(url) {
  const data = await service.scrapeUrl(url);

  console.log('=== SEO Analysis ===');
  console.log('Title:', data.title, \`(\${data.title.length} chars)\`);
  console.log('Meta Description:', data.meta_description);
  console.log('Keywords:', data.meta_keywords);
  console.log('Canonical URL:', data.canonical_url);
  console.log('Language:', data.language);

  console.log('\\n=== Headings Structure ===');
  if (data.headings) {
    data.headings.forEach(heading => {
      console.log(\`\${heading.level}: \${heading.text}\`);
    });
  }

  console.log('\\n=== Link Analysis ===');
  const internalLinks = data.links.filter(l => l.type === 'internal');
  const externalLinks = data.links.filter(l => l.type === 'external');
  console.log(\`Internal links: \${internalLinks.length}\`);
  console.log(\`External links: \${externalLinks.length}\`);
}

analyzeSEO('https://your-website.com');
\`\`\`

### Content Extraction for AI Processing

\`\`\`javascript
const service = new SharpApiWebScrapingService(process.env.SHARP_API_KEY);

async function extractForAI(url) {
  const data = await service.scrapeUrl(url);

  // Extract clean content for AI processing
  const cleanContent = {
    title: data.title,
    description: data.meta_description,
    mainContent: data.content,
    language: data.language,
    author: data.author,
    publishedDate: data.published_date,
    modifiedDate: data.modified_date
  };

  console.log('Extracted content ready for AI processing:');
  console.log(JSON.stringify(cleanContent, null, 2));

  // Now you can pass this to SharpAPI AI endpoints:
  // - Summarization: @sharpapi/sharpapi-node-summarize-text
  // - Translation: @sharpapi/sharpapi-node-translate
  // - Keywords: @sharpapi/sharpapi-node-generate-keywords
  // - SEO Tags: @sharpapi/sharpapi-node-seo-tags
}

extractForAI('https://blog.example.com/article');
\`\`\`

### Competitor Analysis

\`\`\`javascript
const service = new SharpApiWebScrapingService(process.env.SHARP_API_KEY);

async function analyzeCompetitor(url) {
  const data = await service.scrapeUrl(url);

  console.log('=== Competitor Analysis ===');
  console.log('Domain:', new URL(url).hostname);
  console.log('Title Strategy:', data.title);
  console.log('Description:', data.meta_description);
  console.log('Keywords Focus:', data.meta_keywords);

  console.log('\\n=== Content Strategy ===');
  console.log('Content Length:', data.content.length, 'characters');
  console.log('Word Count (approx):', Math.round(data.content.split(' ').length));

  console.log('\\n=== Link Building ===');
  const externalLinks = data.links.filter(l => l.type === 'external');
  console.log('External Links:', externalLinks.length);
  externalLinks.slice(0, 10).forEach(link => {
    console.log(\`  - \${link.url}\`);
  });
}

analyzeCompetitor('https://competitor-website.com');
\`\`\`

---

## Use Cases

- **Content Aggregation**: Collect content from multiple sources
- **Price Monitoring**: Track competitor pricing and availability
- **Research**: Gather data for analysis and insights
- **Lead Generation**: Extract business information from websites
- **Market Intelligence**: Monitor industry trends and news
- **SEO Analysis**: Analyze competitor websites and content
- **Content Curation**: Extract articles for content platforms
- **Social Media Monitoring**: Track mentions and brand presence
- **Data Enrichment**: Enhance existing data with web-sourced information
- **Competitive Intelligence**: Analyze competitor strategies

---

## Response Format

The API returns a comprehensive JSON object with the following structure:

\`\`\`json
{
  "url": "https://sharpapi.com/",
  "title": "SharpAPI - AI-Powered Workflow Automation API",
  "meta_description": "Automate workflows with AI-powered API...",
  "meta_keywords": "AI API, automation, workflow",
  "author": "SharpAPI Team",
  "language": "en",
  "charset": "UTF-8",
  "canonical_url": "https://sharpapi.com/",
  "viewport": "width=device-width, initial-scale=1",

  "og_title": "SharpAPI - AI-Powered API",
  "og_description": "Automate your workflows...",
  "og_image": "https://sharpapi.com/og-image.jpg",
  "og_type": "website",
  "og_url": "https://sharpapi.com/",

  "twitter_card": "summary_large_image",
  "twitter_title": "SharpAPI",
  "twitter_description": "AI-Powered API",
  "twitter_image": "https://sharpapi.com/twitter-card.jpg",

  "content": "Full page content as text...",
  "text_content": "Clean text without HTML...",

  "headings": [
    { "level": "h1", "text": "Main Heading" },
    { "level": "h2", "text": "Subheading" }
  ],

  "links": [
    {
      "url": "https://sharpapi.com/about",
      "text": "About Us",
      "type": "internal",
      "rel": null
    },
    {
      "url": "https://example.com",
      "text": "External Link",
      "type": "external",
      "rel": "nofollow"
    }
  ],

  "images": [
    {
      "src": "https://sharpapi.com/image.jpg",
      "alt": "Image description"
    }
  ],

  "extracted_at": "2026-01-10T15:30:00Z",
  "processing_time_ms": 1250
}
\`\`\`

---

## AI Integration

The extracted data can be seamlessly integrated with **SharpAPI's AI-powered endpoints** for further analysis:

### Text Processing
- **[@sharpapi/sharpapi-node-summarize-text](https://www.npmjs.com/package/@sharpapi/sharpapi-node-summarize-text)** - Summarize extracted content
- **[@sharpapi/sharpapi-node-paraphrase](https://www.npmjs.com/package/@sharpapi/sharpapi-node-paraphrase)** - Rewrite content
- **[@sharpapi/sharpapi-node-translate](https://www.npmjs.com/package/@sharpapi/sharpapi-node-translate)** - Translate to other languages

### SEO & Keywords
- **[@sharpapi/sharpapi-node-generate-keywords](https://www.npmjs.com/package/@sharpapi/sharpapi-node-generate-keywords)** - Extract keywords
- **[@sharpapi/sharpapi-node-seo-tags](https://www.npmjs.com/package/@sharpapi/sharpapi-node-seo-tags)** - Generate SEO tags

### Content Analysis
- **[@sharpapi/sharpapi-node-detect-spam](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-spam)** - Detect spam content
- **[@sharpapi/sharpapi-node-product-review-sentiment](https://www.npmjs.com/package/@sharpapi/sharpapi-node-product-review-sentiment)** - Analyze sentiment

### Example Integration

\`\`\`javascript
const { SharpApiWebScrapingService } = require('@sharpapi/sharpapi-node-web-scraping');
const { SharpApiSummarizeService } = require('@sharpapi/sharpapi-node-summarize-text');

const scrapingService = new SharpApiWebScrapingService(process.env.SHARP_API_KEY);
const summarizeService = new SharpApiSummarizeService(process.env.SHARP_API_KEY);

async function scrapeAndSummarize(url) {
  // 1. Scrape the webpage
  const scraped = await scrapingService.scrapeUrl(url);

  // 2. Summarize the content
  const statusUrl = await summarizeService.summarize(scraped.content);
  const summary = await summarizeService.fetchResults(statusUrl);

  console.log('Original length:', scraped.content.length);
  console.log('Summary:', summary.getResultJson());
}

scrapeAndSummarize('https://blog.example.com/long-article');
\`\`\`

---

## API Endpoint

**GET** `/utilities/scrape_url?url={url}`

This endpoint is **synchronous** and returns 200 OK immediately.

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2s9Ye8faUp)
- [Product Page](https://sharpapi.com/en/catalog/utility/web-scraping-api)

---

## Related Packages

- [@sharpapi/sharpapi-node-detect-urls](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-urls) - Extract URLs from text
- [@sharpapi/sharpapi-node-detect-emails](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-emails) - Extract emails from text
- [@sharpapi/sharpapi-node-summarize-text](https://www.npmjs.com/package/@sharpapi/sharpapi-node-summarize-text) - Summarize content
- [@sharpapi/sharpapi-node-seo-tags](https://www.npmjs.com/package/@sharpapi/sharpapi-node-seo-tags) - Generate SEO tags
- [@sharpapi/sharpapi-node-client](https://www.npmjs.com/package/@sharpapi/sharpapi-node-client) - Full SharpAPI SDK

---

## License

This project is licensed under the MIT License. See the [LICENSE.md](LICENSE.md) file for details.

---

## Support

- **Documentation**: [SharpAPI.com Documentation](https://sharpapi.com/documentation)
- **Issues**: [GitHub Issues](https://github.com/sharpapi/sharpapi-node-client/issues)
- **Email**: contact@sharpapi.com

---

**Powered by [SharpAPI](https://sharpapi.com/) - AI-Powered API Workflow Automation**
