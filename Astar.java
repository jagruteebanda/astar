import java.util.*;

class Node {
      int node[] = new int[2];
      int parent[] = new int[] { 0, 0 };
      double f = 0;
      double g = 0;
      double h = 0;

      public void setNode(int arr[]) {
            node = arr;
            System.out.println(node[0] + "  " + node[1]);
      }

      public void setParent(int arr[]) {
            parent = arr;
            System.out.println(parent[0] + "  " + parent[1]);
      }

      public void printNode() {
            System.out.println(node[0] + "  " + node[1] + " f: " + f);
      }
}

class Astar {

      public static int minIndex(Queue<Node> list, int sortIndex) {
            int min_index = -1;
            double min_value = Double.MAX_VALUE;
            int s = list.size();
            for (int i = 0; i < s; i++) {
                  Node current = list.peek();
                  list.poll();
                  if (current.f <= min_value && i <= sortIndex) {
                        min_index = i;
                        min_value = current.f;
                  }
                  list.add(current);
            }
            return min_index;
      }

      public static void insertMinToRear(Queue<Node> list, int min_index) {
            Node min_value = list.peek();
            int s = list.size();
            for (int i = 0; i < s; i++) {
                  Node current = list.peek();
                  list.poll();
                  if (i != min_index)
                        list.add(current);
                  else
                        min_value = current;
            }
            list.add(min_value);
      }

      public void sortQueue(Queue<Node> queue) {
            for (int i = 1; i <= queue.size(); i++) {
                  int min_index = minIndex(queue, queue.size() - i);
                  insertMinToRear(queue, min_index);
            }
      }

      public void astar() {
            int sn[] = new int[] { 7, 0 };
            int ln[] = new int[] { 2, 4 };

            Node startNode = new Node();
            startNode.setNode(sn);

            Node lastNode = new Node();
            lastNode.setNode(ln);

            // int openList[];
            // int closedList[];

            Queue<Node> openList = new LinkedList<>();
            // Queue<Node> closedList = new LinkedList<>();

            openList.add(startNode);

            int openListLength = openList.size();
            while (openListLength > 0) {
                  sortQueue(openList);
                  // while (openList.isEmpty() == false) {
                  //       openList.peek().printNode();
                  //       openList.poll();
                  // }
                  // openListLength--;
            }
      }

      public static void main(String args[]) {
            Astar a = new Astar();
            a.astar();
      }
}