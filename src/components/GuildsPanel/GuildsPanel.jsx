/* eslint-disable no-shadow */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/interactive-supports-focus */
import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import classNames from "classnames";
import ReactTooltip from "react-tooltip";
import { setActiveGuild, openGuildAddModal } from "../../redux/actions";
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
  const dispatch = useDispatch();
  const openGuildAddModalDispatcher = useCallback(
    () => dispatch(openGuildAddModal()),
    [dispatch]
  );

  const [list, setList] = useState(
    Object.entries(guilds).map(([guildId, guild]) => ({
      id: guildId,
      name: guild.name,
      icon: guild.icon || defaultAvatar
    }))
  );

  const listRefs = useRef([...Array(list.length)].map(() => React.createRef()));

  useEffect(() => {
    listRefs.current = [...Array(Object.keys(guilds).length)].map(() =>
      React.createRef()
    );
    setList(
      Object.entries(guilds).map(([guildId, guild]) => ({
        id: guildId,
        name: guild.name,
        icon: guild.icon || defaultAvatar
      }))
    );
  }, [defaultAvatar, guilds]);

  const onDragEnd = result => {
    if (result.destination) {
      const items = reorder(
        list,
        result.source.index,
        result.destination.index
      );

      setList(items);
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
                            src={`${guild.icon}?${performance.now()}`}
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
          onClick={openGuildAddModalDispatcher}
        >
          <i className="fas fa-plus fa-lg" />
        </div>
      </div>
    </div>
  );
}
