# Import modules
import os
import csv

# Set path for file
# csv_budget = os.path.join("..", "Resources", "budget_data.csv") (TA helped fix by doing below instead)
csv_budget = r"C:\Users\17179\Desktop\gitlab\uci-irv-data-pt-08-2020-u-c\02-Homework\03-Python\Instructions\PyBank\Resources\budget_data.csv"


# Define initial values for variables
total_months = 0
total_profit = 0
monthly_profit = 0
monthly_change = 0

# define lists to store data we will need in the future
dates = []
profits_losses = []
changes = []

# Read in the CSV file
with open(csv_budget, 'r') as csvfile:

    # # Split the data in commas, and skip the header row
    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)
    rows = next(csvreader)
    
    total_months += 1
    total_profit += int(rows[1])
    monthly_profit = int(rows[1])
    greatest_increase = ["", 0]
    greatest_decrease = ["", 1000000000]
    # Calculate the total number of months in the dataset
    # Calculate the NET TOTAL P/L over entire time frame
    #Calculate the monthly changes and then the average monthly change
    for x in csvreader:
        total_months += 1
        total_profit += int(x[1])
        total_change = int(x[1]) - monthly_profit
        monthly_profit = int(x[1])
        changes += [total_change]
        dates += [x[0]]

        # Calculate the greatest increase and greatest decrease
        if total_change > greatest_increase[1]:
            greatest_increase[0] = x[0]
            greatest_increase[1] = total_change
        if total_change < greatest_decrease[1]:
            greatest_decrease[0] = x[0]
            greatest_decrease[1] = total_change

# Calculate everage profit
average_profit = sum(changes)/len(changes)
       
print(f'Financial Analysis')
print(f'------------------------------')
print(f'Total months: {total_months}')
print(f'Profits/Losses: ${total_profit}')
print(f'Average Change in Profits/Losses: ${round(average_profit)}')
print(f'Greatest Increase In Profits: on {greatest_increase[0]}  ${greatest_increase[1]} ')
print(f'Greatest Decrease In Profits: on {greatest_decrease[0]}  ${greatest_decrease[1]} ')



budget_output = os.path.join("analysis.txt")


with open("analysis.txt", "w") as txtfile:

    txtfile.write(f'\nFinancial Analysis')
    txtfile.write(f'\nTotal months: {total_months}')
    txtfile.write(f'\nProfits/Losses: ${total_profit}')
    txtfile.write(f'\nAverage Change in Profits/Losses: ${round(average_profit)}')
    txtfile.write(f'\nGreatest Increase In Profits: on {greatest_increase[0]}  ${greatest_increase[1]}')
    txtfile.write(f'\nGreatest Decrease In Profits: on {greatest_decrease[0]}  ${greatest_decrease[1]}')