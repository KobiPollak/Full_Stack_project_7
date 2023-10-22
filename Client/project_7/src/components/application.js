import { useParams, useNavigate, Outlet } from "react-router-dom";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

const drawerWidth = 240;
const navItems = ["Details", "Payments", "Reports", "Log Out"];

export default function DrawerAppBar(props) {
  const { window } = props;
  const { id } = useParams();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();
  const [showContent, setShowContent] = React.useState(true);

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const handleNavItemClicked = (item) => {
    setShowContent(false);
    // alert(item);
    switch (item) {
      case "Details":
        navigate(`/application/${id}/details`);
        // Code to handle "Home" menu option
        console.log("Navigating to Home page");
        break;
      case "Payments":
        navigate(`/application/${id}/payment`);
        // Code to handle "About" menu option
        console.log("Navigating to About page");
        break;
      case "Reports":
        navigate(`/application/${id}/reports`);
        // Code to handle "Reports" menu option
        console.log("Navigating to Reports page");
        break;
      case "Log Out":
        // Code to handle "Log Out" menu option
        localStorage.removeItem("token");
        navigate(`/signIn`);
        console.log("Logging out...");
        break;
      default:
        console.log("Invalid option");
    }
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        My-Home
      </Typography>
      <Divider />
      <List>
        {navItems.map((item) => (
          <ListItem key={item} disablePadding>
            <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText
                primary={item}
                onClick={() => handleNavItemClicked(item)}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      sx={{
        display: "flex",
        height: "100vh",
        backgroundImage: `url(https://www.coloradorpm.com/wp-content/uploads/2020/05/image-1.jpg)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <CssBaseline />
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: "none", sm: "block" } }}
          >
            My-Home
          </Typography>
          <Box sx={{ display: { xs: "none", sm: "block" } }}>
            {navItems.map((item) => (
              <Button
                key={item}
                sx={{ color: "#fff" }}
                onClick={() => handleNavItemClicked(item)}
              >
                {item}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          p: 3,
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "rgba(255, 255, 255, 0.8)", // Add a semi-transparent background to the content
        }}
      >
        <Toolbar />
        {showContent ? (
          <Box sx={{ textAlign: "center" }}>
            <Typography variant="h4">
              Welcome to Your Property Management Page
            </Typography>
            <Typography variant="body1">
              You can manage your property details, payments, and fill out a
              fault reports from here.
            </Typography>
          </Box>
        ) : null}
        <Outlet />
      </Box>
    </Box>
  );
}