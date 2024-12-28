import { TinaMarkdown } from "tinacms/dist/rich-text";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";

export default function Exhibitions(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.exhibitions.body;
  const title = data.exhibitions.title;
  return (
    <>
      <div data-tina-field={tinaField(data.exhibitions, "title")}>
        <h1>{title}</h1>
      </div>
      <div data-tina-field={tinaField(data.exhibitions, "body")}>
        <TinaMarkdown content={content} />
      </div>
    </>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.exhibitions({
    relativePath: "exhibitions.mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
