export type NewsClubScope = "T2B" | "H2B" | "COMBINED";
export type EditorialStatus = "PUBLISHED" | "DRAFT";
export type GeographicScopeType = "NATIONAL" | "REGIONAL";

export interface NewsArticle {
  id: string;
  title: string;
  clubScope: NewsClubScope;
  status: EditorialStatus;
  geoScope: GeographicScopeType;
  canton?: string;
  isFeatured: boolean;
  coverImage: string;
  body: string;
  createdAt: string;
}

export interface NewsFormData {
  title: string;
  clubScope: NewsClubScope;
  status: EditorialStatus;
  geoScope: GeographicScopeType;
  canton?: string;
  isFeatured: boolean;
  coverImage: string;
  body: string;
}
