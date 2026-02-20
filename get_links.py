import urllib.request
import json
import urllib.parse

def search(query):
    url = f"https://commons.wikimedia.org/w/api.php?action=query&format=json&prop=imageinfo&iiprop=url&generator=search&gsrsearch={urllib.parse.quote(query)}&gsrnamespace=6&gsrlimit=1"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    try:
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode())
            if 'query' in data and 'pages' in data['query']:
                pages = data['query']['pages']
                for page_id in pages:
                    print(f"{query}: {pages[page_id]['imageinfo'][0]['url']}")
                    return
    except Exception as e:
        print(f"Error {query}: {e}")
    print(f"{query}: Not found")

search("file:University_Grants_Commission_(India)_logo.svg")
search("file:Association_of_Indian_Universities_logo.png")
search("file:NIRF_India_logo.svg")
search("file:National_Assessment_and_Accreditation_Council_logo.png")
