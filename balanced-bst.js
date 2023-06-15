#!/usr/bin/node

// Visualize binary search tree
const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

class node {
  constructor(data = null, left = null, right = null) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class tree {
  constructor(inputArray) {
    this.root = this.buildTree(inputArray, 0, inputArray.length - 1);
    this.preOrderData = [];
    this.inOrderData = [];
    this.postOrderData = [];
    prettyPrint(this.root);
  }

  buildTree(inputArray, start, end) {
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    let root = new node(inputArray[mid]);

    root.left = this.buildTree(inputArray, start, mid - 1);
    root.right = this.buildTree(inputArray, mid + 1, end);
    return root;
  }

  insert(value, root = this.root) {
    if (root == null) {
      return (root = new node(value));
    }

    if (root.data < value) {
      root.right = this.insert(value, root.right);
    } else {
      root.left = this.insert(value, root.left);
    }
    prettyPrint(this.root);
    return root;
  }

  delete(value, root = this.root) {
    if (root == null) {
      return root;
    }

    if (root.data > value) {
      root.left = this.delete(value, root.left);
    } else if (root.data < value) {
      root.right = this.delete(value, root.right);
    } else {
      if (root.left == null) {
        return root.right;
      } else if (root.right == null) {
        return root.left;
      }
      root.data = minValue(root);
      root.right = this.delete(root.right, root.data);
    }
    prettyPrint(this.root);
    return root;
  }

  find(value, root = this.root) {
    if (root == null) return false;
    if (root.data == value) return root;
    if (root.data > value) {
      return this.find(value, root.left);
    }
    if (root.data < value) {
      return this.find(value, root.right);
    }
    prettyPrint(this.root);
    return root;
  }

  levelOrder(root = this.root) {
    const queue = [];
    const result = [];

    if (root == null) return;

    queue.push(root);

    while (queue.length > 0) {
      let current = queue.shift(root);
      result.push(current.data);

      if (current.left !== null) queue.push(current.left);
      if (current.right !== null) queue.push(current.right);
    }
    console.log("Lets level Order this tree...");
    return result;
  }

  inOrder(root = this.root) {
    if (root == null) return;

    if (root.left !== null) {
      this.inOrder(root.left);
    }

    if (root.data !== undefined) {
      this.inOrderData.push(root.data);
    }

    if (root.right !== null) {
      this.inOrder(root.right);
    }
    console.log("Let's print this tree inOrder...", `${this.inOrderData}`);
  }

  preOrder(root = this.root) {
    if (root == null) return;

    if (root.data !== undefined) {
      this.preOrderData.push(root.data);
    }

    if (root.left !== null) {
      this.preOrder(root.left);
      ``;
    }

    if (root.right !== null) {
      this.preOrder(root.right);
    }
  }
}

function minValue(root) {
  let min = root.data;
  while (root != null) {
    min = root.data;
    root = root.left;
  }
  prettyPrint(this.root);
  return min;
}

let testInputArray = [1, 2, 3, 4, 5, 6, 7];
// const balancedBST = new tree(testInputArray);
balancedBST = new tree(testInputArray, 1, 7);
balancedBST.insert(8);
balancedBST.delete(3);
console.log(balancedBST.find(10));
balancedBST.levelOrder();
balancedBST.inOrder();
balancedBST.preOrder();
