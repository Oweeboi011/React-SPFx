import { SPHttpClient, SPHttpClientResponse, ISPHttpClientOptions } from '@microsoft/sp-http';
import { _loadingSpinner } from '../BulklistWebPart';

export interface IBulklistProps {
  description: string;
  name: string;
  siteUrl: string;
  listName: string;
  searchTitle: string;
  searcDescription: string;
  searchThumbnail: string;
  spHttpClient: SPHttpClient;
  ShowLoading: boolean;
  loadingSpinnerCallback: LoadingCallback;
}
