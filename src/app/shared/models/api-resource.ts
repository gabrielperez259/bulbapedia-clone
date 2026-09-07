export interface ApiResourceReference {
  url: string;
}

export interface NamedApiResource {
  name: string;
  url: string;
}

export interface LocalizedResource {
  name: string;
  language: NamedApiResource;
}