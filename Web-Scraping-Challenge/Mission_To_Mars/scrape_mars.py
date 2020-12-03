# Import dependencies
import os
import requests
import pandas as pd
import time
from splinter import Browser
from bs4 import BeautifulSoup as bs
from webdriver_manager.chrome import ChromeDriverManager

# Create a function that finds the path and executes chromedriver
def init_browser():
    # Initiate chromdriver
    executable_path = {'executable_path': ChromeDriverManager().install()}
    return Browser('chrome', **executable_path, headless=False)

# Create an empty dictionary to store data we will retrieve
mars_data = {}

# Create a new function that scrapes our already scraped mars news
def scrape_mars_news():
    # Initiate browser and visit url used to scrape news data
    browser = init_browser()
    news_url = 'https://mars.nasa.gov/news/'
    browser.visit(news_url)

    # Create html object and parse with bs
    html = browser.html
    soup = bs(html, 'html.parser')

    # Retrieve the title and paragraph
    news_title = soup.find('div', class_='content_title').text
    news_p = soup.find('div', class_='article_teaser_body').text

    # Add to dictionary
    mars_data['Title'] = news_title
    mars_data['Paragraph'] = news_p

    browser.quit()

    return mars_data


# Create a new function that scrapes our already scraped mars images
def scrape_mars_image():
    # Initiate browser and visit url used to scrape mars images
    browser = init_browser()
    image_url = 'https://www.jpl.nasa.gov/spaceimages/?search=&category=Mars'
    browser.visit(image_url)
    
    # Create html object and parse with bs
    html = browser.html
    soup = bs(html, 'html.parser')

    # Retrieve img href
    full_img = soup.find('div', class_='carousel_container')
    picture = full_img.a['data-fancybox-href']

    # Concatenate the base url with the href
    base_url="https://www.jpl.nasa.gov/"
    featured_image_url = base_url + picture

    featured_image_url

    mars_data['Image URL'] = featured_image_url

    browser.quit()

    return mars_data


def scrape_mars_facts():
    
    # Initiate browser and visit url used to scrape mars facts
    browser = init_browser()
    facts_url = 'https://space-facts.com/mars/'
    browser.visit(facts_url)
    
    # Retrieve fact table using pandas
    mars_table = pd.read_html(facts_url)
    mars_facts = mars_table[0]

    # Just changing the column names
    mars_facts.columns=['Mars Info', 'Stats']
    mars_facts

    # Convert table/dataframe to a html table string using pandas
    mars_facts_html = mars_facts.to_html(header=False)
    mars_facts_html

    mars_data['Table'] = mars_facts_html

    browser.quit()

    return mars_data

def scrape_mars_hems():

    # Initiate browser and visit url used to scrape mars facts
    browser = init_browser()
    hems_url = 'https://astrogeology.usgs.gov/search/results?q=hemisphere+enhanced&k1=target&v1=Mars'
    browser.visit(hems_url)
    
    # Create html object and parse with bs
    html = browser.html
    soup = bs(html, 'html.parser')

    all_hems = soup.find_all('div', class_='item')
    hem_img_urls = []

    # Create a base/main url to use in loop
    base_url = 'https://astrogeology.usgs.gov'

    # Iterate through the elements retrieved
    for hem in all_hems:
        
        # Store the title
        title = hem.find('h3').text
        # Get the link that has the full-res image
        img_url = hem.find('a', class_='itemLink')['href']
        # Visit that link
        browser.visit(base_url + img_url)

        # Create an html object of the site that has individual hemisphere data
        each_hem_html = browser.html
        # Parse html using bs
        soup = bs(each_hem_html, 'html.parser')

        # Retrieve the full-res image source
        hd_img_url = base_url + soup.find('img', class_='wide-image')['src']
        # Append the titles and high-res image links as a dict to the empty list
        hem_img_urls.append({'title': title, 'image url': hd_img_url})

        
        
    mars_data['Hemisphere URLs'] = hem_img_urls
        
    browser.quit()

    return mars_data



