import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Chip,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import styled from "styled-components";

const escalationReasons = [
    {title: "Customer complaint"},
    {title: "Order return"},
    {title: "Missing order"},
];

export const ChatbotEscalation = () => {

  return (
    <Page>
      <Typography variant="h5">Escalation</Typography>
      <Typography variant="body1">
        This expertise focuses on identifying and handling escalation scenarios
        for the given reasons. When an escalation reason is matched, the chatbot
        provides an appropriate response or solution. This expertise helps the
        chatbot recognize when situations require special attention or must be
        escalated to a higher authority.
      </Typography>
      <Typography variant="h6">
        Specify reasons for how the chatbot should respond
      </Typography>
      <Typography variant="body1">
        Select from popular reasons or type in custom scenarios to tell your
        chatbot how to intervene.
      </Typography>
      <Autocomplete
        multiple
        renderTags={(value: readonly string[], getTagProps) =>
            value.map((option: string, index: number) => (
              <Chip label={option} color="success" variant='filled' />
            ))
          }
        renderInput={(params) => (
            <TextField
              {...params}
              variant="filled"
              placeholder="Favorites"
            />
          )}
        options={escalationReasons.map((option) => option.title)}
      />
    </Page>
  );
};

const Page = styled.div`
  padding: 35px;
`;
