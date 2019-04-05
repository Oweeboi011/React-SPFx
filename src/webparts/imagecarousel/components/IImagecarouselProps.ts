import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';

export interface IImagecarouselProps {
  description: string;
  name: string;
  siteUrl: string;
  listName: string;
  searchTitle: string;
  searcDescription: string;
  searchThumbnail: string;
  spHttpClient: SPHttpClient;
}
