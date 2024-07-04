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
      type: "object",
      list: true,
      name: "featuredWorks",
      label: "Featured Works",
      ui: {
        itemProps: (item) => ({
          label: item?.title || "Untitled Work",
        }),
      },
      fields: [
        {
          name: "work",
          label: "Work",
          type: "reference",
          collections: ["work"],
          required: true,
        },
        {
          name: "title",
          label: "Featured Title",
          type: "string",
          description: "You can edit this title for featuring purposes.",
        },
        {
          name: "image",
          label: "Featured Image",
          type: "image",
        },
      ],
    },
  ],
  ui: {
    router: () => "/",
  },
};

export default home;
