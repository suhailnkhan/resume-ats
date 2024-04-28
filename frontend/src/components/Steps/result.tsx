import React from "react";
import Divider from "../Divider";
import { Stack, Typography } from "@mui/material";
export default function Result({ data }) {
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Divider />
      <Typography variant="h4">Resume Analysis Result</Typography>
      <div
        style={{
          alignItems: "center",
        }}
        dangerouslySetInnerHTML={{
          __html: data?.response.replace(/^```html|```$/g, ""),
        }}
      />
    </Stack>
  );
}
