import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName, PlaceholderProvider
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HeaderfooterApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HeaderfooterApplicationCustomizer';
import { escape } from '@microsoft/sp-lodash-subset';
// import 'bootstrap';

const HEADER_TEXT: string = "TOP ZOOOOOOOOOOOOOOOOOOONEEEEEE";
const FOOTER_TEXT: string = "BOTTOM ZOOOOOOOOOOOOOOOOOOONEEEEEE";
const log_STR: string = "https://accenturemanilapdc.sharepoint.com/sites/siteakuminao365/SiteAssets/logos/oweebearApps.png";
const react_STR: string = "https://accenturemanilapdc.sharepoint.com/sites/siteakuminao365/SiteAssets/logos/react.png";
import { SPComponentLoader } from '@microsoft/sp-loader';

import $ from '../../scripts/jquery.min.js';
require('jquery');
require('bootstrap');
require('popper.js');

import onStyle from './HeaderfooterApplicationCustomizer.module.scss';
export interface IHeaderfooterApplicationCustomizerProperties {
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderfooterApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderfooterApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {   
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.4/umd/popper.min.js
    SPComponentLoader.loadCss(cssURL);

    //hide sp components
    // var suiteBar = document.getElementById('SuiteNavPlaceHolder');
    // suiteBar.setAttribute("style", "display: none !important");
    $( "#SuiteNavPlaceHolder" ).hide(); //hide site nav
    $( "div[class^='root-']" ).hide(); //hide root bar
    $( "div[class^='feedback_']" ).hide(); //hide feedback section
    $( "div[class^='commentsWrapper']" ).hide(); //hide comments section
    $( "div[class^='pageLayout_']").css("background-color", "white");
   
    $( "#spPageChromeAppDiv").css("background-color", "#2B2B2B");
    $( ".SPCanvas").css("background-color", "#2B2B2B");
    //var mainCanvas = document.getElementsByClassName("SPCanvas")[0].setAttribute('style', 'background-color: #2B2B2B;');
    console.log("Available placeholders: ",
      this.context.placeholderProvider.placeholderNames.join(", "));

    // top placeholder..

    let topPlaceholder: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    if (topPlaceholder) {
      topPlaceholder.domElement.innerHTML = `<div class=${onStyle.app}>
                  <div class="ms-bgColor-themeDark ms-fontColor-white ${onStyle.header}">
                    <img src=${escape(log_STR)} class=${onStyle.iconImgsHeader}></img>
                    </div>
                    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                    <a class="navbar-brand" href="#">Navbar</a>
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                      <ul class="navbar-nav">
                        <li class="nav-item active">
                          <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">Features</a>
                        </li>
                        <li class="nav-item">
                          <a class="nav-link" href="#">Pricing</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Bikes
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink1">
                          <a class="dropdown-item" href="#">Fixed Gears</a>
                          <a class="dropdown-item" href="#">Single Speed SSCX</a>
                          <a class="dropdown-item" href="#">Road</a>
                          <a class="dropdown-item" href="#">Gravel</a>
                          <a class="dropdown-item" href="#">Mountain Bike</a>
                        </div>
                        </li>
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Bike Components
                          </a>
                          <div class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink2">
                            <a class="dropdown-item" href="#">Framesets</a>
                            <a class="dropdown-item" href="#">Wheelsets</a>
                            <a class="dropdown-item" href="#">Groupsets</a>
                            <a class="dropdown-item" href="#">Brakesets</a>
                            <a class="dropdown-item" href="#">Other Components</a>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </nav>
                  </div>`;
    }




    // bottom placeholder..
    let bottomPlaceholder: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Bottom);
    if (bottomPlaceholder) {
      bottomPlaceholder.domElement.innerHTML = `<div class=${onStyle.app}>
                  <div class="ms-bgColor-themeDark ms-fontColor-white ${onStyle.footer}">
                    <img src=${escape(react_STR)} class=${onStyle.iconImgsFooter}></img>
                  </div>
                </div>`;


    }
    return Promise.resolve();
  }
}
