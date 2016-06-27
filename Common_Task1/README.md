## This is web dev task 1 for Delta
### Overview of the task
    The task was to make a simple countdown timer to a fixed event.
    The hacker mode was to have a start,stop, and restart button for the timer.
### Features implemented
    The normal timer(basic mode) and the hacker mode were implemented.
    In normal mode, the timer counts down to a specific event in time given in code.
    For hacker mode, start, stop, and reset buttons were added, along with an input for deadline.
    If the deadline is past, the timer automatically gives a warning, and enables the start button again.
    When the start button is pressed, it becomes disabled. When a pause button is pressed, 
    resume button is enabled.  When reset is pressed, all inputs are enabled again,
    all the time elements are reset to 0, and reset and pause buttons are 
    disabled, while the resume button is converted to start button.