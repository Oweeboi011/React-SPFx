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
import 'bootstrap/dist/js/bootstrap.bundle';

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

export interface headerfooterstate {
  getData: boolean;
}
/** A Custom Action which can be run during execution of a Client Side Application */
export default class HeaderfooterApplicationCustomizer
  extends BaseApplicationCustomizer<IHeaderfooterApplicationCustomizerProperties> {
  public state: headerfooterstate = {
      getData: true
   }
  @override
  public onInit(): Promise<void> {   
     //work around for nav bootstrap 4
     $(document).ready(function() {
      $('.nav-item').on("click", function (e) { 
        $('.active').removeClass('active');
      });
      $('.nav-link').on("click", function (e) { 
        $('.active').removeClass('active');
      });
      $('.dropdown-toggle').click(function (e) {
        e.preventDefault();
        $('.dropdown-menu').toggle().hide();
        $(e.target).next('.dropdown-menu').toggle();
    });
    $('.dropdown-toggle').blur(function (e) {
      $('.dropdown-menu').toggle().hide();
  });
    });
    let cssURL = "https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css";
    SPComponentLoader.loadCss(cssURL);

    let topPlaceholder: PlaceholderContent = this.context.placeholderProvider.tryCreateContent(PlaceholderName.Top);

    this.properties.siteURL = this.context.pageContext.site.absoluteUrl;
    this.properties.spHttpClient = this.context.spHttpClient;

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
    renderMenuNav(this.properties, this, topPlaceholder);
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
