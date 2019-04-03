import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

export interface IListviewProps {
  description: string;
  name: string;
  siteUrl: string;
  listName: string;
  searchTitle: string;
  searcDescription: string;
  spHttpClient: SPHttpClient;
}
