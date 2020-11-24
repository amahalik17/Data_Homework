import pandas as pd

df = pd.read_csv("Resources/cities.csv")

df.to_html('data.html', index=False)

weather_data = df.to_html()

print(weather_data)