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
    url = 'https://mars.nasa.gov/news/'
    browser.visit(url)

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

    full_img = soup.find('div', class_='carousel_container')
    picture = full_img.a['data-fancybox-href']

    url="https://www.jpl.nasa.gov/"
    featured_image_url = url + picture

    







