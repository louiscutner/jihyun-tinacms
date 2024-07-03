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
      type: "object",
      list: true,
      name: "featuredWorks",
      label: "Featured Works",
      ui: {
        itemProps: (item) => ({
          label:
            item?.title ||
            item?.work
              ?.split("/")
              .pop()
              .replace(/\.[^/.]+$/, "") ||
            "Untitled Work",
        }),
        defaultItem: () => ({
          work: "",
          title: "",
          order: 0,
        }),
      },
      fields: [
        {
          name: "work",
          label: "Work",
          type: "reference",
          collections: ["work"],
          required: true,
          ui: {
            validate: (value, allValues, meta, field) => {
              if (value && (!allValues.title || allValues.title === "")) {
                const filename = value
                  .split("/")
                  .pop()
                  .replace(/\.[^/.]+$/, "");
                meta.form.change("title", filename);
              }
            },
          },
        },
        {
          name: "title",
          label: "Featured Title",
          type: "string",
          description: "You can edit this title for featuring purposes.",
        },
      ],
    },
  ],
  ui: {
    router: () => "/",
  },
};

export default home;
