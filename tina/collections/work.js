const work = {
  label: "Works",
  name: "work",
  path: "content/works",
  format: "mdx",
  fields: [
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/${document._sys.filename.replace(/\.mdx$/, "")}`;
    },
  },
};

export default work;
