import { useEffect } from 'react';
import { ToolCategory, StaticPageId } from '../types';
import { getSEOMetadata, applySEOToDocument, PageSEOMetadata } from '../logic/seo';

/**
 * React hook to synchronize document title, meta tags, OpenGraph, Twitter cards,
 * canonical links, and Schema.org JSON-LD whenever the active view changes.
 */
export function useSEO(
  activeToolId: string | null,
  activeStaticPage: StaticPageId | null,
  selectedCategory: ToolCategory = 'all'
): PageSEOMetadata {
  const metadata = getSEOMetadata(activeToolId, activeStaticPage, selectedCategory);

  useEffect(() => {
    applySEOToDocument(metadata);
  }, [metadata]);

  return metadata;
}
