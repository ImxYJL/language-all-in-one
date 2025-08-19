type WordnikDefaults = {
  definitions: {
    limit: number;
    includeRelated: boolean;
    useCanonical: boolean;
    includeTags: boolean;
  };
  related: {
    useCanonical: boolean;
    limitPerRelationshipType: number;
    relationshipTypes: 'synonym';
  };
};

export const WORDNIK_BASE_URL = 'https://api.wordnik.com/v4';

export const WORDNIK_DEFAULT = {
  definitions: { limit: 10, includeRelated: false, useCanonical: true, includeTags: false },
  related: { useCanonical: true, limitPerRelationshipType: 20, relationshipTypes: 'synonym' },
} satisfies WordnikDefaults;
