import { client } from "../tina/__generated__/client";
import { useTina } from "tinacms/dist/react";
import { Layout } from "../components/Layout";
import { tinaField } from "tinacms/dist/react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Link from "next/link";
import React, { useState, useEffect } from "react";

export default function Index(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const [worksContent, setWorksContent] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const worksListData = await client.request({
          query: `
            query WorksConnection {
              workConnection {
                edges {
                  node {
                    _sys {
                      filename
                    }
                    title
                  }
                }
              }
            }
          `,
        });

        const fetchedWorks = worksListData.data.workConnection.edges.map(
          (edge) => ({
            title: edge.node.title,
            filename: edge.node._sys.filename,
          })
        );

        // Sort fetched works based on the order in data.home.worksList
        const sortedWorks = data.home.worksList
          ? data.home.worksList
              .map((item) =>
                fetchedWorks.find((work) => work.filename === item.filename)
              )
              .filter(Boolean)
          : fetchedWorks;

        setWorksContent(sortedWorks);
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };

    fetchWorks();
  }, [data.home.worksList]);

  const homeContent = data?.home?.content || "";
  const homeTitle = data?.home?.title || "";

  return (
    <Layout>
      <div data-tina-field={tinaField(data?.home, "title")}>
        <h1>{homeTitle}</h1>
      </div>
      <div data-tina-field={tinaField(data?.home, "content")}>
        <TinaMarkdown content={homeContent} />
      </div>
      <h1>Works</h1>
      <ul>
        {worksContent.map((work, index) => (
          <li key={work.filename || `work-${index}`}>
            <Link href={`/${work.filename.replace(/\.mdx$/, "") || "#"}`}>
              <a>{work.title}</a>
            </Link>
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
