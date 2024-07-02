import React, { useCallback, useState, useEffect } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { client } from "../tina/__generated__/client";

const CustomWorkList = ({ field, input }) => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const worksListData = await client.request({
          query: `
            query WorksConnection {
              workConnection {
                edges {
                  node {
                    _sys {
                      filename
                    }
                    title
                  }
                }
              }
            }
          `,
        });

        const fetchedWorks = worksListData.data.workConnection.edges.map(
          (edge) => ({
            title: edge.node.title,
            filename: edge.node._sys.filename,
          })
        );

        console.log("Fetched works:", fetchedWorks);
        setWorks(fetchedWorks);
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };

    fetchWorks();
  }, []);

  const onDragEnd = useCallback(
    (result) => {
      if (!result.destination) return;

      const newWorks = Array.from(works);
      const [reorderedItem] = newWorks.splice(result.source.index, 1);
      newWorks.splice(result.destination.index, 0, reorderedItem);

      console.log("Updated works after drag:", newWorks);
      setWorks(newWorks);

      // Update Tina's form state (this won't affect our live data usage)
      input.onChange(newWorks.map((work) => ({ filename: work.filename })));
    },
    [works, input]
  );

  return (
    <div className="mb-4">
      <label>{field.label}</label>
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
                  key={work.filename}
                  draggableId={work.filename}
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
};

export default CustomWorkList;
