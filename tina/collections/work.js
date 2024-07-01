/**
 * @type {import('tinacms').Collection}
 */
const work = {
  label: "Works",
  name: "work",
  path: "content/works",
  format: "mdx",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "order",
      label: "Order",
      type: "number",
    },
    {
      type: "rich-text",
      label: "Body",
      name: "body",
      isBody: true,
    },
  ],
  ui: {
    defaultItem: () => ({
      title: "New Work",
      order: 0,
      body: "Work content here...",
    }),
    router: ({ document }) => {
      return `/${document._sys.filename.replace(/\.mdx$/, "")}`;
    },
  },
};

export default work;
