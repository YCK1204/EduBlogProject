"use client";

import React, { useState, useRef } from "react";
import type { Block } from "@/lib/lessonTypes";

interface EditableBlockProps {
  block: Block;
  blockIndex: number;
  stepIndex: number;
  lang: "ko" | "en" | "ja";
  onDeleteBlock?: (stepIndex: number, blockIndex: number) => void;
  onMoveBlock?: (stepIndex: number, fromIndex: number, toIndex: number) => void;
  onDuplicateBlock?: (stepIndex: number, blockIndex: number) => void;
  onCopyBlock?: (stepIndex: number, blockIndex: number) => void;
  renderBlock: (block: Block, idx: number, lang: "ko" | "en" | "ja") => React.ReactNode;
}

export default function EditableBlock({
  block,
  blockIndex,
  stepIndex,
  lang,
  onDeleteBlock,
  onMoveBlock,
  onDuplicateBlock,
  onCopyBlock,
  renderBlock,
}: EditableBlockProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOverPosition, setDragOverPosition] = useState<'top' | 'bottom' | null>(null);
  const dragRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const handleDragStart = (e: React.DragEvent) => {
    setIsDragging(true);
    e.dataTransfer.setData("text/plain", JSON.stringify({ stepIndex, blockIndex }));
    e.dataTransfer.effectAllowed = "move";
    
    // Create a custom drag image
    if (dragRef.current) {
      const dragImage = dragRef.current.cloneNode(true) as HTMLElement;
      dragImage.style.transform = "rotate(5deg)";
      dragImage.style.opacity = "0.8";
      document.body.appendChild(dragImage);
      e.dataTransfer.setDragImage(dragImage, 0, 0);
      
      // Clean up after a brief moment
      setTimeout(() => {
        if (document.body.contains(dragImage)) {
          document.body.removeChild(dragImage);
        }
      }, 0);
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    setDragOverPosition(null);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    
    if (dragRef.current) {
      const rect = dragRef.current.getBoundingClientRect();
      const midPoint = rect.top + rect.height / 2;
      const mouseY = e.clientY;
      
      setDragOverPosition(mouseY < midPoint ? 'top' : 'bottom');
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const dragData = JSON.parse(e.dataTransfer.getData("text/plain"));
    const { stepIndex: fromStepIndex, blockIndex: fromBlockIndex } = dragData;
    
    // 같은 스텝 내에서만 이동 허용 (다른 스텝 간 이동은 복잡하므로 제외)
    if (fromStepIndex === stepIndex && fromBlockIndex !== blockIndex) {
      const toIndex = dragOverPosition === 'top' ? blockIndex : blockIndex + 1;
      onMoveBlock?.(stepIndex, fromBlockIndex, toIndex);
    }
    
    setDragOverPosition(null);
  };

  const handleMenuClick = (action: string) => {
    setShowMenu(false);
    
    switch (action) {
      case 'delete':
        onDeleteBlock?.(stepIndex, blockIndex);
        break;
      case 'duplicate':
        onDuplicateBlock?.(stepIndex, blockIndex);
        break;
      case 'copy':
        onCopyBlock?.(stepIndex, blockIndex);
        break;
      case 'move-up':
        if (blockIndex > 0) {
          onMoveBlock?.(stepIndex, blockIndex, blockIndex - 1);
        }
        break;
      case 'move-down':
        onMoveBlock?.(stepIndex, blockIndex, blockIndex + 1);
        break;
    }
  };

  return (
    <div
      ref={dragRef}
      className={`group relative transition-all duration-200 ${
        isDragging ? 'opacity-50' : ''
      } ${
        dragOverPosition === 'top' ? 'border-t-2 border-blue-500' : ''
      } ${
        dragOverPosition === 'bottom' ? 'border-b-2 border-blue-500' : ''
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Drag handle and menu button */}
      {(isHovered || showMenu) && (
        <div
          className={`absolute -left-12 top-2 flex items-center gap-1 transition-opacity ${
            showMenu ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          {/* Drag handle */}
          <button
            draggable
            onDragStart={handleDragStart}
            onDragEnd={handleDragEnd}
            className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-grab active:cursor-grabbing"
            title="드래그하여 이동"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              className="text-zinc-400"
            >
              <circle cx="4" cy="4" r="1" fill="currentColor" />
              <circle cx="8" cy="4" r="1" fill="currentColor" />
              <circle cx="12" cy="4" r="1" fill="currentColor" />
              <circle cx="4" cy="8" r="1" fill="currentColor" />
              <circle cx="8" cy="8" r="1" fill="currentColor" />
              <circle cx="12" cy="8" r="1" fill="currentColor" />
              <circle cx="4" cy="12" r="1" fill="currentColor" />
              <circle cx="8" cy="12" r="1" fill="currentColor" />
              <circle cx="12" cy="12" r="1" fill="currentColor" />
            </svg>
          </button>

          {/* Menu button */}
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-1 rounded hover:bg-zinc-100 dark:hover:bg-zinc-800"
              title="블록 옵션"
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className="text-zinc-400"
              >
                <circle cx="8" cy="3" r="1" fill="currentColor" />
                <circle cx="8" cy="8" r="1" fill="currentColor" />
                <circle cx="8" cy="13" r="1" fill="currentColor" />
              </svg>
            </button>

            {/* Context menu */}
            {showMenu && (
              <div
                ref={menuRef}
                className="absolute left-0 top-8 z-50 min-w-52 bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 shadow-xl py-2"
                onBlur={() => setShowMenu(false)}
              >
                {/* Move buttons */}
                <button
                  onClick={() => handleMenuClick('move-up')}
                  disabled={blockIndex === 0}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-500">
                    <path d="M8 3L4 7h8l-4-4z" fill="currentColor"/>
                  </svg>
                  <span className="flex-1">위로 이동</span>
                  <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-1.5 py-0.5 rounded">↑</span>
                </button>
                
                <button
                  onClick={() => handleMenuClick('move-down')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-500">
                    <path d="M8 13l4-4H4l4 4z" fill="currentColor"/>
                  </svg>
                  <span className="flex-1">아래로 이동</span>
                  <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-1.5 py-0.5 rounded">↓</span>
                </button>

                <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-600" />

                {/* Copy & Duplicate */}
                <button
                  onClick={() => handleMenuClick('copy')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-500">
                    <path d="M4 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H4z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M8 1h4a2 2 0 0 1 2 2v8" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span className="flex-1">클립보드에 복사</span>
                  <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-1.5 py-0.5 rounded">⌘C</span>
                </button>

                <button
                  onClick={() => handleMenuClick('duplicate')}
                  className="w-full px-3 py-2 text-left text-sm hover:bg-zinc-50 dark:hover:bg-zinc-700 flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-zinc-500">
                    <rect x="2" y="2" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                    <rect x="6" y="6" width="8" height="8" rx="1" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  </svg>
                  <span className="flex-1">복제</span>
                  <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-1.5 py-0.5 rounded">⌘D</span>
                </button>

                <div className="my-1 h-px bg-zinc-200 dark:bg-zinc-600" />

                {/* Delete */}
                <button
                  onClick={() => handleMenuClick('delete')}
                  className="w-full px-3 py-2 text-left text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 flex items-center gap-2"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className="text-red-500">
                    <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5Z" fill="currentColor"/>
                    <path d="M3 3.5h10v1H3v-1Zm1 2v8a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-8H4Z" fill="currentColor"/>
                  </svg>
                  <span className="flex-1">삭제</span>
                  <span className="text-xs text-zinc-400 bg-zinc-100 dark:bg-zinc-700 px-1.5 py-0.5 rounded">Del</span>
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Block content */}
      <div className={isHovered ? 'ml-2 pl-2 border-l-2 border-blue-200 dark:border-blue-700' : ''}>
        {renderBlock(block, blockIndex, lang)}
      </div>

      {/* Click outside handler for menu */}
      {showMenu && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
}