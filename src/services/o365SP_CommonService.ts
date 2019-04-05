import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { Context } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IODataList } from '@microsoft/sp-odata-types';
const log_STR: string = "https://accenturemanilapdc.sharepoint.com/sites/ReactSPFX/SiteAssets//oweebearApps.png";
const react_STR: string = "https://accenturemanilapdc.sharepoint.com/sites/SiteAssets/ReactSPFX/react.png";
import onStyle from '../extensions/headerfooter/HeaderfooterApplicationCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import $ from '../scripts/jquery.min.js';


export function renderMenuNav(currentProps, currentState, topNav): any {
  currentState._menuItems = [];

  //------- COMMENTED FOR TEST 
  let _requestUrl = currentProps.siteURL.concat("/_api/web/Lists/GetByTitle('" + "HeaderNavigation" + "')/GetItems")
  let _camlSingleQuery = "<View><Query></Query></View>"
  const camlQueryPayLoad: any = {
    query: {
      __metadata: { type: 'SP.CamlQuery' },
      ViewXml: _camlSingleQuery
    }
  };
let postOptions: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(camlQueryPayLoad) };
currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
  .then((response: SPHttpClientResponse) => {
    if (response.ok) {
      response.json().then((responseJSON) => {
        if (responseJSON != null && responseJSON.value != null) {
          responseJSON.value.map((list: IODataList) => {
            currentState._menuItems.push({ FieldName: list.Title, ParentField: list.ParentField, Url: list.URL, IsExpanded: list.IsExpanded  }); //
          });

          let newDiv = '<ul class="nav nav-pills">';

          var filterArr = currentState._menuItems.filter(function (e) {
            return (e.Url === '#');
          });
          var arrayLength = filterArr.length;
          for (var i = 0; i < arrayLength; i++) {
            if(filterArr[i].ParentField == 'Parent'){
              newDiv +=  '<li class="nav-item dropdown">' + '<a id=' + '"id_' + filterArr[i].FieldName.trim().replace(' ','') + '" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + filterArr[i].FieldName.trim() + '</a>';
              newDiv += '<div class="dropdown-menu aria-labelledby=' + '"id_' + filterArr[i].FieldName.trim().replace(' ','') + '">';        
              var filterChildArr = currentState._menuItems.filter(function (e) {
                return (e.ParentField === filterArr[i].FieldName);
              });
              console.log('Filtering ' + filterArr[i].FieldName);
              var arrayChildLength = filterChildArr.length;
              for (var xi = 0; xi < arrayChildLength; xi++) {
                console.log('Add ' + filterChildArr[xi].FieldName.trim() + ' in ' +  filterArr[i].FieldName + ' | Parent: ' + filterArr[i].ParentField);
                newDiv += '<a class="dropdown-item" href=' + filterChildArr[xi].Url + '>' + filterChildArr[xi].FieldName.trim() + '</a><div class="dropdown-divider"></div>';
              }     
              newDiv +=  `</div></li>`;
            }
            else if(filterArr[i].ParentField == 'N/A'){
              newDiv += '<li class="nav-item"><a class="nav-link" href=' + filterArr[i].Url + '>' + filterArr[i].FieldName + '</a></li>';
            }
          
          }
          if (topNav) {      
            topNav.domElement.innerHTML = `<div class=${onStyle.app}>
                        <div class="ms-bgColor-themeDark ms-fontColor-white ${onStyle.header}">
                          <img src=${escape(log_STR)} class=${onStyle.iconImgsHeader}></img>
                          </div>
                          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
                          <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
                            <span class="navbar-toggler-icon"></span>
                          </button>` + newDiv +  `</ul>
                          </div>`;
          }

          
      
        }
      })
    }
  })
};
  export function renderDataGrid(currentProps, currentState): any {
    currentState._menuItems = [];
  
    //------- COMMENTED FOR TEST 
    let _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "BikeLibrary" + "')/GetItems")
    let _camlSingleQuery = "<View><Query></Query></View>"
    const camlQueryPayLoad: any = {
      query: {
        __metadata: { type: 'SP.CamlQuery' },
        ViewXml: _camlSingleQuery
      }
    };
  let postOptions: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(camlQueryPayLoad) };
  //currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
  currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        response.json().then((responseJSON) => {
          if (responseJSON != null && responseJSON.value != null) {
            responseJSON.value.map((list: IODataList) => {
              currentState._spItems.push({ Title: list.Title, Description: list.Description, Thumbnail: list.Thumbnail  }); //
            });
          currentState.forceUpdate();
           
          }
        })
      }
    });
};
export function searchSingleListItem(searchText, currentProps, currentEtag, currentState) {
  alert("Searching for " + "'" + searchText + "'");
  //execute service    
  let _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "BikeLibrary" + "')/GetItems")
  let _camlSingleQuery = "<View><Query><Where><Contains><FieldRef Name='Title' /><Value Type='Text'>" + searchText + "</Value></Contains></Where></Query></View>"
  const camlQueryPayLoad: any = {
    query: {
      __metadata: { type: 'SP.CamlQuery' },
      ViewXml: _camlSingleQuery
    }
  };
  let postOptions: ISPHttpClientOptions = { headers: { 'odata-version': '3.0' }, body: JSON.stringify(camlQueryPayLoad) };
  currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    //currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        response.json().then((responseJSON) => {
          console.log(responseJSON.value);
          if (responseJSON != null && responseJSON.value != null) {
            currentEtag = response.headers.get('ETag');
            responseJSON.value.map((list: IODataList) => {
              currentState.setState({ searchId: list.Id, searchTitle: list.Title, searcDescription: list.Description, searchThumbnail: list.Thumbnail });
            });
            renderDataGrid(currentProps, currentState);
          }
        })
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", showErrorMSGBR: true }); }
    });
};
export function editSingleListItem(searchText, currentProps, currentEtag, currentState) {
  console.log('Current value: ' + currentState.state.searchTitle + '|' + currentState.state.searcDescription);

  //clear container
  let _spSearchItems = [];
  alert("Editing for Item #" + "'" + currentState.state.searchId.toString() + "'");
  //execute service
  let _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "BikeLibrary" + "')/items('" + currentState.searchId + "')")
  const camlQueryPayLoad: any = {
    'Title': currentState.searchTitle,
    'Description': currentState.searcDescription
  };
  let postOptions: ISPHttpClientOptions =
  {
    headers: {
      'Accept': 'application/json;odata=nometadata',
      'Content-type': 'application/json;odata=nometadata',
      'odata-version': '',
      'IF-MATCH': '*',
      'X-HTTP-Method': 'MERGE'
    },
    body: JSON.stringify(camlQueryPayLoad)
  };
  currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        renderDataGrid(currentProps, currentState);
        currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "" , showSuccessMSGBR: true });
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "" , showErrorMSGBR: true }); }
    });
};
export function addSingleListItem(searchText, currentProps, currentEtag, currentState) {
  console.log('Current value: ' + currentState.state.searchTitle + '|' + currentState.state.searcDescription);

  //clear container
  let _spSearchItems = [];
  alert("Add for Item #" + "'" + currentState.state.searchId.toString() + "'");
  //execute service
  let _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "BikeLibrary" + "')/items")
  const camlQueryPayLoad: any = {
    // query: {
    //  __metadata: { type: 'SP.Data.MyListListItem' },
    'Title': currentState.state.searchTitle,
    'Description': currentState.state.searcDescription
    //}
  };
  let postOptions: ISPHttpClientOptions =
  {
    headers: {
      'Accept': 'application/json;odata=nometadata',
      'Content-type': 'application/json;odata=nometadata',
      'odata-version': '',
      // 'IF-MATCH': '*',
      // 'X-HTTP-Method': 'MERGE'
    },
    body: JSON.stringify(camlQueryPayLoad)
  };
  currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        renderDataGrid(currentProps, currentState);
        currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "" , showSuccessMSGBR: true });
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "" , showErrorMSGBR: true }); }
    });
};
export function deleteSingleListItem(searchText, currentProps, currentEtag, currentState) {
  console.log('Current value: ' + currentState.searchTitle + '|' + currentState.searcDescription);

  //clear container
  let _spSearchItems = [];
  alert("Deleting for Item #" + "'" + currentState.searchId.toString() + "'");
  //execute service
  let _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "BikeLibrary" + "')/items('" + currentState.searchId + "')")
  const camlQueryPayLoad: any = {
    'Title': currentState.searchTitle,
    'Description': currentState.searcDescription
    //}
  };
  let postOptions: ISPHttpClientOptions =
  {
    headers: {
      'Accept': 'application/json;odata=nometadata',
      'Content-type': 'application/json;odata=nometadata',
      'odata-version': '',
      'IF-MATCH': '*',
      'X-HTTP-Method': 'DELETE'
    },
    body: JSON.stringify(camlQueryPayLoad)
  };
  currentProps.spHttpClient.post(_requestUrl, SPHttpClient.configurations.v1, postOptions)
    .then((response: SPHttpClientResponse) => {
      if (response.ok) {
        renderDataGrid(currentProps, currentState);
        currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "" ,showSuccessMSGBR: true });
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "" , showErrorMSGBR: true }); }
    });
};
export class o365SP_CommonService {
  private _spHttpClient: SPHttpClient;


}