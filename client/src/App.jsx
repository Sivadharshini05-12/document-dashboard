import { useState } from "react";
import axios from "axios";

function App() {
  const [files, setFiles] = useState([]);

  const handleChange = (e) => {
    setFiles(e.target.files);
  };

  const handleUpload = async () => {
    const formData = new FormData();

    for (let i = 0; i < files.length; i++) {
      formData.append("files", files[i]);
    }

    try {
      await axios.post("http://localhost:5000/api/upload", formData);
      alert("Upload successful");
    } catch (err) {
      console.error(err);
      alert("Upload failed");
    }
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Document Management Dashboard</h1>

      <input
        type="file"
        multiple
        accept="application/pdf"
        onChange={handleChange}
      />

      <br />
      <br />

      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default App;