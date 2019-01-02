import React, { Component } from "react";
import AppBar from '@material-ui/core/AppBar';
import { render } from "react-dom";
import './index.css'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import VideoComponent from './VideoComponent'


let dom = document.getElementById("app");

render(
<MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div>
          <VideoComponent />
        </div>
    </MuiThemeProvider>
    ,
    dom
);
