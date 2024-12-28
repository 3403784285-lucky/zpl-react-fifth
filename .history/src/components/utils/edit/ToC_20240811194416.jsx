import React, { useState, useEffect, useCallback } from 'react';
import { TextSelection } from '@tiptap/pm/state';

export const ToCItem = ({ item, onItemClick, isCollapsed, toggleCollapse }) => {


  return (
    <div
      className={`toc-item level-${item.level}  ${item.isScrolledOver ? 'is-scrolled-over' : ''
        }`}

    >
      <div className="toc-header" onClick={() => toggleCollapse(item.id)}>
        <a className='text-ellipsis' onClick={e => onItemClick(e, item.id)} data-item-index={item.itemIndex}>
          {item.textContent}
        </a>
        <span>{isCollapsed ? '+' : '-'}</span>
      </div>
      {!isCollapsed && item.children && item.children.length > 0 && (
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

      // set focus
      const tr = editor.view.state.tr;
      tr.setSelection(new TextSelection(tr.doc.resolve(pos)));
      editor.view.dispatch(tr);
      editor.view.focus();

      // if (history.pushState) { // eslint-disable-line
      //   history.pushState(null, null, `#${id}`); // eslint-disable-line
      // }

      const container = scrollContainerRef?.current.children[1].children[0].children[1].children[0];
      console.log(container, "这是容器")
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

  return (
    <>
      {items.map((item) => (
        <ToCItem
          onItemClick={onItemClick}
          key={item.id}
          item={item}
          isCollapsed={collapsedItems[item.id]}
          toggleCollapse={toggleCollapse}
        />
      ))}
    </>
  );
};
