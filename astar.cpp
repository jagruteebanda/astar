#include <iostream>
#include <cmath>

using namespace std;

class node
{
    public:
      int node[2];
      double g;
      double h;
      double f;
      int parent[2];

    public:
      void setNode(int x, int y)
      {
            node[0] = x;
            node[1] = y;
      };

      void setParent(int x, int y)
      {
            parent[0] = x;
            parent[1] = y;
      };

      void printNode(string name)
      {
            cout << name << ": {\n";
            cout << "   node[x, y]: [" << node[0] << ", " << node[1] << "]\n";
            cout << "   f: " << f << "\n";
            cout << "   g: " << g << "\n";
            cout << "   h: " << h << "\n";
            cout << "   parent[x, y]: [" << parent[0] << ", " << parent[1] << "]\n";
            cout << "}\n";
      }

      int *getNode()
      {
            int *arr;
            arr[0] = node[0];
            arr[1] = node[1];
            return arr;
      }
};

class astar
{
      int rows;
      int cols;
      int **maze;

    public:
      void createMaze(int r, int c)
      {
            rows = r;
            cols = c;
            maze = new int *[rows];
            for (int i = 0; i < rows; i++)
            {
                  maze[i] = new int[cols];
                  for (int j = 0; j < cols; j++)
                  {
                        maze[i][j] = 0;
                        cout << maze[i][j] << " ";
                  }
                  cout << "\n";
            }
      };

      void astarSearch(node startNode, node lastNode)
      {
            node lN;
            lN.setNode(2, 4);
            lN.f = 0;
            lN.g = 0;
            lN.h = 0;
            lN.setParent(0, 0);
            int *lastNodeVal = lN.getNode();

            node *openList = (node *)malloc(rows * cols * sizeof(node));
            node *closedList = (node *)malloc(rows * cols * sizeof(node));
            // node *openList = new node[rows * cols];
            // node *closedList = new node[rows * cols];
            int closedListLength = 0;

            node *openListTop;
            int openListLength = 0;
            openList[openListLength] = startNode;
            openListLength++;

            while (openListLength > 0)
            {

                  // sort open list by f value;
                  for (int j = 1; j < openListLength; j++)
                  {
                        node key = openList[j];
                        int i = j - 1;
                        while (i > 0 && (openList[i].f > key.f))
                        {
                              openList[i + 1] = openList[i];
                              i = i - 1;
                              openList[i + 1] = key;
                        }
                  }
                  cout << "\nOHHOOOO: " << openListLength << "\n";
                  for (int i = 0; i < openListLength; i++)
                  {
                        // cout << "i " << i;
                        string nodeDetails = "open list ";
                        openList[i].printNode(nodeDetails);
                  }

                  // shift the array element by 1 - dequeue a elemnent from an array
                  node q = openList[0];
                  // shifting the elements
                  // cout << "shifting k yaha: " + openListLength;
                  // for (int i = 0; i < openListLength-1; i++)
                  // {
                  //       openList[i] = openList[i + 1];
                  // }
                  openListLength--;

                  // find the successors of q
                  int *qNode = q.getNode();
                  node *successors = (node *)malloc(8 * sizeof(node *));
                  int index = 0;
                  for (int i = qNode[0] - 1; i <= qNode[0] + 1; i++)
                  {
                        for (int j = qNode[1] - 1; j <= qNode[1] + 1; j++)
                        {
                              if (!(i == qNode[0] && j == qNode[1]))
                              { // to check if it is not the same as q
                                    if ((i >= 0) && (i < rows) && (j >= 0) && (j < cols))
                                    {
                                          // cout << "inside" << i << " " << j << "\n";
                                          double g = q.g + 1;
                                          double h = sqrt(pow(i - lastNode.node[0], 2) + pow(j - lastNode.node[1], 2)); // Euclidean distance
                                          double f = g + h;
                                          node tempNode;
                                          tempNode.f = f;
                                          tempNode.g = g;
                                          tempNode.h = h;
                                          tempNode.setNode(i, j);
                                          tempNode.setParent(qNode[0], qNode[1]);
                                          successors[index++] = tempNode;
                                          // successors[index].printNode("successor node");
                                    }
                              }
                        }
                  }

                  // for every successor
                  int open = openListLength;
                  for (int i = 0; i < index; i++)
                  {
                        node tempNode = successors[i];
                        tempNode.printNode("temp node");
                        int *currNodeVal = tempNode.getNode();
                        // cout << "current node " << currNodeVal[0] << " " << currNodeVal[1] << "\n";
                        // cout << "last node " << last     NodeVal[0] << " " << lastNodeVal[1];
                        if (currNodeVal[0] == lastNodeVal[0] && currNodeVal[1] == lastNodeVal[1])
                        {
                              cout << "Found last node with cost " << closedListLength;
                              break;
                        }
                        else
                        {
                              int found = 1000;
                              cout << "openListLength: " << openListLength << "\n";
                              for (int j = 0; j < open; j++)
                              {
                                    int *arr = openList[j].getNode();
                                    if (arr[0] == currNodeVal[0] && arr[1] == currNodeVal[1] && openList[j].f < tempNode.f)
                                    {
                                          tempNode.printNode("open List found");
                                          found = j;
                                          break;
                                    }
                              }
                              // found = 1000;
                              cout << "closedListlength: " << closedListLength << "\n";
                              for (int j = 0; j < closedListLength; j++)
                              {
                                    int *arr = closedList[j].getNode();
                                    if (arr[0] == currNodeVal[0] && arr[1] == currNodeVal[1] && closedList[j].f < tempNode.f)
                                    {
                                          tempNode.printNode("closed List found");
                                          found = j;
                                          break;
                                    }
                              }
                              if (found == 1000)
                              {
                                    // cout << "in if: " << open << "\n";
                                    openList[open] = tempNode;
                                    openList[open].printNode("open list hi: ");
                                    // openListLength++;
                                    open = open + 1;
                                    continue;
                              }
                              else
                              {
                                    cout << "yahaoe aaya\n";
                              }
                        }
                  } // end for every successor
                  openListLength = open;
                  cout << "HEY DUDE: " << open << " " << openListLength;

                  closedList[closedListLength++] = q;
            };
      };
};

int main()
{
      int rows = 0, columns = 0;
      cout << "Enter MAZE dimensions: \n";
      cout << "Enter number of rows: ";
      cin >> rows;
      cout << "Enter number of columns: ";
      cin >> columns;
      astar A;
      A.createMaze(rows, columns);

      node startNode;
      startNode.setNode(7, 0);
      startNode.f = 0;
      startNode.g = 0;
      startNode.h = 0;
      // startNode.setFGH(0, 0, 0);
      startNode.setParent(0, 0);

      node lastNode;
      lastNode.setNode(2, 4);
      lastNode.f = 0;
      lastNode.g = 0;
      lastNode.h = 0;
      lastNode.setParent(0, 0);

      A.astarSearch(startNode, lastNode);

      return 0;
}