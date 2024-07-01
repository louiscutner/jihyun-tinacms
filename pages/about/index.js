import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../../components/Layout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../../tina/__generated__/client";

export default function About(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const content = data.about.body;
  const title = data.about.title;
  return (
    <Layout>
      <div data-tina-field={tinaField(data.about, "title")}>
        <h1>{title}</h1>
      </div>
      <div data-tina-field={tinaField(data.about, "body")}>
        <TinaMarkdown content={content} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.about({
    relativePath: "about.mdx", // Ensure this path is correct
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
