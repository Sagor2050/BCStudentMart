import {
    doc,
    getDoc,
    setDoc,
    serverTimestamp
  } from "firebase/firestore";
  import { db } from "../services/firebase";
  
  // Helper to consistently generate conversation ID
  const getConversationId = (uid1, uid2) => {
    return [uid1, uid2].sort().join("_");
  };
  
  // Create or return existing conversation
  export const createOrGetConversation = async (uid1, uid2) => {
    const convoId = getConversationId(uid1, uid2);
    const convoRef = doc(db, "conversations", convoId);
    const convoSnap = await getDoc(convoRef);
  
    if (convoSnap.exists()) {
      return { id: convoId, ...convoSnap.data() };
    }
  
    const newConvo = {
      participants: [uid1, uid2],
      lastMessage: '',
      timestamp: serverTimestamp(),
    };
  
    await setDoc(convoRef, newConvo);
  
    return { id: convoId, ...newConvo };
  };
  