import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend } from "../conf.js";
import { Image, CloudinaryContext } from "cloudinary-react";
import Search from "./Search";
import "../style/MainPage.scss";
import Post from "./Post";

export default function MainPage() {
  const [latestPost, setLatestPost] = useState({});
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);

  useEffect(() => {
    axios
      .get(`${backend}/api/main`)
      .then(({ data }) => {
        setLatestPost(data);
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    if (search) {
      axios
        .get(`${backend}/api/search/post?subject=${search}`)
        .then(({ data }) => {
          setResults(data);
        })
        .catch(err => {});
    }
  }, [search]);

  return (
    <div className="mainPage">
      <h1>Latest post</h1>
      {latestPost ? (
        <div className="latestPost">
          <div className="subject">{latestPost.subject}</div>
          <div className="image">
            <CloudinaryContext cloudName="wild-nas">
              <Image publicId={latestPost.image} alt="No image" />
            </CloudinaryContext>
          </div>
          <div className="text">
            <p>{latestPost.text}</p>
          </div>
        </div>
      ) : (
        <img src="/nothing-Text.jpg" alt="nothing" className="nothingImg" />
      )}
      <Post />
      <div className="search">
        <input
          type="text"
          placeholder="Cherche des posts selon leur sujet"
          value={search}
          onChange={e => setSearch(e.target.value)}
        ></input>
      </div>
      <Search posts={results} />
    </div>
  );
}
