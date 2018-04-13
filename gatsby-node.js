const path = require(`path`);
const slugify = require('slugify')
const { createFilePath } = require(`gatsby-source-filesystem`);

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
    const { createNodeField } = boundActionCreators
    if (node.internal.type === `MarkdownRemark`) {
        const { categories } = node.frontmatter;
        const fileName = createFilePath({ node, getNode, basePath: `pages` });

        // get the date and title from the file name
        const [, date, title] = fileName.match(
            /^\/([\d]{4}-[\d]{2}-[\d]{2})-{1}(.+)\/$/
        );

        console.log(categories.concat([date]).join("-"));
        console.log(slugify(categories.concat([date]).join("-"),"/"));

        const slug = `/${slugify(
            categories.concat([date]).join("-"),"/")}/${title}/`;
        
        console.log(slug)

        createNodeField({
            node,
            name: `slug`,
            value: slug,
        })

        // save the date for later use
        createNodeField({
            node,
            name: `date`,
            value: date
        })
    }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
    const { createPage } = boundActionCreators;
    return new Promise((resolve, reject) => {
        graphql(`
        {
          allMarkdownRemark {
            edges {
              node {
                fields {
                  slug
                }

              }
            }
          }
        }
      `
        ).then(result => {
            result.data.allMarkdownRemark.edges.forEach(({ node }) => {
                createPage({
                    path: node.fields.slug,
                    component: path.resolve(`./src/template/blog-post.js`),
                    context: {
                        // Data passed to context is available in page queries as GraphQL variables.
                        slug: node.fields.slug,
                    },
                })
            })
            resolve();
        })
    })
};
