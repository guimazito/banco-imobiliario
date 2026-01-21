import {
  Container,
  Paper,
  Stack,
  Avatar,
  Typography,
  Box,
  Link,
} from "@mui/material";
import { Navbar } from "../components/Navbar";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function AboutPage() {
  return (
    <>
      <Navbar inviteCode={undefined} gameId={undefined} />
      <Container maxWidth="sm" sx={{ mt: 4 }}>
        <Paper elevation={3} sx={{ p: 4, borderRadius: 3 }}>
          <Stack direction="row" spacing={2} alignItems="center" mb={3}>
            <Avatar
              src="https://github.com/guimazito.png"
              alt="Cláudio Albano Guimarães"
              sx={{ width: 56, height: 56 }}
            />
            <Typography variant="h4" component="h1">
              Cláudio Albano Guimarães
            </Typography>
          </Stack>
          <Box mb={2} display="flex" alignItems="center">
            <EmailIcon sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body1">
              <Link
                href="mailto:albano.guimaraes@gmail.com"
                underline="hover"
                color="inherit"
              >
                albano.guimaraes@gmail.com
              </Link>
            </Typography>
          </Box>
          <Box display="flex" alignItems="center">
            <GitHubIcon sx={{ mr: 1, color: "text.secondary" }} />
            <Typography variant="body1">
              <Link
                href="https://github.com/guimazito"
                target="_blank"
                rel="noopener"
                underline="hover"
                color="inherit"
              >
                github.com/guimazito
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </>
  );
}
