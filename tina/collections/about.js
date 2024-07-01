/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "About",
  name: "about",
  path: "content/about",
  format: "mdx",
  fields: [
    {
      name: "title",
      label: "Title",
      type: "string",
    },
    {
      name: "body",
      label: "Main Content",
      type: "rich-text",
      isBody: true,
    },
    {
      name: "section",
      label: "Section",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          title: "New Section",
          subheading: "Subheading",
          color: "red",
          body: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo expedita voluptas culpa sapiente alias molestiae. Numquam corrupti in laborum sed rerum et corporis.",
        },
        itemProps: (item) => ({
          label: item.title,
        }),
      },
      fields: [
        {
          name: "title",
          label: "Title",
          type: "string",
        },
        {
          name: "subheading",
          label: "Subheading",
          type: "string",
        },
        {
          name: "color",
          label: "Color",
          type: "string",
          ui: {
            component: "select",
            options: ["red", "blue", "green"],
          },
        },
        {
          name: "body",
          label: "Body",
          type: "string",
          ui: {
            component: "textarea",
          },
        },
      ],
    },
  ],
  ui: {
    defaultItem: () => ({
      title: "New About Page",
      body: "About content here...",
      section: [],
    }),
    router: () => {
      return `/about`;
    },
  },
};
