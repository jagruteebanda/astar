/*
* @author: jagrutee banda
* Algorithm: A-Star Algorithm
* => Path-finding and Graph-traversal algorithm
*/

// f = g + h
// g: the movement cost to move from the starting point to a given square on the grid, following the path generated to get there.
// h: the estimated movement cost to move from that given square on the grid to the final destination

// 0: unblocked node
// 1: source (start) node
// 2: destination (last) node
// 8: blocked node

const _ = require('lodash');

function findSuccessors(maze, q, lastNode) {
    // console.log("In find successors: ", q, lastNode, rows, cols);
    let successors = [];
    for (let i = q.node[0] - 1; i <= q.node[0] + 1; i++) {
        for (let j = q.node[1] - 1; j <= q.node[1] + 1; j++) {
            if (JSON.stringify([i, j]) !== JSON.stringify(q.node)) {
                if ((i >= 0) && (i < maze.length) && (j >= 0) && (j < maze[0].length) && maze[i][j] != 8) {
                    let g = q.g + 0.1;
                    // console.log(lastNode.node[0], lastNode.node[1]);
                    let h = Math.sqrt(Math.pow(i - lastNode.node[0], 2) + Math.pow(j - lastNode.node[1], 2)); // Euclidean distance
                    let f = g + h;
                    // console.log(`[${i}, ${j}]: \n f: ${f} \n g: ${g} \n h: ${h}`);
                    successors.push({
                        node: [i, j],
                        g,
                        h,
                        f,
                        parent: q.node
                    });
                }
            }
        }
    }
    // console.log("\n");
    successors = _.sortBy(successors, (o) => o.f);
    return successors;
}

function astar(maze, startNode, lastNode) {

    /* 
    ** 1. Initialize open list
    */
    let openList = [];
    /*
    ** 2. Initialize closed list
    */
    let closedList = [];

    // Put the starting node on open list | f(startNode) = 0
    openList.push(startNode);

    /*
    ** 3. while the open list is not empty
    */
    let flag = null;
    while (openList.length > 0) {

        /* 
        ** a. sort array based on min 'f' value
        */
        openList = _.sortBy(openList, (o) => o.f);
        // openList.map((o) => {
        //     console.log(o.f);
        // });
        // console.log("\n");
        // console.log("Open List sorted: ", openList);

        /* 
        ** b. pop 'q' off the open list
        */
        let q = openList.shift();
        // console.log("\nq: ", q);

        /*
        ** c. generate q's 8 successors and set their parents to q
        */
        let successorsQ = findSuccessors(maze, q, lastNode);
        // console.log("Valid successors of q: ", successorsQ);

        // d. for each successor
        for (let i = 0; i < successorsQ.length; i++) {
            let o = successorsQ[i];
            // console.log(JSON.stringify(o.node) == JSON.stringify(lastNode.node))
            if (JSON.stringify(o.node) === JSON.stringify(lastNode.node)) {
                console.log("Found last node: ", o.node, " with cost: ", closedList.length);
                flag = o;
                break;
            } else if (_.find(openList, (n) => { if (JSON.stringify(n.node) === JSON.stringify(o.node)) return true; })) {
                // console.log("found in open list", o);
                continue;
            } else if (_.find(closedList, (n) => { if (JSON.stringify(n.node) === JSON.stringify(o.node)) return true; })) {
                // console.log("found in closed list", o);
                continue;
            } else {
                openList.push(o);
            }
        }

        // e. push 'q' on the closed list
        closedList.push(q);
        if (flag !== null) {
            closedList.push(flag);
            console.log("Closed List: ", closedList);
            return closedList;
            // break;
        }
        // console.log("Open List: ", openList);
        // console.log("Closed List: ", closedList);
        // console.log("\n\n");

    } // end while loop
    if (flag === null) {
        console.log("No path found");
        // return [];
    }
}

// (source) start node = 1
// (destination) last node = 2
// blocked node = 8
// unblocked node = 0
// let maze = [
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [8, 8, 8, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0],
//     [0, 0, 8, 8, 8],
//     [0, 0, 0, 0, 0],
//     [0, 0, 0, 0, 0]
// ];

// astar(
//     maze,
//     {
//         node: [0, 0],
//         f: 0,
//         g: 0,
//         h: 0,
//         parent: null
//     }, {
//         node: [7, 4],
//         f: 0,
//         g: 0,
//         h: 0,
//         parent: null
//     }
// );

module.exports = astar;