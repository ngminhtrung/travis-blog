import React from "react";
import g from "glamorous";
import { css, link } from "glamor";
import Link from "gatsby-link";
import { rhythm } from "../utils/typography";

const linkStyle = css({
  // float: `right`,
  padding: '10px'
});

const centerItems = css({
  textAlign: 'center'
});

export default ({ children, data }) => (
  <g.Div
    margin={`0 auto`}
    maxWidth={1024}
    padding={rhythm(1.5)}
    paddingTop={rhythm(0.5)}
  >
    {/* <Link to={`/`}> */}
      <g.H5
        marginBottom={rhythm(1)}
        display={`inline-block`}
        fontStyle={`normal`}
        // padding={`10px`}
      >
      {data.site.siteMetadata.title}
      </g.H5>
    {/* </Link> */}
    <nav className={centerItems}>
    <Link className={linkStyle} to={`/`}>
        Home
      </Link>
      <Link className={linkStyle} to={`/about/`}>
        About
      </Link>
      <Link className={linkStyle} to={`/projects/`}>
        Projects
      </Link>
      <Link className={linkStyle} to={`/reading/`}>
        Reading
      </Link>
    </nav>

    {children()}
  </g.Div>
);

export const query = graphql`
  query LayoutQuery {
    site {
      siteMetadata {
        title
      }
    }
  }
`
