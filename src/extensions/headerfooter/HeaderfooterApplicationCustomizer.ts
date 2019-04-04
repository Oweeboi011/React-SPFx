import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName, PlaceholderProvider
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HeaderfooterApplicationCustomizerStrings';
import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

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
//calling common service
import { renderMenuNav } from '../../services/o365SP_CommonService';

export interface IHeaderfooterApplicationCustomizerProperties {
  testMessage: string;
  spHttpClient: SPHttpClient;
  siteURL: string;
}
export interface HeaderfooterProps {
  siteUrl: string;
  spHttpClient: SPHttpClient;
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderfooterApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderfooterApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {   
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);

    // this.properties.siteURL = this.context.pageContext.web.absoluteUrl;
    // this.properties.spHttpClient = this.context.spHttpClient;
    // renderMenuNav(this.properties, this);

    $( "#SuiteNavPlaceHolder" ).hide(); //hide site nav
    $( "div[class^='mainRow-']" ).hide(); //hide root bar
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
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                      <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarNavDropdown">
                      <ul class="nav nav-pills">
                        <li class="nav-item active">
                          <a class="nav-link active" href="/sites/ReactSPFX">Home</a>
                        </li>
                        <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                          Bikes
                        </a>
                        <div class="dropdown-menu">
                          <a class="dropdown-item" href="#">Fixed Gears</a>
                          <a class="dropdown-item" href="#">Single Speed SSCX</a>
                          <a class="dropdown-item" href="#">Road</a>
                          <a class="dropdown-item" href="#">Gravel</a>
                          <a class="dropdown-item" href="#">Mountain Bike</a>
                        </div>
                        </li>
                        <li class="nav-item dropdown">
                          <a class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Bike Components
                          </a>
                          <div class="dropdown-menu">
                            <a class="dropdown-item" href="#">Framesets</a>
                            <a class="dropdown-item" href="#">Wheelsets</a>
                            <a class="dropdown-item" href="#">Groupsets</a>
                            <a class="dropdown-item" href="#">Brakesets</a>
                            <a class="dropdown-item" href="#">Other Components</a>
                          </div>
                        </li>
                        <li class="nav-item">
                        <a class="nav-link" href="/sites/ReactSPFX/_layouts/15/viewlsts.aspx">Site Contents</a>
                      </li>
                      <li class="nav-item">
                        <a class="nav-link" href="/sites/ReactSPFX/_layouts/15/settings.aspx">Site Settings</a>
                      </li>
                      <li class="nav-item">
                      <a class="nav-link" href="/sites/ReactSPFX/_layouts/15/settings.aspx">About</a>
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
  private _menuItems: {
    FieldName: string,
    ParentField: string,
    Url: string,
    IsExpanded: string
  }[] = [];
}
