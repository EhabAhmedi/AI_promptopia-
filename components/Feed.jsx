"use client";
import { useState, useEffect, useCallback } from "react";
import PromptCard from "./PromptCard";
import Image from "next/image";
import Aos from "aos";
import 'aos/dist/aos.css'

const PromptCardList = ({ data, handleTagClick }) => {
  useEffect(()=>{
    Aos.init({duration:1500});
  },[])
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  );
};

const Feed = () => {
  const [allPosts, setAllPosts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchedResults, setSearchedResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPosts = useCallback(async () => {
    try {
      const response = await fetch("/api/prompt", {
        method: "GET",
        headers: { "Cache-Control": "no-store" },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }

      const data = await response.json();
      setAllPosts(data);
      setLoading(false);
      setError(null);
    } catch (error) {
      setError("Failed to fetch data");
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPosts();

    const interval = setInterval(fetchPosts, 5000); // Fetch posts every 5 seconds
    return () => clearInterval(interval); // Clean up the interval on component unmount
  }, [fetchPosts]);

  const filterPrompts = (searchText) => {
    const regex = new RegExp(searchText, "i");
    return allPosts.filter(
      (item) =>
        regex.test(item.creator.username) ||
        regex.test(item.tag) ||
        regex.test(item.prompt)
    );
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);

    const searchResult = filterPrompts(e.target.value);
    setSearchedResults(searchResult);
  };

  const handleTagClick = (tagName) => {
    setSearchText(tagName);

    const searchResult = filterPrompts(tagName);
    setSearchedResults(searchResult);
  };

  if (loading) {
    return <Image
    src="/assets/icons/loader.svg"
    alt="logo"
    width={80}
    height={80}
    className="object-contain mt-20"
  />;
  }

  if (error) {
    return <p>Please refresh: {error}</p>;
    
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input 
        data-aos="zoom-out"
        data-aos-duration="1000"
          type="text"
          placeholder="Search for a tag or a username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {/* All Prompts */}
      {searchText ? (
        <PromptCardList
          data={searchedResults}
          handleTagClick={handleTagClick}
        />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handleTagClick} />
      )}
    </section>
  );
};

export default Feed;