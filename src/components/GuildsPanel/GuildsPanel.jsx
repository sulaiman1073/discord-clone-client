import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import {
  setActiveGuild,
  setGuildOrder,
  openGuildAddModal
} from "../../redux/actions";
import "./GuildsPanel.css";

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

export default function GuildsPanel() {
  const defaultAvatar = useSelector(({ userState }) => userState.defaultAvatar);
  const guilds = useSelector(({ chatState }) => chatState.guilds);
  const activeGuild = useSelector(({ chatState }) => chatState.activeGuild);
  const guildOrder = useSelector(({ chatState }) => chatState.guildOrder);
  const dispatch = useDispatch();
  const openGuildAddModalDispatcher = useCallback(
    () => dispatch(openGuildAddModal()),
    [dispatch]
  );

  const [list, setList] = useState(
    guildOrder.map(guildId => ({
      id: guildId,
      name: guilds[guildId].name,
      icon: guilds[guildId].icon || defaultAvatar,
      updatedIcon: guilds[guildId].updatedIcon
    }))
  );

  const listRefs = useRef([...Array(list.length)].map(() => React.createRef()));

  useEffect(() => {
    listRefs.current = [...Array(Object.keys(guildOrder).length)].map(() =>
      React.createRef()
    );
    setList(
      guildOrder.map(guildId => ({
        id: guildId,
        name: guilds[guildId].name,
        icon: guilds[guildId].icon || defaultAvatar,
        updatedIcon: guilds[guildId].updatedIcon
      }))
    );
  }, [defaultAvatar, guildOrder, guilds]);

  const onDragEnd = result => {
    if (result.destination) {
      const items = reorder(
        list,
        result.source.index,
        result.destination.index
      );

      dispatch(setGuildOrder(items.map(item => item.id)));
    }
  };

  const handleGuildSelect = guildId => {
    if (guildId !== activeGuild) {
      dispatch(setActiveGuild(guildId));
    }
  };

  return (
    <div className="GuildsPanel--container">
      <ReactTooltip
        place="right"
        effect="solid"
        className="GuildsPanel--tooltip"
        id="GuildsPanel--tooltip"
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="GuildsPanel--guildList"
            >
              {list.map((guild, index) => {
                return (
                  <Draggable
                    key={guild.id}
                    draggableId={guild.id}
                    index={index}
                  >
                    {(provided, snapshot) => {
                      const classes = classNames({
                        "GuildsPanel--guild": true,
                        "GuildsPanel--guildActive": guild.id === activeGuild,
                        "GuildsPanel--guildDragged": snapshot.isDragging
                      });

                      return (
                        <div
                          className={classes}
                          role="button"
                          key={guild.id}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          onClick={() => handleGuildSelect(guild.id)}
                        >
                          <img
                            src={
                              guild.updatedIcon
                                ? `${guild.icon}?${guild.updatedIcon}`
                                : guild.icon
                            }
                            alt={`guild ${guild.name} icon`}
                            data-for="GuildsPanel--tooltip"
                            data-tip={guild.name}
                            ref={listRefs.current[index]}
                            {...provided.dragHandleProps}
                            onMouseEnter={() => {
                              ReactTooltip.show(
                                listRefs.current[index].current
                              );
                            }}
                            onMouseLeave={() => {
                              ReactTooltip.hide(
                                listRefs.current[index].current
                              );
                            }}
                          />
                          <div className="GuildsPanel--guild GuildsPanel--guildSlate" />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      <div className="GuildsPanel--addGuild">
        <div
          data-for="GuildsPanel--tooltip"
          data-tip="Add a Guild"
          role="button"
          onClick={openGuildAddModalDispatcher}
        >
          <i className="fas fa-plus fa-lg" />
        </div>
      </div>
    </div>
  );
}
