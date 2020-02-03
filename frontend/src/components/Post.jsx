import React, { useState } from "react";
import axios from "axios";
import { backend } from "../conf.js";
import "../style/Post.scss";

export default function Post() {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");
  const [file, setFile] = useState(null);

  const handleImageChange = e => {
    e.preventDefault();
    let reader = new FileReader();
    let selectedFile = e.target.files[0];
    reader.onloadend = () => {
      setFile(selectedFile);
    };
    reader.readAsDataURL(selectedFile);
  };

  const submit = e => {
    e.preventDefault();
    if (file) {
      let uploadImage = new FormData();
      uploadImage.append("file", file);
      axios.post(`${backend}/api/postimage`, uploadImage).then(res => {
        let image = res.data.secure_url;
        let postContent = { image, text, subject };
        axios.post(`${backend}/api/post`, postContent).then(() => {
          setSubject("");
          setText("");
          setFile(null);
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
            setSubject(e.target.value);
          }}
          className="subject"
          maxLength="50"
        />
        <input type="file" onChange={e => handleImageChange(e)} />
        <textarea
          type="text"
          name="text"
          placeholder="Text..."
          value={text}
          onChange={e => {
            setText(e.target.value);
          }}
          className="text"
          maxLength="500"
        />

        <button type="submit">Post</button>
      </form>
    </div>
  );
}
