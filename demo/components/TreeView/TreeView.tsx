import React from 'react';
import { TreeNode } from '../../types/TreeNode';
import './TreeView.scss';

interface TreeViewProps {
    nodes: TreeNode[];
    onNodeClick?: (node: TreeNode) => void;
    onNodeExpand?: (node: TreeNode) => void;
}

const TreeView: React.FC<TreeViewProps> = ({ nodes, onNodeClick, onNodeExpand }) => {
    const renderNode = (node: TreeNode) => {
        const children = node.children || [];
        const hasChildren = children.length > 0;

        return (
            <li key={node.key} className="tree-node">
                <div
                    className={`tree-node-content ${node.expanded ? 'expanded' : ''}`}
                    onClick={() => {
                        if (hasChildren && onNodeExpand) {
                            onNodeExpand(node);
                        }
                        if (onNodeClick) {
                            onNodeClick(node);
                        }
                    }}
                >
                    {hasChildren && <span className="tree-node-toggler">{node.expanded ? '▼' : '▶'}</span>}
                    {node.icon && <span className={`tree-node-icon ${node.icon}`} />}
                    <span className="tree-node-label">{node.label}</span>
                </div>
                {hasChildren && node.expanded && <ul className="tree-node-children">{children.map((childNode) => renderNode(childNode))}</ul>}
            </li>
        );
    };

    return (
        <div className="tree-view">
            <ul className="tree-root">{nodes.map((node) => renderNode(node))}</ul>
        </div>
    );
};

export default TreeView;
