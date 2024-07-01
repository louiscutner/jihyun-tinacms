// import { client } from "../tina/__generated__/client";
// import { Layout } from "../components/Layout";
// import Link from "next/link";

// export default function WorksPage({ works }) {
//   const sortedWorks = works.sort((a, b) => a.order - b.order);

//   return (
//     <Layout>
//       <h1>Works</h1>
//       <ul>
//         {sortedWorks.map((work) => (
//           <li key={work._sys.filename}>
//             <Link href={`/${work._sys.filename.replace(/\.mdx$/, "")}`}>
//               <a>{work.title}</a>
//             </Link>
//           </li>
//         ))}
//       </ul>
//     </Layout>
//   );
// }

// export const getStaticProps = async () => {
//   const worksListData = await client.request({
//     query: `
//       query WorksConnection {
//         workConnection {
//           edges {
//             node {
//               _sys {
//                 filename
//               }
//               title
//               order
//               body
//             }
//           }
//         }
//       }
//     `,
//   });

//   return {
//     props: {
//       works: worksListData.data.workConnection.edges.map((edge) => edge.node),
//     },
//   };
// };

// import { client } from "../tina/__generated__/client"; // Import the client
// import { useTina } from "tinacms/dist/react";
// import { Layout } from "../components/Layout";
// import { tinaField } from "tinacms/dist/react";
// import { TinaMarkdown } from "tinacms/dist/rich-text";

// export default function Index(props) {
//   const { data } = useTina({
//     query: props.query,
//     variables: props.variables,
//     data: props.data,
//   });

//   const content = data.home.body;
//   const title = data.home.title;
//   return (
//     <Layout>
//       <div data-tina-field={tinaField(data.home, "title")}>
//         <h1>{title}</h1>
//       </div>
//       <div data-tina-field={tinaField(data.home, "body")}>
//         <TinaMarkdown content={content} />
//       </div>
//     </Layout>
//   );
// }

// export const getStaticProps = async () => {
//   const { data, query, variables } = await client.queries.home({
//     relativePath: "index.mdx", // Ensure this path is correct
//   });

//   return {
//     props: {
//       data,
//       query,
//       variables,
//     },
//   };
// };

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
  const [isAdminMode, setIsAdminMode] = useState(props.isAdminMode);

  useEffect(() => {
    console.log("Fetched data (Admin Mode):", isAdminMode, data);

    const works = isAdminMode
      ? data.home?.worksList || []
      : data?.workConnection?.edges?.map((edge) => edge.node) || [];

    if (works.length > 0 && worksContent.length === 0) {
      console.log("Setting works data:", works);
      setWorksContent(works);
      console.log("Works data:", works);
    } else if (works.length === 0) {
      console.log("No valid works data found.");
    }
  }, [data, isAdminMode, worksContent.length]);

  const homeContent = data?.home?.body || "";
  const homeTitle = data?.home?.title || "";

  const sortedWorks = worksContent.sort((a, b) => a.order - b.order);
  console.log("Sorted works:", sortedWorks);

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

  console.log("Context:", context);
  console.log("Preview mode (isAdminMode):", isAdminMode);

  const {
    data: homeData,
    query,
    variables,
  } = await client.queries.home({
    relativePath: "index.mdx",
  });

  console.log("Home data:", homeData);

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

    console.log("Works list data:", worksListData);
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
