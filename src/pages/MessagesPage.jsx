import React, { useEffect, useState } from 'react';
import { db } from '../services/firebase';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const MessagesPage = () => {
  const [conversations, setConversations] = useState([]);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, "conversations"),
      where("participants", "array-contains", user.uid),
      orderBy("timestamp", "desc")
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const convos = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setConversations(convos);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h2 className="text-xl font-semibold mb-4">Inbox</h2>
      {conversations.length === 0 ? (
        <p className="text-gray-600">No messages yet.</p>
      ) : (
        <ul className="space-y-2">
          {conversations.map(conv => (
            <li
              key={conv.id}
              onClick={() => navigate(`/messages/${conv.id}`)}
              className="p-4 bg-white rounded shadow hover:bg-gray-50 cursor-pointer"
            >
              <p className="font-medium">{conv.lastMessage || 'No messages yet'}</p>
              <p className="text-sm text-gray-500">
                {conv.timestamp?.toDate().toLocaleString()}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MessagesPage;
