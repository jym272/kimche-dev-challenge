class TrieNode {
    constructor(value) {
        this.value = value;
        this.children = {};
    }
}

export class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(object) {
        let current = this.root;
        for (let i = 0; i < object.word.length; i++) {
            let char = object.word[i];
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }
        current.isWord = true;
        current.value = object.code;
    }

    search(word) {
        let current = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        return current.isWord;
    }

    startsWith(prefix) {
        let current = this.root;
        for (let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }
        return true;
    }

    autoComplete(prefix) {
        let current = this.root;
        for (let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            if (!current.children[char]) {
                return [];
            }
            current = current.children[char];
        }
        let result = [];
        this.traverse(current, result, prefix);
        return result;
    }

    traverse(node, result, prefix) {
        if (node.isWord) {
            result.push({
                word: prefix,
                code: node.value
            });
        }
        for (let key in node.children) {
            let child = node.children[key];
            this.traverse(child, result, prefix + key);
        }
    }
}











