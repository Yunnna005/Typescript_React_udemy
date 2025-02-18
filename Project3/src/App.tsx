import { ReactNode, useEffect, useState } from "react";
import { get } from "./util/http";
import BlogPosts, { BlogPost } from "./companents/BlogPosts";
import ErrorMessage from "./companents/ErrorMessage";

type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string;
};

function App() {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>();
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchPosts() {
      setIsFetching(true);

      try {
        const data = (await get(
          "http://jsonplaceholder.typicode.com/posts"
        )) as RawDataBlogPost[];

        const blogPosts: BlogPost[] = data.map((rawPost) => {
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });

        setFetchedPosts(blogPosts);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        }
      }
      setIsFetching(false);
    }

    fetchPosts();
  }, []);

  let content: ReactNode;
  if (error) {
    content = <ErrorMessage text={error}></ErrorMessage>;
  }

  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts}></BlogPosts>;
  }

  if (isFetching) {
    content = <p id="loading-fallback">Fetching...</p>;
  }
  return (
    <main>
      {/* import image */}
      {content}
    </main>
  );

  setFetchedPosts(fetchedPosts);
  return <h1>Data Fetching!</h1>;
}

export default App;
