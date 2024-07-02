import React, { useEffect, useState } from "react";
import { client } from "../tina/__generated__/client";

const OrderSetter = ({ input }) => {
  const [order, setOrder] = useState(input.value || 0);

  useEffect(() => {
    const fetchWorkCount = async () => {
      try {
        const result = await client.request({
          query: `
            query WorksConnection {
              workConnection {
                totalCount
              }
            }
          `,
        });

        console.log("Result from CMS API:", result);

        const newOrder = result.data.workConnection.totalCount + 1;
        console.log("Calculated new order:", newOrder);

        setOrder(newOrder);
        input.onChange(newOrder);
      } catch (error) {
        console.error("Error fetching work count:", error);
      }
    };

    if (!input.value) {
      fetchWorkCount();
    }
  }, [input]);

  useEffect(() => {
    console.log("Order state updated:", order);
  }, [order]);

  return <></>;
};

export default OrderSetter;
