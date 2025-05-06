import requests
import json

def get_messages(token, server):
    headers = {"Authorization": f"Bearer {token}"}
    resp = requests.get(f"{server}/_matrix/client/r0/sync", headers=headers)
    return resp.json()

# Usage
# save messages to file daily
