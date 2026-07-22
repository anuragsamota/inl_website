import React, { memo } from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = memo(function SEO({ 
  title = "Intelligent Networks Laboratory", 
  description = "Research in Next-Gen Wireless Networks, Programmable Data Planes, and Quantum Communication at the Intelligent Networks Laboratory.",
  keywords = "6G, O-RAN, Network Security, eBPF, Quantum Networking, SDN, Edge Computing, Academic Research Lab",
  canonical = "https://intelligent-networks-lab.org",
  type = "website",
  jsonLd = null
}) {
  const fullTitle = title.includes("Intelligent Networks Laboratory") 
    ? title 
    : `${title} | Intelligent Networks Laboratory`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonical} />

      {/* OpenGraph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content="Intelligent Networks Laboratory" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />

      {/* Structured JSON-LD Schema */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      )}
    </Helmet>
  );
});

export default SEO;
