
import { ReactNode, useEffect, useState } from "react";
import BlogPosts, { BlogPost } from "./components/BlogPosts";
import { get } from "./util/http";
import ErrorMessage from "./components/ErrorMessage";
import fetchImg from  "./assets/data-fetching.png";

//create type based on assumption of api return
type RawDataBlogPost = {
  id: number;
  userId: number;
  title: string;
  body: string; 
}

const App = () => {
  const [fetchedPosts, setFetchedPosts] = useState<BlogPost[]>(); //hold fetched post
  const [isFetching, setIsFetching] = useState<boolean>(false); //used for loaders while fetching
  const [error, setError] = useState<string>();
  //invoke fetching using useEffect
  useEffect(()=>{
    // create async function to wait for the fetch data
    const fetchPosts = async() => {
      setIsFetching(true); // enable the loader
        //wrapped with try-catch
      try {
        const data = (await get('https://jsonplaceholder.typicode.com/posts')) as RawDataBlogPost[]; //type cast as RawDataBlogPost[] and data save to data
        //re-assigned the data array based on selected info to blogPosts array
        const blogPosts: BlogPost[] = data.map((rawPost)=>{
          return {
            id: rawPost.id,
            title: rawPost.title,
            text: rawPost.body,
          };
        });
        setFetchedPosts(blogPosts); // assign the blogPost to FetchedPosts
      } catch (error) {
        if (error instanceof Error) {//checks the errors if based on Error Class
          setError(error.message);
        }
      }
      setIsFetching(false); //hides the loader
    };

  fetchPosts(); //invoke here to have the await works
   
  },[]);

  //create content to manage return output
  let content: ReactNode;
  if (error) {
    content= <ErrorMessage text={error}/>
  }
  if (fetchedPosts) {
    content = <BlogPosts posts={fetchedPosts}/>
  }
  if (isFetching) {
    content = <p id="loading-fallback">Fetching post...</p>
  }
  return (
    <main>
      <img src={fetchImg} alt="a logo fetching data" />
      {content}
    </main>
  );
}

export default App;
