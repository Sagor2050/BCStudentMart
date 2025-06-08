import React, { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  addDoc,
  query,
  orderBy,
  onSnapshot,
  serverTimestamp,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../services/firebase';
import { useAuth } from '../context/AuthContext';

const ChatPage = () => {
  const { conversationId } = useParams();
  const { user } = useAuth();

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const endRef = useRef(null);

  // 🔁 Load messages in real-time
  useEffect(() => {
    if (!conversationId) return;

    const q = query(
      collection(db, 'messages', conversationId, 'messages'),
      orderBy('timestamp', 'asc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, [conversationId]);

  // 🔻 Scroll to bottom when new messages arrive
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // 🚀 Send message
  const sendMessage = async () => {
    if (!input.trim()) return;

    try {
      // 1. Add message to subcollection
      await addDoc(collection(db, 'messages', conversationId, 'messages'), {
        text: input,
        senderId: user.uid,
        timestamp: serverTimestamp(),
      });

      // 2. Update lastMessage in conversation document
      await updateDoc(doc(db, 'conversations', conversationId), {
        lastMessage: input,
        timestamp: serverTimestamp(),
      });

      setInput('');
    } catch (err) {
      console.error('Error sending message:', err);
      alert('Message failed to send.');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-[#f8edf0] px-4 py-6">
      {/* 💬 Message List */}
      <div className="flex-1 overflow-y-auto mb-4 space-y-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`max-w-xs px-4 py-2 rounded-lg ${
              msg.senderId === user.uid
                ? 'bg-blue-500 text-white ml-auto'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={endRef} />
      </div>

      {/* ✍️ Input */}
      <div className="flex gap-2">
        <input
          type="text"
          className="flex-1 p-2 border border-gray-300 rounded"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-[#8A1538] text-white px-4 py-2 rounded hover:bg-[#6d0f2e]"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
