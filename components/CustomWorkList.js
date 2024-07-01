import React, { useCallback, useState, useEffect } from "react";
import { wrapFieldsWithMeta } from "tinacms";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CustomWorkList = wrapFieldsWithMeta(({ input, field }) => {
  const [works, setWorks] = useState(input.value || []);

  useEffect(() => {
    setWorks(input.value || []);
  }, [input.value]);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const newWorks = Array.from(works);
      const [reorderedItem] = newWorks.splice(result.source.index, 1);
      newWorks.splice(result.destination.index, 0, reorderedItem);

      const updatedWorks = newWorks.map((work, index) => ({
        ...work,
        order: index + 1,
      }));

      setWorks(updatedWorks);
      input.onChange(updatedWorks);
    },
    [works, input]
  );

  return (
    <div className="mb-4">
      <label>{field.label}</label>
      {field.description && <p>{field.description}</p>}
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="works">
          {(provided) => (
            <ul
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="list-none p-0"
            >
              {works.map((work, index) => (
                <Draggable
                  key={work.id || `work-${index}`}
                  draggableId={work.id || `work-${index}`}
                  index={index}
                >
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex items-center justify-between p-3 mb-2 bg-white border border-gray-300 rounded ${
                        snapshot.isDragging ? "bg-gray-100" : ""
                      }`}
                    >
                      <span className="flex items-center">
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-align-justify mr-2 opacity-75 group-hover:hidden"
                        >
                          <line x1="21" y1="10" x2="3" y2="10"></line>
                          <line x1="21" y1="6" x2="3" y2="6"></line>
                          <line x1="21" y1="14" x2="3" y2="14"></line>
                          <line x1="21" y1="18" x2="3" y2="18"></line>
                        </svg>
                        <span className="ml-2">{work.title}</span>
                      </span>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
});

export default CustomWorkList;
