import React, { useState, useEffect, useCallback } from 'react';
import { TextSelection } from '@tiptap/pm/state';

export const ToCItem = ({ item, onItemClick, toggleCollapse, isCollapsed, activeId }) => {
  const isActive = item.id === activeId;

  return (
    <div
      className={`toc-item level-${item.level} ${isActive && !item.isScrolledOver ? 'is-active' : ''} ${
        item.isScrolledOver ? 'is-scrolled-over' : ''
      }`}
      style={{
        '--level': item.level,
      }}
    >
      {item.children && item.children.length > 0 && (
        <span className="collapse-toggle" onClick={toggleCollapse}>
          {isCollapsed ? '+' : '-'}
        </span>
      )}
      <a href={`#${item.id}`} onClick={e => onItemClick(e, item.id)} data-item-index={item.itemIndex}>
        {item.textContent}
      </a>
      {!isCollapsed && item.children && (
        <div className="toc-children">
          {item.children.map(child => (
            <ToCItem
              key={child.id}
              item={child}
              onItemClick={onItemClick}
              toggleCollapse={toggleCollapse}
              isCollapsed={isCollapsed}
              activeId={activeId}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export const ToCEmptyState = () => {
  return (
    <div className="empty-state">
      <p>No content available</p>
    </div>
  );
};

export const ToC = ({ editor, scrollContainerRef }) => {
  const [collapsedItems, setCollapsedItems] = useState({});
  const [activeId, setActiveId] = useState(null);

  const toggleCollapse = useCallback((id) => {
    setCollapsedItems(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const onItemClick = useCallback((e, id) => {
    e.preventDefault();

    if (editor && editor.view) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"]`);
      if (element) {
        const pos = editor.view.posAtDOM(element, 0);
        const tr = editor.view.state.tr;
        tr.setSelection(new TextSelection(tr.doc.resolve(pos)));
        editor.view.dispatch(tr);
        editor.view.focus();

        if (history.pushState) {
          history.pushState(null, null, `#${id}`);
        }

        const container = scrollContainerRef?.current;
        if (container) {
          const elementTop = element.offsetTop;
          container.scrollTo({
            top: elementTop,
            behavior: 'smooth',
          });
        }
      }
    }
  }, [editor, scrollContainerRef]);

  useEffect(() => {
    const handleScroll = () => {
      if (editor && editor.view && scrollContainerRef?.current) {
        const container = scrollContainerRef.current;
        let activeElement = null;
        let activeId = null;

        editor.view.state.doc.content.forEach((node) => {
          const element = editor.view.dom.querySelector(`[data-toc-id="${node.attrs.id}"]`);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= container.getBoundingClientRect().top && rect.top <= container.getBoundingClientRect().bottom) {
              activeElement = element;
              activeId = node.attrs.id;
            }
          }
        });

        if (activeElement) {
          setActiveId(activeId);
        }
      }
    };

    const container = scrollContainerRef?.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      return () => {
        container.removeEventListener('scroll', handleScroll);
      };
    }
  }, [editor, scrollContainerRef]);

  if (!editor) {
    return null; // Handle case where editor is not available
  }

  return (
    <>
      {editor.view.state.doc.content.map(item => (
        <ToCItem
          key={item.attrs.id}
          item={item.attrs}
          onItemClick={onItemClick}
          toggleCollapse={() => toggleCollapse(item.attrs.id)}
          isCollapsed={collapsedItems[item.attrs.id]}
          activeId={activeId}
        />
      ))}
    </>
  );
};
