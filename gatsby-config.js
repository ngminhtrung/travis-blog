module.exports = {
  siteMetadata: {
    title: `Electrical Engineer turned Front-End Web Developer. Married to Awesome. Playing with Data and Visualization. Occasional drawer of Minions.`,
    description: `A blog on front-end development with HTML, CSS, JavaScript and D3.js. Focus on ReactJS.`
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-twitter`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: "UA-106958353-1",
        // Puts tracking script in the head instead of the body
        head: false,
        // Setting this parameter is optional
        anonymize: true,
        // Setting this parameter is also optional
        respectDNT: true,
      },
    },
    `gatsby-plugin-glamor`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `src`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-prismjs`,
            options: {
              // Class prefix for <pre> tags containing syntax highlighting;
              // defaults to 'language-' (eg <pre class="language-js">).
              // If your site loads Prism into the browser at runtime,
              // (eg for use with libraries like react-live),
              // you may use this to prevent Prism from re-processing syntax.
              // This is an uncommon use-case though;
              // If you're unsure, it's best to use the default value.
              classPrefix: "language-",
              // This is used to allow setting a language for inline code
              // (i.e. single backticks) by creating a separator.
              // This separator is a string and will do no white-space
              // stripping.
              // A suggested value for English speakers is the non-ascii
              // character '›'.
              inlineCodeMarker: null,
              // This lets you set up language aliases.  For example,
              // setting this to '{ sh: "bash" }' will let you use
              // the language "sh" which will highlight using the
              // bash highlighter.
              aliases: {},
            },
          },
          {
            resolve: `gatsby-remark-responsive-image`,
            options: {
              // It's important to specify the maxWidth (in pixels) of 
              // the content container as this plugin uses this as the 
              // base for generating different widths of each image. 
              maxWidth: 590,
            },
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`,
      },
    },
    
{
  resolve: 'gatsby-remark-code-repls',
  options: {
    // Optional default link text.
    // Defaults to "REPL".
    // eg <a href="...">Click here</a>
    defaultText: 'Click here',
 
    // Optional runtime dependencies to load from NPM.
    // This option only applies to REPLs that support it (eg CodeSandbox).
    // eg ['react', 'react-dom'] or ['react@15', 'react-dom@15']
    dependencies: [],
 
    // Example code links are relative to this dir.
    // eg examples/path/to/file.js
    directory: `${__dirname}/examples/`,
 
    // Optional externals to load from a CDN.
    // This option only applies to REPLs that support it (eg Codepen).
    // eg '//unpkg.com/react/umd/react.development.js'
    externals: [],
 
    // Optional HTML contents to inject into REPL.
    // Defaults to `<div id="root"></div>`.
    // This option only applies to REPLs that support it (eg Codepen, CodeSandbox).
    // eg '<div id="root"></div>'
    html: '',
 
    // Optional path to a custom redirect template.
    // The redirect page is only shown briefly,
    // But you can use this setting to override its CSS styling.
    redirectTemplate: `${__dirname}/src/redirect-template.js`),
 
    // Optional link target.
    // Note that if a target is specified, "noreferrer" will also be added.
    // eg <a href="..." target="_blank" rel="noreferrer">...</a>
    target: '_blank',
  },
  ],
};

