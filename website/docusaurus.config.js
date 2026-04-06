// @ts-check

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "JC-verse style guide",
  url: "https://jc-verse.github.io",
  baseUrl: "/js-style-guide/",
  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",
  favicon: "img/favicon.ico",

  presets: [
    [
      "classic",
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: { path: "../docs", routeBasePath: "/" },
        blog: false,
        theme: { customCss: require.resolve("./src/css/custom.css") },
      }),
    ],
    [
      "docusaurus-preset-shiki-twoslash",
      {
        vfsRoot: process.cwd(),
        themes: ["github-light", "github-dark"],
        defaultCompilerOptions: { types: ["node"] },
      },
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: "JC-verse style guide",
        logo: {
          alt: "Logo",
          src: "img/logo-light.svg",
          srcDark: "img/logo.svg",
        },
        items: [
          { type: "doc", docId: "guide", position: "left", label: "Tutorial" },
          {
            href: "https://github.com/jc-verse/js-style-guide",
            label: "GitHub",
            position: "right",
          },
        ],
      },
      footer: {
        style: "dark",
        logo: {
          alt: "JC-verse logo",
          src: "img/logo.svg",
          href: "https://github.com/jc-verse/js-style-guide",
        },
        copyright: `Copyright © ${new Date().getFullYear()} JC-verse. Built with Docusaurus.`,
      },
      tableOfContents: { maxHeadingLevel: 4 },
    }),
};

module.exports = config;
