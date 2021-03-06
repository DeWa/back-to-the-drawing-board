import React, { FunctionComponent } from 'react';
import { Link } from 'gatsby';
import styled from '@emotion/styled';
import {
  FaTwitter,
  FaSpotify,
  FaGithub,
  FaEnvelope,
  FaLinkedin,
  FaRssSquare,
} from 'react-icons/fa';
import media from '../../helpers/media';

const FooterWrapper = styled.footer`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-top: 3rem;
  background: #0d1f4b;
  border-top: solid #2045a2 2px;
  padding: 2rem 3rem;
  font-family: 'PermanentMarker', Helvetica, Arial, sans-serif;
  color: #d7f3fc;

  ${media['lg']} {
    flex-direction: row;
  }
`;

const PageLinks = styled.div`
  text-align: center;
  order: 3;

  & li {
    padding: 0.25rem 0;
    font-size: 1.25rem;
  }
  & a {
    text-decoration: none;
    color: #d7f3fc;
  }
  & a:hover {
    color: #8fa3aa;
  }
  ${media['lg']} {
    order: 1;
    text-align: left;
  }
`;
const RSS = styled.div`
  font-size: 2rem;
  order: 1;
  text-align: center;
  padding: 1rem;

  & a {
    text-decoration: none;
    color: #d7f3fc;
  }
  & a:hover {
    color: #8fa3aa;
  }
`;
const SocialMedia = styled.div`
  text-align: center;
  order: 1;

  & .copyright {
    font-size: 0.75rem;
  }

  & .title {
    padding: 0.75rem 0;
  }

  & .social-list {
    display: flex;
    justify-content: center;
    padding: 0;
    margin: 0;
    font-size: 2rem;

    & li {
      padding: 0 0.35rem;
    }

    & a {
      color: #d7f3fc;
    }
    & a:hover {
      color: #8fa3aa;
    }
  }
`;

const Footer: FunctionComponent = () => {
  return (
    <FooterWrapper>
      <PageLinks>
        <ul>
          <li>
            <Link to={'/'}>Home</Link>
          </li>
          <li>
            <Link to={'/notes'}>Notes</Link>
          </li>
          <li>
            <Link to={'/archive'}>Archive</Link>
          </li>
          <li>
            <Link to={'/about'}>About</Link>
          </li>
        </ul>
      </PageLinks>
      <SocialMedia>
        <div className="copyright">Joonas Reinikka © 2021</div>
        <div className="title">Contact me</div>
        <div>
          <ul className="social-list">
            <li>
              <a href={'https://github.com/DeWa'} rel="noopener">
                <FaGithub />
              </a>
            </li>
            <li>
              <a href={'https://twitter.com/DeWast'} rel="noopener">
                <FaTwitter />
              </a>
            </li>
            <li>
              <a href={'mailto:me@joonas.dev'}>
                <FaEnvelope />
              </a>
            </li>
            <li>
              <a
                href={'https://www.linkedin.com/in/joonas-reinikka-44358a44/'}
                rel="noopener"
              >
                <FaLinkedin />
              </a>
            </li>
            <li>
              <a
                href={'https://open.spotify.com/user/dewanderer'}
                rel="noopener"
              >
                <FaSpotify />
              </a>
            </li>
          </ul>
        </div>
      </SocialMedia>
      <RSS>
        <Link to={'/rss.xml'}>
          <FaRssSquare />
        </Link>
      </RSS>
    </FooterWrapper>
  );
};

export default Footer;
