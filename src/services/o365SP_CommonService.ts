import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions, ISPHttpClientBatchOptions, ISPHttpClientBatchCreationOptions, SPHttpClientBatch } from '@microsoft/sp-http';

import { Context } from 'react';
import { WebPartContext } from '@microsoft/sp-webpart-base';
import { IODataList, IODataListItem } from '@microsoft/sp-odata-types';
const log_STR: string = "https://accenturemanilapdc.sharepoint.com/sites/ReactSPFX/SiteAssets//oweebearApps.png";
const react_STR: string = "https://accenturemanilapdc.sharepoint.com/sites/SiteAssets/ReactSPFX/react.png";
import onStyle from '../extensions/headerfooter/HeaderfooterApplicationCustomizer.module.scss';
import { escape } from '@microsoft/sp-lodash-subset';
import $ from '../scripts/jquery.min.js';

require('jquery');
require('bootstrap');
require('popper.js');

// interface IHttpResponse<T> extends Response {
//   parsedBody?: T;
// }

// export const http = <T>(request: RequestInfo): Promise<IHttpResponse<T>> => {
//   let response: IHttpResponse<T>;
//   return new Promise(resolve => {
//     fetch(request)
//       .then(res => {
//         response = res;
//         return res.json();
//       })
//       .then(body => {
//         response.parsedBody = body;
//         resolve(response);
//       });
//   });
// };

