/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from "react";
import { Outlet, useLocation, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
  DroppableProvided,
  DraggableProvided,
} from "react-beautiful-dnd";

import useGetHeroList from "../hooks/useGetHeroList";
import { HeroInfoType } from "../types";
import HeroCardComponent from "../components/HeroCard";
import HeroesProfileProvider from "../context/HeroesProfile";

const PageWrap = styled.div`
  padding: 50px 0;
`;
const HeroListWrap = styled.div`
  width: 95%;
  max-width: 980px;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin: 0 auto;
  padding: 10px;
  border: 1px solid #000;
  border-radius: 10px;
  background-color: #f5f5f5;
`;

export default function Heroes() {
  const location = useLocation();
  const { heroId } = useParams();

  const { heroList, setHeroList } = useGetHeroList();

  useEffect(() => {
    if (location.pathname === "/heroes/" || location.pathname === "/heroes") {
      document.title = "Hero List Page";
    } else {
      document.title = "Hero Profile Page";
    }
  }, [location]);

  const onDragEnd = (dragEvent: DropResult) => {
    if (!dragEvent.destination) return;
    const dragIndex = dragEvent.source.index;
    const dropIndex = dragEvent.destination.index;
    const newList = [...heroList];
    const [dragItem] = newList.slice(dragIndex, dragIndex + 1);
    newList.splice(dragIndex, 1);
    newList.splice(dropIndex, 0, dragItem);
    setHeroList(newList);
  };

  return (
    <HeroesProfileProvider heroList={heroList}>
      <PageWrap>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="heroes" direction="horizontal">
            {(provided: DroppableProvided) => (
              <HeroListWrap ref={provided.innerRef}>
                {heroList.map((hero: HeroInfoType, index) => {
                  const { id, image, name } = hero;
                  return (
                    <Draggable draggableId={id} index={index} key={id}>
                      {(dragProvided: DraggableProvided) => (
                        <div
                          {...dragProvided.draggableProps}
                          {...dragProvided.dragHandleProps}
                          ref={dragProvided.innerRef}
                        >
                          <HeroCardComponent
                            heroId={heroId}
                            id={id}
                            image={image}
                            name={name}
                          />
                        </div>
                      )}
                    </Draggable>
                  );
                })}
                {provided.placeholder}
              </HeroListWrap>
            )}
          </Droppable>
        </DragDropContext>

        {heroId && <Outlet context={heroId} />}
      </PageWrap>
    </HeroesProfileProvider>
  );
}
