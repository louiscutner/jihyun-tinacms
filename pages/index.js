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
      <ul>
        {data.home.featuredWorks.map((featuredWork, index) => (
          <li key={index} className="p-3 m-3 bg-stone-200 rounded-lg w-auto">
            <a href={`/${featuredWork.work._sys.filename}`}>
              <a
                href={`/${featuredWork.work._sys.filename}`}
                data-tina-field={tinaField(featuredWork, "title")}
              >
                {featuredWork.title}
              </a>
              {/* featured work image - tinafield*/}
              <img
                className="w-1/3"
                src={featuredWork.image}
                data-tina-field={tinaField(featuredWork, "image")}
              />
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
