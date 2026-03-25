import { createClient } from '@sanity/client';

const sanityClient = createClient({
    projectId: 'tqbzon1l',
    dataset: 'production',
    apiVersion: '2024-01-01',
    useCdn: false,
    token: 'sk884XyJXAgUxYTwFq0OcDdRdi89z7CkCAXoybqSxL7xwPsX4FXiSQZt7yu74OuD31TufZA9qc7af29Jjbyl0weMxjuuyOeQmyQcZlGkHmJbXuewJUBI0NIs1I69frFEwk8QIDjZUUcbbBT3YuUbOm8fCrqQ715ZYcqCpjbMz2wLXWuJSwYf'
});

async function run() {
    try {
        console.log("Fetching images...");
        const result = await sanityClient.fetch('*[_type == "sanity.imageAsset"]{url, originalFilename}');
        console.log("Success! Found " + result.length + " assets.");
        console.log(result.slice(0, 3));
    } catch (e) {
        console.error("Error:", e.message);
    }
}
run();
