import React, { useEffect, useState } from "react";
import { client } from "../tina/__generated__/client";

const FeaturedWorkSelector = ({ input }) => {
  const [works, setWorks] = useState([]);

  useEffect(() => {
    const fetchWorks = async () => {
      try {
        const result = await client.request({
          query: `
            query WorksConnection {
              workConnection {
                edges {
                  node {
                    id
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

        console.log("Result from CMS API:", result);

        const fetchedWorks = result.data.workConnection.edges.map(
          (edge) => edge.node
        );
        setWorks(fetchedWorks);
      } catch (error) {
        console.error("Error fetching works:", error);
      }
    };

    fetchWorks();
  }, []);

  useEffect(() => {
    console.log("Works state updated:", works);
  }, [works]);

  const handleSelect = (selectedFilename) => {
    const selectedWork = works.find(
      (w) => w._sys.filename === selectedFilename
    );
    if (selectedWork) {
      input.onChange({
        work: selectedWork._sys.filename,
        title: selectedWork.title,
      });
    }
  };

  return (
    <select
      value={input.value?.work || ""}
      onChange={(e) => handleSelect(e.target.value)}
    >
      <option value="">Select a work</option>
      {works.map((work) => (
        <option key={work.id} value={work._sys.filename}>
          {work.title}
        </option>
      ))}
    </select>
  );
};

export default FeaturedWorkSelector;
