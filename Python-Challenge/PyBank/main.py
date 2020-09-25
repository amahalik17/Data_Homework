# Import modules
import os
import csv

# Set path for file
csv_budget = os.path.join("..", "Resources", "budget_data.csv")

# Define ititial values for variables
total_months = 0
total_pl = 0
average_pl = 0

# define lists to store data we will need in the future
dates = []
profits_losses = []
changes = []


# Read in the CSV file
with open(csv_budget, 'r') as csvfile:

    # Split the data on commas, and skip the header row
    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)

    # Loop through the data
    for row in csvreader:
        
        # Calculate the TOTAL number of MONTHS in the data set
        total_months += 1
        dates.append(row[0])
        # Calculate the NET TOTAL P/L over entire time frame
        total_pl += row[1]
        profits_losses.append(row[1])
        # Calculate the P/L AVERAGE CHANGE over entire time frame
        average_pl = total_pl / total_months
        changes.append(average_pl)
        # Calculate the greatest increase in profits (date and amount)
        greatest_increase = max(row[1])
        increase_date = changes.index(greatest_increase)
        # Calculate the greatest decrease in losses (date and amount)
        greatest_decrease = min(row[1])
        decrease_date = changes.index(greatest_decrease)
        
        