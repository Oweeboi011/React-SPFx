import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { Context } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IODataList } from '@microsoft/sp-odata-types';

export function renderMenuNav(currentProps, currentState): any {
  currentState._menuItems = [];

  //------- COMMENTED FOR TEST 
  let _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "HeaderNavigation" + "')/GetItems")
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
            currentState._spItems.push({ Title: list.Title, Description: list.Description, Thumbnail: list.Thumbnail  }); //
          });
          currentState.forceUpdate();
        }
      })
    }
  });
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