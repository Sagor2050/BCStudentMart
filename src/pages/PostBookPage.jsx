import React, { useState } from "react";
import { db, storage, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

const PostBookPage = () => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    price: "",
    condition: "Good",
  });

  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  // 🧠 Handle text field changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // 🧠 Handle file input
  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    if (selected && selected.type.startsWith("image/")) {
      setFile(selected);
    } else {
      alert("Please select a valid image file.");
      setFile(null);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);
    console.log("📤 Starting book post...");
  
    try {
      if (!file) {
        alert("Please select an image file.");
        setUploading(false);
        return;
      }
  
      if (!auth.currentUser) {
        alert("User not authenticated.");
        setUploading(false);
        return;
      }
  
      const imageName = `book-images/${Date.now()}_${file.name}`;
      const storageRef = ref(storage, imageName);
  
      console.log("🔄 Uploading to storage:", imageName);
      const snapshot = await uploadBytes(storageRef, file);
  
      console.log("✅ Upload complete, fetching URL...");
      const imageURL = await getDownloadURL(snapshot.ref);
      console.log("🌐 Download URL:", imageURL);
  
      await addDoc(collection(db, "books"), {
        ...form,
        price: parseFloat(form.price),
        imageURL,
        postedBy: auth.currentUser.uid,
        timestamp: serverTimestamp(),
      });
  
      console.log("📚 Book added to Firestore.");
      alert("✅ Book posted successfully!");
  
      setForm({ title: "", author: "", description: "", price: "", condition: "Good" });
      setFile(null);
    } catch (error) {
      console.error("❌ Error posting book:", error);
      alert("Something went wrong. Check the console for details.");
    } finally {
      setUploading(false);
      console.log("🟦 Upload process done");
    }
  };
  
  

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md space-y-4 mt-10"
    >
      <h2 className="text-xl font-bold text-center text-[#8A1538]">Post a Book / Item</h2>

      <input
        name="title"
        placeholder="Book Name / Item Title"
        value={form.title}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="author"
        placeholder="Author / Brand"
        value={form.author}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <textarea
        name="description"
        placeholder="Short Description"
        value={form.description}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <input
        name="price"
        type="number"
        placeholder="Price in USD"
        value={form.price}
        onChange={handleChange}
        required
        className="w-full p-2 border rounded"
      />
      <select
        name="condition"
        value={form.condition}
        onChange={handleChange}
        className="w-full p-2 border rounded"
      >
        <option value="New">New</option>
        <option value="Like New">Like New</option>
        <option value="Good">Good</option>
        <option value="Fair">Fair</option>
      </select>

      {/* 📸 File Upload */}
      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="w-full p-2 border rounded"
      />

      <button
        type="submit"
        disabled={uploading}
        className="w-full bg-[#8A1538] text-white py-2 rounded hover:bg-[#6d0f2e] transition"
      >
        {uploading ? "Uploading..." : "Post Book"}
      </button>
    </form>
  );
};

export default PostBookPage;
