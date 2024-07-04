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
      name: "body",
      label: "Bio Content",
      description: "Add the content for your bio here.",
      type: "rich-text",
      isBody: true,
    },
    {
      name: "cv",
      label: "CV",
      description: "Add your CV here.",
      type: "image",
    },
    {
      name: "image1",
      label: "Left Image",
      type: "image",
      description: "Upload the left profile image here.",
    },
    {
      name: "image2",
      label: "Right Image",
      type: "image",
      description: "Upload the right profile image here.",
    },
    {
      name: "education",
      label: "Education",
      type: "object",
      list: true,
      fields: [
        {
          name: "startDate",
          label: "Start Date",
          type: "datetime",
          ui: {
            dateFormat: "YYYY",
          },
        },
        {
          name: "endDate",
          label: "End Date",
          type: "datetime",
          ui: {
            dateFormat: "YYYY",
          },
        },
        {
          name: "description",
          label: "Description",
          type: "string",
        },
      ],
      itemProps: (item) => ({
        label: item.description || "New Education",
      }),
    },
    {
      name: "publish_ward",
      label: "Publish / Award",
      type: "object",
      list: true,
      fields: [
        {
          name: "date",
          label: "Date",
          type: "datetime",
          ui: {
            dateFormat: "MMM, YYYY",
          },
        },
        {
          name: "description",
          label: "Description",
          type: "string",
        },
      ],
      itemProps: (item) => ({
        label: item.description || "New Publish / Award",
      }),
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
