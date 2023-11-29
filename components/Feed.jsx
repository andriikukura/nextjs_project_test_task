"use client";
import { useState, useEffect } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
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
  const [searchText, setSearchText] = useState("");
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);

  const handleSearchChange = (e) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const handleTagClick = (tag) => {
    setSearchText(tag);
  };

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/prompt");
      const data = await response.json();

      setPosts(data);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const getFilteredPosts = async () => {
      const filteredArray = [];
      posts.forEach((item) => {
        if (
          item.creator.username.toLowerCase().includes(searchText) ||
          item.prompt.toLowerCase().includes(searchText) ||
          item.tag.toLowerCase().includes(searchText)
        ) {
          filteredArray.push(item);
        }
      });
      setFilteredPosts(filteredArray);
    };
    getFilteredPosts();
  }, [searchText]);

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>
      <PromptCardList
        data={filteredPosts.length > 0 ? filteredPosts : posts}
        handleTagClick={handleTagClick}
      />
    </section>
  );
};

export default Feed;
