const fs = require('fs');
const path = require('path');
const routesDir = path.join(__dirname, 'src', 'routes');
const files = fs.readdirSync(routesDir).filter(f => f.endsWith('.tsx') && f !== '__root.tsx');

const seoData = {
  'blacklist.tsx': { title: 'IP Blacklist Checker', desc: 'Check if an IP or domain is listed on anti-spam blacklists.' },
  'dns.tsx': { title: 'DNS Lookup Tool', desc: 'Perform a comprehensive DNS lookup for any domain.' },
  'email.tsx': { title: 'Email Security Checker', desc: 'Verify MX, TXT, and DMARC records for domain email security.' },
  'geo.tsx': { title: 'IP Geolocation', desc: 'Track and map the geographical location of any IP or domain.' },
  'headers.tsx': { title: 'HTTP Headers Viewer', desc: 'Analyze HTTP response headers and security.' },
  'hosting.tsx': { title: 'Hosting Detector', desc: 'Detect the hosting provider for any website or IP address.' },
  'index.tsx': { title: 'IP-Guardian - Advanced IP & Network Tools', desc: 'Professional IP lookup, VPN detection, WHOIS, DNS, and cyber intelligence tools.' },
  'lookup.tsx': { title: 'IP Lookup Tool', desc: 'Advanced IP address lookup and intelligence information.' },
  'my-ip.tsx': { title: 'What is My IP?', desc: 'Find your current public IP address and connection details.' },
  'ports.tsx': { title: 'Open Port Scanner', desc: 'Scan common ports to check network security and firewalls.' },
  'ssl.tsx': { title: 'SSL Checker', desc: 'Verify TLS/SSL certificate validity, issuers, and protocols.' },
  'tools.tsx': { title: 'Network Tools Directory', desc: 'Explore all available network intelligence and security tools.' },
  'whois.tsx': { title: 'WHOIS Lookup', desc: 'Perform a WHOIS lookup to find domain and IP registration details.' },
  'sitemap.xml.ts': null // ignore
};

for (const file of files) {
  if (file === 'sitemap[.]xml.ts') continue;
  const filePath = path.join(routesDir, file);
  let content = fs.readFileSync(filePath, 'utf-8');
  
  if (!content.includes('import { Seo }')) {
    // Add import after first import
    const importMatch = content.match(/import .*?;/);
    if (importMatch) {
      content = content.replace(importMatch[0], importMatch[0] + '\nimport { Seo } from "@/components/Seo";');
    } else {
      content = 'import { Seo } from "@/components/Seo";\n' + content;
    }
    
    // Add <Seo /> right after first <div or main or React.Fragment
    const data = seoData[file] || { title: 'IP-Guardian Tool', desc: 'Network Intelligence Tool' };
    const seoTag = `<Seo title="${data.title}" description="${data.desc}" />`;
    
    content = content.replace(/return \([\s\S]*?(<div[^>]*>|<main[^>]*>|<React.Fragment>|<>)/, (match, p1) => {
      return match.replace(p1, p1 + '\n      ' + seoTag);
    });
    
    fs.writeFileSync(filePath, content);
    console.log('Updated', file);
  }
}
