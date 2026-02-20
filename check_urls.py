import urllib.request
urls = [
    "https://cdn.simpleicons.org/google/white",
    "https://cdn.simpleicons.org/ibm/white",
    "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
    "https://cdn.simpleicons.org/amazon/white",
    "https://cdn.simpleicons.org/tata/white",
    "https://cdn.simpleicons.org/infosys/white",
    "https://upload.wikimedia.org/wikipedia/commons/a/a0/Wipro_Primary_Logo_Color_RGB.svg",
    "https://cdn.simpleicons.org/accenture/white",
    "https://cdn.simpleicons.org/deloitte/white",
    "https://cdn.simpleicons.org/cognizant/white",
    "https://upload.wikimedia.org/wikipedia/commons/b/b1/HCL_Technologies_logo.svg",
    "https://upload.wikimedia.org/wikipedia/commons/2/2f/Tech_Mahindra_New_Logo.svg",
    "https://cdn.simpleicons.org/capgemini/white",
    "https://cdn.simpleicons.org/oracle/white",
    "https://cdn.simpleicons.org/sap/white"
]

for url in urls:
    try:
        req = urllib.request.Request(url, method='HEAD', headers={'User-Agent': 'Mozilla/5.0'})
        response = urllib.request.urlopen(req, timeout=5)
        print(f"{response.status} {url}")
    except Exception as e:
        print(f"FAIL {url} - {e}")
