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

  console.log("HomePage data:", data);

  return (
    <Layout>
      <h1 data-tina-field={tinaField(data.home, "title")}>{data.home.title}</h1>
      <div data-tina-field={tinaField(data.home, "body")}>
        <TinaMarkdown content={data.home.body} />
      </div>
      <h2>Featured Works</h2>
      <ul>
        {data.home.featuredWorks.map((featuredWork, index) => (
          <li key={index}>
            <a href={`/${featuredWork.work._sys.filename}`}>
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
