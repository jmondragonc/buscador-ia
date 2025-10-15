export interface SearchRequest {
  inputs: [string, number][];
}

export interface SearchResult {
  query: string;
  idx: number;
  name: string;
  name_clean: string;
  score: number;
}

export interface TokenResponse {
  token_type: string;
  expires_in: number;
  access_token: string;
}
