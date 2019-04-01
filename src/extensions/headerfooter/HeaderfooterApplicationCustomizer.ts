import { override } from '@microsoft/decorators';
import { Log } from '@microsoft/sp-core-library';
import {
  BaseApplicationCustomizer, PlaceholderContent, PlaceholderName, PlaceholderProvider
} from '@microsoft/sp-application-base';
import { Dialog } from '@microsoft/sp-dialog';

import * as strings from 'HeaderfooterApplicationCustomizerStrings';

const LOG_SOURCE: string = 'HeaderfooterApplicationCustomizer';
import { escape } from '@microsoft/sp-lodash-subset';


const HEADER_TEXT: string = "TOP ZOOOOOOOOOOOOOOOOOOONEEEEEE";
const FOOTER_TEXT: string = "BOTTOM ZOOOOOOOOOOOOOOOOOOONEEEEEE";
const log_STR: string = "https://accenturemanilapdc.sharepoint.com/sites/siteakuminao365/SiteAssets/logos/oweebearApps.png";
const react_STR: string = "https://accenturemanilapdc.sharepoint.com/sites/siteakuminao365/SiteAssets/logos/react.png";
import { SPComponentLoader } from '@microsoft/sp-loader';

require('jquery');
require('bootstrap');

import $ from '../../scripts/jquery.min.js';

import onStyle from './HeaderfooterApplicationCustomizer.module.scss';
/**
 * If your command set uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IHeaderfooterApplicationCustomizerProperties {
  // This is an example; replace with your own property
  testMessage: string;
}

/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderfooterApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderfooterApplicationCustomizerProperties> {

  @override
  public onInit(): Promise<void> {
   
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);

    //hide sp components
    // var suiteBar = document.getElementById('SuiteNavPlaceHolder');
    // suiteBar.setAttribute("style", "display: none !important");
    $( "#SuiteNavPlaceHolder" ).hide(); //hide site nav
    $( "div[class^='root-']" ).hide(); //hide root bar
    $( "div[class^='feedback_']" ).hide(); //hide feedback section
    $( "div[class^='commentsWrapper']" ).hide(); //hide comments section
    $( "div[class^='pageLayout_']").css("background-color", "white");
    
    var bgMain = document.getElementById('spPageChromeAppDiv');

    bgMain.setAttribute('style', 'background-color: #2B2B2B;');
    //commandBarWrapper
    var mainCanvas = document.getElementsByClassName("SPCanvas")[0].setAttribute('style', 'background-color: #2B2B2B;');
    console.log("Available placeholders: ",
      this.context.placeholderProvider.placeholderNames.join(", "));

    // top placeholder..

    let topPlaceholder: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);
    if (topPlaceholder) {
      topPlaceholder.domElement.innerHTML = `<div class=${onStyle.app}>
                  <div class="ms-bgColor-themeDark ms-fontColor-white ${onStyle.header}">
                    <img src=${escape(log_STR)} class=${onStyle.iconImgsHeader}></img>
                    </div>
                    <nav class="navbar navbar-inverse">
                    <div class="container-fluid">
                      <div class="navbar-header">
                        <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                          <span class="icon-bar"></span>
                        </button>
                        <a class="navbar-brand" href="#">Menu</a>
                      </div>
                      <div class="collapse navbar-collapse" id="myNavbar">
                        <ul class="nav navbar-nav">
                          <li class="active"><a href="#">Home</a></li>
                          <li class="dropdown">
                            <a class="dropdown-toggle" data-toggle="dropdown" href="#">Bikes Components<span class="caret"></span></a>
                            <ul class="dropdown-menu">
                              <li><a href="#">Framesets </a></li>
                              <li><a href="#">Tire and Rims </a></li>
                              <li><a href="#">Other Component and Parts</a></li>
                            </ul>
                          </li>
                          <li><a href="#">Ride Gallery</a></li>
                          <li><a href="#">Routes</a></li>
                        </ul>
                        <ul class="nav navbar-nav navbar-right">                       
                        </ul>
                      </div>
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
