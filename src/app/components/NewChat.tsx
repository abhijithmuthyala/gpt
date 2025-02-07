import { startNewChat } from "../actions/supabase";
import NewChatButton from "./NewChatButton";

export default function NewChat() {
  return (
    <form action={startNewChat}>
      <NewChatButton />
    </form>
  );
}
