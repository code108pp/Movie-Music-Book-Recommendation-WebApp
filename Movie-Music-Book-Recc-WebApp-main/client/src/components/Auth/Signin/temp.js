<div className="signup-container">
        <TextField className="email"  label="Email" value={profile.email} onChange={(e)=>{setProfile({...profile,email:e.target.value})}} /> 
        <TextField className="password"
          label="Password"
          type={passwordShown ? "text":"password"}
          autoComplete="current-password"
          value={profile.password}
          onChange={(e)=>{setProfile({...profile,password:e.target.value})}} //...profile initailly will set old value of field and then change the changing field
        />
        <IconButton onClick={togglePassword} style={{color:"black"}}>{passwordShown ? <VisibilityOffIcon/> : <VisibilityIcon/>}</IconButton>
        <Button className="button" style={{backgroundColor:"black"}} variant="contained" onClick={()=>{console.log(profile.email,profile.password)}}>Login</Button>
      </div> 
      {
        Object.keys(user).length !==0 ? <button onClick={(e)=> handleSingOut(e)}>Sign out</button> : console.log() //sign out button show when user logge in or else not
      }
    
      <div id="signInDiv"></div>