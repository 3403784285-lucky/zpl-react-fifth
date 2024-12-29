import React, { useState, useEffect, useCallback } from 'react';
import { TextSelection } from '@tiptap/pm/state';

const buildTree = (items) => {
  const root = [];
  const stack = [];

  items.forEach(item => {
    const newItem = { ...item, children: [] };

    while (stack.length > 0 && stack[stack.length - 1].level >= newItem.level) {
      stack.pop();
    }

    if (stack.length === 0) {
      root.push(newItem);
    } else {
      stack[stack.length - 1].children.push(newItem);
    }

    stack.push(newItem);
  });

  return root;
};

export const ToCItem = ({ item, onItemClick, isCollapsed, toggleCollapse }) => {
  return (
    <div
      className={`toc-item level-${item.level} ${item.isScrolledOver ? 'is-scrolled-over' : ''}`}
    >
      <div className="toc-header" onClick={() => toggleCollapse(item.id)}>
        <a className='text-ellipsis' onClick={e => onItemClick(e, item.id)} data-item-index={item.itemIndex}>
          {item.textContent}
        </a>
        {/* 显示展开/折叠图标 */}
        {item.children.length > 0 && <span>{isCollapsed ? '+' : '-'}</span>}
      </div>

      {/* 渲染子标题 */}
      {!isCollapsed && item.children.length > 0 && (
        <div className="toc-children">
          {item.children.map((childItem) => (
            <ToCItem
              key={childItem.id}
              item={childItem}
              onItemClick={onItemClick}
              isCollapsed={isCollapsed}
              toggleCollapse={toggleCollapse}
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
      <p>暂无数据</p>
    </div>
  );
};

export const ToC = ({ items = [], editor, scrollContainerRef }) => {
  const [collapsedItems, setCollapsedItems] = useState({});

  const toggleCollapse = useCallback((id) => {
    setCollapsedItems((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  }, []);

  const onItemClick = useCallback((e, id) => {
    e.preventDefault();

    if (editor) {
      const element = editor.view.dom.querySelector(`[data-toc-id="${id}"]`);
      const pos = editor.view.posAtDOM(element, 0);

      const tr = editor.view.state.tr;
      tr.setSelection(new TextSelection(tr.doc.resolve(pos)));
      editor.view.dispatch(tr);
      editor.view.focus();

      const container = scrollContainerRef?.current.children[1].children[0].children[1].children[0];
      if (container) {
        const elementTop = element.getBoundingClientRect().top + container.scrollTop;
        container.scrollTo({
          top: elementTop - 90,
          behavior: 'smooth',
        });
      }
    }
  }, [editor, scrollContainerRef]);

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

  if (items.length === 0) {
    return <ToCEmptyState />
  }

  const tree = buildTree(items);

  return (
    <>
      {tree.map((item) => (
        <ToCItem
          key={item.id}
          item={item}
          onItemClick={onItemClick}
          isCollapsed={collapsedItems[item.id]}
          toggleCollapse={toggleCollapse}
        />
      ))}
    </>
  );
};
