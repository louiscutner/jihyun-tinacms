import OrderSetter from "../../components/OrderSetter";

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
      required: true,
    },
    {
      name: "order",
      label: "Order",
      type: "number",
      ui: {
        component: OrderSetter,
      },
    },
    {
      type: "string",
      label: "Body",
      name: "body",
      isBody: true,
    },
  ],
  ui: {
    filename: {
      readonly: true,
      slugify: (values) => {
        return `${
          values?.title?.toLowerCase().replace(/ /g, "-") || "new-work"
        }`;
      },
    },
    defaultItem: {
      title: "New Work",
      body: "Work content here...",
    },
    router: ({ document }) => {
      return `/${document._sys.filename.replace(/\.mdx$/, "")}`;
    },
  },
};

export default work;
