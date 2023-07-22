import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import AdbIcon from "@mui/icons-material/Adb";
import { useNavigate } from "react-router-dom";
import { RoutesEnum } from "../../shared/enums/routes.enum";

interface navPages {
  title: string;
  link: string;
}

const pages: navPages[] = [
  { link: RoutesEnum.ENTRY, title: "Ingresos" },
  { link: RoutesEnum.SIMULATOR, title: "Simulador" },
  { link: RoutesEnum.LOAN, title: "Crédito" },
  { link: RoutesEnum.VIEW_ENTRY, title: "Buscar Ingreso" },
];

export const NavigationBar = () => {
  const navigate = useNavigate();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="static" sx={{ marginBottom: "30px" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { md: "flex", xs: "none" }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              color: "inherit",
              display: { md: "flex", xs: "none" },
              fontFamily: "monospace",
              fontWeight: 700,
              mr: 2,
              textDecoration: "none",
            }}
          >
            {"CEPO DE ORO"}
          </Typography>

          <Box sx={{ display: { md: "none", xs: "flex" }, flexGrow: 1 }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                horizontal: "left",
                vertical: "bottom",
              }}
              keepMounted
              transformOrigin={{
                horizontal: "left",
                vertical: "top",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { md: "none", xs: "block" },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={() => navigate(page.link)}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { md: "none", xs: "flex" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              color: "inherit",
              display: { md: "none", xs: "flex" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              mr: 2,
              textDecoration: "none",
            }}
          >
            {"CEPO DE ORO"}
          </Typography>
          <Box sx={{ display: { md: "flex", xs: "none" }, flexGrow: 1 }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => navigate(page.link)}
                sx={{ color: "white", display: "block", my: 2 }}
              >
                {page.title}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
