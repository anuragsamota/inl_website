import React, { useEffect, useState, memo } from 'react';
import { Helmet } from 'react-helmet-async';
import { fetchRuntimeConfig } from '../../services/configService';

// Site-wide Organization JSON-LD schema (applies to every page).
// This is the single canonical schema.org/Organization definition for the lab,
// so it doesn't conflict with page-specific schemas (e.g. Person, NewsArticle).
const CommonSchema = memo(function CommonSchema() {
  const [schema, setSchema] = useState(null);

  useEffect(() => {
    let isMounted = true;
    (async () => {
      try {
        const config = await fetchRuntimeConfig();
        const labInfo = config?.labInfo;
        if (!labInfo) return;

        const orgSchema = {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: labInfo.name,
          url: "https://intelligent-networks-lab.org",
          logo: "https://intelligent-networks-lab.org/logo-icon.svg",
          description: labInfo.description,
          email: labInfo.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: labInfo.location,
            addressLocality: 'Jodhpur',
            addressRegion: 'Rajasthan',
            postalCode: '342030',
            addressCountry: 'IN'
          },
          sameAs: [
            labInfo.socials?.github,
            labInfo.socials?.linkedin
          ].filter(Boolean)
        };

        if (isMounted) setSchema(orgSchema);
      } catch (err) {
        console.warn('Could not build common Organization schema:', err);
      }
    })();
    return () => { isMounted = false; };
  }, []);

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
});

export default CommonSchema;
