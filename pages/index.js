import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function HomePage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  return (
    <Layout>
      <h1 data-tina-field={tinaField(data.home, "title")}>{data.home.title}</h1>
      <h2 data-tina-field={tinaField(data.home, "content")}>
        {data.home.content}
      </h2>
      <ul>
        {data.home.featuredWorks.map((featuredWork, index) => (
          <li key={index}>
            <a
              href={`/${featuredWork.work._sys.filename}`}
              data-tina-field={tinaField(featuredWork, "title")}
            >
              {featuredWork.title}
            </a>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps = async () => {
  const { data, query, variables } = await client.queries.home({
    relativePath: "index.mdx",
  });

  return {
    props: {
      data,
      query,
      variables,
    },
  };
};
