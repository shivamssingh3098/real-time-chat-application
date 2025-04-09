import { X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore";
import { useChatStore } from "../store/useChatStore";
import { useEffect } from "react";

const ChatHeader = () => {
  const {
    selectedUser,
    setSelectedUser,
    currentTyperUser,
    isTyping,
    isNotTyping,
    typingUser,
  } = useChatStore();
  const { onlineUsers } = useAuthStore();
  useEffect(() => {
    const timer = currentTyperUser();
    console.log("typingUser ... ", typingUser);
    console.log("selectedUser ...._id", selectedUser._id);

    let timeOut = 500;
    setTimeout(() => {
      console.log("clearTimeout");
      isNotTyping();
    }, [timeOut]);
    console.log("isTyping", isTyping);

    return () => clearInterval(timer);
  }, [currentTyperUser, isTyping]);
  return (
    <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img
                src={selectedUser.profilePic || "/avatar.png"}
                alt={selectedUser.fullName}
              />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}

              {typingUser === selectedUser._id ? "Typing" : ""}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)}>
          <X />
        </button>
      </div>
    </div>
  );
};
export default ChatHeader;
