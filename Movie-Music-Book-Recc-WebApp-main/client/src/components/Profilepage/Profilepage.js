import * as React from "react";
import axios from 'axios';
import {useState,useEffect} from 'react'
import Radar from '../Chart/Radar'
import "bootstrap/dist/css/bootstrap.min.css";
import $ from "jquery";
import Popper from "popper.js";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import "./Profilepage.css";
// import impVar from '../../App'

export default function Profilepage() {

    const [user,setUser] = useState([])
    const [profile,setProfile] = useState({userName:"",name:"",email:"",phone:"",profilePhoto:"",DOB:""})
    let base64String = ""

    useEffect(()=>{
      function setData(e){
        console.log("hii")
        setUser(e.data.data)
        setProfile({...profile,profilePhoto:e.data.data.profilePhoto,userName:e.data.data.userName,name:e.data.data.name,phone:e.data.data.phone,email:e.data.data.email,DOB:e.data.data.DOB})
      } 

        async function getUser(){
            await axios.post("http://localhost:3010/userData", {
              _id: JSON.parse(localStorage.getItem("profile")).profile._id,
            }).then(e=>{setData(e)}).catch(e=>{console.log(e)});
        }

        getUser()
        
        // console.log("user",user)
    },[])

    // const handleFile = async (event) => {
    //   var newImage = event.target.files[0];
    //   // console.log(newImage)
    //   var reader = new FileReader();
    //   reader.onload = function () {
    //     base64String = reader.result.replace("data:", "").replace(/^.+,/, "")
    //     // console.log(base64String);
    //   };
    //   reader.readAsDataURL(newImage);
      
    //   // console.log("base64String",base64String)
    //   setProfile({...profile,profilePhoto:base64String})
    //   // setTimeout(()=>{
    //   //   console.log("profile photo",profile.profilePhoto)
    //   // },5000)
    // };

    const convertBase64 = (file) => {
      return new Promise((resolve, reject) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
          // console.log(
          //   fileReader.result.replace("data:", "").replace(/^.+,/, "")
          // );
          resolve(
            setProfile({
              ...profile,
              profilePhoto: fileReader.result
                .replace("data:", "")
                .replace(/^.+,/, ""),
            })
          );
          // resolve(fileReader.result.replace("data:", "").replace(/^.+,/, ""));
        };
        fileReader.onerror = (error) => {
          reject(error);
        };
      });
    };

    const handleFileRead = async (event) => {
      const file = event.target.files[0];
      const base64 = await convertBase64(file);
      // console.log(base64);
    };

    function postData(){

      async function changing(){
        await axios
          .post("http://localhost:3010/changeProfile", {
            _id: JSON.parse(localStorage.getItem("profile")).profile._id,
            profilePhoto: profile.profilePhoto,
            userName: profile.userName,
            name: profile.name,
            phone: profile.phone,
            email: profile.email,
            DOB: profile.DOB,
          })
          .then((e) => {
            console.log("succesfull");
          })
          .catch((e) => {
            console.log(e);  
          });
      }

      changing()

    }
    

  return (
    <div className="container-xl px-4 mt-4">
      {/* {impVar = true} */}

      {/* <!-- Account page navigation--> */}
      <nav className="nav nav-borders --bs-green">
        <h6 className="nav-link active ms-0">Profile</h6>
        <h6 className="nav-link">Apperance</h6>
        {/* <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-profile-security-page" target="__blank">Security</a>
        <a className="nav-link" href="https://www.bootdey.com/snippets/view/bs5-edit-notifications-page"  target="__blank">Notifications</a> */}
      </nav>
      <hr className="mt-0 mb-4" />
      <div className="row">
        <div className="col-xl-4">
          {/* <!-- Profile picture card--> */}
          <div className="card mb-4 mb-xl-0">
            <div className="card-header">Profile Picture</div>
            <div className="card-body text-center">
              {/* <!-- Profile picture image--> */}
              <img
                className="img-account-profile rounded-circle mb-2"
                src={`data:image/png;base64,${profile.profilePhoto}`}
                alt=""
              />
              {console.log(profile)}
              {/* <!-- Profile picture help block--> */}
              <div className="small font-italic text-muted mb-4">
                JPG or PNG no larger than 5 MB
              </div>
              {/* <!-- Profile picture upload button--> */}
              {/* <button className="btn btn-primary" type="file">
                Upload new image
              </button> */}
              <input
                type="file"
                id="actual-btn"
                onChange={(e) => {
                  handleFileRead(e);
                }}
              />
              {/* <label for="actual-btn">Choose File</label> */}
            </div>
          </div>
        </div>
        <div className="col-xl-8">
          {/* <!-- Account details card--> */}
          <div className="card mb-4">
            <div className="card-header">Account Details</div>
            <div className="card-body">
              <form>
                {/* <!-- Form Group (username)--> */}
                <div className="mb-3">
                  {/* {console.log("user", user)} */}
                  <label className="small mb-1" for="inputUsername">
                    Username (how your name will appear to other users on the
                    site)
                  </label>
                  <input
                    className="form-control"
                    id="inputUsername"
                    type="text"
                    placeholder={user.userName}
                    value={profile.userName}
                    onChange={(e) => {
                      setProfile({ ...profile, userName: e.target.value });
                    }}
                  />
                </div>
                {/* <!-- Form Row--> */}
                <div className="row gx-3 mb-3">
                  {/* <!-- Form Group (first name)--> */}
                  <div className="mb-3">
                    <label className="small mb-1" for="inputFirstName">
                      Name
                    </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      placeholder={user.userName}
                      value={profile.name}
                      onChange={(e) => {
                        setProfile({ ...profile, name: e.target.value });
                      }}
                    />
                  </div>
                  {/* <!-- Form Group (last name)-->
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputLastName">Last name</label>
                                <input className="form-control" id="inputLastName" type="text" placeholder="Enter your last name" value="Luna"/>
                            </div> */}
                </div>
                {/* <!-- Form Row        --> */}
                {/* <div className="row gx-3 mb-3">
                            <!-- Form Group (organization name)-->
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputOrgName">Organization name</label>
                                <input className="form-control" id="inputOrgName" type="text" placeholder="Enter your organization name" value="Start Bootstrap"/>
                            </div>
                            <!-- Form Group (location)-->
                            <div className="col-md-6">
                                <label className="small mb-1" for="inputLocation">Location</label>
                                <input className="form-control" id="inputLocation" type="text" placeholder="Enter your location" value="San Francisco, CA"/>
                            </div>
                        </div> */}
                {/* <!-- Form Group (email address)--> */}
                <div className="mb-3">
                  <label className="small mb-1" for="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="email"
                    placeholder={user.email}
                    value={profile.email}
                    onChange={(e) => {
                      setProfile({ ...profile, email: e.target.value });
                    }}
                  />
                </div>
                {/* <!-- Form Row--> */}
                <div className="row gx-3 mb-3">
                  {/* <!-- Form Group (phone number)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" for="inputPhone">
                      Phone number
                    </label>
                    <input
                      className="form-control"
                      id="inputPhone"
                      type="tel"
                      placeholder={user.phone}
                      value={profile.phone}
                      onChange={(e) => {
                        setProfile({ ...profile, phone: e.target.value });
                      }}
                    />
                  </div>
                  {/* <!-- Form Group (birthday)--> */}
                  <div className="col-md-6">
                    <label className="small mb-1" for="inputBirthday">
                      Birthday
                    </label>
                    <input
                      className="form-control"
                      id="inputBirthday"
                      type="date"
                      name="birthday"
                      placeholder="Enter your birthday"
                      value={profile.DOB}
                      onChange={(e) => {
                        setProfile({ ...profile, DOB: e.target.value });
                      }}
                    />
                  </div>
                </div>
                {/* <!-- Save changes button--> */}
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={postData}
                >
                  {/* {console.log(profile)} */}
                  Save changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
