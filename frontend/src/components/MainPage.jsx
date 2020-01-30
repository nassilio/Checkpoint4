import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend } from "../conf.js";
import { Image, CloudinaryContext } from "cloudinary-react";

export default function MainPage() {
  const [latestPost, setLatestPost] = useState({});
  const [search, setSearch] = useState("");

  useEffect(() => {
    axios
      .get(`${backend}/api/main`)
      .then(({ data }) => {
        setLatestPost(data);
      })
      .catch(err => {});
  }, []);

  useEffect(() => {
    axios
      .get(`${backend}/api/search/post?subject=${search}`)
      .then(({ data }) => {
        console.log(data);
      })
      .catch(err => {});
  }, [search]);

  return (
    <div className="mainPage">
      latest post
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
      <div className="search">
        <input
          type="text"
          placeholder="Cherche des posts selon leur sujet"
          value={search}
          onChange={e => setSearch(e.target.value)}
        ></input>
      </div>
    </div>
  );
}
