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

  const content = data.work.body;
  const title = data.work.title;
  return (
    <Layout>
      <div data-tina-field={tinaField(data.work, "title")}>
        <h1>{title}</h1>
      </div>
      <div data-tina-field={tinaField(data.work, "body")}>
        <TinaMarkdown content={content} />
      </div>
    </Layout>
  );
}

export const getStaticProps = async ({ params }) => {
  const relativePath = `${params.slug}.mdx`;

  const { data, query, variables } = await client.request({
    query: `
      query WorkQuery($relativePath: String!) {
        work(relativePath: $relativePath) {
          title
          order
          body
        }
      }
    `,
    variables: { relativePath },
  });

  return {
    props: {
      query: query || null,
      variables: { relativePath },
      data,
    },
  };
};

export const getStaticPaths = async () => {
  const worksListData = await client.request({
    query: `
      query WorksConnection {
        workConnection {
          edges {
            node {
              _sys {
                filename
              }
            }
          }
        }
      }
    `,
  });

  const paths = worksListData.data.workConnection.edges.map((edge) => ({
    params: { slug: edge.node._sys.filename.replace(/\.mdx$/, "") },
  }));

  return {
    paths,
    fallback: false,
  };
};
