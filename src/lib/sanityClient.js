import { createClient } from '@sanity/client';

export const sanityClient = createClient({
 projectId: 'tqbzon1l',
 dataset: 'production',
 apiVersion: '2024-01-01',
 useCdn: true,
});
