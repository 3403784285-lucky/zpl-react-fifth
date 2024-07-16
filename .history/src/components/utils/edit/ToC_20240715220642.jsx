import React, { useState, useEffect, useCallback } from 'react';
import { TextSelection } from '@tiptap/pm/state';
import { useSelector } from 'react-redux';

export const ToCItem = ({ item, onItemClick, toggleCollapse, isCollapsed, activeId, editor }) => {
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
      <a href={`#${item.id}`} onClick={(e) => onItemClick(e, item.id)} data-item-index={item.itemIndex}>
        {item.textContent}
      </a>
      {!isCollapsed && item.children && (
        <div className="toc-children">
          {item.children.map((child) => (
            <ToCItem
              key={child.id}
              item={child}
              onItemClick={onItemClick}
              toggleCollapse={toggleCollapse}
              isCollapsed={isCollapsed}
              activeId={activeId}
              editor={editor}
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

export const ToC = ({ scrollContainerRef }) => {
  const [items, setItems] = useState([]);
  const [collapsedItems, setCollapsedItems] = useState({});
  const [activeId, setActiveId] = useState(null);
  const editor = useSelector((state) => state.editor.value ? JSON.parse(state.editor.value) : null);

  const toggleCollapse = useCallback((id) => {
    setCollapsedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const onItemClick = useCallback(
    (e, id) => {
      e.preventDefault();

      if (editor) {
        const element = editor.view.dom.querySelector(`[data-toc-id="${id}"]`);
        const pos = editor.view.posAtDOM(element, 0);

        // set focus
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
    },
    [editor, scrollContainerRef]
  );

  useEffect(() => {
    const handleScroll = () => {
      if (editor && scrollContainerRef?.current) {
        const container = scrollContainerRef.current;
        let activeElement = null;
        let activeId = null;

        items.forEach((item) => {
          const element = editor.view.dom.querySelector(`[data-toc-id="${item.id}"]`);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= container.getBoundingClientRect().top && rect.top <= container.getBoundingClientRect().bottom) {
              activeElement = element;
              activeId = item.id;
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
  }, [editor, items, scrollContainerRef]);

  useEffect(() => {
    if (editor) {
      editor.onUpdate((content) => {
        setItems(content);
      });
    }
  }, [editor]);

  if (items.length === 0) {
    return <ToCEmptyState />;
  }

  return (
    <>
      {items.map((item) => (
        <ToCItem
          onItemClick={onItemClick}
          key={item.id}
          item={item}
          toggleCollapse={() => toggleCollapse(item.id)}
          isCollapsed={collapsedItems[item.id]}
          activeId={activeId}
          editor={editor}
        />
      ))}
    </>
  );
};
