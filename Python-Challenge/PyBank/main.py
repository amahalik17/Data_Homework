# Import modules
import os
import csv

# Set path for file
csv_budget = os.path.join("..", "Resources", "budget_data.csv")

# Define function and assign variables
def analysis(budget_data):
    date = str(budget_data[0])
    net_total_pl= int(budget_data[1])

# Calculate total number of months in dataset
num_rows = 0
for row in open(csv_budget):
    header = next(csvreader)
    num_rows += 1

    print(num_rows)

