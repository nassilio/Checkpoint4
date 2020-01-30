import React, { useState } from "react";
import { Image, CloudinaryContext } from "cloudinary-react";
import "../style/Search.scss";

export default function Search({ posts }) {
  return (
    <div>
      {posts.map(result => {
        return (
          <div className="post">
            <div className="subject">{result.subject}</div>
            <div className="image">
              <CloudinaryContext cloudName="wild-nas">
                <Image publicId={result.image} alt="No image" />
              </CloudinaryContext>
            </div>
            <div className="text">
              <p>{result.text}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
