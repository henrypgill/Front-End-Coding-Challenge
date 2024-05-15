# Opvia-Challenge

I really enjoyed completing this, it was a great opportunity to learn blueprintjs and I'm really happy with the result. My instructions are below, along with improvements I would make to the app were I to work on it further.

I am mostly happy with how this turned out; having a better understanding how blueprintjs works now I would approach it slightly differently next time around, creating more generic components for repeated functionality.

## How to run the app

Install the dependencies by running `yarn` or `npm install`
The repository has several scripts that can be run from the root directory. These can be run with `yarn [command]` or `npm run [command]` in your terminal from the root directory, the `[command]`s are as follows:

-   To preview the app in your browser: `yarn start`
-   To build the app for deployment: `yarn build`
-   To type check the repository: `yarn type-check`
-   To format code within the repository: `yarn format`

## How to use the app

-   The app presents the user with a navigation bar at the top of the screen, within which are several buttons that provide the user with access to functionality.
-   Column headers within the table can be moused over to access the menu for that column, which allows the user to edit the column's name and type.
-   The name and units of a column can be changed through it's menu, as well as the ability to delete the column altogether.

### Calculation Columns

Calculation columns can be added from the `Add Column` menu in the navigation bar. The menu of calculation columns also allow the user to alter the formula used to calculate the column's values.

### Column Aggregations

Column aggregations can be added from the `Analysis` menu in the navigation bar, where the type of aggregrate to be added can be selected. Once an aggregate is added it will appear in the analysis section under its respective column of the app. The aggregate can be changed or removed from the settings menu, accessed from the cog icon to its left.

## Improvements

Several improvements could be made to the app to improve the user experience and it's functionality:

-   ### Aggregates

    -   Aggregate menus don't dismiss when clicking outside of the menu, this is a limitation of my familiarity with blueprint.js and could be fixed after some more experience with the library.
    -   Additional types of aggregates would allow the user to receive better insights.
    -   Currently duplicate aggregates can be created, disabling this would reduce visual noise and smooth the users experience.

-   ### Columns

    -   The complexity of formulas that are able to be entered is rather limited, integrating a library such as math.js would allow for more complex formulas to be entered by the user as a string, which would additionally make a big improvement to the user experience.
    -   The menu for all columns would benefit from additional functionality, such as sorting or changing how the data is displayed.
    -   The closing of column menus is a bit laggy, this could be improved but would require a deeper dive into blueprint.js.
    -   The way time is formatted would depend on the users preference, I have opted for this format as it conveys the most information. However measuring it in days or hours from an initial time may be the most appropriate way to display the data.
    -   The way column data is calculated and stored would benefit from being redesigned.
    -   A function column that depends on another function column will not update when the column it depends on is changed, this is a limitation of the current implementation and would be best solved by changing how column data is stored. At present the column function has to be "saved" to recalculate.

-   ### General
    -   Tooltips on buttons such as the column delete, and menu items in the nav with a description of what they are would help the user understand the app better.
    -   The ability to choose how the page is displayed, (e.g. only the full table, the table and the analysis, or a custom view) would be a good addition to the app.
    -   Additional functionality such as the ability to saving the data to a file, or creating a graph from the table data.
    -   Some elements would benefit from slight chagnes to padding and margins to really make the app look polished.

## Rate of Change Calculations

Calculating a basic rate of change should be fairly simple. Within the data there are timestamps for each row, and all the data is indexed to a specific column and row. Therefore, for a cell in row m, the rate of cell count growth would be:

`cellCoun[m] - cellCount[m-1] / timestamp[m] - timestamp[m-1]`

converting the time stamps into seconds prior to the calculation. Calculating more complex rates of change based on somethign such as a continuous functions or approximation would require a more complex solution.