export async function render5k(currentProps, currentState) {
  try {
    currentState._spItems = [];
    var Items = []
    var intCount, intervalCount, batchCount = 0;
    var _xxxItems: {
      Title: string,
      Source: string,
      Transaction: string,
      EventDate: string,
      UserName: string,
    }[] = [];

    var nextCount = 0;
    intervalCount = 5000;
    let _requestUrl = "";
    _xxxItems = [];
    //count Items
    let _getitemCount = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "LogTransaction" + "')/ItemCount")
    var jsonRequest_Count = await currentProps.spHttpClient.get(_getitemCount, SPHttpClient.configurations.v1);
    if (!jsonRequest_Count.ok) {
      const responseText = await jsonRequest_Count.text();
      throw new Error(responseText + " || " + _getitemCount);
    };
    //If request was successful
    intCount = await jsonRequest_Count.json();

    //execute loop   
    for (var i = 0; i < intCount.value; i += 1000) {
      try {
        nextCount += 1000;
        _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "LogTransaction" + "')/Items?%24skiptoken=Paged%3DTRUE%26p_ID=" + (i.toString()) + "&%24top=" + (nextCount.toString()) + "&$select=Attachments,AttachmentFiles,*&$expand=AttachmentFiles")
        const jsonRequest_5k = await currentProps.spHttpClient.get(_requestUrl, SPHttpClient.configurations.v1);

        if (!jsonRequest_5k.ok) {
          const responseText = await jsonRequest_5k.text();
          throw new Error(responseText + _requestUrl);
        };
        //If request was successful
        const resGrid: any = await jsonRequest_5k.json();
        //map
        resGrid.value.map((list: IODataList) => {
          _xxxItems.push({ Title: list.Title, Source: list.Source, Transaction: list.Transaction, EventDate: list.EventDate, UserName: list.UserName }); //
          console.log("Added " + list.Title);
        });
        batchCount = _xxxItems.length;

        if (_xxxItems.length > 2000) {
          currentProps.ShowLoading = false;
          currentState._spItems = _xxxItems;
          currentState.forceUpdate();
        }
      } catch (error) {
        throw new Error(error);
      }
    }
    //currentState._spItems = resGrid;
  } catch (error) {
    console.log("Reach Batch Count: " + batchCount.toString() + " --> " + error);
  }
}
export function renderBatch5k(currentProps, currentState): any {
  currentState._imgItems = [];
  var intCount, intervalCount, batchCount = 0;
  var reqObj = [];
  //count Items
  let _getitemCount = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "LogTransaction" + "')/ItemCount")
  currentProps.spHttpClient.get(_getitemCount, SPHttpClient.configurations.v1).then((response: SPHttpClientResponse) => {
    if (response.ok) {
      response.json().then((responseJSON) => {
        intCount = parseInt(responseJSON.value);
        alert("Total Items: " + responseJSON.value);
      });
    }
  });
  var nextCount = 0;
  //override total
  intCount = 8000;
  intervalCount = 5000;
  let _requestUrl = "";
  //initiate batch
  const spBatchCreationOpts: ISPHttpClientBatchCreationOptions = { webUrl: currentState.props.siteUrl };
  const spBatch: SPHttpClientBatch = currentProps.spHttpClient.beginBatch(spBatchCreationOpts);
  _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "LogTransaction" + "')/ItemCount") ///test
  const _newBatch: Promise<SPHttpClientResponse> = spBatch.get(_requestUrl, SPHttpClientBatch.configurations.v1);

  for (var i = 0; i < intCount; i += 5000) {
    nextCount += 5000;
    batchCount += 1;
    _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "LogTransaction" + "')/Items?%24skiptoken=Paged%3DTRUE%26p_ID%3D" + (i.toString()) + "&%24top=" + (nextCount.toString()) + "&$select=Attachments,AttachmentFiles,*&$expand=AttachmentFiles")
    const _newBatch: Promise<SPHttpClientResponse> = spBatch.get(_requestUrl, SPHttpClientBatch.configurations.v1);
    reqObj.push(_newBatch)
  }

  spBatch.execute().then(() => {
    for (var i = 0; i < reqObj.length; i++) {
      reqObj[i].then((response: SPHttpClientResponse) => {
        response.json().then((responseJSON) => {
          responseJSON.value.map((list: IODataList) => {
            console.log("Adding " + list.Title);
            currentState._imgItems.push({ Title: list.Title, Source: list.Source, Transaction: list.Transaction, EventDate: list.EventDate, UserName: list.UserName }); //
          });

        }).catch(function (err) {
          console.log(err);
        });
      });
    }
    currentState.forceUpdate();
  });
}
export function renderImageCarousel(currentProps, currentState): any {
  currentState._imgItems = [];

  //------- COMMENTED FOR TEST 
  let _requestUrl = currentState.props.siteUrl.concat("/_api/web/Lists/GetByTitle('" + "ImageCarousel" + "')/GetItems?$select=Title,Description,FileRef")
  let _camlSingleQuery =
    `<View><Query></Query></View>`;
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
              currentState._imgItems.push({ Title: list.Title, Description: list.Description, Thumbnail: list.FileRef }); //
            });
            currentState.forceUpdate();

          }
        })
      }
    });
};
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
              currentState._menuItems.push({ FieldName: list.Title, ParentField: list.ParentField, Url: list.URL, IsExpanded: list.IsExpanded }); //
            });

            let newDiv = '<ul class="nav nav-pills">';

            var filterArr = currentState._menuItems.filter(function (e) {
              return (e.ParentField === 'N/A' || e.ParentField === 'Parent');
            });
            var arrayLength = filterArr.length;
            for (var i = 0; i < arrayLength; i++) {
              if (filterArr[i].ParentField == 'Parent') {
                newDiv += '<li class="nav-item dropdown">' + '<a id=' + '"id_' + filterArr[i].FieldName.trim().replace(' ', '') + '" class="nav-link dropdown-toggle" href="#" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">' + filterArr[i].FieldName.trim() + '</a>';
                newDiv += '<div class="dropdown-menu bg-secondary" aria-labelledby=' + '"id_' + filterArr[i].FieldName.trim().replace(' ', '') + '">';
                var filterChildArr = currentState._menuItems.filter(function (e) {
                  return (e.ParentField === filterArr[i].FieldName);
                });
                var arrayChildLength = filterChildArr.length;
                for (var xi = 0; xi < arrayChildLength; xi++) {
                  newDiv += '<a class="dropdown-item p-3" href=' + filterChildArr[xi].Url + '><h5>' + filterChildArr[xi].FieldName.trim() + '</h5></a><div class="dropdown-divider"></div>';
                }
                newDiv += `</div></li>`;
              }
              else if (filterArr[i].ParentField == 'N/A') {
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
                          </button>` + newDiv + `</ul>
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
              currentState._spItems.push({ Title: list.Title, Description: list.Description, Thumbnail: list.Thumbnail }); //
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
        currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "", showSuccessMSGBR: true });
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "", showErrorMSGBR: true }); }
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
        currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "", showSuccessMSGBR: true });
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "", showErrorMSGBR: true }); }
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
        currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "", showSuccessMSGBR: true });
      } else { currentState.setState({ searchId: 0, hideDialog: true, searchTitle: "", searcDescription: "", searchThumbnail: "", showErrorMSGBR: true }); }
    });
};
export class o365SP_CommonService {
  private _spHttpClient: SPHttpClient;


}