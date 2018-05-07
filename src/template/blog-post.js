import React from 'react';
import Helmet from 'react-helmet';
require("prismjs/themes/prism.css");

export default ({ data }) => {
	const post = data.markdownRemark;
	return (
		<div className="blog-post-container">
			<Helmet title={post.frontmatter.title} />
			<div className="blog-post">
				<h1>{post.frontmatter.title}</h1>
				<div dangerouslySetInnerHTML={{ __html: post.html }} />
			</div>
		</div>
	);
};

export const query = graphql`
	query BlogPostQuery($slug: String!) {
	  markdownRemark(fields: { slug: { eq: $slug } }) {
		html
		frontmatter {
		  title
		}
	  }
	}
  `;
