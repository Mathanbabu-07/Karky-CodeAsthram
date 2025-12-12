
import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch(headless=True)
        page = await browser.new_page()

        # Listen for console events and print them
        page.on("console", lambda msg: print(f"BROWSER CONSOLE: {msg.text}"))

        # Listen for page errors
        page.on("pageerror", lambda exc: print(f"PAGE ERROR: {exc}"))

        try:
            await page.goto("http://localhost:5174/", wait_until="networkidle")

            # A more robust wait
            await page.wait_for_selector("div.blocklyWorkspace", timeout=15000)

            await page.locator("div.blocklyTreeRow:has-text('Essentials')").click()

            list_block_selector = 'div.blocklyFlyout g[data-id="essentials_list_operations"]'
            await page.drag_and_drop(list_block_selector, 'div.blocklyMainBackground')

            dict_block_selector = 'div.blocklyFlyout g[data-id="essentials_dict_operations"]'
            await page.drag_and_drop(dict_block_selector, 'div.blocklyMainBackground')

            await page.locator("div.blocklyTreeRow:has-text('Functions')").click()

            func_def_selector = 'div.blocklyFlyout g[data-id="essentials_function_def"]'
            await page.drag_and_drop(func_def_selector, 'div.blocklyMainBackground')

            await page.locator('g[data-id="essentials_function_def"] path.blocklyIconShape').click()

            await page.screenshot(path="verification.png")

        except Exception as e:
            print(f"An error occurred: {e}")
            await page.screenshot(path="error_screenshot.png")
        finally:
            await browser.close()

asyncio.run(main())
