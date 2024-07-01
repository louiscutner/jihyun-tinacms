import Link from "next/link";
import Head from "next/head";

export const Layout = (props) => {
  return (
    <div
      style={{
        margin: "3rem",
      }}
    >
      <Head>
        <title>Tina App</title>
        <meta name="description" content="A TinaCMS Application" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Link href="/exhibitions">
          <a className="bg-green-500 m-3 p-3">Exhibitions</a>
        </Link>
        {" | "}
        <Link href="/">
          <a className="bg-pink-500 m-3 p-3">Works</a>
        </Link>
        {" | "}
        <Link href="/about">
          <a className="bg-orange-500 m-3 p-3">About</a>
        </Link>
      </header>
      <main className="text-blue-500 pt-10">{props.children}</main>
    </div>
  );
};
