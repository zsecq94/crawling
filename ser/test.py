# -*- coding: utf-8 -*-

import requests
from bs4 import BeautifulSoup
import os
import io
import sys
import json
sys.stdout = io.TextIOWrapper(sys.stdout.detach(), encoding='utf-8')
sys.stderr = io.TextIOWrapper(sys.stderr.detach(), encoding='utf-8')

# --------------

keyword = os.sys.argv[1]
# keyword = '카카오'
data = [[], [], []]
thumbnail = []
for i in range(1, 21, 10):
    response = requests.get(
        f"https://search.naver.com/search.naver?where=news&query={keyword}&start={i}")

    html = response.text
    soup = BeautifulSoup(html, "html.parser")
    links = soup.select(".news_tit")
    thumbs = soup.select(".api_get")

    for link in links:
        data[0].append(link.text)
        data[1].append(link.attrs['href'])

    for thumb in thumbs:
        data[2].append(thumb.attrs['data-lazysrc'])

print(json.dumps(data))
