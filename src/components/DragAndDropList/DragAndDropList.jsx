import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { updateRecipeOrder } from "../../api/api"; // Import API function
import "./DragAndDropList.css";

function DragAndDropList({ items = [], setItems, updateOrderOnServer }) {
  const handleDragEnd = (result) => {
    if (!result.destination) return; // If dropped outside, do nothing

    const reorderedItems = [...items]; // Ensure immutability
    const [movedItem] = reorderedItems.splice(result.source.index, 1);
    reorderedItems.splice(result.destination.index, 0, movedItem);

    setItems(reorderedItems); // Update state

    // Call API to update order in backend
    updateOrderOnServer(reorderedItems);
  };

  return (
    <div style={{ maxWidth: "400px", margin: "auto" }}>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="recipeList">
          {(provided) => (
            <ul className="drag-list" {...provided.droppableProps} ref={provided.innerRef}>
              {items.map((item, index) => (
                <Draggable key={item._id} draggableId={String(item._id)} index={index}>
                  {(provided, snapshot) => (
                    <li 
                      ref={provided.innerRef} 
                      {...provided.draggableProps} 
                      {...provided.dragHandleProps}
                      className={`drag-item ${snapshot.isDragging ? "dragging" : ""}`}
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
