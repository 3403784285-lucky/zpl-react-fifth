import React, { useState, useEffect, useCallback } from 'react';
import { TextSelection } from '@tiptap/pm/state';

export const ToCItem = ({ item, onItemClick }) => {


  return (
    <div
      className={`toc-item level-${item.level}  ${
        item.isScrolledOver ? 'is-scrolled-over' : ''
      }`}
     
    >
      <a href={`#${item.id}`} className='text-ellipsis' onClick={e => onItemClick(e, item.id)} data-item-index={item.itemIndex}>
        {item.textContent}
      </a>
     
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
  if (items.length === 0) {
    return <ToCEmptyState />
  }


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

      if (history.pushState) { // eslint-disable-line
        history.pushState(null, null, `#${id}`); // eslint-disable-line
      }

      const container = scrollContainerRef?.current;
      if (container) {
        const elementTop = element.getBoundingClientRect().top + container.scrollTop;
        container.scrollTo({
          top: elementTop,
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
        />
      ))}
    </>
  );
};
