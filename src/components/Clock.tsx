import { Box, Grid2, Typography } from "@mui/material";

interface IClock {
    hours: string;
    minues: string;
    second: string;
}

const Clock = ({hours, minues, second} : IClock) => {
  return (
    <Grid2 container>
      <Grid2 size={12}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          gap={5}
        >
          <Typography variant="h3" fontWeight={600}>{hours} <span>:</span></Typography>
          <Typography variant="h3" fontWeight={600}>{minues} <span>:</span></Typography>
          <Typography variant="h3" fontWeight={600}>{second}</Typography>
        </Box>
      </Grid2>
    </Grid2>
  );
};

export default Clock;
