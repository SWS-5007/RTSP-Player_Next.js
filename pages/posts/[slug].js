import React from "react";
import ReactPlayer from "react-player";
import { useMemo } from "react";
import MuxPlayer from "@mux/mux-player-react";
import { getMDXComponent } from "mdx-bundler/client";
import { getAllPostSlugs, getPostData } from "../../utils/blogPosts";

export const getStaticProps = async ({ params }) => {
  const postData = await getPostData(params.slug);

  return {
    props: {
      ...postData,
    },
  };
};

export async function getStaticPaths() {
  const paths = getAllPostSlugs();

  return {
    paths,
    fallback: false,
  };
}

export default function BlogPost({ code, frontmatter }) {
  const Component = useMemo(() => getMDXComponent(code), [code]);
  const rtspUrl =
    "rtsp://ineyt:jio12@110.39.5.211:554/cam/realmonitor?channel=2&subtype=0";

  return (
    <>
      <h1>{frontmatter.title}</h1>
      <article>
        <div>
          <ReactPlayer
            url={rtspUrl}
            controls={true}
            width="100%"
            height="auto"
          />
          {/* <ReactPlayer url="#" controls={true} width="100%" height="auto" /> */}
        </div>

        <Component
          components={{
            MuxPlayer,
          }}
        />
      </article>
    </>
  );
}
