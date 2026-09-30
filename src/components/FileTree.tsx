"use client";

import React from "react";

interface FileTreeNode {
  name: string;
  type: "dir" | "file";
  comment?: string;
  children?: FileTreeNode[];
}

interface FileTreeProps {
  root: FileTreeNode;
}

function TreeNode({ node, depth }: { node: FileTreeNode; depth: number }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
        <span style={{ marginLeft: `${depth * 1.25}rem`, display: "flex", alignItems: "center", gap: "0.375rem" }}>
          {node.type === "dir" ? (
            <>
              <span style={{ color: "var(--text-muted)" }}>{depth > 0 ? "├── " : ""}</span>
              <span className="file-tree-dir">{node.name}/</span>
            </>
          ) : (
            <>
              <span style={{ color: "var(--text-muted)", fontFamily: "var(--font-mono)", fontSize: "0.875rem" }}>
                {depth > 0 ? "├── " : ""}
              </span>
              <span className="file-tree-file">{node.name}</span>
            </>
          )}
          {node.comment && (
            <span style={{ color: "var(--text-muted)", fontSize: "0.8125rem", marginLeft: "0.5rem" }}>
              — {node.comment}
            </span>
          )}
        </span>
      </div>
      {node.children?.map((child) => (
        <TreeNode key={child.name} node={child} depth={depth + 1} />
      ))}
    </div>
  );
}

export function FileTree({ root }: FileTreeProps) {
  return (
    <div className="file-tree" role="region" aria-label="File tree">
      <TreeNode node={root} depth={0} />
    </div>
  );
}
