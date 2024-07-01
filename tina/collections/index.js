/**
 * @type {import('tinacms').Collection}
 */
const indexCollection = {
  label: "Work",
  name: "work",
  path: "content",
  format: "mdx",
  match: {
    include: "index",
  },
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "content",
      label: "Content",
      type: "string",
    },
  ],
};

export default indexCollection;
