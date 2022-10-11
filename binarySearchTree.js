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

    // inserts the node with value into the tree
    insert(value, root = this.root) {
        if (value == root.value) {
            return false;
        }

        if (root.leftChild == null && root.rightChild == null) {
            if (value < root.value) {
                root.leftChild = new Node(value);
                return true; // insertion complete 
            } else {
                root.rightChild = new Node(value);
                return true; // insertion complete
            }
        } else {
            if (value < root.value) {
                if (root.leftChild == null) {
                    root.leftChild = new Node(value);
                    return true;
                } else {
                    return this.insert(value, root.leftChild);
                }
            } else {
                if (root.rightChild == null) {
                    root.rightChild = new Node(value);
                    return true;
                } else {
                    return this.insert(value, root.rightChild);
                }
            }
        }
    }

    delete(value, root = this.root) {
        // base case: tree is empty
        if (root == null) { return root; }

        if (value < root.value) {
            root.leftChild = this.delete(value, root.leftChild);
        } else if (value > root.value) {
            root.rightChild = this.delete(value, root.rightChild);

            // value == root.value - root should be deleted
        } else {
            if (root.leftChild == null) {
                return root.rightChild;
            } else if (root.rightChild == null) {
                return root.leftChild;
            }

            // root node has both children
            root.value = this.minValue(root.rightChild);
            root.rightChild = this.delete(root.value, root.rightChild);
        }
        return root;
    }

    // returns child node's value with minimum value 
    minValue(node) {
        if (node.leftChild == null) {
            return node.value;
        } else {
            return this.minValue(node.leftChild);
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
                queue.push(currentNode.leftChild);
            }
            if (currentNode.rightChild != null) {
                queue.push(currentNode.rightChild);
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
            this.inOrder(callback, currentNode.leftChild);
            callback(currentNode);
        } else {
            callback(currentNode);
        }

        if (currentNode.rightChild != null) {
            this.inOrder(callback, currentNode.rightChild);
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

    rebalance() {
        const valuesArray = this.inOrder();
        this.root = this.buildTree(valuesArray);
        return this.root;
    }
}

// until and length must be integer
function getRandomNumbersArray(length, until) {
    return Array.from( {length}, () => Math.floor(Math.random() * until) );
}

(function driverScript(array) {
    const binaryTree = new Tree(array);

    binaryTree.prettyPrint();

    console.log('Is binary tree balanced: ', binaryTree.isBalanced());

    console.log('All elements in level order: ', binaryTree.levelOrder());
    console.log('All elements in pre order: ', binaryTree.preOrder());
    console.log('All elements in post order: ', binaryTree.postOrder());
    console.log('All elements in order: ', binaryTree.inOrder());

    // added 5 random numbers > 100
    binaryTree.insert(getRandomNumbersArray(1, 100)[0] + 100);
    binaryTree.insert(getRandomNumbersArray(1, 100)[0] + 100);
    binaryTree.insert(getRandomNumbersArray(1, 100)[0] + 100);
    binaryTree.insert(getRandomNumbersArray(1, 100)[0] + 100);
    binaryTree.insert(getRandomNumbersArray(1, 100)[0] + 100);

    console.log('/ added 5 random numbers > 100');
    console.log('Is binary tree balanced: ', binaryTree.isBalanced());

    // rebalance the tree
    console.log('rebalance the tree');
    binaryTree.rebalance();

    binaryTree.prettyPrint();

    console.log('Is binary tree balanced: ', binaryTree.isBalanced());

    console.log('All elements in level order: ', binaryTree.levelOrder());
    console.log('All elements in pre order: ', binaryTree.preOrder());
    console.log('All elements in post order: ', binaryTree.postOrder());
    console.log('All elements in order: ', binaryTree.inOrder());

})(getRandomNumbersArray(100, 100));

