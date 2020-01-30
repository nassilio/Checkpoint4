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
        setLatestPost(data);
      })
      .catch(err => {});
  }, []);

  return (
    <div className="mainPage">
      {latestPost
        ? latestPost.map(lastPost => {
            return (
              <div className="latestPost">
                <div className="subject">{lastPost.subject}</div>
                <div className="image">
                  <CloudinaryContext cloudName="nas">
                    <Image publicId={lastPost.image} alt="No image" />
                  </CloudinaryContext>
                </div>
                <div className="text">
                  <p>{lastPost.text}</p>
                </div>
              </div>
            );
          })
        : null}
    </div>
  );
}
