// pages/_app.js
import "../styles.css";
import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router"; // Import useRouter
import { tinaField, useTina } from "tinacms/dist/react";
import DynamicSvg from "../components/DynamicSvg";
import menu from "../public/images/menu.svg";
import shop from "../public/images/shop.svg";
import insta from "../public/images/insta.svg";
import mail from "../public/images/mail.svg";
import close from "../public/images/close.svg";

const App = ({ Component, pageProps }) => {
  const { data } = useTina({
    query: pageProps.query,
    variables: pageProps.variables,
    data: pageProps.data,
  });

  const [opacity, setOpacity] = useState(1); // State for opacity
  const fontColor = data.home.theme.textColour;
  const backgroundColor = data.home.theme.backgroundColour;
  const buttonColor = data.home.theme.buttonColour;
  const buttonHoverColor = data.home.theme.buttonHoverColour;
  const router = useRouter(); // Initialize useRouter

  useEffect(() => {
    const handleRouteChangeStart = () => {
      setOpacity(0); // Start fade-out
    };

    const handleRouteChangeComplete = () => {
      setOpacity(1); // Start fade-in
    };

    // Listen to route change events
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
    router.events.on("routeChangeError", handleRouteChangeComplete);

    // Cleanup event listeners on unmount
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
      router.events.off("routeChangeError", handleRouteChangeComplete);
    };
  }, [router]);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) {
      window.scrollTo(0, 0);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [mobileMenuOpen]);

  //   {/* Mobile Menu Modal */}
  // <div
  //   id="Menu"
  //   className={`
  //     md:hidden
  //     fixed inset-0     /* fill the entire viewport */
  //     z-10
  //     transition-opacity duration-500 ease-in-out
  //     ${mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"}
  //   `}
  //   style={{
  //     backgroundColor: backgroundColor,
  //   }}
  // >
  //   <div className="pt-10 xl:pt-14">
  //     <div className="md:w-200 lg:w-300 xl:w-400 mx-12 sm:mx-20 md:mx-auto flex flex-row justify-end">
  //       <div
  //         className="w-9 h-9 rounded-full flex flex-row justify-center cursor-pointer"
  //         onClick={() => setMobileMenuOpen(false)}
  //       >
  //         <DynamicSvg src={close.src} color={fontColor} className="mx-auto my-auto" />
  //       </div>
  //     </div>
  //   </div>
  //   <div className="flex flex-row justify-center -mt-2">
  //     <div className="flex flex-col gap-8 text-center text-lg">
  //       {/* ... menu items, etc. */}
  //       {/* Example link: */}
  //       <a
  //         className="my-auto hover:opacity-70"
  //         href="#"
  //         onClick={() => setMobileMenuOpen(false)}
  //       >
  //         Projects
  //       </a>
  //       {/* etc... */}
  //     </div>
  //   </div>
  // </div>

  return (
    <div
      className=""
      style={{
        opacity,
        color: fontColor,
        backgroundColor: backgroundColor,
      }}
    >
      <div
        className={`
              md:hidden w-full h-screen absolute top-0 left-0 z-10 transition-opacity duration-300
              ${
                mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
              }
            `}
        id="Menu"
        style={{
          backgroundColor: backgroundColor,
        }}
      >
        <div className="pt-10 xl:pt-14">
          <div className="md:w-200 lg:w-300 xl:w-400 mx-12 sm:mx-20 md:mx-auto flex flex-row justify-end">
            <div
              className="w-9 h-9 rounded-full flex flex-row justify-center cursor-pointer"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <DynamicSvg
                src={close.src}
                color={fontColor}
                className="mx-auto my-auto"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-row justify-center -mt-2">
          <div className="flex flex-col gap-8 text-center text-lg">
            <div
              className="w-9 h-9 rounded-full flex flex-row justify-center cursor-pointer mx-auto"
              style={{
                backgroundColor: buttonColor,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = buttonHoverColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = buttonColor)
              }
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <DynamicSvg
                src={shop.src}
                color={fontColor}
                className="mx-auto my-auto"
              />
            </div>
            <a
              className="my-auto hover:opacity-70"
              href="#"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              Projects
            </a>
            <a
              className="my-auto hover:opacity-70"
              href="#"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              About
            </a>
            <a
              className="my-auto hover:opacity-70"
              href="#"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              Shop
            </a>
            <a
              className="my-auto hover:opacity-70"
              href="#"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              Exhibitions
            </a>
          </div>
        </div>
      </div>
      <Head>
        <title>Jihyun Kim Ceramic</title>
      </Head>
      <div className="pt-10 xl:pt-14 pb-16 lg:pb-24 ">
        <div className="md:w-200 lg:w-300 xl:w-400 mx-12 sm:mx-20 md:mx-auto flex flex-row justify-between">
          <h1
            className="font-light text-xl md:text-2xl my-auto"
            data-tina-field={tinaField(data.home.header, "title")}
          >
            {data.home.header.title}
          </h1>
          <div
            className="w-9 h-9 rounded-full flex flex-row justify-center cursor-pointer md:hidden"
            style={{
              backgroundColor: buttonColor,
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = buttonHoverColor)
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = buttonColor)
            }
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <DynamicSvg
              src={menu.src}
              color={fontColor}
              className="mx-auto my-auto"
            />
          </div>
          <div className="hidden md:flex gap-6 lg:gap-7 xl:gap-8 text-sm lg:text-smmd xl:text-base">
            <a className="my-auto hover:opacity-70" href="#">
              Projects
            </a>
            <a className="my-auto hover:opacity-70" href="#">
              About
            </a>
            <a className="my-auto hover:opacity-70" href="#">
              Shop
            </a>
            <a className="my-auto hover:opacity-70" href="#">
              Exhibitions
            </a>
            <div
              className="w-9 h-9 rounded-full flex flex-row justify-center cursor-pointer"
              style={{
                backgroundColor: buttonColor,
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = buttonHoverColor)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = buttonColor)
              }
            >
              <DynamicSvg
                src={shop.src}
                color={fontColor}
                className="mx-auto my-auto"
              />
            </div>
          </div>
        </div>
        <Component {...pageProps} />
        <div className="mt-16 lg:mt-24 md:w-200 lg:w-300 xl:w-400 mx-12 sm:mx-20 md:mx-auto flex flex-col justify-start gap-6 md:gap-8">
          <div className="flex flex-row justify-center gap-4 sm:hidden">
            {data.home.footer.insta.toggle && (
              <a
                className="w-9 h-9 rounded-full flex flex-row justify-center cursor-pointer"
                href={data.home.footer.insta.link}
                target="_blank"
                data-tina-field={tinaField(data.home.footer, "insta")}
                style={{
                  backgroundColor: buttonColor,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonHoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonColor)
                }
              >
                <DynamicSvg
                  src={insta.src}
                  color={fontColor}
                  className="mx-auto my-auto"
                />
              </a>
            )}
            {data.home.footer.email.toggle && (
              <a
                className="w-9 h-9 rounded-full flex flex-row justify-center cursor-pointer"
                href={`mailto:${data.home.footer.email.email}`}
                data-tina-field={tinaField(data.home.footer, "email")}
                style={{
                  backgroundColor: buttonColor,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonHoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonColor)
                }
              >
                <DynamicSvg
                  src={mail.src}
                  color={fontColor}
                  className="mx-auto my-auto"
                />
              </a>
            )}
          </div>
          <div className="flex flex-row justify-center gap-4">
            {data.home.footer.mailingList.toggle && (
              <div
                className="h-9 px-4 flex flex-col justify-center rounded-full cursor-pointer"
                data-tina-field={tinaField(data.home.footer, "mailingList")}
                style={{
                  backgroundColor: buttonColor,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonHoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonColor)
                }
              >
                <div className="text-xs xl:text-sm font-medium">
                  {data.home.footer.mailingList.text}
                </div>
              </div>
            )}
            {data.home.footer.insta.toggle && (
              <a
                className="w-9 h-9 rounded-full flex-row justify-center cursor-pointer hidden sm:flex"
                href={data.home.footer.insta.link}
                target="_blank"
                data-tina-field={tinaField(data.home.footer, "insta")}
                style={{
                  backgroundColor: buttonColor,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonHoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonColor)
                }
              >
                <DynamicSvg
                  src={insta.src}
                  color={fontColor}
                  className="mx-auto my-auto"
                />
              </a>
            )}
            {data.home.footer.email.toggle && (
              <a
                className="w-9 h-9 rounded-full flex flex-row justify-center cursor-pointer hidden sm:flex"
                href={`mailto:${data.home.footer.email.email}`}
                data-tina-field={tinaField(data.home.footer, "email")}
                style={{
                  backgroundColor: buttonColor,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonHoverColor)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = buttonColor)
                }
              >
                <DynamicSvg
                  src={mail.src}
                  color={fontColor}
                  className="mx-auto my-auto"
                />
              </a>
            )}
          </div>
          {data.home.footer.bottomText.toggle && (
            <div
              className="mx-auto text-xs xl:text-sm"
              data-tina-field={tinaField(data.home.footer, "bottomText")}
            >
              {data.home.footer.bottomText.text}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default App;
