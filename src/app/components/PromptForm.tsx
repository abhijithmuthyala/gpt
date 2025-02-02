"use client";

import { useParams } from "next/navigation";
import { useActionState, useRef } from "react";
import { sendQuery } from "../actions/chat";
import { ChatMessage, PromptState, Role } from "../types";
import { Box, TextField, Button, Alert } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export default function PromptForm({
  onPrompt,
  history,
}: {
  onPrompt: (prompt: string, role: Role) => void;
  history: ChatMessage[];
}) {
  const params = useParams();
  const [formState, queryAction, queryIsPending] = useActionState(
    handlePromptAction,
    null,
  );
  const formRef = useRef<HTMLFormElement>(null);

  async function handlePromptAction(
    formState: PromptState,
    formData: FormData,
  ) {
    formRef.current?.reset();

    const prompt = formData.get("prompt") as string;
    queueMicrotask(function updatePrompts() {
      onPrompt(prompt, "user");
    });
    const { response, error } = await sendQuery(
      formData,
      params.chatId as string,
      history,
    );
    if (!error) {
      queueMicrotask(function updatePrompts() {
        onPrompt(response as string, "model");
      });
    }
    return { response, error };
  }

  return (
    <Box
      component="form"
      action={queryAction}
      ref={formRef}
      sx={{
        position: 'sticky',
        bottom: 0,
        bgcolor: 'background.paper',
        p: 2,
        borderTop: 1,
        borderColor: 'divider',
        display: 'flex',
        flexDirection: 'column',
        borderRadius:'20px',
        border:'2px solid black',
        gap: 1
      }}
    >
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          name="prompt"
          id="prompt"
          disabled={queryIsPending}
          placeholder="Ask a question..."
          multiline
          maxRows={4}
          fullWidth
          variant="outlined"
          size="medium"
          sx={{
            '& .MuiOutlinedInput-root': {
              backgroundColor: 'background.paper',
            }
          }}
        />
        <Button
          type="submit"
          disabled={queryIsPending}
          variant="contained"
          color="primary"
          sx={{ 
            minWidth: '56px',
            height: '56px',
            borderRadius: '8px'
          }}
        >
          <SendIcon />
        </Button>
      </Box>

      {formState?.error && !queryIsPending && (
        <FormError error={formState.error} />
      )}
    </Box>
  );
}

function FormError({ error }: { error: string }) {
  return (
    <Alert severity="error" sx={{ mt: 1 }}>
      {error}
    </Alert>
  );
}