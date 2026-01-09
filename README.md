![SharpAPI GitHub cover](https://sharpapi.com/sharpapi-github-php-bg.jpg "SharpAPI Node.js Client")

# Web Scraping API for Node.js

## 🌐 Extract web content and data with ease — powered by SharpAPI.

[![npm version](https://img.shields.io/npm/v/@sharpapi/sharpapi-node-web-scraping.svg)](https://www.npmjs.com/package/@sharpapi/sharpapi-node-web-scraping)
[![License](https://img.shields.io/npm/l/@sharpapi/sharpapi-node-web-scraping.svg)](https://github.com/sharpapi/sharpapi-node-client/blob/master/LICENSE.md)

**SharpAPI Web Scraping** provides powerful web scraping capabilities including HTML extraction, text content extraction, structured data parsing, link extraction, and screenshot capture. Perfect for data aggregation, monitoring, and content extraction applications.

---

## 📋 Table of Contents

1. [Requirements](#requirements)
2. [Installation](#installation)
3. [Usage](#usage)
4. [API Documentation](#api-documentation)
5. [Examples](#examples)
6. [License](#license)

---

## Requirements

- Node.js >= 16.x
- npm or yarn

---

## Installation

### Step 1. Install the package via npm:

```bash
npm install @sharpapi/sharpapi-node-web-scraping
```

### Step 2. Get your API key

Visit [SharpAPI.com](https://sharpapi.com/) to get your API key.

---

## Usage

```javascript
const { SharpApiWebScrapingService } = require('@sharpapi/sharpapi-node-web-scraping');

const apiKey = process.env.SHARP_API_KEY;
const service = new SharpApiWebScrapingService(apiKey);

async function scrapeWebsite() {
  try {
    // Extract content from a URL
    const content = await service.scrapeUrl('https://example.com');
    console.log('Title:', content.title);
    console.log('Content:', content.content);

    // Extract text content
    const text = await service.extractText('https://example.com');
    console.log('Text:', text);

    // Extract all links
    const links = await service.extractLinks('https://example.com');
    console.log(`Found ${links.length} links`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

scrapeWebsite();
```

---

## API Documentation

### Methods

#### `scrapeUrl(url: string): Promise<object>`

Scrape a webpage and extract its content (synchronous).

**Parameters:**
- `url` (string, required): The URL to scrape

**Returns:**
- Scraped content including title, text, and metadata

#### `scrapeHtml(url: string, options?: object): Promise<object>`

Extract raw HTML content from a webpage.

**Options:**
- `javascript` (boolean): Execute JavaScript (default: false)
- `timeout` (number): Request timeout in ms (default: 30000)
- `userAgent` (string): Custom user agent
- `headers` (object): Custom HTTP headers
- `proxy` (string): Proxy server URL

#### `extractText(url: string, options?: object): Promise<object>`

Extract clean text content from a webpage.

#### `extractLinks(url: string, options?: object): Promise<object>`

Extract all links from a webpage.

#### `extractStructuredData(url: string, options?: object): Promise<object>`

Extract structured data (JSON-LD, microdata, etc.) from a webpage.

#### `takeScreenshot(url: string, options?: object): Promise<object>`

Capture a screenshot of a webpage.

**Options:**
- `fullPage` (boolean): Capture full page (default: false)
- `width` (number): Viewport width (default: 1280)
- `height` (number): Viewport height (default: 800)
- `javascript` (boolean): Execute JavaScript (default: true)

---

## Examples

### Price Monitoring

```javascript
const service = new SharpApiWebScrapingService(process.env.SHARP_API_KEY);

async function monitorPrice(productUrl) {
  const content = await service.scrapeUrl(productUrl);

  // Extract price from content
  const priceMatch = content.text.match(/\$(\d+\.\d{2})/);
  const price = priceMatch ? parseFloat(priceMatch[1]) : null;

  return {
    url: productUrl,
    price: price,
    title: content.title,
    timestamp: new Date().toISOString()
  };
}

const priceData = await monitorPrice('https://example.com/product');
console.log('Price:', priceData.price);
```

### Content Aggregation

```javascript
const service = new SharpApiWebScrapingService(process.env.SHARP_API_KEY);

async function aggregateNews(urls) {
  const articles = await Promise.all(
    urls.map(async (url) => {
      const content = await service.scrapeUrl(url);
      return {
        title: content.title,
        text: content.text.substring(0, 200) + '...',
        url: url,
        scrapedAt: new Date()
      };
    })
  );

  return articles;
}

const newsUrls = [
  'https://news-site.com/article-1',
  'https://news-site.com/article-2'
];

const articles = await aggregateNews(newsUrls);
articles.forEach(article => {
  console.log(`\n${article.title}`);
  console.log(article.text);
});
```

### SEO Analysis

```javascript
const service = new SharpApiWebScrapingService(process.env.SHARP_API_KEY);

async function analyzeSEO(url) {
  const [html, links, structured] = await Promise.all([
    service.scrapeHtml(url),
    service.extractLinks(url),
    service.extractStructuredData(url)
  ]);

  const analysis = {
    url: url,
    title: html.title,
    meta: html.meta,
    wordCount: html.text.split(/\s+/).length,
    internalLinks: links.filter(l => l.internal).length,
    externalLinks: links.filter(l => !l.internal).length,
    hasStructuredData: Object.keys(structured).length > 0,
    structuredDataTypes: Object.keys(structured)
  };

  return analysis;
}

const seoReport = await analyzeSEO('https://example.com');
console.log('SEO Analysis:', seoReport);
```

### Website Screenshots

```javascript
const service = new SharpApiWebScrapingService(process.env.SHARP_API_KEY);
const fs = require('fs');

async function captureWebsite(url, outputPath) {
  const screenshot = await service.takeScreenshot(url, {
    fullPage: true,
    width: 1920,
    height: 1080
  });

  // Save screenshot (base64 encoded)
  const buffer = Buffer.from(screenshot.data, 'base64');
  fs.writeFileSync(outputPath, buffer);

  console.log(`Screenshot saved to ${outputPath}`);
}

await captureWebsite('https://example.com', './screenshot.png');
```

---

## Use Cases

- **Price Monitoring**: Track product prices across e-commerce sites
- **Content Aggregation**: Collect articles and news from multiple sources
- **SEO Analysis**: Analyze website structure and metadata
- **Lead Generation**: Extract contact information from websites
- **Competitive Intelligence**: Monitor competitor websites
- **Data Collection**: Gather research data from web sources
- **Website Monitoring**: Track website changes and updates
- **Screenshot Services**: Generate website previews

---

## Features

- **Synchronous Processing**: Instant results, no polling
- **JavaScript Execution**: Handle dynamic content
- **Custom Headers**: Full control over requests
- **Proxy Support**: Route requests through proxies
- **Screenshot Capture**: Visual website representation
- **Structured Data**: Extract JSON-LD and microdata
- **Link Extraction**: Discover internal and external links
- **Clean Text**: Remove HTML and extract readable content

---

## Best Practices

1. **Respect robots.txt**: Check website policies before scraping
2. **Rate Limiting**: Don't overwhelm target servers
3. **Error Handling**: Implement robust error handling
4. **Data Validation**: Validate extracted data
5. **Legal Compliance**: Ensure scraping is legal for your use case

---

## API Endpoint

**GET** `/utilities/scrape_url`

For detailed API specifications, refer to:
- [Postman Documentation](https://documenter.getpostman.com/view/31106842/2sBXVeGsW6)
- [Product Page](https://sharpapi.com/en/catalog/utility/web-scraping)

---

## Related Packages

- [@sharpapi/sharpapi-node-detect-urls](https://www.npmjs.com/package/@sharpapi/sharpapi-node-detect-urls) - URL detection
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
