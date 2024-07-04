const work = {
  label: "Works",
  name: "work",
  path: "content/works",
  format: "mdx",
  fields: [
    {
      type: "string",
      label: "Filename",
      name: "title",
      required: true,
      isTitle: true,
      description:
        "The filename of the work. Must be unique. This is not the displayed title, just the filename.",
    },
    {
      type: "string",
      label: "Description",
      name: "description",
    },
    {
      type: "object",
      label: "Info",
      name: "info",
      list: true,
      description:
        "Key info about the work. Add, remove, or re-order items. Click an item to edit. Do not include 'title' or 'link' here.",
      fields: [
        {
          type: "string",
          label: "Key",
          name: "key",
          description: "The name of the info item (appears on the left).",
        },
        {
          type: "string",
          label: "Value",
          name: "value",
          description: "The value of the info item (appears on the right).",
        },
      ],
      itemProps: (item) => ({
        label: item.key || "New Item",
      }),
    },
    {
      type: "object",
      label: "'Available From' Link (optional)",
      name: "link",
      fields: [
        {
          type: "string",
          label: "URL",
          name: "url",
          description: "The URL of the link.",
        },
        {
          type: "string",
          label: "Text",
          name: "text",
          description: "The text to display for the link.",
        },
      ],
    },
    {
      type: "object",
      label: "Image Gallery",
      name: "gallery",
      list: true,
      description:
        "Images of the work. Add, remove, or re-order sections of images. Add up to 4 images per section.",
      fields: [
        {
          type: "string",
          label: "Title",
          name: "title",
          description: "The title of this image section.",
        },
        {
          type: "image",
          label: "Image",
          name: "image1",
          description: "The image of the work.",
        },
        {
          type: "image",
          label: "Image",
          name: "image2",
          description: "The image of the work.",
        },
        {
          type: "image",
          label: "Image",
          name: "image3",
          description: "The image of the work.",
        },
        {
          type: "image",
          label: "Image",
          name: "image4",
          description: "The image of the work.",
        },
      ],
      itemProps: (item) => ({
        label: item.title || "New Image Section",
      }),
    },
  ],
  ui: {
    router: ({ document }) => {
      return `/${document._sys.filename.replace(/\.mdx$/, "")}`;
    },
    filename: {
      readonly: false,
      slugify: (values) => {
        return `${
          values.title
            ?.toLowerCase()
            .replace(/\s+/g, "-")
            .replace(/[^a-z0-9-]/g, "") || "new-work"
        }`;
      },
    },
  },
  defaultItem: {
    title: "e.g. New Work",
    description: "",
    info: [
      {
        key: "Year",
        value: "2024",
      },
      {
        key: "Size",
        value: "20cm (h) x 20cm (w) x 20cm (l)",
      },
      {
        key: "Materials",
        value: "Porcelain, High-fired colour stain, Gloop glaze, Wool",
      },
    ],
  },
};

export default work;
