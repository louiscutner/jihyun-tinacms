/**
 * @type {import('tinacms').Collection}
 */

import CustomWorkList from "../../components/CustomWorkList"; // Ensure this import is correct

const home = {
  label: "Home Page",
  name: "home",
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
    {
      name: "worksList",
      label: "Reorder Works",
      type: "object",
      list: true,
      ui: {
        component: CustomWorkList,
        description: "Drag and drop to reorder works.",
      },
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
          name: "filename",
          label: "Filename",
          type: "string",
        },
      ],
    },
  ],

  ui: {
    router: () => {
      return `/`; // Ensure this matches your home page route
    },
  },
};

export default home;
