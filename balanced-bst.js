#!/usr/bin/node

// Function to print out the balanced BST on terminal
const prettyPrint = (node, prefix = "", isLeft = true) => {
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
    this.inputArray = [...removeDuplicates(mergeSort(inputArray))];
    this.root = this.buildTree(this.inputArray, 0, this.inputArray.length - 1);
    this.preOrderData = [];
    this.inOrderData = [];
    this.postOrderData = [];
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
    } else if (root.data < value) {
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
    console.log("Lets level Order this tree...", result);
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
    console.log("Lets print this tree inOrder...", `${this.inOrderData}`);
  }

  preOrder(root = this.root) {
    if (root == null) return;

    if (root.data !== undefined) {
      this.preOrderData.push(root.data);
    }

    if (root.left !== null) {
      this.preOrder(root.left);
    }

    if (root.right !== null) {
      this.preOrder(root.right);
    }
    console.log("Lets print this tree preOrder...", `${this.preOrderData}`);
  }

  postOrder(root = this.root) {
    if (root == null) return;

    if (root.left !== null) {
      this.postOrder(root.left);
    }

    if (root.right !== null) {
      this.postOrder(root.right);
    }

    if (root.data !== undefined) {
      this.postOrderData.push(root.data);
    }
    console.log("Lets print this tree postOrder...", `${this.postOrderData}`);
  }

  height(root = this.root) {
    if (root == null) {
      return -1;
    } else {
      let left = this.height(root.left);
      let right = this.height(root.right);

      return Math.max(left, right) + 1;
    }
  }

  depth(nodeVal, root = this.root, edgeCount = 0) {
    if (root === null) return;
    if (root.data === nodeVal) return edgeCount;

    if (root.data < nodeVal) {
      return this.depth(nodeVal, root.right, edgeCount + 1);
    } else {
      return this.depth(nodeVal, root.left, edgeCount + 1);
    }
  }

  isBalanced(root = this.root) {
    if (root == null) return false;

    let leftHalf = root.left;
    let rightHalf = root.right;

    if (Math.abs(this.height(leftHalf) - this.height(rightHalf)) > 1) {
      return false;
    } else {
      return true;
    }
  }

  rebalance() {
    prettyPrint(this.root);
    if (this.isBalanced(this.root)) return this.root;

    let rebalancedNewTreeArray = [];
    rebalancedNewTreeArray = this.traverse(this.root, rebalancedNewTreeArray);

    let balancedTree = new tree(rebalancedNewTreeArray);
    prettyPrint(balancedTree.root);
    console.log("Is the tree now balanced??...", balancedTree.isBalanced());
    return balancedTree.root;
  }

  traverse(root, array) {
    if (array !== undefined) array.push(root.data);
    if (root.left !== null) {
      this.traverse(root.left, array);
    }

    if (root.right !== null) {
      this.traverse(root.right, array);
    }
    return array;
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

function mergeSort(inputArray) {
  if (inputArray.length == 1) return inputArray;

  const newArray = [];

  const left = mergeSort(inputArray.slice(0, inputArray.length / 2));
  const right = mergeSort(inputArray.slice(inputArray.length / 2));

  while (left.length && right.length) {
    if (left[0] < right[0]) {
      newArray.push(left.shift());
    } else {
      newArray.push(right.shift());
    }
  }

  return [...newArray, ...left, ...right];
}

function removeDuplicates(inputArray) {
  return [...new Set(inputArray)];
}

let testInputArray = [1, 2, 3, 4, 5, 6, 7];
balancedBST = new tree(testInputArray, 1, 7);
balancedBST.insert(8);
balancedBST.insert(9);
balancedBST.delete(3);
console.log(balancedBST.find(8));
balancedBST.levelOrder();
balancedBST.inOrder();
balancedBST.preOrder();
balancedBST.postOrder();
console.log("Tree Height...", balancedBST.height());
console.log("Tree Depth...", balancedBST.depth(7));
console.log("Is the tree balanced??...", balancedBST.isBalanced());
console.log("Rebalancing the tree!...", balancedBST.rebalance());
