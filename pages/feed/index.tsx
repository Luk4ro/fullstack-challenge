import type { InferGetServerSidePropsType } from "next";
import { Container, Stack } from "@mui/material";
import { Post, Comment, PostWithComment } from "./types";
import Head from "next/head";
import PostCard from "../../components/post";

const Feed = ({
  posts,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  return (
    <>
      <Head>
        {/* 
          Generated the following tags using ChatGTP for speed using the following prompt
          "Generate me some SEO friendly meta HTML tags to go into the header of the Fanvue website found here https://www.fanvue.com/".

          I haven't updated the links inside of the tags due to the time limit.

          Some tags are also missing, with more customisation here: https://ogp.me/

          Potentially also split this out into a separate head component as it's quite large
        */}
        <title>
          Fanvue: Connect, Create, Earn on the Leading Creator Subscription
          Platform
        </title>
        <meta
          name="description"
          content="Fanvue is the ultimate creator subscription platform, offering tools for creators to share exclusive content, connect with fans, and earn money. Sign up now to take home 85% for the first 3 months!"
        />
        <meta
          name="keywords"
          content="Fanvue, creator platform, subscription platform, exclusive content, earn money, fan connection, AI features, messaging, pay-to-view, creator economy"
        />
        <meta name="author" content="Fanvue" />

        <meta
          property="og:title"
          content="Fanvue: The Future of Creator Subscription Platforms"
        />
        <meta
          property="og:description"
          content="Join the fastest growing creator subscription platform. Connect, create, and earn with exclusive tools and features. Sign up today!"
        />
        <meta
          property="og:image"
          content="https://www.fanvue.com/path/to/featured-image.jpg"
        />
        <meta property="og:url" content="https://www.fanvue.com" />
        <meta property="og:site_name" content="Fanvue" />
        <meta property="og:type" content="website" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta
          name="twitter:title"
          content="Fanvue: Connect, Create, Earn on the Leading Creator Subscription Platform"
        />
        <meta
          name="twitter:description"
          content="Fanvue empowers creators to share exclusive content, connect with fans, and earn. Sign up now and get 85% for the first 3 months!"
        />
        <meta
          name="twitter:image"
          content="https://www.fanvue.com/path/to/featured-image.jpg"
        />
        <meta name="twitter:site" content="@FanvueOfficial" />

        {/*
          Add canonical URL here to reduce crawl budget usage with potential "duplicate" content from
          pagination query parameter (if used), e.g. feed?page=1
        */}
        <link rel="canonical" href="https://www.fanvue.com/feed" />
      </Head>
      {/* Use semantic UI here - main component as it's the base of the page */}
      <Container component="main" sx={{ padding: "16px 0" }}>
        <Stack spacing={1.5} alignItems="center">
          {/* 
            Add pagination wrapper, or infinite scroll here. Likely with a loading spinner or even better a skeleton animation to 
            reduce CLS for SEO.          
          */}
          {posts.length > 0 ? (
            posts.map((post) => <PostCard key={post.id} {...post} />)
          ) : (
            <p>No posts found</p>
          )}
        </Stack>
      </Container>
    </>
  );
};

export const getServerSideProps = async () => {
  /*
    Some authorization stuff could go here from an authenticated user session. For
    example, grab the users followed creators, then only fetch the most recent x
    posts from thos creators instead of fetching posts from everyone. Make sure this is appropriately
    paginated to reduce load.

    Could also redirect to a paywall or something if they aren't subscribed to a creator or return 
    some sort of preview content  
  */
  try {
    const postResponse = await fetch(
      "https://jsonplaceholder.typicode.com/posts?_limit=10"
    );
    const posts: Post[] = await postResponse.json();

    /*
      - Add comments to the posts array for easier rendering
      - I would design this endpoint differently as we're currently doing a whole fetch for each separate post.
        A better approach could be passing the all postIds to the comments endpoint and fetching them all in one go.
        E.g. https://jsonplaceholder.typicode.com/comments?postId=1&postId=2
    */
    const postsWithComments = await Promise.all(
      posts.map(async (post) => {
        const commentResponse = await fetch(
          `https://jsonplaceholder.typicode.com/comments?postId=${post.id}`
        );
        const comments: Comment[] = await commentResponse.json();

        return {
          ...post,
          comments: post.id === 1 ? [] : comments,
        };
      })
    );

    return { props: { posts: postsWithComments } };
  } catch (error) {
    // Add some form of monitoring here, e.g. sentry or honeycomb
    console.error(error);
    return { props: { posts: [] } };
  }
};

export default Feed;
