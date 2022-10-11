class Node {
    constructor(value, leftChild = null, rightChild = null) {
        this.value = value;
        this.leftChild = leftChild;
        this.rightChild = rightChild;
    }
}

class Tree {
    constructor(array) {
        // this.pureArray = this.mergeSort(this.removeDuplicates(array));
        this.buildTree = this.buildTree.bind(this);

        this.root = this.buildTree(this.mergeSort(this.removeDuplicates(array)));
    }

    mergeSort(arr) {
        const n = arr.length;
    
        if (n < 2) {
            return arr;
        }
    
        let leftHalf = arr.slice(0, Math.ceil(n / 2));
        let rightHalf = arr.slice(Math.ceil(n / 2));
    
        if (leftHalf.length > 1) {
            leftHalf = this.mergeSort(leftHalf);
        }
    
        if (rightHalf.length > 1) {
            rightHalf = this.mergeSort(rightHalf);
        }
    
        // Merging of two halfs
        const sortedArray = [];
    
        for (let i = 0; i < arr.length; i++) {
            const leftElement = leftHalf[0];
            const rightElement = rightHalf[0];
            if (rightElement === undefined || leftElement < rightElement) {
                leftHalf.shift();
                sortedArray.push(leftElement);
            } else if (leftElement === undefined || rightElement < leftElement) {
                rightHalf.shift();
                sortedArray.push(rightElement);
            }
        }
        return sortedArray;
    }

    removeDuplicates(array) {
        const pureArray = Array.from(new Set(array));
        return pureArray;
    }

    buildTree(array) {
        const midIndex = Math.ceil(array.length / 2 - 1);
        const rootNode = new Node(array[midIndex]);
    
        const leftHalf = array.slice(0, midIndex);
        const rightHalf = array.slice(midIndex + 1);
    
        if (leftHalf.length == 0) {
            rootNode.leftChild = null;
        } else if (leftHalf.length == 1) {
            const node = new Node(leftHalf[0]);
    
            node.leftChild = null;
            rootNode.leftChild = node;
        } else {
            rootNode.leftChild = this.buildTree(leftHalf);
        }
    
        if (rightHalf.length == 0) {
            rootNode.rightChild = null;
        } else if (rightHalf.length == 1) {
            const node = new Node(rightHalf[0]);
    
            node.rightChild = null;
            rootNode.rightChild = node;
        } else {
            rootNode.rightChild = this.buildTree(rightHalf);
        }
    
        return rootNode;
    }

    prettyPrint(node = this.root, prefix = '', isLeft = true) {
        if (node.rightChild !== null) {
            this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
        }
        console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
        if (node.leftChild !== null) {
            this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
        }
    }

    // accepts a value and returns the node with the given value
    find(value) {
        let currentNode = this.root;
        while (currentNode.value != value) {
            if (value > currentNode.value) {
                if (currentNode.rightChild != null) {
                    currentNode = currentNode.rightChild;
                    continue;
                } else {
                    return null;
                }
            } else {
                if (currentNode.leftChild != null) {
                    currentNode = currentNode.leftChild;
                    continue;
                } else {
                    return null;
                }
            }
        }
        return currentNode;
    }

    // traverse the tree in breadth-first level order and provide each node as the argument to the provided function
    levelOrder(callback) {
        const resultArray = [];
        if (!callback) {
            callback = (node) => resultArray.push(node.value);
        }
        
        const queue = []; // execution queue (FIFO) 
        queue.push(this.root);

        while (queue.length != 0) {
            const currentNode = queue.shift();
            callback(currentNode);

            if (currentNode.leftChild != null) {
                queue.push(node.leftChild);
            }
            if (currentNode.rightChild != null) {
                queue.push(node.rightChild);
            }
        }

        return resultArray;
    }

    // inorder traversal
    inOrder(callback, currentNode = this.root) {
        const resultArray = [];
        if (!callback) {
            callback = (node) => resultArray.push(node.value);
        }

        if (currentNode.leftChild != null) {
            this.inorder(callback, currentNode.leftChild);
            callback(currentNode);
        } else {
            callback(currentNode);
        }

        if (currentNode.rightChild != null) {
            this.inorder(callback, currentNode.rightChild);
        }
        return resultArray;
    }

    // preorder traversal
    preOrder(callback, currentNode = this.root) {
        const resultArray = [];
        if (!callback) {
            callback = (node) => resultArray.push(node.value);
        }

        callback(currentNode);

        if (currentNode.leftChild != null) {
            this.preOrder(callback, currentNode.leftChild);
        }

        if (currentNode.rightChild != null) {
            this.preOrder(callback, currentNode.rightChild);
        }

        return resultArray;
    }

    // postorder traversal
    postOrder(callback, currentNode = this.root) {
        const resultArray = [];
        if (!callback) {
            callback = (node) => resultArray.push(node.value);
        }

        if (currentNode.leftChild != null || currentNode.rightChild != null) {
            if (currentNode.leftChild != null) {
                this.postOrder(callback, currentNode.leftChild);
            }

            if (currentNode.rightChild != null) {
                this.postOrder(callback, currentNode.rightChild);
            }
        } 
        callback(currentNode);

        return resultArray;
    }

    // the number of edges in longest path from a given node to a leaf node
    height(node) {
        if (node == null) {
            return -1;
        }
        let heightLeft = 0;
        let heightRight = 0;

        heightLeft = this.height(node.leftChild);
        heightRight = this.height(node.rightChild);
        return (heightLeft > heightRight) ? heightLeft + 1 : heightRight + 1;
    }

    // the number of edges in path from a given node to the tree’s root node
    depth(node, root = this.root) {
        if (node == null) {
            return null;
        }
        let depth = 0;
        if (root == node) {
            return depth;
        } else if (root == null) {
            return null;
        } else if (root.leftChild == node) {
            return depth + 1;
        } else if (root.rightChild == node) {
            return depth + 1;
        } else {
            const leftDepth = this.depth(node, root.leftChild);
            const rightDepth = this.depth(node, root.rightChild);

            console.log('node value: ', root.value);
            console.log('left: ', leftDepth);
            console.log('right: ', rightDepth);
            if (leftDepth == null && rightDepth == null) {
                return null;
            } else {
                if (leftDepth == null) {
                    return rightDepth + 1;
                } else if (rightDepth == null) {
                    return leftDepth + 1;
                }
            }

            return (leftDepth > rightDepth) ? leftDepth + 1 : rightDepth + 1;
        }
    }

    isBalanced(root = this.root) {
        const leftHeight = this.height(root.leftChild);
        const rightHeight = this.height(root.rightChild);

        if (Math.abs(leftHeight - rightHeight) <= 1) {
            return true;
        }
        return false;
    }
}

const myArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];

const binaryTree = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324])
binaryTree.prettyPrint();

console.log(binaryTree.isBalanced());

