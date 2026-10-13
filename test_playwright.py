from playwright.sync_api import sync_playwright

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("https://allegro.pl/listing?string=hotone")
        content = page.content()
        print("Page length:", len(content))
        if "captcha" in content.lower():
            print("Found captcha")
        else:
            print("No captcha found")
        browser.close()

if __name__ == "__main__":
    try:
        run()
    except Exception as e:
        print("Error:", e)
