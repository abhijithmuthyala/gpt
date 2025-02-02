"use client";

import { ChatMessage, Role } from "@/app/types";
import { updateChatSession } from "@/gemini/init";
import { formatHistory } from "@/utils/shared";
import { useRouter } from "next/navigation";
import { useLayoutEffect, useState } from "react";
import Markdown from "react-markdown";
import PromptForm from "../PromptForm";
import { Box, Paper, Container } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import SmartToyIcon from '@mui/icons-material/SmartToy';

export default function ChatInterface({
  history,
  id,
}: {
  history: ChatMessage[];
  id: string;
}) {
  const [chats, setChats] = useState(history);
  const router = useRouter();

  useLayoutEffect(
    function syncChatSession() {
      updateChatSession({ history: formatHistory(history) });
    },
    [id, history],
  );

  function handlePrompt(prompt: string, role: Role) {
    setChats(function reduceChats(chats) {
      return [...chats, { message: prompt, role, chat_id: id }];
    });
    if (history.length === 0) {
      router.refresh();
    }
  }

  return (
    <Container maxWidth="lg" sx={{ height: '100vh' }}>
      <Box 
        sx={{ 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'space-between',
          height: '100%',
          py: 4,
          gap: 2
        }}
      >
        <Chats chats={chats} />
        <PromptForm onPrompt={handlePrompt} history={chats} />
      </Box>
    </Container>
  );
}

function Chats({ chats }: { chats: ChatMessage[] }) {
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: 2,
      overflowY: 'auto',
      flexGrow: 1
    }}>
      {chats.map((chat, index) => {
        const isUser = chat.role === "user";
        return (
          <Box
            key={chat.id ?? index}
            sx={{
              display: 'flex',
              justifyContent: isUser ? 'flex-end' : 'flex-start',
              width: '100%'
            }}
          >
            <Paper
              elevation={1}
              sx={{
                maxWidth: '75%',
                p: 2,
                borderRadius: 2,
                backgroundColor: isUser ? 'primary.light' : 'success.light',
                display: 'flex',
                gap: 1.5,
                alignItems: 'flex-start'
              }}
            >
              {/* Icon for the message sender */}
              {isUser ? (
                <PersonIcon color="primary" />
              ) : (
                <SmartToyIcon color="success" />
              )}
              
              {/* Message content */}
              <Box sx={{ 
                '& > div': { 
                  '& > p': { m: 0 },
                  color: isUser ? 'primary.dark' : 'success.dark'
                }
              }}>
                <Markdown>{chat.message}</Markdown>
              </Box>
            </Paper>
          </Box>
        );
      })}
    </Box>
  );
}
