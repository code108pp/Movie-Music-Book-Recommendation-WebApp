<><div className="name">
  <TextField className="firstName" label="First Name" value={profile.firstName} onChange={(e) => { setProfile({ ...profile, firstName: e.target.value }) } } />
  <TextField className="middleName" label="Middle Name" style={{ margin: "auto 1.5vh" }} value={profile.middleName} onChange={(e) => { setProfile({ ...profile, middleName: e.target.value }) } } />
  <TextField className="lastName" label="Last Name" value={profile.lastName} onChange={(e) => { setProfile({ ...profile, lastName: e.target.value }) } } />
</div><TextField className="email" label="Email" style={{ marginTop: "0vh", marginBottom: "2vh" }} value={profile.email} onChange={(e) => { setProfile({ ...profile, email: e.target.value }) } } /><TextField
    className="password"
    label="Password"
    type={passwordShown ? "text" : "password"}
    autoComplete="current-password"
    style={{ marginBottom: "2vh" }}
    value={profile.password}
    onChange={(e) => { setProfile({ ...profile, password: e.target.value }) } } /><IconButton onClick={togglePassword} style={{ color: "black" }}>{passwordShown ? <VisibilityOffIcon /> : <VisibilityIcon />}</IconButton><TextField className="password" label="Confirm Password" style={{ marginBottom: "2vh" }} value={confirmPassword} onChange={(e) => { setConfirmPassword(e.target.value) } } />
</>
          {
            passwordChecking ? 
              <h6 style={{color:"red",left:"0px"}}>Password should be same</h6> : ""
          }
          <Button className="button" style={{backgroundColor:"black",marginBottom:"2vh"}} variant="contained" onClick={()=>{checkPassword()}} >Sign Up</Button> 
          { 
            Object.keys(user).length !==0 ? <button onClick={(e)=> handleSingOut(e)}>Sign out</button> : console.log() //sign out button show when user logge in or else not
          }
          <div id="signInDiv"></div>