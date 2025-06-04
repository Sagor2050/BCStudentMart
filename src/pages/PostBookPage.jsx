import React, { useState } from "react";
import { db, storage, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { uploadBytesResumable } from "firebase/storage";

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
      const uploadTask = uploadBytesResumable(storageRef, file);
  
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`📊 Upload is ${progress.toFixed(1)}% done`);
        },
        (error) => {
          console.error("❌ Upload error:", error.message);
          alert("Image upload failed: " + error.message);
          setUploading(false);
        },
        async () => {
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            console.log("🌐 Download URL:", downloadURL);
  
            await addDoc(collection(db, "books"), {
              ...form,
              price: parseFloat(form.price),
              imageURL: downloadURL,
              postedBy: auth.currentUser.uid,
              timestamp: serverTimestamp(),
            });
  
            console.log("📚 Book added to Firestore.");
            alert("✅ Book posted successfully!");
  
            setForm({ title: "", author: "", description: "", price: "", condition: "Good" });
            setFile(null);
          } catch (finalError) {
            console.error("❌ Firestore save error:", finalError.message);
            alert("Failed to save book: " + finalError.message);
          } finally {
            setUploading(false);
            console.log("🟦 Upload process done");
          }
        }
      );
    } catch (outerError) {
      console.error("❌ Unexpected error:", outerError.message);
      alert("Something went wrong. Check console for details.");
      setUploading(false);
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
