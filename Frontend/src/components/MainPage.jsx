import React, { useState, useEffect } from "react";
import axios from "axios";
import { backend } from "../conf.js";
import { Image, CloudinaryContext } from "cloudinary-react";

export default function MainPage() {
  const [latestPost, setLatestPost] = useState([]);
  useEffect(() => {
    axios
      .get(`${backend}/api/main`)
      .then(({ data }) => {
        latestPost(data);
      })
      .catch(err => {});
  }, []);
  return (
    <div className="mainPage">
      <div className="latestPost">
        <div className="subject">{latestPost.subject}</div>
        <div className="image">
          <CloudinaryContext cloudName="nas">
            <Image publicId={latestPost.image} alt="No image" />
          </CloudinaryContext>
        </div>
        <div className="text">
          <p>{latestPost.text}</p>
        </div>
      </div>
    </div>
  );
}
