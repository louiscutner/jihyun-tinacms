import CustomWorkList from "../../components/CustomWorkList";

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
      label: "Works List",
      type: "object",
      list: true,
      ui: {
        component: CustomWorkList,
      },
      fields: [
        {
          name: "filename",
          label: "Filename",
          type: "string",
        },
      ],
    },
  ],
  ui: {
    router: () => "/",
  },
};

export default home;
