import * as React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Rating from "@mui/material/Rating";
// import CardActions from "@mui/material/CardActions";
import ImageIcon from "@mui/icons-material/Image";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import AddIcon from "@mui/icons-material/Add";
import PropTypes from "prop-types";
import SwipeableViews from "react-swipeable-views";
import { useTheme } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import { useLocation, useParams } from "react-router-dom";


import "./style.css";

const key = "f20575175c2deae7974eb547727d1ace";
// const id = 550;
// const id = 278;
// const id = 244786;
// const path = `https://image.tmdb.org/t/p/w185${list.poster_path}`

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    "aria-controls": `full-width-tabpanel-${index}`,
  };
}

function Movieinfo() {
  // const location = useLocation();
  // const { id } = location.state;
  const { movie_id } = useParams();
  const [value, setValue] = React.useState(0);
  const [image, setImage] = useState("");
  const [overview, setOverview] = useState("");
  const [genre, setGenre] = useState([]);
  const [title, setTitle] = useState("");
  const [runTime, SetRunTime] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [review, setReview] = useState([]);
  const [video, setVideo] = useState([]);
  const [info, setInfo] = useState([]);
  const [lang, setLang] = useState([]);
  const [company, setCompany] = useState([]);
  const [country, setCountry] = useState([]);
  const [list, setList] = useState([]);
  const [inList,setInList]  = useState(false)
  const [id,setId] = useState()
  // const [avatar,setAvatar] = useState("");


  const theme = useTheme();

  const checkWatchlist = () =>{
    list.map((e) => {
      if (e.movieId === movie_id) {
        setInList(true);
      }
    })
  }

  useEffect(()=>{
    checkWatchlist();
  },[list])

  

  const addToWatchlist = async (movie_id) => {
    console.log(id)
    if(inList === false){

      const movieId = await axios.post("http://localhost:3010/addToWatchlist", {
        _id: JSON.parse(localStorage.getItem("profile")).profile._id,
        movieId: movie_id,
      });
    console.log("movie id ",movieId)
    }
    else{
      console.log("already added to watchlist")
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const fetchMovie = () =>
    axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}?api_key=f20575175c2deae7974eb547727d1ace&language=en-US`
    );

  const fetchReview = () =>
    axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/reviews?api_key=f20575175c2deae7974eb547727d1ace&language=en-US&page=1`
    );

  const fetchVideo = () =>
    axios.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=f20575175c2deae7974eb547727d1ace&language=en-US`
    );

    const watchlist = async () =>
      await axios
        .post("http://localhost:3010/getWatchlist", {
          _id: JSON.parse(localStorage.getItem("profile")).profile._id,
        })
        .then((e) => {
          console.log(e.data.watchlist);
          // console.log(e.data.watchlist);
          setList(e.data.watchlist);
        })
        .catch((e) => {
          console.log(e);
        });

  useEffect(() => {
    let isMounted = true;
     const user = JSON.parse(localStorage.getItem("profile"));
     console.log(user.profile.id);
    //  const Id = user.profile.id.trim();
     const Id = user.profile.id;
     setId(JSON.parse(localStorage.getItem("profile")).profile.id);
    async function getMovie() {


      const result = await fetchMovie();
      if (isMounted) {
        const path = result.data.poster_path;
        
        watchlist()
        

        setImage(`https://image.tmdb.org/t/p/w185${path}`);
        setOverview(result.data.overview);
        setGenre(result.data.genres);
        setTitle(result.data.title);
        SetRunTime(result.data.runtime);
        setReleaseDate(result.data.release_date);
        setInfo(result.data);
        setLang(result.data.spoken_languages);
        setCompany(result.data.production_companies);
        setCountry(result.data.production_countries);

        
      }
    }

    async function getReview() {
      const result = await fetchReview();
      if (isMounted) {
        setReview(result.data.results);
      }
    }

    async function getVideo() {
      const result = await fetchVideo();
      if (isMounted) {
        console.log(result.data);
        // console.log(result.data.results[0].key);
        if (result.data.results.length === 0) {
          setVideo(null);
        } else {
          setVideo(result.data.results);
        }
      }
    }

    getMovie();
    getReview();
    getVideo();
    return () => {
      isMounted = false;
    };


  }, []);

  return (
    <>
      <Container
        maxWidth=""
        className="movieinfo"
        sx={{
          height: "fit-content",
          display: "flex",
          flexDirection: "column",
          padding: "10px 50px",
        }}
      >
        <div className="movie_card" id="bright">
          <div className="info_section">
            <div className="movie_header">
              <img className="locandina" alt="movieImage" src={image} />
              <h1>{title}</h1>
              <h4>
                {releaseDate.slice(0, 4)}
                <span className="minutes">{runTime} min</span>
              </h4>
              <p className="type">
                {genre.map((e) => (
                  <>{`${e.name} `}</>
                ))}
              </p>
            </div>
            <div className="movie_desc">
              <p className="text">{overview}</p>
            </div>
            <div className="movie_social">
              {console.log("list", list)}
              {console.log("inList", inList)}
              {inList == true ? (
                <>
                  <Chip
                    className="social"
                    label={
                      inList == true
                        ? "Already Added to Watchlist"
                        : "Add to Watchlist"
                    }
                    color="primary"
                    sx={{ backgroundColor: "#0055b3", opacity: "0.2" }}
                    onClick={() => {
                      addToWatchlist(movie_id);
                    }}
                  />
                </>
              ) : (
                <>
                  <Chip
                    className="social"
                    label="Add to Watchlist"
                    color="primary"
                    sx={{ backgroundColor: "#0055b3" }}
                    onClick={() => {
                      addToWatchlist(movie_id);
                    }}
                  />
                </>
              )}
              {/* <Rating name="half-rating" defaultValue={2.5} precision={0.5} /> */}
            </div>
          </div>
          <div
            className="blur_back bright_back"
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: "cover",
            }}
          ></div>
        </div>

        <div className="info">
          <Box
            sx={{
              // bgcolor: "background.paper",
              bgcolor: "#0d0d0c",
              width: "100%",
              overflow: "auto",
            }}
          >
            <AppBar position="static">
              <Tabs
                value={value}
                onChange={handleChange} // indicatorColor="secondary" textColor="inherit"
                variant="fullWidth"
                aria-label="full width tabs example"
                sx={{
                  "& button": { backgroundColor: "#001014" },
                  "& button.Mui-selected": { opacity: 0.95, color: "#898983" },
                }}
                TabIndicatorProps={{
                  style: {
                    backgroundColor: "#4B4B4B",
                  },
                }}
              >
                <Tab label="Info" {...a11yProps(0)} sx={{ color: "#b7b6af" }} />
                <Tab
                  label="Trailer"
                  {...a11yProps(1)}
                  sx={{ color: "#b7b6af" }}
                />
                <Tab
                  label="Reviews"
                  {...a11yProps(2)}
                  sx={{ color: "#b7b6af" }}
                />
              </Tabs>
            </AppBar>
            <SwipeableViews
              axis={theme.direction === "rtl" ? "x-reverse" : "x"}
              index={value}
              onChangeIndex={handleChangeIndex}
              sx={{ height: "100%" }}
            >
              <TabPanel
                value={value}
                index={0}
                dir={theme.direction}
                style={{
                  backgroundImage:
                    "linear-gradient(to right , #000c19, #001823 , #000c19)",
                  color: "#cfd6e1",
                }}
              >
                <div className="overall_info">
                  <h1 style={{ color: "#cfd6e1" }}>{title}</h1>
                  <hr className="customHR"></hr>
                  <p>
                    Budget{" "}
                    {info.budget == "" ||
                    info.budget == null ||
                    info.budget === 0 ? (
                      <>
                        <h4 className="stats">NA</h4>
                      </>
                    ) : (
                      <>
                        <h4 className="stats">{info.budget}</h4>
                      </>
                    )}
                  </p>
                  <p>
                    Revenue{" "}
                    {info.revenue == "" ||
                    info.revenue == null ||
                    info.revenue === 0 ? (
                      <>
                        <h4 className="stats">NA</h4>
                      </>
                    ) : (
                      <>
                        <h4 className="stats">{info.revenue}</h4>
                      </>
                    )}
                  </p>
                  <p>
                    Language{" "}
                    {lang.map((e) => (
                      <>
                        <h4>
                          <Chip
                            className="chip"
                            label={e.english_name}
                            color="primary"
                            sx={{ margin: "5px" }}
                          />
                        </h4>
                        {/* <h4>{e.english_name}</h4> */}
                      </>
                    ))}
                  </p>
                  <p>
                    Tagline{" "}
                    {
                      <>
                        <h4 className="stats">{info.tagline}</h4>
                      </>
                    }
                  </p>
                  <p>
                    status{" "}
                    {
                      <>
                        <h4 className="stats">{info.status}</h4>
                      </>
                    }
                  </p>
                  <hr className="customHR"></hr>
                  {/* {console.log(company)} */}
                  <h3>Production company</h3>
                  {company.map((e) =>
                    // console.log(e.logo_path + "logo")
                    e.logo_path == null ? (
                      <>
                        <p style={{ display: "flex", flexDirection: "row" }}>
                          <ImageIcon sx={{ width: "70px", height: "70px" }} />
                          <p
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <h4>{e.name}</h4>

                            <h5 style={{ color: "#009dff" }}>
                              {e.origin_country}
                            </h5>
                          </p>
                        </p>
                      </>
                    ) : (
                      <>
                        <p style={{ display: "flex", flexDirection: "row" }}>
                          <img
                            src={`https://image.tmdb.org/t/p/w185${e.logo_path}`}
                            alt=""
                            srcset=""
                            style={{ backgroundColor: "white" }}
                          />
                          <p
                            style={{ display: "flex", flexDirection: "column" }}
                          >
                            <h4>{e.name}</h4>

                            <h5 style={{ color: "#009dff" }}>
                              {e.origin_country}
                            </h5>
                          </p>
                        </p>
                      </>
                    )
                  )}
                  <hr className="customHR"></hr>
                  <h3>Production Countries</h3>
                  <p style={{ margin: "0px", justifyContent: "center" }}>
                    {country.map((e) => (
                      <Chip
                        className="chip"
                        label={e.name}
                        color="primary"
                        sx={{ margin: "5px" }}
                      />
                    ))}
                  </p>
                  <hr className="customHR"></hr>
                  <a
                    href={info.homepage}
                    style={{ textDecoration: "none", color: "#8cd3ff" }}
                    target="_blank"
                  >
                    More of Us
                  </a>
                </div>
              </TabPanel>
              <TabPanel
                value={value}
                index={1}
                dir={theme.direction}
                style={{
                  backgroundImage:
                    "linear-gradient(to right , #000c19, #001823 , #000c19)",
                  color: "#cfd6e1",
                }}
              >
                {video == null ? (
                  <>
                    <div className="error">Video not found</div>
                  </>
                ) : (
                  video.map((e) => (
                    <>
                      <iframe
                        src={`https://www.youtube.com/embed/${e.key}`}
                        title="React.js Project to Embed Youtube Video in IFrame inside Browser Without any Library in Javascript"
                        height="600"
                        width="1000"
                        frameborder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowfullscreen
                      ></iframe>
                    </>
                  ))
                )}
              </TabPanel>
              <TabPanel
                value={value}
                index={2}
                dir={theme.direction}
                style={{
                  backgroundImage:
                    "linear-gradient(to right , #000c19, #001823 , #000c19)",
                  color: "#cfd6e1",
                }}
              >
                {review == "" || review == null ? (
                  <>
                    <div className="error">Reviews not available</div>
                  </>
                ) : (
                  review.map((e) => {
                    var str = `${e.author_details.avatar_path}`;
                    // setAvatar(`https://image.tmdb.org/t/p/w185${str}`);
                    return (
                      <>
                        <Card className="revCard" sx={{ margin: "10px" }}>
                          <CardHeader
                            avatar={
                              <Avatar
                                src={`https://image.tmdb.org/t/p/w185${str}`}
                              ></Avatar>
                            }
                            title={e.author_details.username}
                            subheader={e.author_details.name}
                          />
                          <CardContent>
                            <Typography>{e.content}</Typography>
                          </CardContent>
                        </Card>
                      </>
                    );
                  })
                )}
              </TabPanel>
            </SwipeableViews>
          </Box>
        </div>
      </Container>
    </>
  );
}

export default Movieinfo;
