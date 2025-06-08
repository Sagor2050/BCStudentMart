export function getConversationId(uid1, uid2) {
    return [uid1, uid2].sort().join("_");
  }
  