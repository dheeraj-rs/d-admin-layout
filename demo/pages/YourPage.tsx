import React, { useEffect, useState } from 'react';
import { TreeNode } from '../types/TreeNode';
import { NodeService } from '../service/NodeService';
import TreeView from '../components/TreeView/TreeView';

const YourPage: React.FC = () => {
    const [nodes, setNodes] = useState<TreeNode[]>([]);

    useEffect(() => {
        NodeService.getFiles().then((data) => setNodes(data));
    }, []);

    const handleNodeClick = (node: TreeNode) => {
        console.log('Node clicked:', node);
    };

    const handleNodeExpand = (node: TreeNode) => {
        // Update node expanded state
        const updateNodes = (nodes: TreeNode[]): TreeNode[] => {
            return nodes.map((n) => {
                if (n.key === node.key) {
                    return { ...n, expanded: !n.expanded };
                }
                if (n.children) {
                    return { ...n, children: updateNodes(n.children) };
                }
                return n;
            });
        };

        setNodes(updateNodes(nodes));
    };

    return <TreeView nodes={nodes} onNodeClick={handleNodeClick} onNodeExpand={handleNodeExpand} />;
};

export default YourPage;
