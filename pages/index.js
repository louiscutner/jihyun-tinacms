import { Layout } from "../components/Layout";
import { tinaField, useTina } from "tinacms/dist/react";
import { client } from "../tina/__generated__/client";

export default function HomePage(props) {
  const { data } = useTina({
    query: props.query,
    variables: props.variables,
    data: props.data,
  });

  const gap = data.home.imageSpacing || 0;

  const Image = ({ height, image, item, tinaName, widthFraction = 1 }) => {
    const aspectRatio = height || 1; // Default aspect ratio
    const adjustedHeight = aspectRatio / widthFraction; // Adjust aspect ratio based on width fraction

    return (
      <div
        className="w-full overflow-hidden relative"
        style={{ paddingBottom: `${adjustedHeight * 20}%` }} // Adjust padding-bottom for correct aspect ratio
        data-tina-field={tinaField(item, tinaName)}
      >
        <img
          src={image}
          alt=""
          className="object-cover absolute top-0 left-0 w-full h-full"
          draggable="false"
        />
      </div>
    );
  };

  return (
    <Layout>
      <div className="px-3 sm:px-8">
        <ul className="flex flex-col gap-8">
          {/* print json of all data */}
          {/* <pre>
            {JSON.stringify(
              data.home.imageGallery.desktopImageGallery,
              null,
              2
            )}
          </pre> */}

          {data.home.quote.showQuote && (
            <div
              className="text-2xl text-center italic font-thin"
              data-tina-field={tinaField(data.home, "quote.text")}
            >
              {data.home.quote.text}
            </div>
          )}

          {data.home.imageGallery.showGallery && (
            <>
              {data.home.imageGallery.mobileImageGallery && (
                <div
                  className="flex flex-col md:hidden"
                  style={{ gap: `${gap}px` }}
                >
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
                          <div
                            className="flex flex-row"
                            style={{ gap: `${gap}px` }}
                          >
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
                <div
                  className="md:flex flex-col hidden"
                  style={{ gap: `${gap}px` }}
                >
                  {data.home.imageGallery.desktopImageGallery.map(
                    (item, index) => {
                      if (
                        item.__typename ===
                        "HomeImageGalleryDesktopImageGalleryTwoImagesOneWide"
                      ) {
                        const isWideRight = item.wideImage === "right";
                        return (
                          <div
                            key={index}
                            className="flex" // Changed from grid grid-cols-12 to flex
                            style={{ gap: `${gap}px` }}
                          >
                            <div
                              className={`${isWideRight ? "w-1/3" : "w-2/3"}`} // Changed from col-span to w-1/3 or w-2/3
                            >
                              <Image
                                item={item}
                                height={item.height}
                                image={item.image1}
                                tinaName="image1"
                                widthFraction={isWideRight ? 1 / 3 : 2 / 3}
                              />
                            </div>
                            <div
                              className={`${isWideRight ? "w-2/3" : "w-1/3"}`} // Changed from col-span to w-2/3 or w-1/3
                            >
                              <Image
                                item={item}
                                height={item.height}
                                image={item.image2}
                                tinaName="image2"
                                widthFraction={isWideRight ? 2 / 3 : 1 / 3}
                              />
                            </div>
                          </div>
                        );
                      } else if (
                        item.__typename ===
                        "HomeImageGalleryDesktopImageGalleryTwoImagesEqualWidth"
                      ) {
                        return (
                          <div
                            key={index}
                            className="flex flex-row"
                            style={{ gap: `${gap}px` }}
                          >
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
                          <div
                            key={index}
                            className="grid grid-cols-12"
                            style={{ gap: `${gap}px` }}
                          >
                            <div className="col-span-4">
                              <Image
                                item={item}
                                height={item.height}
                                image={item.image1}
                                tinaName="image1"
                                widthFraction={1 / 3}
                              />
                            </div>
                            <div className="col-span-4">
                              <Image
                                item={item}
                                height={item.height}
                                image={item.image2}
                                tinaName="image2"
                                widthFraction={1 / 3}
                              />
                            </div>
                            <div className="col-span-4">
                              <Image
                                item={item}
                                height={item.height}
                                image={item.image3}
                                tinaName="image3"
                                widthFraction={1 / 3}
                              />
                            </div>
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
