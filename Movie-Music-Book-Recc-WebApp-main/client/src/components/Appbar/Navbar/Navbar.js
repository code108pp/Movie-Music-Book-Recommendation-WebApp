import * as React from "react";
import { useState,useEffect,useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from 'axios';
import { logout } from '../../../actions/auth.js';
import { Avatar, Button} from "@mui/material";

import EditIcon from "@mui/icons-material/Edit";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {  imageListClasses} from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ExitToAppOutlinedIcon from "@mui/icons-material/ExitToAppOutlined";
import AssessmentRoundedIcon from "@mui/icons-material/AssessmentRounded";
import ContactlessIcon from "@mui/icons-material/Contactless";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import FlashOnOutlinedIcon from "@mui/icons-material/FlashOnOutlined";
import { Link } from "react-router-dom";
import { borderRadius } from "@mui/system";
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import RememberMeIcon from '@mui/icons-material/RememberMe';
import WorkHistoryIcon from '@mui/icons-material/WorkHistory';
import '../Navbar/navbarStyle.css'
import avatar from './download.png'

const drawerWidth = 190;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0,1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

export default function PersistentDrawerRight({ setIsLogged }) {
  const name = JSON.parse(localStorage.getItem('profile'))
  // const [image,setImage] =useState(); 
  const theme = useTheme();
  
  // const [user,setUser] = useState()
  let id = useRef(null)
  const [image,setImage]  = useState({
    image:""
  })
  const [open, setOpen] = React.useState(false);
  // const [toggle,setToggle] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // let base64String = "";

  useEffect(()=>{
    
    const user = JSON.parse(localStorage.getItem("profile"));
    console.log(user.profile._id); 
    // const Id = (user.profile.id).trim()
    const Id = (user.profile._id)
    id.current = Id
    // console.log("id",id,"type",typeof(id))

    async function getUserData(){
      const data = await axios.post('http://localhost:3010/userData',{_id:Id})  
      // console.log(data.data.data.profilePhoto)  
      console.log(data);
      var oldImage = await data.data.data.profilePhoto
      // // console.log("oldImage",oldImage)
      setImage({image: data.data.data.profilePhoto})
      // setImage(oldImage)
    }
    
    getUserData() 
    
  },[])


    // const changeImage = async ()=>{
    //   // console.log("image",image)
    //   console.log("id",id.current)
    //   await axios
    //   .post("http://localhost:3010/changeProfilePhoto", {
    //     _id: id.current,
    //     profilePhoto: base64String,
    //   })
    //   .then((e) => {
    //     console.log("successfully change photo");
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    // }

    


  const handleDrawerOpen = () => {
    setOpen(true);
  };

  // const handleFile = async (event) => {
  //   var newImage = event.target.files[0];
  //   // console.log(newImage)
  //   var reader = new FileReader()
  //   reader.onload = function (){
  //     base64String = reader.result.replace("data:", "").replace(/^.+,/, "");
  //     console.log(base64String);
  //   }
  //   reader.readAsDataURL(newImage);
  //   // setImage(base64String);
   
  //   setImage({image:base64String})
  //   console.log(base64String)
  //   console.log("image",image)
  //   const userId = (id.current).trim()
  //   changeImage();

  //   setToggle(!toggle)
   
  // };


  const handleDrawerClose = () => {
    setOpen(false);
  };

  const logOut = () => {
    // try {
      console.log('trying to logout')
      dispatch(logout(setIsLogged, navigate));
    // } catch (error) {
    //   console.log(error);
    // }
  };

  return (
    <Box
      style={{ display: "flex", overflow: "hidden" }}
      marginBottom={0}
      marginRight={3}
      marginLeft={3}
      marginTop={2.5}
    >
      <AppBar
        style={{ background: "#5579C6", borderRadius: "20px" }}
        position="sticky"
        elevation={0}
        open={open}
      >
        <Toolbar>
          <IconButton color="inherit" component={Link} to="/">
            <ContactlessIcon />
          </IconButton>
          <Typography
            variant="h4"
            component={Link} to="/"
            onClick={handleDrawerOpen}
            style={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            Movie Recommender
          </Typography>
          <Typography
            variant="h4"
            component={Link} to="/books"
            style={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            Book Recommender
          </Typography>
          {/* <Typography
            variant="h4"
            component={Link} to="/music"
            style={{ flexGrow: 1, textDecoration: "none", color: "white" }}
          >
            Music
          </Typography> */}

          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            style={{ ...(open && { display: "none" }) }}
          >
            <Avatar style={{ background: "#281E5D" }} >
              {/* <FlashOnOutlinedIcon /> */}
            </Avatar>
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        style={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawerPaper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader style={{ background: "#7697A0" }}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>

        <div className="profile-pic">
          {/* <label className="-label" > */}
          <span className="glyphicon glyphicon-camera"></span>
          {/* <span> */}
          <EditIcon sx={{ margin: "auto" }} />
          {/* </span> */}
          {/* </label> */}
          {/* <input
            id="file"
            type="file"
            
            onChange={handleFile}
            // onChange={(event) => {
            //   console.log(URL.createObjectURL(event.target.files[0]));
            //   setImage(URL.createObjectURL(event.target.files[0]));
            // }}
          /> */}
          {/* {console.log(image)} */}

          {image === null || image==""? (
            (console.log("image is null"),
            (<img src={avatar} alt={avatar} id="output" width="200" />))
          ) : (
            <img
              src={`data:image/png;base64,${image.image}`}
              alt={avatar}
              id="output"
              width="200"
            />
          )}
        </div>

        <Button className="userName" color="inherit" sx={{ marginTop: 5 }}>
          <Typography variant="h5" className="proNam">
            {name === null ? "username" : name.profile.userName}
          </Typography>
        </Button>
        <Divider />

        <List style={{ display: "flex", flexDirection: "column" }}>
          <ListItemButton component={Link} to={`/user/profile`} >
            <ListItem>
              <ListItemIcon>
                <RememberMeIcon />
              </ListItemIcon>
              <ListItemText style={{ color: "black" }} primary="My Profile" />
            </ListItem>
          </ListItemButton>

          <ListItemButton component={Link} to={`/timeline`}>
            <ListItem>
              <ListItemIcon>
                <WorkHistoryIcon />
              </ListItemIcon>
              <ListItemText style={{ color: "black" }} primary="Timeline" />
            </ListItem>
          </ListItemButton>

          <ListItemButton component={Link} to={`/watchlist`}>
            <ListItem>
              <ListItemIcon>
                <WorkHistoryIcon />
              </ListItemIcon>
              <ListItemText style={{ color: "black" }} primary="Watchlist" />
            </ListItem>
          </ListItemButton>

          <ListItemButton
            onClick={() => {
              logOut();
            }}
          >
            <ListItem>
              <ListItemIcon>
                <ExitToAppIcon />
              </ListItemIcon>
              <ListItemText style={{ color: "black" }} primary="Sign Out" />
            </ListItem>
          </ListItemButton>
        </List>
      </Drawer>
    </Box>
  );
}

