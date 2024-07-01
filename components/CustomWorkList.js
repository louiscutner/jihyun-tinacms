import React, { useEffect, useState } from "react";
import { useCMS } from "tinacms";
import { wrapFieldsWithMeta } from "tinacms";
import { client } from "../tina/__generated__/client"; // Adjust the path as necessary
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const CustomWorkList = wrapFieldsWithMeta(({ input, field, meta }) => {
  const cms = useCMS();
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const response = await client.queries.workConnection();
        const works = response.data.workConnection.edges.map(
          (edge) => edge.node
        );
        setWorks(works);
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };

    fetchWorks();
  }, [cms]);

  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }

    const reorderedWorks = Array.from(works);
    const [removed] = reorderedWorks.splice(result.source.index, 1);
    reorderedWorks.splice(result.destination.index, 0, removed);

    setWorks(reorderedWorks);
    input.onChange(reorderedWorks);
  };

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
                <Draggable key={work.id} draggableId={work.id} index={index}>
                  {(provided, snapshot) => (
                    <li
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`flex items-center justify-between p-3 mb-2 bg-white border border-gray-300 rounded transition-all ${
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
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-move hidden group-hover:block"
                        >
                          <polyline points="5 9 2 12 5 15"></polyline>
                          <polyline points="9 5 12 2 15 5"></polyline>
                          <polyline points="15 19 12 22 9 19"></polyline>
                          <polyline points="19 9 22 12 19 15"></polyline>
                        </svg>
                        <span
                          className={`ml-2 transition-opacity ${
                            snapshot.isDragging ? "opacity-50" : ""
                          }`}
                        >
                          {work.title}
                        </span>
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
      {meta.touched && meta.error && (
        <span className="text-red-500">{meta.error}</span>
      )}
    </div>
  );
});

export default CustomWorkList;
