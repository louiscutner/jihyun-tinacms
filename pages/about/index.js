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
      <h1>About</h1>
      <div
        className="mb-8 mt-4"
        data-tina-field={tinaField(data.about, "body")}
      >
        <TinaMarkdown content={content} />
      </div>
      <a
        href={data.about.cv}
        target="_blank"
        className="underline text-blue-500 p-3 bg-stone-200 rounded-lg w-auto"
        data-tina-field={tinaField(data.about, "cv")}
      >
        Download CV
      </a>
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
