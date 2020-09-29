# import modules
import os
import csv

# Create path to csv file
election_csv = r"C:\Users\17179\Desktop\gitlab\uci-irv-data-pt-08-2020-u-c\02-Homework\03-Python\Instructions\PyPoll\Resources\election_data.csv"
# Define variables, create lists and/or dicts
total_votes = 0
win_votes = 0
winner = ""
each_cand = {}
cand_percent = {}
vote_list = []
# Read in the csv file -------------------- pathing issue, get help
with open(election_csv, 'r') as csvfile:
    csvreader = csv.reader(csvfile, delimiter=',')
    header = next(csvreader)

# Create for loops to loop through all data
# Use the .keys , .items, and .get methods to get keys and values from dicts/lists
    for row in csvreader:
        # Calculate how many votes were cast 
        total_votes += 1
        if row[2] in each_cand.keys():
            each_cand[row[2]] += 1
        else:
            each_cand[row[2]] = 1
    # Calculate the percent for candidate 
    # Use .items to return key:value pairs, like a tuple
    for x, votes in each_cand.items():
        cand_percent[x] = round((votes/total_votes)* 100, 2)
    # Loop through each 'key' in the key value pairs
    # create if statement for if the highest value to determine winner
    for y in each_cand.keys():
        if each_cand[y] > win_votes:
            winner = y
            win_votes = each_cand[y]



print("Election Results")
print('------------------------------')
print(f"Total Votes: {total_votes}")
print('------------------------------')
for x, votes in each_cand.items():
    print(f"{x} : {cand_percent[x]} % {votes} ")
print('------------------------------')
print(f"Winner : {winner}")
print("-------------------------------")

election_output = os.path.join("analysis1.txt")

with open(election_output, "w") as txtfile:

    txtfile.write(f'\nElection Results')
    txtfile.write(f'\n------------------------------')
    txtfile.write(f'\nTotal Votes: {total_votes}')
    txtfile.write(f'\n--------------------------------')
    for x, votes in each_cand.items():
        txtfile.write(f'\n{x} : {cand_percent[x]} % {votes}')
    txtfile.write(f'\n--------------------------------')
    txtfile.write(f'\nWinner : {winner}')
