# sarweb
Sarweb is a webapp that helps planning the rotations for training search-and-rescue (SAR) dogs by scheduleing the helpers (Figuranten) and trainees in a manner that minimizes waiting times (for the dogs in cars as well as for the trainees and helpers). It is a project to practice software development and testing. The codebase starts as a small CLI-focused project, then grows into a browser app. So is tool-support a little overkill? Definitely. But for practice-reasons, it's worth it. Also for practice-reasons, the programming is done without the help of AI. The only exception is rubberducking while designing the software, during which the chatbot is forbidden to provide any code. And again, you guessed it, for practice-reasons, I made a detailed outline of the Versionhistory, the SDLC and the requirements (see below).

# Version History

# SDLC
## Iteration 1: Create Modules (Version 0.1-0.6)
- Secure functionality and code architecture
- Focus on unit- and integrationtesting, manual testing for endresult
- Cover only errors and happy path
- TDD
- CLI-Adapter for manual testing
## Iteration 2: Create GUI --> MVP (Version 0.6-1.0)
- Create Browserapp-Interface
- Focus on end-to-end- and regression-testing (using tools)
- BDD
## Iteration 3: Optimize quality (Version 1.0-1.5)
- Cover for as many edge-cases as possible
- Refactor code
- Focus on unit- and regression-testing (using tools)
- TDD
## Iteration 4: Add german as language (Verison 1.6)
- Focus on unit- and regression-testing (using tools)
# Requirements
## Iteration 1:
- User-input is a list of names
  - a minimum of 4 names has to be entered | otherwise the user will be prompted to enter more names
  - a maximum of 7 can be entered | otherwise the user will be prompted to split into two groups
  - every name should be unique | otherwise the user will be prompted to make sure of that the input list will be shuffled before passing it to the rotation
- Output is a table with the input names ordered in a training rotation
  - per round, there are four roles: Helper1, Helper2, Trainee (with dog), Observer.
  - The rest is idle there are as many rounds as trainees.
  - Each participant is trainee exactly once no one is in any position more than three times total
  - fewest possible changes of position
  - trainees have time before and after training (to get dog from the car and take them back afterwards)
  - no one is only trainee and idle
## Iteration 2:
- The GUI must have a title, welcome message with instructions, offer the possibility to enter the trainee's names, and have a "create table" button
- There are four rows to enter trainee's names, they all have to be filled out | otherwise the "create table" button will not be clickable
- there is a transparent fourth row that can be clicked to enter an additional name | if so, there appears another transparent row to be clicked
- any additional row must be deletable by clicking a cross-button
- extra rows can only be added to a maximum of seven rows | if so, there appears a button that says "plan a second group" and the message next to it that says "You have reached the maximum of 7 participants. If you'd like to add more people, please add a second group."
- Output is a table as described in the Iteration-1-requirements.
  - the rows have a fixed length according to the maximum name length
- The output table should be shareable on social media
## Iteration 3:
Catch edge cases, optimize Code and GUI:
- invalid input format (empty strings, whitespace in names, character maximum)
- Refactor: Find sweet spot between reducing lines of code and maintaining readability and maintainability
## Iteration 4:
- The german interface should follow swiss german grammar
- As a user I want to click a button with a flag thumbnail on it so that I can switch between english and german intercafes
