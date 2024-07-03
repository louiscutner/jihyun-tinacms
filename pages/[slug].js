import { TinaMarkdown } from "tinacms/dist/rich-text";
import { Layout } from "../components/Layout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function WorkPage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const workTitle =
    data.home?.featuredWorks?.find(
      (item) => item.work._sys.filename === data.work._sys.filename
    )?.title ||
    data.work._sys.filename ||
    "Untitled Work";

  const content = data.work.body || "";

  console.log("WorkPage data:", data);
  console.log("Work title:", workTitle);
  console.log("Work content:", content);

  return (
    <Layout>
      <div data-tina-field={tinaField(data.work, "_sys.filename")}>
        <h1>{workTitle}</h1>
      </div>
      <div data-tina-field={tinaField(data.work, "body")}>
        {content ? (
          <TinaMarkdown content={content} />
        ) : (
          <p>No content available</p>
        )}
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const relativePath = `${params.slug}.mdx`;

  const {
    data: workData,
    query,
    variables,
  } = await client.queries.work({
    relativePath,
  });

  // Fetch home data, but don't throw an error if it fails
  let homeData = {};
  try {
    const homeResult = await client.queries.home({
      relativePath: "index.mdx",
    });
    homeData = homeResult.data;
  } catch (error) {
    console.error("Error fetching home data:", error);
  }

  return {
    props: {
      data: {
        work: workData.work,
        home: homeData.home,
      },
      query,
      variables,
    },
  };
};

export const getStaticPaths = async () => {
  const worksListData = await client.queries.workConnection();

  return {
    paths: worksListData.data.workConnection.edges.map((edge) => ({
      params: { slug: edge.node._sys.filename.replace(/\.mdx$/, "") },
    })),
    fallback: false,
  };
};
