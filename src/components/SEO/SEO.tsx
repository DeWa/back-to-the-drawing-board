import React, { FunctionComponent } from 'react';
import { Helmet } from 'react-helmet';
import dayjs from 'dayjs';

import config from '../../config';

export interface Props {
  postNode?: any;
  postPath?: string;
  postSEO?: any;
}

interface SchemaOrgListItem {
  '@type': string;
  position: number;
  item: {
    '@id': string;
    name: string;
    image: string;
  };
}

interface SchemaOrgJSONLD {
  '@type': string;
  '@context': string;
  url?: string;
  name?: string;
  alternateName?: string;
  headline?: string;
  image?: {
    '@type': string;
    url: string;
  };
  author?: {
    '@type': string;
    name: string;
    email: string;
    address: string;
  };
  publisher?: {
    '@type': string;
    name: string;
    email: string;
    address: string;
    logo: {
      '@type': string;
      url: string;
    };
  };
  datePublished?: Date;
  description?: string;
  itemListElement?: SchemaOrgListItem[];
}

const SEO: FunctionComponent<Props> = (props) => {
  const { postNode, postPath, postSEO } = props;
  let title: string;
  let description: string;
  let imageUrl: string;
  let postURL: string;

  if (postSEO) {
    const postMeta = postNode.frontmatter;
    ({ title } = postMeta);
    description = postNode.excerpt;
    imageUrl = postMeta.cover.childImageSharp.fluid.src;
    postURL = `${config.siteUrl}${config.pathPrefix}${postPath}`;
  } else {
    title = config.siteTitle;
    description = config.siteDescription;
    imageUrl = config.siteLogo;
  }

  const getPublicationDate = () => {
    if (!postNode) return null;

    if (!postNode.frontmatter) return null;

    if (!postNode.frontmatter.date) return null;

    return dayjs(postNode.frontmatter.date, config.dateFromFormat).toDate();
  };

  const datePublished = getPublicationDate();

  const authorJSONLD = {
    '@type': 'Person',
    name: config.userName,
    email: config.userEmail,
    address: config.userLocation,
  };

  const logoJSONLD = {
    '@type': 'ImageObject',
    url: imageUrl,
  };

  const blogURL = `config.siteUrl, config.pathPrefix`;
  const schemaOrgJSONLD: SchemaOrgJSONLD[] = [
    {
      '@context': 'http://schema.org',
      '@type': 'WebSite',
      url: blogURL,
      name: title,
      alternateName: '',
    },
  ];
  if (postSEO) {
    schemaOrgJSONLD.push(
      {
        '@context': 'http://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@id': postURL,
              name: title,
              imageUrl,
            },
          },
        ],
      },
      {
        '@context': 'http://schema.org',
        '@type': 'BlogPosting',
        url: blogURL,
        name: title,
        alternateName: '',
        headline: title,
        image: { '@type': 'ImageObject', url: imageUrl },
        author: authorJSONLD,
        publisher: {
          ...authorJSONLD,
          '@type': 'Organization',
          logo: logoJSONLD,
        },
        datePublished,
        description,
      }
    );
  }
  return (
    <Helmet>
      {/* General tags */}
      <meta name="description" content={description} />
      <meta name="image" content={imageUrl} />

      {/* Schema.org tags */}
      <script type="application/ld+json">
        {JSON.stringify(schemaOrgJSONLD)}
      </script>

      {/* OpenGraph tags */}
      <meta property="og:url" content={postSEO ? postURL : blogURL} />
      {postSEO ? <meta property="og:type" content="article" /> : null}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta
        property="fb:app_id"
        content={config.siteFBAppID ? config.siteFBAppID : ''}
      />

      {/* Twitter Card tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta
        name="twitter:creator"
        content={config.userTwitter ? config.userTwitter : ''}
      />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />
    </Helmet>
  );
};

export default SEO;
