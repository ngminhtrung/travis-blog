import React from "react";
import g from "glamorous";
import Link from "gatsby-link";
import { rhythm } from "../utils/typography";


export default ({ data }) => {
    const posts = data.allMarkdownRemark.edges;
    const postsOfReading = posts.filter(post => post.node.frontmatter.categories[0] === "reading");
    return (
        <div>
        <g.H1 display={"inline-block"} borderBottom={"1px solid"}>
          My reading
        </g.H1>
        <h4>{postsOfReading.length} Post(s)</h4>
        {postsOfReading.map(({ node }) => (
          <div key={node.id}>
            <Link
              to={node.fields.slug}
              css={{ textDecoration: `none`, color: `inherit` }}
            >
              <g.H3 marginBottom={rhythm(1 / 4)}>
                {node.frontmatter.title}{" "}
                <g.Span color="#BBB">— {node.frontmatter.date}</g.Span>
              </g.H3>
              <p>{node.excerpt}</p>
            </Link>
          </div>
        ))}
      </div>
    );
};

export const query = graphql`
  query ReadingQuery {
        allMarkdownRemark(sort: {fields: [frontmatter___date], order: DESC}) {
          totalCount
          edges {
            node {
              id
              frontmatter {
                title
                date(formatString: "DD MMMM, YYYY")
                categories
              }
              fields {
                slug
              }
            excerpt
            }
          }
        }
      }
`;