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

export default function Index(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  console.log("Fetched data (Admin Mode):", props.isAdminMode, data);

  const homeContent = data.home.body;
  const homeTitle = data.home.title;
  const works = data.workConnection
    ? data.workConnection.edges.map((edge) => edge.node)
    : [];
  const sortedWorks = works.sort((a, b) => a.order - b.order);

  return (
    <Layout>
      <div data-tina-field={tinaField(data.home, "title")}>
        <h1>{homeTitle}</h1>
      </div>
      <div data-tina-field={tinaField(data.home, "body")}>
        <TinaMarkdown content={homeContent} />
      </div>
      <h1>Works</h1>
      <ul>
        {sortedWorks.map((work) => (
          <li key={work._sys.filename}>
            <Link href={`/${work._sys.filename.replace(/\.mdx$/, "")}`}>
              <a>{work.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  );
}

export const getStaticProps = async ({ preview }) => {
  const isAdminMode = !!preview;

  const {
    data: homeData,
    query,
    variables,
  } = await client.queries.home({
    relativePath: "index.mdx",
  });

  console.log("Home data (Admin Mode):", isAdminMode, homeData);

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

  console.log("Works list data (Admin Mode):", isAdminMode, worksListData);

  return {
    props: {
      data: {
        home: homeData.home,
        workConnection: worksListData.data.workConnection,
      },
      query,
      variables,
      isAdminMode,
    },
  };
};
