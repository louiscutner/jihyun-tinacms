/**
 * @type {import('tinacms').Collection}
 */
export default {
  label: "Exhibitions",
  name: "exhibitions",
  path: "content/exhibitions",
  format: "mdx",
  fields: [
    {
      name: "section",
      label: "Section",
      type: "object",
      list: true,
      ui: {
        defaultItem: {
          title: "New Section",
          location: "",
          includeStartDate: true,
          includeEndDate: true,
          includeDays: false,
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
          name: "location",
          label: "Location",
          type: "string",
        },
        {
          name: "includeStartDate",
          label: "Include Start Date",
          type: "boolean",
        },
        {
          name: "includeEndDate",
          label: "Include End Date",
          type: "boolean",
        },
        {
          name: "includeDays",
          label: "Include Days",
          type: "boolean",
        },
        {
          name: "startDate",
          label: "Start Date",
          type: "datetime",
          ui: {
            dateFormat: "YYYY-MM-DD",
          },
        },
        {
          name: "endDate",
          label: "End Date",
          type: "datetime",
          ui: {
            dateFormat: "YYYY-MM-DD",
          },
        },
        {
          name: "image",
          label: "Image",
          type: "image",
        },
      ],
    },
  ],
  ui: {
    router: () => {
      return `/exhibitions`;
    },
  },
};
