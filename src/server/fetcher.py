import sys
import json
import urllib.request
import urllib.parse
import re
import html

def fetch_olx(query):
    results = []
    try:
        url = f"https://www.olx.pl/api/v1/offers/?offset=0&limit=50&query={urllib.parse.quote(query)}"
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'application/json, text/plain, */*',
            'Accept-Language': 'pl-PL,pl;q=0.9',
        })
        with urllib.request.urlopen(req, timeout=6) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            for item in data.get('data', []):
                title = item.get('title')
                item_url = item.get('url')
                photos = item.get('photos', [])
                photo = photos[0].get('link') if photos else ''
                if photo:
                    photo = re.sub(r'\{width\}x\{height\}', '400x300', photo)
                    photo = re.sub(r';s=\d+x\d+', ';s=400x300', photo)
                params = item.get('params', [])
                price = next((p.get('value', {}).get('label') for p in params if p.get('key') == 'price'), '')
                results.append({
                    'id': item_url,
                    'marketplace': 'olx',
                    'title': title,
                    'url': item_url,
                    'image': photo,
                    'price': price
                })
    except Exception as e:
        sys.stderr.write(f"OLX fetch error: {e}\n")
    return results

def fetch_amazon(query):
    results = []
    try:
        url = f"https://www.amazon.pl/s?k={urllib.parse.quote(query)}"
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
            'Accept-Language': 'pl-PL,pl;q=0.9',
        })
        with urllib.request.urlopen(req, timeout=6) as resp:
            page = resp.read().decode('utf-8')
            chunks = page.split('s-result-item')[1:]
            for c in chunks:
                asin_m = re.search(r'data-asin=\"([A-Z0-9]{10})\"', c)
                if not asin_m:
                    continue
                asin = asin_m.group(1)
                t_m = re.search(r'<h2[^>]*>.*?<span>(.*?)</span>.*?</h2>', c, re.DOTALL) or re.search(r'aria-label=\"([^\"]+)\"', c)
                if not t_m:
                    continue
                title = html.unescape(t_m.group(1).strip())
                img_m = re.search(r'src=\"(https://m\.media-amazon\.com/images/I/[^\"]+)\"', c)
                img = img_m.group(1) if img_m else ''
                p_m = re.search(r'<span class=\"a-offscreen\">([^\"]+)</span>', c)
                price = html.unescape(p_m.group(1).strip()) if p_m else ''
                item_url = f"https://www.amazon.pl/dp/{asin}"
                results.append({
                    'id': item_url,
                    'marketplace': 'amazon',
                    'title': title,
                    'url': item_url,
                    'image': img,
                    'price': price
                })
    except Exception as e:
        sys.stderr.write(f"Amazon fetch error: {e}\n")
    return results

def fetch_allegro(query):
    results = []
    try:
        from playwright.sync_api import sync_playwright
        with sync_playwright() as p:
            browser = p.chromium.launch(headless=True)
            page = browser.new_page()
            page.goto(f"https://allegro.pl/listing?string={urllib.parse.quote(query)}", wait_until="domcontentloaded")
            # If a captcha is detected, we return an empty list
            if "captcha" in page.content().lower():
                browser.close()
                return []

            # Extract listings (example selectors, may need refinement)
            items = page.query_selector_all('article')
            for item in items:
                title_el = item.query_selector('h2')
                link_el = item.query_selector('a')
                img_el = item.query_selector('img')
                price_el = item.query_selector('[data-price]')

                if title_el and link_el:
                    results.append({
                        'id': link_el.get_attribute('href') or '',
                        'marketplace': 'allegro',
                        'title': title_el.inner_text(),
                        'url': f"https://allegro.pl{link_el.get_attribute('href')}",
                        'image': img_el.get_attribute('src') or '',
                        'price': price_el.inner_text() if price_el else ''
                    })
            browser.close()
    except Exception as e:
        sys.stderr.write(f"Allegro fetch error: {e}\n")
    return results

def main():
    if len(sys.argv) < 2:
        print(json.dumps([]))
        return

    query = sys.argv[1]
    sources = sys.argv[2].split(',') if len(sys.argv) > 2 else ['olx', 'amazon', 'allegro']

    all_results = []
    if 'olx' in sources:
        all_results.extend(fetch_olx(query))
    if 'amazon' in sources:
        all_results.extend(fetch_amazon(query))
    if 'allegro' in sources:
        all_results.extend(fetch_allegro(query))

    print(json.dumps(all_results))

if __name__ == '__main__':
    main()

