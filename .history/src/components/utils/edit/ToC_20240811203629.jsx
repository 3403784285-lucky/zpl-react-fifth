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

export const ToCItem = ({ item, onItemClick, isCollapsed, toggleCollapse, isActive }) => {

  const hasChildren = Array.isArray(item.children) && item.children.length > 0;

  const itemStyle = {
    position: 'relative', // 设置父容器为相对定位
    paddingLeft: '25px',  // 给标题增加左侧内边距，为图标留出空间
    backgroundColor: isActive ? '#E6E6FA' : 'transparent', // 如果是活跃项则设置背景色为浅紫色
  };

  const iconStyle = {
    position: 'absolute',
    left: '0px', // 将图标放在标题左侧
    top: '50%',
    transform: 'translateY(-50%)', // 垂直居中对齐
    cursor: 'pointer', // 鼠标悬停时显示指针
  };

  return (
    <div className={`toc-item level-${item.level}`} style={itemStyle}>
      <div className="toc-header" onClick={() => hasChildren && toggleCollapse(item.id)}>
        {hasChildren && (
          <span style={iconStyle}>
            {isCollapsed ? '+' : '-'}
          </span>
        )}
        <a className='text-ellipsis' onClick={e => onItemClick(e, item.id)} data-item-index={item.itemIndex}>
          {item.textContent}
        </a>
      </div>
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
  const [activeId, setActiveId] = useState(null);

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

        let newActiveId = null;
        let closestTop = Infinity;

        items.forEach((item) => {
          const element = editor.view.dom.querySelector(`[data-toc-id="${item.id}"]`);
          if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top >= 0 && rect.top < closestTop) {
              closestTop = rect.top;
              newActiveId = item.id;
            }
          }
        });

        setActiveId(newActiveId);
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

  const renderItems = (items) => {
    return items.map((item) => (
      <React.Fragment key={item.id}>
        <ToCItem
          item={item}
          onItemClick={onItemClick}
          isCollapsed={collapsedItems[item.id]}
          toggleCollapse={toggleCollapse}
          isActive={item.id === activeId} // 检查是否为当前激活项
        />
        {!collapsedItems[item.id] && item.children && item.children.length > 0 && renderItems(item.children)}
      </React.Fragment>
    ));
  };

  const tree = buildTree(items);

  return (
    <>
      {renderItems(tree)}
    </>
  );
};
