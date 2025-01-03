import React from "react";
import { wrapFieldsWithMeta } from "tinacms";

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
      name: "header",
      label: "Header",
      fields: [
        {
          type: "string",
          name: "title",
          label: "Title",
          description: "The title of the website.",
        },
      ],
    },
    {
      type: "object",
      name: "quote",
      label: "Quote",
      fields: [
        {
          type: "boolean",
          name: "showQuote",
          label: "Show Quote",
        },
        {
          type: "string",
          name: "text",
          label: "Quote",
          description: "A quote for the home page.",
        },
        {
          type: "boolean",
          name: "showLine",
          label: "Show Line",
        },
        {
          type: "string",
          name: "lineColour",
          label: "Line Colour",
          description: "The line colour under the quote.",
          required: true,
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
      ],
    },
    {
      type: "object",
      name: "imageGallery",
      label: "Image Gallery",
      fields: [
        {
          type: "boolean",
          name: "showGallery",
          label: "Show Gallery",
        },
        {
          type: "object",
          name: "mobileImageGallery",
          label: "Mobile Image Gallery",
          list: true,
          templates: [
            {
              label: "One Image",
              name: "oneImage",
              fields: [
                {
                  type: "image",
                  name: "image",
                  label: "Image",
                },
                {
                  label: "Height",
                  name: "height",
                  type: "number",
                  description: "Choose the height of the image.",
                  defaultValue: 1,
                  ui: {
                    parse: (val) => Number(val),
                    // wrapping our component in wrapFieldsWithMeta renders our label & description.
                    component: wrapFieldsWithMeta(({ input }) => {
                      return (
                        <input
                          name="height"
                          id="height"
                          type="range"
                          min="0"
                          max="10"
                          step=".1"
                          // This will pass along props.input.onChange to set our form values as this input changes.
                          {...input}
                        />
                      );
                    }),
                  },
                },
              ],
            },
            {
              label: "Two Images",
              name: "twoImages",
              fields: [
                {
                  type: "image",
                  name: "image1",
                  label: "Left Image",
                },
                {
                  type: "image",
                  name: "image2",
                  label: "Right Image",
                },
                {
                  label: "Height",
                  name: "height",
                  type: "number",
                  description: "Choose the height of the images.",
                  ui: {
                    parse: (val) => Number(val),
                    // wrapping our component in wrapFieldsWithMeta renders our label & description.
                    component: wrapFieldsWithMeta(({ input }) => {
                      return (
                        <input
                          name="height"
                          id="height"
                          type="range"
                          min="0"
                          max="10"
                          step=".1"
                          // This will pass along props.input.onChange to set our form values as this input changes.
                          {...input}
                        />
                      );
                    }),
                  },
                },
              ],
            },
          ],
        },
        {
          type: "object",
          name: "desktopImageGallery",
          label: "Desktop Image Gallery",
          list: true,
          templates: [
            {
              label: "One Image",
              name: "oneImage",
              fields: [
                {
                  type: "image",
                  name: "image",
                  label: "Image",
                },
                {
                  label: "Height",
                  name: "height",
                  type: "number",
                  description: "Choose the height of the image.",
                  ui: {
                    parse: (val) => Number(val),
                    // wrapping our component in wrapFieldsWithMeta renders our label & description.
                    component: wrapFieldsWithMeta(({ input }) => {
                      return (
                        <input
                          name="height"
                          id="height"
                          type="range"
                          min="0"
                          max="10"
                          step=".1"
                          // This will pass along props.input.onChange to set our form values as this input changes.
                          {...input}
                        />
                      );
                    }),
                  },
                },
              ],
            },
            {
              label: "Two Images (equal width)",
              name: "twoImagesEqualWidth",
              fields: [
                {
                  type: "image",
                  name: "image1",
                  label: "Left Image",
                },
                {
                  type: "image",
                  name: "image2",
                  label: "Right Image",
                },
                {
                  label: "Height",
                  name: "height",
                  type: "number",
                  description: "Choose the height of the images.",
                  ui: {
                    parse: (val) => Number(val),
                    // wrapping our component in wrapFieldsWithMeta renders our label & description.
                    component: wrapFieldsWithMeta(({ input }) => {
                      return (
                        <input
                          name="height"
                          id="height"
                          type="range"
                          min="0"
                          max="10"
                          step=".1"
                          // This will pass along props.input.onChange to set our form values as this input changes.
                          {...input}
                        />
                      );
                    }),
                  },
                },
              ],
            },
            {
              label: "Two Images (one wide)",
              name: "twoImagesOneWide",
              fields: [
                {
                  type: "image",
                  name: "image1",
                  label: "Left Image",
                },
                {
                  type: "image",
                  name: "image2",
                  label: "Right Image",
                },
                {
                  type: "string",
                  name: "wideImage",
                  label: "Wide Image",
                  options: [
                    { value: "left", label: "Left" },
                    { value: "right", label: "Right" },
                  ],
                },
                {
                  label: "Height",
                  name: "height",
                  type: "number",
                  description: "Choose the height of the images.",
                  ui: {
                    parse: (val) => Number(val),
                    // wrapping our component in wrapFieldsWithMeta renders our label & description.
                    component: wrapFieldsWithMeta(({ input }) => {
                      return (
                        <input
                          name="height"
                          id="height"
                          type="range"
                          min="0"
                          max="10"
                          step=".1"
                          // This will pass along props.input.onChange to set our form values as this input changes.
                          {...input}
                        />
                      );
                    }),
                  },
                },
              ],
            },
            {
              label: "Three Images",
              name: "threeImages",
              fields: [
                {
                  type: "image",
                  name: "image1",
                  label: "Left Image",
                },
                {
                  type: "image",
                  name: "image2",
                  label: "Middle Image",
                },
                {
                  type: "image",
                  name: "image3",
                  label: "Right Image",
                },
                {
                  label: "Height",
                  name: "height",
                  type: "number",
                  description: "Choose the height of the images.",
                  ui: {
                    parse: (val) => Number(val),
                    // wrapping our component in wrapFieldsWithMeta renders our label & description.
                    component: wrapFieldsWithMeta(({ input }) => {
                      return (
                        <input
                          name="height"
                          id="height"
                          type="range"
                          min="0"
                          max="10"
                          step=".1"
                          // This will pass along props.input.onChange to set our form values as this input changes.
                          {...input}
                        />
                      );
                    }),
                  },
                },
              ],
            },
          ],
        },
        {
          type: "number",
          name: "imageSpacing",
          label: "Image Spacing",
          description: "The spacing between images.",
        },
      ],
    },
    {
      type: "object",
      name: "footer",
      label: "Footer",
      fields: [
        {
          type: "object",
          name: "mailingList",
          label: "Mailing List",
          fields: [
            {
              type: "boolean",
              name: "toggle",
              label: "Show / hide",
              description:
                "Show or hide the button to sign up to the mailing list.",
            },
            {
              type: "string",
              name: "text",
              label: "Button text",
              description: "Change the text on the button.",
            },
          ],
        },
        {
          type: "object",
          name: "insta",
          label: "Instagram",
          fields: [
            {
              type: "boolean",
              name: "toggle",
              label: "Show / hide",
              description: "Show or hide the Instagram button.",
            },
            {
              type: "string",
              name: "link",
              label: "Instagram link",
              description: "Put the link to the Instagram page here.",
            },
          ],
        },
        {
          type: "object",
          name: "email",
          label: "Email",
          fields: [
            {
              type: "boolean",
              name: "toggle",
              label: "Show / hide",
              description: "Show or hide the Email button.",
            },
            {
              type: "string",
              name: "email",
              label: "Email address",
              description: "Put the email address here.",
            },
          ],
        },
        {
          type: "object",
          name: "bottomText",
          label: "Bottom text",
          fields: [
            {
              type: "boolean",
              name: "toggle",
              label: "Show / hide",
              description: "Show or hide the bottom text.",
            },
            {
              type: "string",
              name: "text",
              label: "Text",
              description: "Put the text you want to display here.",
            },
          ],
        },
      ],
    },
    {
      type: "object",
      name: "theme",
      label: "Theme",
      fields: [
        {
          type: "string",
          name: "backgroundColour",
          label: "Background Colour",
          description: "The background colour of the website.",
          required: true,
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
        {
          type: "string",
          name: "textColour",
          label: "Text Colour",
          description: "The text colour of the website.",
          required: true,
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
        {
          type: "string",
          name: "buttonColour",
          label: "Button Colour",
          description: "The colour of buttons on the website.",
          required: true,
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
        {
          type: "string",
          name: "buttonHoverColour",
          label: "Button Hover Colour",
          description: "The colour of buttons when hovering on the website.",
          required: true,
          ui: {
            component: "color",
            colorFormat: "hex",
            widget: "sketch",
          },
        },
      ],
    },
  ],
  ui: {
    router: () => "/",
  },
};

export default home;
