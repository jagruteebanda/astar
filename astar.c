/*
* @author: jagrutee banda
* Algorithm: A-Star Algorithm
* => Path-finding and Graph-traversal algorithm
*/

#include <stdio.h>

struct node
{
      int node[2];
      float g;
      float h;
      float f;
      int parent[2];
};

// [in, jn, f, g, h, ip, jp]
// in = 

int astar()
{
      /* 
      ** 1. Initialize open list
      */
      int *openList;

      /*
      ** 2. Initialize closed list
      */
      int *closedList;

      openList[0] = 
}

int main()
{
      // int maze[8][5] = {
      //       { 0, 0, 0, 0, 0 },
      //       { 0, 0, 0, 0, 0 },
      //       { 0, 0, 0, 0, 0 },
      //       { 0, 0, 0, 0, 0 },
      //       { 0, 0, 0, 0, 0 },
      //       { 0, 0, 0, 0, 0 },
      //       { 0, 0, 0, 0, 0 },
      //       { 0, 0, 0, 0, 0 }
      // };

      int *startNode = {7, 0, 0, 0, 0, 0, 0};
      int res = astar(startNode, lastNode);
      return 0;
}