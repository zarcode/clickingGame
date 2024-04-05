## Description:
Game made in React + Redux.
Levels are being generated based on modified [Warnsdorff’s algorithm for Knight’s tour problem](https://www.geeksforgeeks.org/warnsdorffs-algorithm-knights-tour-problem/) (Rewriten in ES6).

On first click level with fields is being generated.
Next, player can click only fields that are on the specific distance from previously clicked (marked yellow). Goal is to choose the right order of clicking so you click all the boxes, not leaving any unclicked.
Possible moves will follow this rule:

![Screenshot](movements.png)

## Try it out:
https://zarcode.github.io/clickingGame/

## How to run localy:

Download or clone master branch. In the project directory run:

```
npm install
npm start
```

This runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
