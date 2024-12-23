import { Layout } from "../components/Layout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function HomePage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  console.log("data", data.home.quote.text);

  const Image = ({ height, image, item, tinaName }) => {
    return (
      <div
        className="w-full overflow-hidden"
        style={{ height: `${height ? height * 10 : 10}rem` }}
        data-tina-field={tinaField(item, tinaName)}
      >
        <img
          src={image}
          alt=""
          className="object-cover w-full h-full"
          draggable="false"
        />
      </div>
    );
  };

  return (
    <Layout>
      {/* Add padding to the container */}
      <div className="px-3 sm:px-8">
        <ul className="flex flex-col gap-8">
          {/* print json of all data */}
          <pre>
            {JSON.stringify(
              data.home.imageGallery.desktopImageGallery,
              null,
              2
            )}
          </pre>

          {data.home.quote.showQuote && (
            <div
              className="text-2xl font-serif text-center"
              data-tina-field={tinaField(data.home, "quote.text")}
            >
              {data.home.quote.text}
            </div>
          )}

          {data.home.imageGallery.showGallery && (
            <>
              {data.home.imageGallery.mobileImageGallery && (
                <div className="flex flex-col gap-2 md:hidden">
                  {data.home.imageGallery.mobileImageGallery.map(
                    (item, index) => {
                      if (
                        item.__typename ===
                        "HomeImageGalleryMobileImageGalleryOneImage"
                      ) {
                        return (
                          <Image
                            key={index}
                            item={item}
                            height={item.height}
                            image={item.image}
                            tinaName={"image"}
                          />
                        );
                      } else if (
                        item.__typename ===
                        "HomeImageGalleryMobileImageGalleryTwoImages"
                      ) {
                        return (
                          <div className="flex flex-row gap-2">
                            <Image
                              key={index}
                              item={item}
                              height={item.height}
                              image={item.image1}
                              tinaName={"image1"}
                            />
                            <Image
                              key={index}
                              item={item}
                              height={item.height}
                              image={item.image2}
                              tinaName={"image2"}
                            />
                          </div>
                        );
                      }
                    }
                  )}
                </div>
              )}
              {data.home.imageGallery.desktopImageGallery && (
                <div className="md:flex flex-col gap-2 hidden">
                  {data.home.imageGallery.desktopImageGallery.map(
                    (item, index) => {
                      if (
                        item.__typename ===
                        "HomeImageGalleryDesktopImageGalleryTwoImagesOneWide"
                      ) {
                        const isWideRight = item.wideImage === "right";
                        return (
                          <div key={index} className="flex gap-2 flex-row">
                            <div
                              className={`${isWideRight ? "w-1/3" : "w-2/3"}`}
                            >
                              <Image
                                item={item}
                                height={item.height}
                                image={item.image1}
                                tinaName="image1"
                              />
                            </div>
                            <div
                              className={`${isWideRight ? "w-2/3" : "w-1/3"}`}
                            >
                              <Image
                                item={item}
                                height={item.height}
                                image={item.image2}
                                tinaName="image2"
                              />
                            </div>
                          </div>
                        );
                      } else if (
                        item.__typename ===
                        "HomeImageGalleryDesktopImageGalleryTwoImagesEqualWidth"
                      ) {
                        return (
                          <div key={index} className="flex flex-row gap-2">
                            <Image
                              item={item}
                              height={item.height}
                              image={item.image1}
                              tinaName="image1"
                            />
                            <Image
                              item={item}
                              height={item.height}
                              image={item.image2}
                              tinaName="image2"
                            />
                          </div>
                        );
                      } else if (
                        item.__typename ===
                        "HomeImageGalleryDesktopImageGalleryThreeImages"
                      ) {
                        return (
                          <div key={index} className="flex flex-row gap-2">
                            <Image
                              item={item}
                              height={item.height}
                              image={item.image1}
                              tinaName="image1"
                            />
                            <Image
                              item={item}
                              height={item.height}
                              image={item.image2}
                              tinaName="image2"
                            />
                            <Image
                              item={item}
                              height={item.height}
                              image={item.image3}
                              tinaName="image3"
                            />
                          </div>
                        );
                      }
                    }
                  )}
                </div>
              )}
            </>
          )}
        </ul>
      </div>
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
