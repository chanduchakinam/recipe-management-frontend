import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { useMemo } from "react";
import { updateRecipeOrder } from "../../api/api"; // Import API function
import './DragAndDropList.css';

function DragAndDropList({ items = [], setItems, updateOrderOnServer }) {
  // Optimize rendering with useMemo
  const memoizedItems = useMemo(() => items, [items]);

  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const reorderedItems = [...memoizedItems]; // Ensure immutability
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    console.log("Updated Order:", reorderedItems); // Debugging

    setItems(reorderedItems); // Update state

    // Call API to update order in backend
    updateOrderOnServer = async (reorderedItems) => {
      try {
        await updateRecipeOrder(reorderedItems);
        console.log("✅ Updated order saved successfully!");
      } catch (error) {
        console.error("❌ Error updating order:", error);
      }
    }
    updateOrderOnServer(reorderedItems);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="recipeList">
          {(provided) => (
            <ul className="drag-list" {...provided.droppableProps} ref={provided.innerRef}>
              {memoizedItems.map((item, index) => (
                <Draggable key={item._id} draggableId={item._id.toString()} index={index}>
                  {(provided, snapshot) => (
                    <li 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}
                      className={`drag-item ${snapshot.isDragging ? "dragging" : ""}`}
                      style={{
                        background: snapshot.isDragging ? "#e0e0e0" : "#fff",
                        padding: "10px",
                        margin: "5px 0",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        cursor: "grab",
                        transition: "background 0.2s ease-in-out", // Fix lag
                      }}
                    >
                      {item.title}
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
}

export default DragAndDropList;
