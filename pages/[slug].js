import { Layout } from "../components/Layout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";
import { useEffect, useState } from "react";

export default function WorkPage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const [workTitle, setWorkTitle] = useState("");

  console.log(data);

  useEffect(() => {
    const newWorkTitle = data.home?.featuredWorks?.find(
      (item) => item.work._sys.filename === data.work._sys.filename
    )?.title;
    if (newWorkTitle !== undefined) {
      setWorkTitle(newWorkTitle);
    }
  }, [data]);

  if (workTitle === "") {
    setWorkTitle(data.work._sys.filename || "Untitled Work");
  }

  return (
    <Layout>
      Hi there
      <h1>{workTitle}</h1>
      <div data-tina-field={tinaField(data.work, "description")}>
        {data.work.description}
      </div>
      <table className="table-auto mt-5">
        <tbody>
          <tr key="Title">
            <td className="pr-10">Title</td>
            <td>{workTitle}</td>
          </tr>
          {data.work.info.map((info, index) => (
            <tr key={index}>
              <td className="pr-10" data-tina-field={tinaField(info, "key")}>
                {info.key}
              </td>
              <td data-tina-field={tinaField(info, "value")}>{info.value}</td>
            </tr>
          ))}
          {data.work.link && (
            <tr key="Link">
              <td className="pr-10">Available From</td>
              <td>
                <a
                  href={data.work.link.url}
                  target="_blank"
                  className="underline text-blue-500"
                  data-tina-field={tinaField(data.work.link, "text")}
                >
                  {data.work.link.text}
                </a>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {/* map from work.gallery each section. within each section, display every image with a map*/}
      <div className="pt-4">
        {data.work.gallery.map((section, index) => (
          <div key={index}>
            <div className="flex">
              {section.image1 && (
                <img
                  className="h-64"
                  src={section.image1}
                  data-tina-field={tinaField(section, "image1")}
                />
              )}
              {section.image2 && (
                <img
                  className="h-64"
                  src={section.image2}
                  data-tina-field={tinaField(section, "image2")}
                />
              )}
              {section.image3 && (
                <img
                  className="h-64"
                  src={section.image3}
                  data-tina-field={tinaField(section, "image3")}
                />
              )}
              {section.image4 && (
                <img
                  className="h-64"
                  src={section.image4}
                  data-tina-field={tinaField(section, "image4")}
                />
              )}
            </div>
          </div>
        ))}
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
        test: params,
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
      params: {
        slug: edge.node._sys.filename.replace(/\.mdx$/, ""),
        // slug: "test.mdx",
      },
    })),
    fallback: false,
  };
  // return {
  //   paths: worksListData.data.homeConnection.edges.map((edge) => ({
  //     params: {
  //       slug: edge.node._sys.filename.replace(/\.mdx$/, ""),
  //       // slug: "test.mdx",
  //     },
  //   })),
  //   fallback: false,
  // };
};
