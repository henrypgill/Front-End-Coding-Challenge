# Opvia-Challenge

I really enjoyed completing this, it was a great opportunity to learn blueprintjs and I'm really happy with the result. My instructions are below, along with improvements I would make to the app were I to work on it further.

I am mostly happy with how this turned out; having a better understanding how blueprintjs works now I would approach it slightly differently next time around, creating more generic components for repeated functionality.
## How to run the app

The repository has several scripts that can be run from the root directory. These can be run with `yarn [command]` or `npm run [command]` in your terminal from the root directory, the `[command]`s are as follows:

-   To preview the app in your browser: `dev`
-   To build the app for deployment: `build`
-   To type check the repository: `type-check`
-   To format code within the repository: `format`

## How to use the app

The app presents the user with a navigation bar at the top of the screen, within which are several buttons that provide the user with access to functionality. Column headers within the table can be moused over to access the menu for that column, which allows the user to edit the column's name and type.

### Calculation Columns

Calculation columns can be added from the `Add Column` menu in the navigation bar. The menu of calculation columns also allow the user to alter the formula used to calculate the column's values.

### Column Aggregations

Column aggregations can be added from the `Analysis` menu in the navigation bar, where the type of aggregrate to be added can be selected. Once an aggregate is added it will appear in the analysis section of the app.
An aggregate that has already been added can be clicked on to bring up the menu to change the type of aggregate and it's target column.

## Improvements

Several improvements could be made to the app to improve the user experience and it's functionality. Additional features such as the ability to add graphs from the analysis menu, or delete columns from the table would be beneficial to the user when looking data. There are also several improvements that can be made to the existing features of the app:

-   ### Aggregates

    -   The way the aggregates are displayed is overly large, a condensed view would be beneficial and take up less visual real-estate.
    -   It is also not clear to the user that the aggregate is clickable, and that clicking on it will bring up the menu. A menu or edit icon in the corner of each card would be a far better way of presenting these interactions to the user.

-   ### Columns

    -   The menu dismisses every time a change is made to the formula of a calculation column, which can be frustrating if the user is trying to make several changes at once. The menu could be improved by allowing the user to dismiss it manually, or by only dismissing it when the user clicks outside of the menu.
    -   The complexity of formulas that are able to be entered is rather limited, integrating a library such as math.js would allow for more complex formulas to be entered by the user as a string, which would additionally make a big improvement to the user experience.
    -   The menu for all columns would benefit from additional functionality, such as sorting or changing how the data is displayed.

-   ### General
    -   The way state is structured works, but will likely become difficult to work with as more functionality is added to the app. the seperation of column information and data creates a degree of seperation between two related entities that is unnecessary, and also slightly counterintuitive.
    -   Greater use of Blueprintjs' intent system would improve the visuals of the app, and help better guide the user through its' use.
    -   The way the menu icon of columns is displayed does not match the styling of the rest of the app, and could be better formatted.
    -   I am not entirely happy with how I have structured the types, it would be better to determine exactly how the data is formatted, whether this is a string or a number, and have a better structure for the types of the columns and the type of data within them.

## Rate of Change Calculations
Calculating a basic rate of change should be fairly simple. Within the data there are timestamps for each row, and all the data is indexed to a specific column and row. Therefore, for a cell in row m, the rate of cell count growth would be:

`cellCoun[m] - cellCount[m-1] / timestamp[m] - timestamp[m-1]`

converting the time stamps into seconds prior to the calculation. Calculating more complex rates of change based on somethign such as a continuous functions or approximation would require a more complex solution.