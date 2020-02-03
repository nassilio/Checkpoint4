import React, { useState } from "react";
import axios from "axios";
import { backend } from "../conf.js";

export default function Post() {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const submit = e => {
    e.preventDefault();
    if (file) {
      let uploadImage = new FormData();
      uploadImage.append("file", file);
      axios.post(`${backend}/api/postimage`, uploadImage).then(res => {
        let image_url = res.data;
        let postContent = { image_url, text, subject };
        axios.post(`${backend}/api/post`, postContent).then(() => {
          setSubject("");
          setText("");
        });
      });
    }
  };

  return (
    <div>
      <form onSubmit={e => submit(e)}>
        <textarea
          type="text"
          name="subject"
          placeholder="subject..."
          value={subject}
          onChange={e => {
            setText(e.target.value);
          }}
          className="headPost"
          maxLength="500"
        />
        <input type="file" />
        <textarea
          type="text"
          name="text"
          placeholder="Text..."
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
          className="headPost"
          maxLength="500"
        />

        <button type="submit">Post</button>
      </form>
    </div>
  );
}
