import React from 'react'
import { Grid } from "@mui/material";
import SideMenu from './../components/SideMenu';
import Profile from '../components/Profile';
import './ProfilePage.css'

export default function ProfilePage() {
  return (
    <div>
      <Grid container component="main" sx={{ maxHeight: "70vh" }}>
        <Grid item xs={2} sm={2} md={3}>
          <SideMenu data={"profile"} />
        </Grid>
        <Grid item xs={4} sm={4} md={9} className='profilepage_profilesection'>
          <Profile />
        </Grid>
      </Grid>
    </div>
  );
}
