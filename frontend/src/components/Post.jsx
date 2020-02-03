import React, { useState } from "react";

export default function Post() {
  const [text, setText] = useState("");
  const [subject, setSubject] = useState("");

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

  return <div></div>;
}
