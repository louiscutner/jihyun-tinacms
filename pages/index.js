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
  const [isAdminMode] = useState(props.isAdminMode);

  useEffect(() => {
    const works = isAdminMode
      ? data.home?.worksList || []
      : data?.workConnection?.edges?.map((edge) => edge.node) || [];

    if (works.length > 0 && worksContent.length === 0) {
      setWorksContent(works);
    }
  }, [data, isAdminMode, worksContent.length]);

  const homeContent = data?.home?.body || "";
  const homeTitle = data?.home?.title || "";

  const sortedWorks = worksContent.sort((a, b) => a.order - b.order);

  return (
    <Layout>
      <div data-tina-field={tinaField(data?.home, "title")}>
        <h1>{homeTitle}</h1>
      </div>
      <div data-tina-field={tinaField(data?.home, "body")}>
        <TinaMarkdown content={homeContent} />
      </div>
      <h1>Works</h1>
      <ul>
        {sortedWorks.map((work, index) => (
          <li key={work._sys?.filename || index}>
            <Link
              href={`/${work._sys?.filename?.replace(/\.mdx$/, "") || "#"}`}
            >
              <a>{work.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps = async (context) => {
  const isAdminMode = context.preview || false;

  const {
    data: homeData,
    query,
    variables,
  } = await client.queries.home({
    relativePath: "index.mdx",
  });

  let workConnectionData = {};
  if (!isAdminMode) {
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
                order
                body
              }
            }
          }
        }
      `,
    });
    workConnectionData = worksListData.data.workConnection;
  }

  return {
    props: {
      data: {
        home: homeData.home,
        workConnection: workConnectionData,
      },
      query,
      variables,
      isAdminMode,
    },
  };
};
